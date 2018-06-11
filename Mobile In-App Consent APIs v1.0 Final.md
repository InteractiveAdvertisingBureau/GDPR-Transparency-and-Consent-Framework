# Mobile In-App CMP API v1.0: Transparency & Consent Framework

**IAB Europe | IAB Tech Lab**

**Final v1.0 | June 2018**

# Table of Contents
1. [Introduction](#Introduction)
2. [About the Transparency & Consent Framework](#About-the-Framework)
3. [About the Transparency & Consent Standard](#About-the-standard)
4. [Scope of this specification](#Scope)
5. [License](#License)
6. [Disclaimer](#Disclaimer)
7. [About IAB Tech Lab](#About-Tech-Lab)
8. [About IAB Europe](#About-IAB-Europe)
9. [Mobile In-App CMP API V1.0](#v1.0)
10. [What is supported by this API?](#supported)
11. [How will a CMP fit into the regular flow within an app?](#flow)
12. [CMP Internal Structure (Defined API)](#structure)
13. [How do third-party SDKs (Vendors) access the consent information?](#access)
14. [How would ad mediation work?](#mediation)
15. [Mediation SDK](#mediationSDK)
16. [Ad Network SDK](#adnetworkSDK)
17. [How to make Ad Network Tags Work](#adnetworktags)
18. [Version History](#versionhistory)
19. [Implementation Guidelines](#implementationguidelines)
20. [Future Technical Considerations](#future)



# Introduction <a name="Introduction"></a>

In February 2017, the IAB Europe assembled parties representing both the supply and demand sides of the digital advertising ecosystem, to work collectively on guidance and solutions to the requirements of the General Data Protection Regulation (GDPR).  That working group is known as the GDPR Implementation Working Group (GIG).  One of the sub-groups within the GIG was tasked with developing guidance on consent as a legal basis for processing personal data. Out of that effort, an additional working group was formed to develop a technical solution to the challenge of obtaining and disseminating consumer consent to the various parties relying on it as a legal basis of processing personal data.

This mobile in-app specification is dependent on the following Transparency and Consent Framework;
- [CMP JS API v1.1](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md)
- [Consent String and Global Vendor List Format spec v1.1](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/Consent%20string%20and%20vendor%20list%20formats%20v1.1%20Final.md)


## About the Transparency & Consent Framework <a name="About-the-Framework"></a>

The scope of the technical working group?s initiative increased to include a technical industry solution to allow website operators to:
1.  Control the vendors they wish to allow to access their users? browsers (for setting and reading cookies) and process their personal data and disclose these choices to other parties in the online advertising ecosystem
2. Seek user consent under the ePrivacy Directive (for setting cookies or similar technical applications that access information on a device) and/or the GDPR in line with applicable legal requirements and signal the consent status through the online advertising ecosystem
 
In summary, have one place to go to:

* Understand privacy-related disclosures about those vendors

* Use those disclosures to make privacy-related disclosures to its users

* Disseminate the disclosure status through the online advertising ecosystem. 

The various pieces of the Framework are the following:

* A Global Vendor and CMP List (commonly referred to as the List)

* The technical specification for capturing, storing and retrieving user consent in the context of digital advertising

* Policy underlying the:

    * Disclosures to be made by vendors included on the List

    * Use of the List and the reference architecture

## About the Transparency & Consent Standard <a name="About-the-standard"></a>

Resources including policy FAQ, Global Vendor List Registration, and CMP registration can be found at [advertisingconsent.eu](http://advertisingconsent.eu/).

For purposes of this documentation, the following terms have the following definitions: 

* " **_CMP_** " or Consent Management Platform means a company that can read the to transmit information about which vendors and which purposes a user has consented to with vendors. The back end storage and retrieval components of a CMP is optional and also is not necessarily to be provided by the same company that surfaces the front end consent collection aspects of the CMP via a user interface to a user (although it can be the same).	

* " **_Purposes_** " mean the purposes for which a controller enabled by an online publisher is using personal data collected from,or received by a third party about an end user.

* " **_Vendor_** " means a third party that a publisher is using, directly or indirectly, in connection with surfacing content to its end users that either (1) accesses an end user?s device or browser; and/or (2) collects or receives personal data about the publisher?s end users. As such, a vendor need not be a controller.

## Scope of the document and definitions <a name="Scope"></a>

This document concentrates on defining a global Interface within an App, so that all partners of a publisher can easily access the consent information alongside an optimised  user experience where consent does not need to be requested more than once. Distinct from the website approach the transfer of consent is not part of this definition. This could be managed and implemented from the consent tool using an appropriate backend. A detailed description of how this could be seamlessly integrated with a publisher or an App or how the information should be displayed is out of scope for now. While not part of the In-App specification directly, we provide a recommendation about AdServer Macros, as they are in wide use in the mobile ecosystem, especially for tag-based demand. 

## License <a name="License"></a>

Copyright 2018 IAB Technology Laboratory

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Disclaimer <a name="Disclaimer"></a>

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE "PRODUCTS AND SERVICES") ARE PROVIDED "AS IS" AND "AS AVAILABLE," AND IAB TECHNOLOGY LABORATORY, INC. ("TECH LAB") MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.

## About IAB Tech Lab  <a name="About-Tech-Lab"></a>

The IAB Technology Laboratory ("Tech Lab") is a non-profit research and development consortium that produces and provides standards, software, and services to drive growth of an effective and sustainable global digital media ecosystem. Comprised of digital publishers and ad technology firms, as well as marketers, agencies, and other companies with interests in the interactive marketing arena, IAB Tech Lab aims to enable brand and media growth via a transparent, safe, effective supply chain, simpler and more consistent measurement, and better advertising experiences for consumers, with a focus on mobile and "TV"/digital video channel enablement. The IAB Tech Lab portfolio includes the DigiTrust real-time standardized identity service designed to improve the digital experience for consumers, publishers, advertisers, and third-party platforms. Board members include AppNexus, ExtremeReach, Google, GroupM, Hearst Digital Media, Integral Ad Science, Index Exchange, LinkedIn, MediaMath, Microsoft, Moat, Pandora, PubMatic, Quantcast, Telaria, The Trade Desk, and Yahoo! Japan. Established in 2014, the IAB Tech Lab is headquartered in New York City with an office in San Francisco and representation in Seattle and London.

Learn more about IAB Tech Lab here: [https://www.iabtechlab.com/](https://www.iabtechlab.com/)

## About IAB Europe <a name="About-IAB-Europe"></a>

IAB Europe is the voice of digital business and the leading European-level industry association for the interactive advertising ecosystem. Its mission is to promote the development of this innovative sector by shaping the regulatory environment, investing in research and education, and developing and facilitating the uptake of business standards.
 
Learn more about IAB Europe here: [https://www.iabeurope.eu/](https://www.iabeurope.eu/)

# Mobile In-App CMP API v1.0 <a name="v1.0"></a>

## What is supported by this API? <a name="supported"></a>

This API draft specifies the functionality that the Consent Management Provider (CMP) needs to provide publishers and third-party vendors with end user consent information, with particular reference to several SDKs being integrated into the same application of a publisher.

There?s a large potential surface area of publisher-CMP functionality (including UI control and configuration) specific to each CMP that is best provided by the CMP, rather than standardized in APIs. CMPs will provide a variety of additional APIs that will be feature based. This might include eventually functionality for transfering consent across apps or even publishers.

						

## How will a CMP fit into the regular flow within an App? <a name="flow"></a>

The flow for integrating a CMP into an app is the following:

1. Publisher to embed the CMP SDK and configure it to collect consent as needed. The exact setup how to call from a App side is specific to each CMP.

2. CMP to set IABConsent_CMPPresent as soon as it gets loaded in the app to notify everyone that a CMP is present. 

3. The CMP is to check if GDPR applies, e.g. based on location and / or additional Publisher Information and updates IABConsent_SubjectToGDPR accordingly.

4. A Publisher may choose to manually choose the timing of a needed consent request. The CMP will then set the other NSUserDefaults/SharedPreferences variables as needed and all vendors will be able to read from them directly.

5. Vendors can listen to IABConsent_ConsentString and reinitialize in case they need to.

## CMP Internal Structure (Defined API) <a name="structure"></a>

[NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc) (iOS) or [SharedPreferences](https://developer.android.com/training/data-storage/shared-preferences.html) (Android) will be used to store pre-parsed vendor & purpose consent information as well as the "consent string" by the CMP. It allows:

* Vendors to easily access consent information when they need to

* Consent information to be persisted across app sessions

* Consent information to be portable between CMPs to facilitate a publisher exchanging one CMP for another CMP implementation

* Pre-parsed consent will enable all typical use-cases without need for a consent string parser on the consumer side 

Here is the list of the preferences created by the CMP:

<table>
  <tr>
    <td>Key</td>
    <td>Values</td>
    <td>Comments</td>
  </tr>
  <tr>
    <td>IABConsent_CMPPresent</td>
    <td>Boolean (true)</td>
    <td>Set to true if a CMP implementing this specification is present in the application. Ideally set by the Publisher as soon as possible but can also be set by the CMP alternatively.</td>
  </tr>
  <tr>
    <td>IABConsent_SubjectToGDPR</td>
    <td>String
1 - (subject to GDPR), 
0 - (not subject to GDPR), 
Nil - undetermined (default before initialization)</td>
    <td>Aligns with IAB OpenRTB GDPR Advisory. 
Decided to be String, to have the uninitialized status. </td>
  </tr>
  <tr>
    <td>IABConsent_ConsentString</td>
    <td>Consent string as defined in "Cookie and vendor list format specification"</td>
    <td>Aligns with IAB OpenRTB GDPR Advisory </td>
  </tr>
  <tr>
    <td>IABConsent_ParsedPurposeConsents</td>
    <td>String (of "0" and "1") where the character in position N indicates the consent status to purpose ID N as defined in the Global Vendor List.</td>
    <td>String of consent given to enable simple checking. 
First character from the left being Purpose 1, ...</td>
  </tr>
  <tr>
    <td>IABConsent_ParsedVendorConsents</td>
    <td>String (of "0" and "1") where the character in position N indicates the consent status to vendor ID N as defined in the Global Vendor List.</td>
    <td>String of  consent given to enable simple checking. 
First character from the left being Vendor 1, ...
</td>
  </tr>
</table>


## How do third-party SDKs (Vendors) access the consent information? <a name="access"></a>

A vendor that needs to rely on certain purpose consent can easily check if the needed consents are available, using the pre-parsed keys: IABConsent_ParsedPurposeConsents and IABConsent_ParsedVendorConsents using the known Purposes and exact Vendor number. 

On both platforms, a third-party SDK can get notified when the values of the shared keys change. See [NSUserDefaultsDidChangeNotification](https://developer.apple.com/documentation/foundation/nsuserdefaultsdidchangenotification?language=objc) and [SharedPreferences.OnSharedPreferenceChangeListener](https://developer.android.com/reference/android/content/SharedPreferences.OnSharedPreferenceChangeListener.html).

On Android, the consent values should be stored in the default shared preferences for the application context. This can be accessed using the getDefaultSharedPreferences method from the android.preference.PreferenceManager class using the application context.

 

Example:

 
```
Context mContext = getApplicationContext();

SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(mContext);
```
 

The consent value can be retrieved from the application Shared preferences by key name using the "get" methods for the android.content.SharedPreferences class. For the purposes accessing consent information either the getString(String key, String defValue) or getBoolean(String key, boolean defValue) methods will be used.

 

Example:

 
```
Context mContext = getApplicationContext();

SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(mContext);

String consentString = mPreferences.getString("IABConsent_ConsentString", "");

Boolean cmpPresent = mPreferences.getBoolean("IABConsent_CMPPresent", false);
```
 

A callback can be registered to update settings when a preference is changed using the registerOnSharedPreferenceChangeListener method for the android.content.SharedPreferences class.

 

**Note**: The preference manager does not currently store a strong reference to the listener. If you do not store a strong reference, the listener will be susceptible to garbage collection. External guidance such as this [documentation on setting listeners](https://developer.android.com/guide/topics/ui/settings#Listening) may provide more information on listening for preference changes.

 

Example:

 
```
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

## How would ad mediation work? <a name="mediation"></a>

Mediation SDK allows app developers to monetize from multiple ad network SDKs. 

### Mediation SDK <a name="mediationSDK"></a>

* Mediation SDK retrieves IABConsent_SubjectToGDPR and IABConsent_ConsentString from NSUserDefaults (iOS) or SharedPreferences (Android).

* If IABConsent_SubjectToGDPR == 0, Mediation SDK can run mediation across all ad network SDKs

* If IABConsent_SubjectToGDPR == 1, Mediation SDK will run mediation only among the ad network SDKs that are GDPR ready. 

'GDPR ready' means that the ad network SDK retrieves IABConsent_SubjectToGDPR and IABConsent_ConsentString from NSUserDefaults (iOS) or SharedPreferences (Android), and passes on these GDPR values downstream.

### Ad Network SDK <a name="adnetworkSDK"></a>

* Ad Network SDK retrieves IABConsent_SubjectToGDPR and IABConsent_ConsentString from NSUserDefaults (iOS) or SharedPreferences (Android) and passes on these GDPR values downstream.

## How to make AdNetwork Tags work? <a name="adnetworktags"></a>

Tag Based Demand, especially AdNetwork Tags are basically creatives, that are not an advertisement themselves, but are accessing additional sources to provide an actual creative.

The preferred way to make this happen in current AdServers are macros for performance reasons. Thus the following two Macros are recommended to be implemented by all AdServers.

<table>
  <tr>
    <td>Macro</td>
    <td>Values</td>
    <td>Comments</td>
  </tr>
  <tr>
    <td>Macros suggested to be implemented by AdServers and used in Tags that are served as mediation</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>{gdpr}
</td>
    <td>1 (subject to GDPR), 0 (not subject to GDPR), unset (unknown)</td>
    <td>Aligns with IAB OpenRTB GDPR Advisory </td>
  </tr>
  <tr>
    <td>{gdpr_consent}</td>
    <td>Consent string</td>
    <td>Aligns with IAB OpenRTB GDPR Advisory </td>
  </tr>
</table>


## Version History <a name="versionhistory"></a>

V1.0 published for public comment May 2018

# Implementation Guidelines <a name="implementationguidelines"></a>

## Implementation Guide for CMPs

Required:

* CMPs should update their vendors.json (and cached publisher vendor lists if supported) from the IAB global vendor list as often as possible and not rely on a bundled offline version only

Recommended:

* Provide an off-line experience

* Provide a territory detection

* Provide a paper trail off-device storage for Publishers

* Provide a configurable URL for a publisher specific vendor list (pubvendor.json), if implemented 

    * Further discussion on publisher-specific vendor list will occur during the v1.0 public comment period.

Optional: 

* Provide an Age-Gate functionality for under-age users

* Offer an integrated "paid-app alternative" choosing method

## What will a publisher consent UX look like?

### Minimal requirements for a UX

Request initial consent:

At app start, before the user can access the app the GDPR consent UI should be shown. The UI should have at least the message as proposed by the IAB GDPR Framework policy, a way to grant consent (where necessary) and instructions where to go to revoke/change consent.

Revoke / change consent

A UI access (either in app or through settings/app (iOS)) that allows the user to revoke/change the consent using the same UI that the user was asked to provide consent in to begin with

Selecting purposes and access vendorlist

At least at the same location in the UI as for revoke and change, the purposes (specified by policy) and the vendor list (from GVL) should be surfaced and the user should be able to select consent by purpose or by vendor. (See the IAB provided Web sample UX for an example).

Building an audit track

The UX implementation should have all the UI components numbered and tracked in the consent string?s *ConsentString *bits and the used UX language stored in the consent string?s *ConsentLanguage* bits.

Other parties should adhere to these [Framework implementation guidelines](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/v1.1%20Implementation%20Guidelines.md) where applicable.




## Future Technical Considerations <a name="future"></a>
Known areas of future improvement include mobile support of pubvendors.json (see [mobile support for ads.txt](https://iabtechlab.com/wp-content/uploads/2018/06/IAB-Tech-Lab-Mobile-app-solution-for-ads.txt-Draft-for-public-comment_-FINAL6.4.pdf) for potential solution), enhanced securty of consent strings, and tracking with the at-large group for any additional Framework updates. 

