package com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.model;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Base64;

import com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.storage.CMPStorage;

import java.util.ArrayList;
import java.util.List;

public class ConsentStringDecoder {
    private static final int ENCODING_TYPE_INDEX = 172;
    private static final int DEFAULT_CONSENT_INDEX = 173;
    private static final int NUM_ENTRIES_OFFSET = 174;
    private static final int NUM_ENTRIES_LENGTH = 12;
    private static final int RANGE_ENTRIES_OFFSET = 186;
    private static final int VENDOR_ID_LENGTH = 16;
    private static final int PURPOSES_OFFSET = 132;
    private static final int PURPOSES_LENGTH = 24;
    private static final int MAX_VENDOR_ID_OFFSET = 156;

    private int maxVendorIdDecimal;
    private String purposes = "";
    private String vendors = "";
    private RangeSection rangeSection;
    private Context context;

    public ConsentStringDecoder(Context context) {
        this.context = context;
    }

    public void processConsentString(String consentString) {
        byte[] bytes;
        try {
            String modifiedConsentString;
            modifiedConsentString = consentString.replaceAll("_", "/").replaceAll("-", "+");
            bytes = Base64.decode(modifiedConsentString, Base64.DEFAULT);
        } catch (IllegalArgumentException exception) {
            return;
        }

        StringBuilder binary = convertBase64ToBinary(bytes);
        parse(binary);
        storePurposesAndVendors();
    }

    private void storePurposesAndVendors() {
        CMPStorage.setPurposesString(context, purposes);
        CMPStorage.setVendorsString(context, vendors);
    }

    private void parse(StringBuilder binary) {
        if (binary.length() > ENCODING_TYPE_INDEX) {
            maxVendorIdDecimal = convertBinaryToInt(binary.substring(MAX_VENDOR_ID_OFFSET, ENCODING_TYPE_INDEX));

            char encodingType = binary.charAt(ENCODING_TYPE_INDEX);
            purposes = binary.substring(PURPOSES_OFFSET, PURPOSES_OFFSET + PURPOSES_LENGTH);

            if (encodingType == '0') {
                vendors = binary.substring(DEFAULT_CONSENT_INDEX, DEFAULT_CONSENT_INDEX + maxVendorIdDecimal);
            } else if (binary.length() >= RANGE_ENTRIES_OFFSET) {
                rangeSection = new RangeSection();

                char defaultConsent = binary.charAt(DEFAULT_CONSENT_INDEX);
                rangeSection.setDefaultConsent(defaultConsent);

                int numEntries = convertBinaryToInt(binary.substring(NUM_ENTRIES_OFFSET, NUM_ENTRIES_OFFSET + NUM_ENTRIES_LENGTH));
                rangeSection.setNumEntries(numEntries);

                int offset = RANGE_ENTRIES_OFFSET;

                for (int i = 0; i < numEntries; i++) {
                    RangeEntry rangeEntry = new RangeEntry();
                    rangeSection.getEntries().add(rangeEntry);

                    char singleOrRange = binary.charAt(offset);
                    rangeEntry.setSingleOrRange(singleOrRange);
                    offset++;

                    if (singleOrRange == '0') {
                        String singleVendorId = binary.substring(offset, offset + VENDOR_ID_LENGTH);
                        rangeEntry.setSingleVendorId(singleVendorId);
                        offset += VENDOR_ID_LENGTH;
                    } else {
                        String startVendorId = binary.substring(offset, offset + VENDOR_ID_LENGTH);
                        rangeEntry.setStartVendorId(startVendorId);
                        offset += VENDOR_ID_LENGTH;

                        String endVendorId = binary.substring(offset, offset + VENDOR_ID_LENGTH);
                        rangeEntry.setEndVendorId(endVendorId);
                        offset += VENDOR_ID_LENGTH;
                    }
                }

                extractRangeVendorConsentsById();
            }
        }
    }

    private void extractRangeVendorConsentsById() {
        List<Integer> ids = new ArrayList<>();

        for (RangeEntry rangeEntry : rangeSection.getEntries()) {
            if (rangeEntry.getSingleOrRange() == '0') { // single
                ids.add(convertBinaryToInt(rangeEntry.getSingleVendorId()));
            } else { // range vendors
                int startVendorIndex = convertBinaryToInt(rangeEntry.getStartVendorId());
                int endVendorIndex = convertBinaryToInt(rangeEntry.getEndVendorId());

                if (startVendorIndex <= endVendorIndex) {
                    for (int i = startVendorIndex; i <= endVendorIndex; i++) {
                        ids.add(i);
                    }
                }
            }
        }

        for (int i = 1; i <= maxVendorIdDecimal; i++) {
            if (ids.contains(i)) {
                vendors = vendors.concat(String.valueOf(rangeSection.getDefaultConsent() == '0' ? '1' : '0'));
            } else {
                vendors = vendors.concat(String.valueOf(rangeSection.getDefaultConsent() == '0' ? '0' : '1'));
            }
        }
    }

    @NonNull
    private StringBuilder convertBase64ToBinary(byte[] bytes) {
        StringBuilder binary = new StringBuilder();

        for (byte b : bytes) {
            int val = b;
            for (int i = 0; i < 8; i++) {
                binary.append((val & 128) == 0 ? 0 : 1);
                val <<= 1;
            }
        }

        return binary;
    }

    private int convertBinaryToInt(String binary) {
        return Integer.parseInt(binary, 2);
    }
}