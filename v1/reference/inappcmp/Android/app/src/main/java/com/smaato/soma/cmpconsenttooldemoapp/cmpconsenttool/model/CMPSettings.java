package com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.model;

import android.support.annotation.NonNull;

import java.io.Serializable;

public class CMPSettings implements Serializable {

    private SubjectToGdpr subjectToGdpr;
    private String consentToolUrl;
    private String consentString;

    /**
     * Creates an instance of this class
     *
     * @param isGdprEnabled  Enum that indicates
     *                       'CMPGDPRDisabled' – value 0, not subject to GDPR,
     *                       'CMPGDPREnabled'  – value 1, subject to GDPR,
     *                       'CMPGDPRUnknown'  - value -1, unset.
     * @param consentToolUrl url that is used to create and load the request into the WebView - it is the request for the consent webpage. This property is mandatory
     * @param consentString  If this property is given, it enforces reinitialization with the given string, configured based on the consentToolUrl. This property is optional.
     */
    public CMPSettings(SubjectToGdpr isGdprEnabled, @NonNull String consentToolUrl, String consentString) {
        this.subjectToGdpr = isGdprEnabled;
        this.consentToolUrl = consentToolUrl;
        this.consentString = consentString;
    }

    /**
     * @return Enum that indicates
     * 'CMPGDPRDisabled' – value 0, not subject to GDPR,
     * 'CMPGDPREnabled'  – value 1, subject to GDPR,
     * 'CMPGDPRUnknown'  - value -1, unset.
     */
    public SubjectToGdpr getSubjectToGdpr() {
        return subjectToGdpr;
    }


    /**
     * @param subjectToGdpr Enum that indicates
     *                      'CMPGDPRDisabled' – value 0, not subject to GDPR,
     *                      'CMPGDPREnabled'  – value 1, subject to GDPR,
     *                      'CMPGDPRUnknown'  - value -1, unset.
     */
    public void setSubjectToGdpr(SubjectToGdpr subjectToGdpr) {
        this.subjectToGdpr = subjectToGdpr;
    }

    /**
     * @return url that is used to create and load the request into the WebView
     */
    public String getConsentToolUrl() {
        return consentToolUrl;
    }

    /**
     * @param consentToolUrl url that is used to create and load the request into the WebView
     */
    public void setConsentToolUrl(String consentToolUrl) {
        this.consentToolUrl = consentToolUrl;
    }

    /**
     * @return the consent string passed as a websafe base64-encoded string.
     */
    public String getConsentString() {
        return consentString;
    }

    /**
     * @param consentString the consent string passed as a websafe base64-encoded string.
     */
    public void setConsentString(String consentString) {
        this.consentString = consentString;
    }
}