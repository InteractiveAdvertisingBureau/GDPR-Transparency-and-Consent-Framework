package com.triplelift.shared.util;

import java.text.ParseException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Base64.Decoder;

import java.util.List;

/**
 * This class implements a parser for the IAB consent string as specified in
 * https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/
 * Draft_for_Public_Comment_Transparency%20%26%20Consent%20Framework%20-%20cookie%20and%20vendor%20list%20format%
 * 20specification%20v1.0a.pdf
 *
 *
 */

public class ConsentStringParser {

	private static final int VENDOR_ENCODING_RANGE = 1;

	private static final int VERSION_BIT_OFFSET = 0;
	private static final int VERSION_BIT_SIZE = 6;
	private static final int CREATED_BIT_OFFSET = 6;
	private static final int CREATED_BIT_SIZE = 36;
	private static final int UPDATED_BIT_OFFSET = 42;
	private static final int UPDATED_BIT_SIZE = 36;
	private static final int CMP_ID_OFFSET = 78;
	private static final int CMP_ID_SIZE = 12;
	private static final int CMP_VERSION_OFFSET = 90;
	private static final int CMP_VERSION_SIZE = 12;
	private static final int CONSENT_SCREEN_SIZE_OFFSET = 102;
	private static final int CONSENT_SCREEN_SIZE = 6;
	private static final int CONSENT_LANGUAGE_OFFSET = 108;
	private static final int CONSENT_LANGUAGE_SIZE = 12;
	private static final int VENDOR_LIST_VERSION_OFFSET = 120;
	private static final int VENDOR_LIST_VERSION_SIZE = 12;
	private static final int PURPOSES_OFFSET = 132;
	private static final int PURPOSES_SIZE = 24;
	private static final int MAX_VENDOR_ID_OFFSET = 156;
	private static final int MAX_VENDOR_ID_SIZE = 16;
	private static final int ENCODING_TYPE_OFFSET = 172;
	private static final int ENCODING_TYPE_SIZE = 1;
	private static final int VENDOR_BITFIELD_OFFSET = 173;
	private static final int DEFAULT_CONSENT_OFFSET = 173;
	private static final int NUM_ENTRIES_OFFSET = 174;
	private static final int NUM_ENTRIES_SIZE = 12;
	private static final int RANGE_ENTRY_OFFSET = 186;
	private static final int VENDOR_ID_SIZE = 16;

	private String consentString;
	private final Bits bits;
	// fields contained in the consent string
	private final int version;
	private final Instant cookieCreated;
	private final Instant cookieLastUpdated;
	private final int cmpID;
	private final int cmpVersion;
	private final int consentScreenID;
	private final String consentLanguage;
	private final int vendorListVersion;
	private final int maxVendorSize;
	private final int vendorEncodingType;
	private final List<Boolean> allowedPurposes = new ArrayList<Boolean>();
	// only used when range entry is enabled
	private List<RangeEntry> rangeEntries;
	private boolean defaultConsent;

	private static Decoder decoder = Base64.getUrlDecoder();

	/**
	 * Constructor.
	 *
	 * @param consentString
	 *            (required). The binary user consent data encoded as url and filename safe base64 string
	 *
	 * @throws ParseException
	 *             if the consent string cannot be parsed
	 */
	public ConsentStringParser(String consentString) throws ParseException {
		this(decoder.decode(consentString));
		this.consentString = consentString;
	}

