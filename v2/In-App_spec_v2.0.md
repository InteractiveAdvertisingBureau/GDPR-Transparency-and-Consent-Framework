![iab tech lab](https://user-images.githubusercontent.com/19175352/38649177-0d37d17c-3daa-11e8-8934-f0fb47919716.png)
# In-App
**IAB Europe Transparency & Consent Framework**

**Final v.2.0 | August 2019, Updated December 2019**

  * [How is a CMP used in-app?](#how-is-a-cmp-used-in-app)
  * [What is the CMP in-app internal structure for the defined API?](#what-is-the-cmp-in-app-internal-structure-for-the-defined-api)
  * [How do third-party SDKs (vendors) access the consent information in-app?](#how-do-third-party-sdks-vendors-access-the-consent-information-in-app)
  * [How does ad mediation work in-app?](#how-does-ad-mediation-work-in-app)
    + [Mediation SDK](#mediation-sdk)
    + [Vendor](#vendor)
  * [License](#license)
  * [Disclaimer](#disclaimer)

### How is a CMP used in-app?

The steps for integrating a CMP SDK into an app are the following:

1. An app publisher should embed a CMP SDK – The setup and configuration as well as the protocol for  how to initialize the CMP SDK  are all proprietary to each CMP SDK.
2. Since more than one CMP SDK may be included in publishers' linked SDKs, the publisher must initialize only one of them. The initialized CMP shall set `IABTCF_CmpSdkID` with its ID as soon as it is initialized in the app to signal to vendors that a CMP is present.
3. The CMP SDK will determine if GDPR applies to this user in this context. But, a publisher may choose to initialize a CMP dialogue UI manually.
4. The CMP shall set the [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android) variables and vendors will then be able to read from them directly.
5. Vendors should listen to `IABTCF_* `key updates to retrieve new TC data from [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android).

### What is the CMP in-app internal structure for the defined API?

[`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android) shall be used to store pre-parsed TC data as well as the TC string by a CMP SDK. It allows:

*   Vendors to easily access TC data
*   TC data to persist across app sessions
*   TC data to be portable between CMPs to provide flexibility for a publisher to exchange one CMP SDK for another
*   Vendors within an app to avoid code duplication by not being required to include a TC string decoder while still enabling all typical use cases

**Note:** If a publisher chooses to remove a CMP SDK from their app they are responsible for clearing all `IABTCF_*` vestigial values for users so that vendors do not continue to use the TC data therein.

[`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android) values

| Key | Value(s) |
| :-- | :-- |
| `IABTCF_CmpSdkID` | `Number`:  The unsigned integer ID of CMP SDK |
| `IABTCF_CmpSdkVersion`  | `Number`: The unsigned integer version number of CMP SDK |
| `IABTCF_PolicyVersion`  | `Number`: The unsigned integer representing the version of the TCF that these consents adhere to. |
| `IABTCF_gdprApplies`  | `Number`: <p>`1` GDPR applies in current context</p><p>`0` - GDPR does _**not**_ apply in current context</p><p>**Unset** - undetermined (default before initialization)</p><p>see the section ["What does the gdprApplies value mean?"](#what-does-the-gdprapplies-value-mean) for more</p> |
| `IABTCF_PublisherCC`  | `String`: [Two-letter ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) – Default: `AA` (unknown) |
| `IABTCF_PurposeOneTreatment`  | `Number`: <p>`0` - no special treatment of purpose one</p><p>`1` - purpose one not disclosed</p><p>**Unset default** - `0`</p><p>Vendors can use this value to determine whether consent for purpose one is required.</p> |
| `IABTCF_UseNonStandardStacks`  | `Number`: <p>`1` - CMP used a non-standard stack</p><p>`0` - CMP did not use a non-standard stack</p> |
| `IABTCF_TCString` | `String`: Full encoded TC string |
| `IABTCF_VendorConsents` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the consent status for Vendor ID **n+1**; `false` and `true` respectively. eg. `'1'` at index `0` is consent `true` for vendor ID `1` |
| `IABTCF_VendorLegitimateInterests` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the legitimate interest status for Vendor ID **n+1**; `false` and `true` respectively. eg. `'1'` at index `0` is legitimate interest established `true` for vendor ID `1` |
| `IABTCF_PurposeConsents` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the consent status for purpose ID **n+1**; `false` and `true` respectively. eg. `'1'` at index `0` is consent `true` for purpose ID `1` |
| `IABTCF_PurposeLegitimateInterests` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the legitimate interest status for purpose ID **n+1**; `false` and `true` respectively. eg. `'1'` at index `0` is legitimate interest established `true` for purpose ID `1` |
| `IABTCF_SpecialFeaturesOptIns` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the opt-in status for special feature ID **n+1**; `false` and `true` respectively. eg. `'1'` at index `0` is opt-in `true` for special feature ID `1` |
| `IABTCF_PublisherRestrictions{ID}` | `String ['0','1', or '2']`: The value at position **n** – where **n**'s indexing begins at `0`  – indicates the publisher restriction type (0-2) for vendor **n+1**; (see Publisher Restrictions Types). eg. `'2'` at index `0` is restrictionType `2` for vendor ID `1`.  `{ID}` refers to the purpose ID. |
| `IABTCF_PublisherConsent` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the purpose consent status for purpose ID **n+1** for the publisher as they correspond to the [Global Vendor List](./Global_Vendor_List_spec_v2.0.md#what-is-the-global-vendor-list) Purposes; `false` and `true` respectively. eg. `'1'` at index `0` is consent `true` for purpose ID `1` |
| `IABTCF_PublisherLegitimateInterests` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the purpose legitimate interest status for purpose ID **n+1** for the publisher as they correspond to the [Global Vendor List](./Global_Vendor_List_spec_v2.0.md#what-is-the-global-vendor-list) Purposes; `false` and `true` respectively. eg. `'1'` at index `0` is legitimate interest established `true` for purpose ID `1` |
| `IABTCF_PublisherCustomPurposesConsents` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the purpose consent status for the publisher's custom purpose ID **n+1** for the publisher; `false` and `true` respectively. eg. `'1'` at index `0` is consent `true` for custom purpose ID `1` |
| `IABTCF_PublisherCustomPurposesLegitimateInterests` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the purpose legitimate interest status for the publisher's custom purpose ID **n+1** for the publisher; `false` and `true` respectively. eg. `'1'` at index `0` is legitimate interest established `true` for custom purpose ID `1` |

### How do third-party SDKs (vendors) access the consent information in-app?

On both Android OS and iOS, the vendor can get notified when the values of the shared keys change. See [NSUserDefaultsDidChangeNotification](https://developer.apple.com/documentation/foundation/nsuserdefaultsdidchangenotification?language=objc) and [SharedPreferences.OnSharedPreferenceChangeListener](https://developer.android.com/reference/android/content/SharedPreferences.OnSharedPreferenceChangeListener.html).

On Android OS, the TC data and TC string shall be stored in the default Shared Preferences for the application context. This can be accessed using the `getDefaultSharedPreferences` method from the `android.preference.PreferenceManager` class using the application context.

**Example**:

```java
Context mContext = getApplicationContext();
SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(mContext);
```
The TC data values can be retrieved from the application Shared Preferences by key name using the `get` methods on the `android.content.SharedPreferences` class. For the purposes of accessing TC data, only two methods should be necessary: `getString(String key, String defValue)` for `String` values and `getInt(String key, int defValue)` for `integer`s and `integer` representations of `Boolean` values.

**Example**:

```java
Context mContext = getApplicationContext();
SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(mContext);
String consentString = mPreferences.getString("IABTCF_TCString", "");
Boolean gdprApplies = mPreferences.getString("IABTCF_gdprApplies", "");
```
A callback can be registered to update settings when a preference is changed using the `registerOnSharedPreferenceChangeListener` method for the `android.content.SharedPreferences` class.

**Note**: The preference manager does not currently store a strong reference to the listener. If you do not store a strong reference, the listener will be susceptible to garbage collection. External guidance such as this [documentation on setting listeners](https://developer.android.com/guide/topics/ui/settings#Listening) may provide more information on listening for preference changes.

**Example**:

```java
Context mContext = getApplicationContext();
SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(mContext);
SharedPreferences.OnSharedPreferenceChangeListener mListener;
mListener = new SharedPreferences.OnSharedPreferenceChangeListener() {
            public void onSharedPreferenceChanged(SharedPreferences preferences, String key) {
                        if (key.equals([Specific Consent Key])) {
                                   // Update Consent settings
                                   }
                        }
            };


mPreferences.registerOnSharedPreferenceChangeListener(mListener);
```
### How does ad mediation work in-app?

Mediation SDK allows app developers to monetize from multiple vendors.

#### Mediation SDK

*   Mediation SDK retrieves `IABTCF_gdprApplies` and `IABTCF_TCString` from [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android).
*   If `IABTCF_gdprApplies == 0`, Mediation SDK can run mediation across all ad network SDKs.
*   If `IABTCF_gdprApplies == 1`, Mediation SDK will run mediation only among the ad network SDKs that are GDPR ready.

'GDPR ready' means that the vendor retrieves `IABTCF_gdprApplies` and `IABTCF_TCString` from [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android), and passes on these GDPR values downstream.

#### Vendor

*   Vendor retrieves `IABTCF_gdprApplies` and `IABTCF_TCString` from [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android), and passes on these GDPR values downstream and passes on these GDPR values downstream.

### License

IAB Europe Transparency and Consent Framework technical specifications governed by the IAB Tech Lab is licensed under a Creative Commons Attribution 3.0 License.   To view a copy of this license, visit[ creativecommons.org/licenses/by/3.0/](http://creativecommons.org/licenses/by/3.0/) or write to Creative Commons, 171 Second Street, Suite 300, San Francisco, CA 94105, USA.

![](https://drive.google.com/uc?id=1cbwEGlb8S69SndIDoHnvc5_3TfmkGM7R)

### Disclaimer

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE “PRODUCTS AND SERVICES”) ARE PROVIDED “AS IS” AND “AS AVAILABLE,” AND IAB TECHNOLOGY LABORATORY, INC. (“TECH LAB”) MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.
