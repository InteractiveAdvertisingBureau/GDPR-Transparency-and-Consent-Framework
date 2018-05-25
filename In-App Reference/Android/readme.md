# Implementation Guide for Android App Publishers

* Drag and drop the classes from the `cmpconsenttool` package to your project. You will have to update the copied classes `package` name to point to yours,
 update the `import` where needed and add the `CMPConsentToolActivity` to your `AndroidManifest.xml`
* Configure the consent tool by providing a set of properties encapsulated in the `CMPSettings` object. Where:

	* `SubjectToGdpr`: Enum that indicates
		* `CMPGDPRDisabled` - value 0, not subject to GDPR
		* `CMPGDPREnabled` - value 1, subject to GDPR
		* `CMPGDPRUnknown` - value -1, unset
	* `consentToolURL`: `String url` that is used to create and load the request into the `WebView` – it is the request for the consent webpage. This property is mandatory.
	* `consentString`: If this property is given, it enforces reinitialization with the given string, configured based on the `consentToolURL`. This property is optional.

```
CMPSettings cmpSettings = new CMPSettings(SubjectToGdpr.CMPGDPREnabled, “https://consentWebPage”, null);
```

* In order to start the `CMPConsentToolActivity`, you can call the following method:	`CMPConsentToolActivity.openCmpConsentToolView(cmpSettings, context, onCloseCallback);`
* In order to receive a callback when close or done button is tapped, you may use `OnCloseCallback` listener, otherwise pass null as the third parameter to `openCMPConsentToolView()`.
* `SubjectToGdpr`, `consentString`, `purposes`, `vendors` and `cmpPresent` will be stored in SharedPreferences


# Implementation Guide for Android SDK’s

* In order to retrieve the stored consent information from SharedPreferences, you can add `CMPStorage.java` class to your project (in this case update the classes `package` name)
 or create your own class and use the keys mentioned below to get the information you need
* `CMPStorage` class provides getter methods for the following properties:
    * subjectToGdpr: Enum that indicates (stored in SharedPreferences under key `IABConsent_SubjectToGDPR`)
        * `CMPGDPRDisabled`- value 0, not subject to GDPR
        * `CMPGDPREnabled` - value 1, subject to GDPR
        * `CMPGDPRUnknown` - value -1, unset
    * CMPPresent: Boolean which indicates if a CMP implementing the `iAB` specification is present in the application. (stored in SharedPreferences under key `IABConsent_CMPPresent`)
    * consentString: The consent string as a websafe base64-encoded string. (stored in SharedPreferences under key `IABConsent_ConsentString`)
    * purposes: String of purposes created from a subset of the decoded consentString converted to binary. (stored in SharedPreferences under key `IABConsent_ParsedPurposeConsents`)
    * vendors: String of vendors created from a subset of the decoded consentString converted to binary. (stored in SharedPreferences under key `IABConsent_ParsedVendorConsents`)
* `CMPStorage` class provides the following methods to check whether consent was given to a specific vendorId or purposeId:
    * `isVendorConsentGivenForVendorId(Context context, int vendorId)`
    * `isPurposeConsentGivenForPurposeId(Context context, int purposeId)`
* Default value for subjectToGdpr is `CMPGDPRUnknown`.
* Default value for consentString, vendors, purposes is an empty string, if no consent has been stored in SharedPreferences.
* Default value for cmpPresent is `false`.