	/**
	 * Constructor
	 *
	 * @param bytes:
	 *            the byte string encoding the user consent data
	 * @throws ParseException
	 *             when the consent string cannot be parsed
	 */
	public ConsentStringParser(byte[] bytes) throws ParseException {
		this.bits = new Bits(bytes);
		// begin parsing

		this.version = bits.getInt(VERSION_BIT_OFFSET, VERSION_BIT_SIZE);
		String s = bits.getBinaryString();
		this.cookieCreated = bits.getInstantFromEpochDemiseconds(CREATED_BIT_OFFSET, CREATED_BIT_SIZE);
		this.cookieLastUpdated = bits.getInstantFromEpochDemiseconds(UPDATED_BIT_OFFSET, UPDATED_BIT_SIZE);
		this.cmpID = bits.getInt(CMP_ID_OFFSET, CMP_ID_SIZE);
		this.cmpVersion = bits.getInt(CMP_VERSION_OFFSET, CMP_VERSION_SIZE);
		this.consentScreenID = bits.getInt(CONSENT_SCREEN_SIZE_OFFSET, CONSENT_SCREEN_SIZE);
		this.consentLanguage = bits.getSixBitString(CONSENT_LANGUAGE_OFFSET, CONSENT_LANGUAGE_SIZE);
		this.vendorListVersion = bits.getInt(VENDOR_LIST_VERSION_OFFSET, VENDOR_LIST_VERSION_SIZE);
		this.maxVendorSize = bits.getInt(MAX_VENDOR_ID_OFFSET, MAX_VENDOR_ID_SIZE);
		this.vendorEncodingType = bits.getInt(ENCODING_TYPE_OFFSET, ENCODING_TYPE_SIZE);
		for (int i = PURPOSES_OFFSET, ii = PURPOSES_OFFSET + PURPOSES_SIZE; i < ii; i++) {
			allowedPurposes.add(bits.getBit(i));
		}
		if (vendorEncodingType == VENDOR_ENCODING_RANGE) {
			this.rangeEntries = new ArrayList<RangeEntry>();
			this.defaultConsent = bits.getBit(DEFAULT_CONSENT_OFFSET);
			int numEntries = bits.getInt(NUM_ENTRIES_OFFSET, NUM_ENTRIES_SIZE);
			int currentOffset = RANGE_ENTRY_OFFSET;
			for (int i = 0; i < numEntries; i++) {
				boolean range = bits.getBit(currentOffset);
				currentOffset++;
				if (range) {
					int startVendorId = bits.getInt(currentOffset, VENDOR_ID_SIZE);
					currentOffset += VENDOR_ID_SIZE;
					int endVendorId = bits.getInt(currentOffset, VENDOR_ID_SIZE);
					currentOffset += VENDOR_ID_SIZE;
					rangeEntries.add(new RangeEntry(startVendorId, endVendorId));
				} else {
					int vendorId = bits.getInt(currentOffset, VENDOR_ID_SIZE);
					currentOffset += VENDOR_ID_SIZE;
					rangeEntries.add(new RangeEntry(vendorId));
				}
			}
		}

	}

	/**
	 * @return the string passes in the constructor.
	 *
	 */
	public String getConsentString() {
		return consentString;
	}

	/**
	 * @return the {@link Instant} at which the cookie was created
	 */
	public Instant getCookieCreated() {
		return cookieCreated;
	}

	/**
	 *
	 * @return the {@link Instant} at which the cookie was last updated
	 */
	public Instant getCookieLastUpdated() {
		return cookieLastUpdated;
	}

	/**
	 *
	 * @return the version of the cookie format used in this consent string
	 */
	public int getVersion() {
		return version;
	}

	/**
	 *
	 * @return the id of the consent management partner that created this consent string
	 */
	public int getCmpID() {
		return cmpID;
	}

	/**
	 * @return the version of the cmp being used
	 */
	public int getCmpVersion() {
		return cmpVersion;
	}

	/**
	 *
	 * @return the id of the string through which the user gave consent in the CMP UI
	 */
	public int getConsentScreenID() {
		return consentScreenID;
	}

	/**
	 * @return The two letter ISO639-1 language code in which the CMP asked for consent
	 */
	public String getConsentLanguage() {
		return consentLanguage;
	}

	/**
	 *
	 * @return a list of purposes, indexible by purpose id, to which the user may have consented
	 */
	public List<Boolean> getPurposes() {
		return allowedPurposes;
	}

	/**
	 *
	 * @return the vendor list version which was used in creating this consent string
	 */
	public int getVendorListVersion() {
		return vendorListVersion;
	}

	/**
	 * @return a boolean describing the user consent status for a particular purpose. The lowest purpose ID is 1.
	 */
	public boolean isPurposeAllowed(int purposeId) {
		if (purposeId < 1 || purposeId > allowedPurposes.size()) {
			return false;
		}
		return allowedPurposes.get(purposeId - 1);
	}

	private boolean findVendorIdInRange(int vendorId) {
		int limit = rangeEntries.size();
		int index = limit / 2;
		while (index >= 0 && index < limit) {
			RangeEntry entry = rangeEntries.get(index);
			if (entry.containsVendorId(vendorId)) {
				return true;
			}
			if (index == 0 || index == limit - 1) {
				return false;
			}
			if (entry.idIsGreaterThanMax(vendorId)) {
				index = (index + ((limit - index) / 2));
			} else {
				index = index / 2;
			}
		}
		return false;
	}

	/**
	 * @return a boolean describing if a vendor has consented to a particular vendor. The lowest vendor ID is 1.
	 *
	 *         This method, along with {@link isPurposeAllowed} fully describes the user consent for a particular action
	 *         by a given vendor.
	 */
	public boolean isVendorAllowed(int vendorId) {
		if (vendorEncodingType == VENDOR_ENCODING_RANGE) {
			boolean present = findVendorIdInRange(vendorId);
			return present && defaultConsent;
		} else {
			return bits.getBit(VENDOR_BITFIELD_OFFSET + vendorId - 1);
		}
	}

	// static classes
	private static class RangeEntry {
		/**
		 * This class corresponds to the RangeEntry field given in the consent string specification.
		 */
		private final List<Integer> vendorIds = new ArrayList<Integer>();
		private final int maxVendorId;
		private final int minVendorId;

