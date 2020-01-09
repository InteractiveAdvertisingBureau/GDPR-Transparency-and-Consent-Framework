package com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.model;

/**
 * Enum that indicates:
 * 'CMPGDPRDisabled' – value 0, not subject to GDPR,
 * 'CMPGDPREnabled'  – value 1, subject to GDPR,
 * 'CMPGDPRUnknown'  - value -1, unset.
 */
public enum SubjectToGdpr {
    CMPGDPRUnknown("-1"), CMPGDPRDisabled("0"), CMPGDPREnabled("1");
    private final String value;

    SubjectToGdpr(String value) {
        this.value = value;
    }

    public static SubjectToGdpr getValueForString(final String valueString) {
        for (int i = 0; i < values().length; ++i) {
            SubjectToGdpr value = values()[i];

            if (value.value.equals(valueString)) {
                return value;
            }
        }
        return null;
    }

    public String getValue() {
        return value;
    }
}