		public RangeEntry(int vendorId) {
			vendorIds.add(vendorId);
			this.maxVendorId = this.minVendorId = vendorId;
		}

		public RangeEntry(int startId, int endId) {
			this.maxVendorId = endId;
			this.minVendorId = startId;
			for (; startId <= endId; startId++) {
				vendorIds.add(startId);
			}
		}

		public boolean containsVendorId(int vendorId) {
			return vendorIds.indexOf(vendorId) >= 0;
		}

		public boolean idIsGreaterThanMax(int vendorId) {
			return vendorId > maxVendorId;
		}

		public boolean isIsLessThanMin(int vendorId) {
			return vendorId < minVendorId;
		}
	}

	// since java.util.BitSet is inappropiate to use here--as it reversed the bit order of the consent string--we
	// implement our own bitwise operations here.
	private static class Bits {
		// big endian
		private static final byte[] bytePows = { -128, 64, 32, 16, 8, 4, 2, 1 };
		private final byte[] bytes;

		public Bits(byte[] b) {
			this.bytes = b;
		}

		/**
		 *
		 * @param index:
		 *            the nth number bit to get from the bit string
		 * @return boolean bit, true if the bit is switched to 1, false otherwise
		 */
		public boolean getBit(int index) {
			int byteIndex = index / 8;
			int bitExact = index % 8;
			byte b = bytes[byteIndex];
			return (b & bytePows[bitExact]) != 0;
		}

		/**
		 * interprets n number of bits as a big endiant int
		 *
		 * @param startInclusive:
		 *            the nth to begin interpreting from
		 * @param size:
		 *            the number of bits to interpret
		 * @return
		 * @throws ParseException
		 *             when the bits cannot fit in an int sized field
		 */
		public int getInt(int startInclusive, int size) throws ParseException {
			if (size > Integer.SIZE) {
				throw new ParseException("can't fit bit range in int.", startInclusive);
			}
			int val = 0;
			int sigMask = 1;
			int sigIndex = size - 1;

			for (int i = 0; i < size; i++) {
				if (getBit(startInclusive + i)) {
					val += (sigMask << sigIndex);
				}
				sigIndex--;
			}
			return val;
		}

		/**
		 * interprets n bits as a big endian long
		 *
		 * @param startInclusive:
		 *            the nth to begin interpreting from
		 * @param size:the
		 *            number of bits to interpret
		 * @return
		 * @throws ParseException
		 *             when the bits cannot fit in an int sized field
		 */
		public long getLong(int startInclusive, int size) throws ParseException {
			if (size > Long.SIZE) {
				throw new ParseException("can't fit bit range in long.", startInclusive);
			}
			long val = 0;
			long sigMask = 1;
			int sigIndex = size - 1;

			for (int i = 0; i < size; i++) {
				if (getBit(startInclusive + i)) {
					val += (sigMask << sigIndex);
				}
				sigIndex--;
			}
			return val;
		}

		/**
		 * returns an {@link Instant} derived from interpreting the given interval on the bit string as long
		 * representing the number of demiseconds from the unix epoch
		 *
		 * @param startInclusive:
		 *            the bit from which to begin interpreting
		 * @param size:
		 *            the number of bits to interpret
		 * @return
		 * @throws ParseException
		 *             when the number of bits requested cannot fit in a long
		 */
		public Instant getInstantFromEpochDemiseconds(int startInclusive, int size) throws ParseException {
			long epochDemi = getLong(startInclusive, size);
			return Instant.ofEpochMilli(epochDemi * 100);
		}

		/**
		 * @return the number of bits in the bit string
		 *
		 */
		public int length() {
			return bytes.length * 8;
		}

		/**
		 * This method interprets the given interval in the bit string as a series of six bit characters, where 0=A and
		 * 26=Z
		 *
		 * @param startInclusive:
		 *            the nth bit in the bitstring from which to start the interpretation
		 * @param size:
		 *            the number of bits to include in the string
		 * @return the string given by the above interpretation
		 * @throws ParseException
		 *             when the requested interval is not a multiple of six
		 */
		public String getSixBitString(int startInclusive, int size) throws ParseException {
			if (size % 6 != 0) {
				throw new ParseException("string bit length must be multiple of six", startInclusive);
			}
			int charNum = size / 6;
			StringBuilder val = new StringBuilder();
			for (int i = 0; i < charNum; i++) {
				int charCode = getInt(startInclusive + (i * 6), 6) + 65;
				val.append((char) charCode);
			}
			return val.toString().toUpperCase();

		}

		/**
		 *
		 * @return a string representation of the byte array passed in the constructor. for example, a byte array of [4]
		 *         yeilds a String of "0100"
		 */
		public String getBinaryString() {
			StringBuilder s = new StringBuilder();
			int i = 0;
			int ii = length();
			for (; i < ii; i++) {
				if (getBit(i)) {
					s.append("1");
				} else {
					s.append("0");
				}
			}
			return s.toString();
		}
	}

}
