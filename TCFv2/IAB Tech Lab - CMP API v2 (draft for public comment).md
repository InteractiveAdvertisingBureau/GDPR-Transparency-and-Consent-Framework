## IAB Europe Transparency & Consent Framework

# Consent Management Platform API

**Draft for Public Comment April 25 2019**

**v2.0**

**Please submit any technical feedback to [transparencyframework@iabtechlab.com](transparencyframework@iabtechlab.com) by EOD May 25, 2019.**

## Table of Contents


[Version History](#versionhistory)

### [Introduction](#introduction)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[About the Transparency & Consent Framework](#abouttcf)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[License](#license)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Disclaimer](#disclaimer)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[About IAB Tech Lab](#iab)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[About IAB Europe](#iabeu)**<br>

### [CMP API v2.0](#cmpapiv2)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What does the CMP API support?](#cmpsupport)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How does the CMP provide the API?](#cmpprovide)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[API Documentation](#api-documentation)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[What required commands does the CMP API support?](#requiredcommands)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[getVendorConsents](#getvendorconsents)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ping](#ping)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[What optional commands does the CMP API support?](#optionalcommands)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[getInAppConsentData](#getinappconsent)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[getVendorList](#getvendorlist)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[What do the callback functions look like?](#whatdothecallbackfunctionslooklike)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[VendorConsentsCallback](#vendorconsentscallback)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[PingCallback](#pingcallback)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[InAppConsentDataCallback](#inappconsentdatacallback)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[GlobalVendorListCallback](#globalvendorlistcallback)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[What are the return data objects passed to the callbacks?](#returndata)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[VendorConsents](#vendorconsents)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[PingReturn](#pingreturn)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Ping Status Codes](#pingcodes)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[InAppConsentData](#inappconsent)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[In-App Details](#inapp)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[How is the CMP used in-app?](#cmpinapp)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[What is the CMP in-app internal structure for the defined API?](#inappstructure)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;&nbsp;&nbsp;&nbsp;How do third-party SDKs (Vendors) access the consent information in-app?](#vendoraccess)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[How does ad mediation work in-app?](#mediation)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Mediation SDK](#mediationsdk)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Vendor](#vendor)<br>

### [Using the CMP API](#usingcmp)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How do AdNetwork Tags work?](#tags)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How to handle the Version parameter of `__tcfapi()` function?](#version)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Details for vendors](#detailsforvendors)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[How can callers in-web determine if there is a CMP present?](#ifpresent)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[How can callers determine if the CMP script is loaded yet?](#isloaded)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[What is the sequence of the stub installation and loading of the CMP script?](#stubsequence)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Requirements for the CMP stub code](#stubrequirements)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Is there a sample CMP stub?](#stubsample)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How can vendors that use iframes call the CMP API from an iframe?](#iframes)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Via safeFrames](#safeframes)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Without safeFrames, using postMessage](#postmessage)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[From where will the API retrieve the TC String from?](#tcstringsource)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[How will the API prioritize the service-specific and the global configurations?](#prioritizing)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Major Changes from 1.1](#changes)**<br>



Version History <a name="versionhistory"></a>

Date | Version | Comments
------------ | ------------- | -------------
April 2019 | 2.0 | Released for public comment
April 2018 | 1.1 | First version released to the public



## Introduction <a name="introduction"></a>

This document is one of the IAB Europe Transparency and Consent Framework Specifications. It defines the API for Consent Management Providers (CMPs). The CMP API v2 is the interface a CMP provides for callers (web and in-app) to access information regarding the transparency and consent disclosed and obtained from the end user by the CMP. Both required functionality that the CMP must provide and optional features are described.

The General Data Protection Regulation (GDPR) requires a high level of accountability for how personal data is processed for users consuming content online or in-app. Specifically, GDPR requires a legal basis for such processing. Two of the legal bases described in the GDPR are the most relevant to organizations that operate in the digital advertising ecosystem. Such organizations need to either obtain consent from the user to process their personal data, or establish legitimate interests for processing data such that the interests and fundamental rights of the user are not overriding.

Under the GDPR, controllers are required to create and maintain records of compliance. While compliance is important, implementation came with heavy technical challenges. Clear standards for a common technical solution would be needed.

IAB Europe established the TCF to support compliance with the GDPR in the context of digital advertising. This framework is built on four components: a Global Vendor List (GVL), a Transparency and Consent String (TC String) to store data, an API for Consent Management Providers (CMPs) to create and process the TC String, and the Policies that govern how the TCF is used.

Prescribed use of the TCF establishes an audit trail to help maintain compliance with the GDPR, but the real benefit to the digital advertising ecosystem is a safer Internet for consumers, and more reliable data for brands and publishers. As adoption of the TCF increases, compliance becomes more scalable and data becomes more meaningful.

To participate in the use of the TCF, become familiar with the Policies for using it. To have transparency and consent established and signaled  for your online services, apply to be added to the GVL. To play a role in creating a TC String for signaling status on transparency and user consent, sign up with IAB Europe to become a CMP. CMPs must follow technical standards provided in this document for creating TC Strings in compliance with TCF Policies. They must also follow technical standards  for using the CMP API specified in this document to receive and process information provided in the TC String.


### About the Transparency & Consent Framework (TCF) <a name="abouttcf"></a>

IAB Europe Transparency & Consent Framework (Framework) has a simple objective to help all parties in the digital advertising chain ensure that they comply with the EU’s General Data Protection Regulation and ePrivacy Directive when processing personal data or accessing and/or storing information on a user’s device, such as cookies, advertising identifiers, device identifiers and other tracking technologies. IAB Tech Lab stewards the development of these technical specifications.

Resources including policy FAQ, Global Vendor List, and CMP List can be found at [iabeurope.eu/tcf](http://iabeurope.eu/tcf).


### License <a name="license"></a>

IAB Europe Transparency and Consent Framework technical specifications governed by the IAB Tech Lab is licensed under a Creative Commons Attribution 3.0 License.   To view a copy of this license, visit [creativecommons.org/licenses/by/3.0/](http://creativecommons.org/licenses/by/3.0/) or write to Creative Commons, 171 Second Street, Suite 300, San Francisco, CA 94105, USA.

![](https://camo.githubusercontent.com/1ff27c0c79d2341ccab9cc19089e67d1985b8228/68747470733a2f2f64726976652e676f6f676c652e636f6d2f75633f69643d3163627745476c6238533639536e6449446f486e7663355f3354666d6b474d3752)


### Disclaimer <a name="disclaimer"></a>

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE “PRODUCTS AND SERVICES”) ARE PROVIDED “AS IS” AND “AS AVAILABLE,” AND IAB TECHNOLOGY LABORATORY, INC. (“TECH LAB”) MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.


### About IAB Tech Lab <a name="iab"></a>

The IAB Technology Laboratory (Tech Lab) is a non-profit consortium that engages a member community globally to develop foundational technology and standards that enable growth and trust in the digital media ecosystem.. Comprised of digital publishers, ad technology firms, agencies, marketers, and other member companies, IAB Tech Lab focuses on improving the digital advertising supply chain, measurement, and consumer experiences, while promoting responsible use of data. Its work includes the OpenRTB real-time bidding protocol, ads.txt anti-fraud specification, Open Measurement SDK for viewability and verification, VAST video specification, and DigiTrust identity service. Board members include ExtremeReach, Facebook, Google, GroupM, Hearst Digital Media, Index Exchange, Integral Ad Science, LinkedIn, LiveRamp, MediaMath, Microsoft, Oracle Data Cloud, Pandora, PubMatic, Quantcast, Rakuten Marketing, Telaria, The Trade Desk, Verizon Media Group, Xandr, and Yahoo! Japan. Established in 2014, the IAB Tech Lab is headquartered in New York City with staff in San Francisco, Seattle, and London. Learn more at [iabtechlab.com](https://www.iabtechlab.com).


### About IAB Europe <a name="iabeu"></a>

IAB Europe is the leading European-level industry association for the digital advertising ecosystem. Its mission is to promote the development of this innovative sector and ensure its sustainability by shaping the regulatory environment, demonstrating the value digital advertising brings to Europe’s economy, to consumers and to the market, and developing and facilitating the uptake of harmonized business practices that take account of changing user expectations and enable digital brand advertising to scale in Europe.

Learn more about IAB Europe here: [iabeurope.eu](https://www.iabeurope.eu/).


## CMP API v2.0 <a name="cmpapiv2"></a>


### What does the CMP API support? <a name="cmpsupport"></a>

Consent Management Providers (CMPs) provide a user interface to establish transparency to users, and obtain consent or register objections from end users, and capture their preferences in Signals. These Signals are packaged in a standardized, easily-communicated payload called a TC String. The CMP API provides a standardized means for parties, such as the hosting publisher or an advertising vendor, to access these preferences managed by the CMP.

Using the API, callers may obtain the TC String payload as well as the information it contains, which is ready to use without having to understand how to "unpack" the payload format. This makes it easy to make immediate data processing decisions based on the returned information.

CMPs may provide proprietary interfaces for specialised features or capabilities. The design and operation of a proprietary interface is documented in the IAB Europe Transparency and Consent FramewWork Policies.

This document specifies required functionality that the CMP must provide in accordance with the IAB Europe Transparency and Consent Framework. Any CMP functionality, including a publisher CMP or any UI and configuration, are provided by a designated CMP and using this CMP API. Other standardized APIs fall outside the TCF and may not be aligned to TCF policies.


### How does the CMP provide the API? <a name="cmpprovide"></a>

Every consent manager MUST provide the following API function:

`__tcfapi( Command, Version, Callback[, Parameter] )`

The function `__tcfapi()` **must be a function** and cannot be any other JavaScript data type, even if only temporarily on initialization, as calls to the API will fail if `__tcfapi()` is not a function.

In addition to providing `__tcfapi()`, consent managers must handle postMessage events targeted to the `__tcfapi` interface sent from nested iframes. See the section on iframes for information on working with IAB SafeFrames.

## API Documentation
### What required commands does the CMP API support? <a name="requiredcommands"></a>

This API must support the following **required** functionality: [`getVendorConsents`](#getvendorconsents) and [`ping`](#ping).

---
### getVendorConsents <a name="getvendorconsents"></a>

**Command {`string`} [required]** - "getVendorConsents"

**Version {`number`} [required]** - API Version, should be 2 for this version

**Callback {[`VendorConsentsCallback`](#vendorconsentscallback)} [required]** - will be called:
1. immediately and without any asynchronous logic (e.g. promises) if the TC String is already present for the CMP or

2. only after the TC String has been created by the CMP (e.g. due to user interaction that made it possible for the CMP to create a new TC String).

**Parameter {`number[]`} [optional]** - contains the Vendor IDs (as identified in the [Global Vendor List](IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2%20(draft%20for%20public%20comment).md)) for which transparency and consent is being requested. If the value is null, undefined or the array is empty, the operation will return data for all Vendors in the Global Vendor List, unless gdprApplies equals false.

**NOTE** -- The consent and legitimate interest Signal will be returned false (“No Consent” and “No Legitimate Interest Transparency Established or User Objected”) for any invalid vendorId.

```javascript
const handleVendorConsents = (vendorConsents, success) => {
  if(success) {

  	console.dir(vendorConsents);
  } else {

    // Uh oh... something went wrong...
  }
}
__tcfapi("getVendorConsents", 2, handleVendorConsents, [2]);
```

---
### ping <a name="ping"></a>

**Command {`string`} [required]** - "ping"

**Version {`number`} [required]** - API Version, should be 2 for this version

**Callback {[`PingCallback`](#pingcallback)} [required]**( [`PingReturn`](#pingreturn) object, success:boolean)

The ping command invokes the callback immediately and without any asynchronous logic (e.g. promises) with information about whether the main CMP script has loaded yet and whether `gdprApplies` has been set to indicate that GDPR applies for all users or just for users in Europe. (This requires this command's implementation and its configuration to be in the stub).

```javascript
const handlePing = (PingReturn, success) => {
  if(success) {

  	console.dir(PingReturn);
  } else {

    // Uh oh... something went wrong...
  }
}
__tcfapi("ping", 2, handlePing);
```


### What optional commands does the CMP API support? <a name="optionalcommands"></a>

This API may support the following **optional** functionality: [`getInAppConsentData`](#getinappconsentdata) and [`getVendorList`](#getvendorlist).

---
### getInAppConsentData <a name="getinappconsent"></a>

**Command {`string`} [required]** - "getInAppConsentData"

**Version {`number`} [required]** - API Version, should be 2 for this version

**Callback {[`InAppConsentDataCallback`](#inappconsentdatacallback)} [required]**

When an in-app CMP leverages a mobile web view to gather consent, the cookies set by anything in the web view will only persist as long as that web view is open. Therefore, the native layer must manage the storage of the transparency and consent information as a JavaScript/Cookie-based solution will not work in this context.  This interface provides the native app running a web-view CMP an ability to retrieve the TCString by part in a unencoded binary string format so that it may both store and make decisions based on the information.

```javascript
const handleInAppConsentData = (inAppConsentData, success) => {
  if(success) {

  console.dir(inAppConsentData);
  } else {

    // Uh oh... something went wrong...
  }
};
__tcfapi("getInAppConsentData", 2, handleInAppConsentData);
```

---
### getVendorList <a name="getvendorlist"></a>

**Command {`string`} [required]** - "getVendorList"

**Version {`number`} [required]** - API Version, should be 2 for this version

**Callback {[`GlobalVendorListCallback`](#globalvendorlistcallback)} [required]** - called with the `GlobalVendorList` parameter being the global vendor list object of the requested version.

**Parameter {`number`} [optional]** - `vendorListVersion` (see: [Global Vendor List](IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2%20(draft%20for%20public%20comment).md))

- `number` - a [Global Vendor List Object](IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2%20(draft%20for%20public%20comment).md) will be returned matching that number provided that vendor list version exists.
- `null` or `undefined` - a [Global Vendor List Object](IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2%20(draft%20for%20public%20comment).md) will be returned with the same version in the current TC String.
- `"LATEST"` - a [Global Vendor List Object](IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2%20(draft%20for%20public%20comment).md) will be returned with the latest version available.
- `*` - anything else and `null` will be returned for the first argument and `false` for the `success` argument.
```javascript
const handleGVL = (gvl, success) => {
  if(success) {

    // do something
  } else {

  	// do something else
  }
};
__tcfapi("getVendorList", 2, handleGVL, "LATEST");
```

### What do the callback functions look like? <a name="returndata"></a>
---
### VendorConsentsCallback
This callback will be called with a [`VendorConsents`](#vendorconsents) object as the parameter. If `vendorIds` is provided as the `Parameter` for [`getVendorConsents`](#getvendorconsents) and not empty, then [`VendorConsents.vendorConsents`](#vendorconsents) will only include IDs from `vendorIds`.

**vendorConsents {[`VendorConsents`](#vendorconsents)}**

**success {`boolean`}** - whether or not the call succeeded

```javascript
const handleVendorConsents = (vendorConsents, success) => {
  if(success) {

    // do something
  } else {

  	// do something else
  }
};
```
---
### PingCallback

**pingReturn {[`PingReturn`](#pingreturn)}**

**success {`boolean`}** - whether or not the call succeeded

```javascript
const handlePing = (pingReturn, success) => {
  if(success) {

    // do something
  } else {

  	// do something else
  }
};
```
---
### InAppConsentDataCallback

**inAppConsentData {[`InAppConsentData`](#inappconsentdata-)}**

**success {`boolean`}** - whether or not the call succeeded

```javascript
const handleInAppConsentData = (inAppConsentData, success) => {
  if(success) {

    // do something
  } else {

  	// do something else
  }
};
```
---
### GlobalVendorListCallback

**globalVendorList {[`GlobalVendorList`](IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2%20(draft%20for%20public%20comment).md#example-global-vendor-list-json-object--1)}**

**success {`boolean`}** - whether or not the call succeeded

```javascript
const handleGVL = (gvl, success) => {
  if(success) {

    // do something
  } else {

  	// do something else
  }
};
```


### What are the return data objects passed to the callbacks? <a name="returndata"></a>

---

### VendorConsents <a name="vendorconsents"></a>

This object contains the Vendors and Purposes for which the user gave consent, as well as the Vvendors and Purposes for which legitimate interest transparency is established. In case when `gdprApplies` equals false, the CMP can omit the properties `purposeConsents`, `purposeLI`, `vendorConsents`, `vendorLI`, `featureAllowed` and restrictions.

In the case when `gdprApplies` equals true, these properties must be present and:



1. contain all purpose IDs and vendor IDs if the `getVendorConsents` command is called with an empty/null `vendorIds` parameter,
2. contain all purpose IDs but only vendor IDs that correspond to those given by the `vendorIds` parameter or,
3. these properties must be empty arrays if an invalid Vendor ID is submitted.

    ```javascript
    {

      // full TCString
      consentData: base64url-encoded string,

      gdprApplies: Boolean,

      // true if using a global TC string, false if using a service-specific or publisher-specific TC string
      hasGlobalScope: Boolean,

      useNonStandardStacks: Boolean,

      purposeConsents: {

        *purposeId*: *consentBoolean*,
        …
      },

      purposeLI: {

        *purposeId*: *liBoolean*,
        …
      },

      vendorConsents: {

        *vendorId* : *consentBoolean*,
        …
      },

      vendorLI: {

        *vendorId* : *liBoolean*,
        …
      },

      featureAllowed: {

        *featureID* : *featureBoolean*,
        …
      },

      restrictions: {

        *vendorId* : {

          // 0=Not established (disallowed); 1=Established for consent if vendor declared flexible legal basis; 2=Established for LI if vendor declared flexible legal basis.
         *purposeId* : *overrideType*,
         ...
        },
       ...
      }
    }
    ```


Where `vendorId` and `purposeId` are the keys; `consentBoolean` are the values for the consent (false=”No Consent”, true=”Consent”), and `liBoolean` are the values where legitimate interest is established (false=”No Legitimate Interest Established”, true=”Legitimate Interest Established”). The `gdprApplies` field will be true if the user is determined (by geo-IP lookup) to be in the EU, or the Publisher has configured the CMP (via a CMP-specific method not specified by this spec) that they are a EU Publisher and thus the CMP UI should be shown for everyone.



### PingReturn <a name="pingreturn"></a>

This object contains information about the loading status and configuration of the CMP.


```javascript
    {
      // true if publisher has configured CMP to apply GDPR to all (including non-EEA) visitors
      gdprAppliesGlobally: boolean,

      // true if CMP main script is loaded, false if still running stub
      cmpLoaded: boolean

      // see Ping Status Codes in following table
      cmpStatus: string

      // see Ping Status Codes in following table
      displayStatus: string

      // version of the CMP API that is supported, e.g. "2.0"
      apiVersion: string,

      // CMPs own/internal version that is currently running
      cmpVersion: string,

      // Version of the GVL currently loaded by the CMP.
      gvlVersion: number,

      // Number of the supported TCF version
      policyVersion: number
    }
```


Note that `cmpLoaded` must be set to true if the main script is loaded, even if the user has not interacted with the CMP yet.


#### Ping Status Codes <a name="pingcodes"></a>

Status code | Applicable for | Description
------------ | ------------- | -------------
stub     | cmpStatus     | CMP not yet started to load, the stub is still in place
loading  | cmpStatus     | CMP is loading
loaded   | cmpStatus     | CMP finished loading
error    | cmpStatus     | CMP detected an error
visible  | displayStatus | User interface is currently displayed
hidden   | displayStatus | User interface is not yet/no longer displayed
disabled | displayStatus | User interface will not show (e.g. non-EEA or consent already exists)




#### InAppConsentData <a name="inappconsent"></a>

This object contains the parsed binary string representations (“1010101”) of the following vectors:

*   Vendor Consents
*   Vendor Legitimate Interest Status
*   Purpose Consents
*   Purpose Legitimate Interest Status

As well as passing the `gdprApplies` flag and the whole TC String back.


```javascript
    {

      // Full base64url-encoded TC String
      consentData: "",


      // true if the user is determined (by geo-IP lookup) to be in the EEA, or the publisher has configured the CMP (via a CMP-specific method not specified by this spec) that they are a EU publisher and thus the CMP UI should be shown for everyone.
      gdprApplies: Boolean,


      // parsed vendor consents
      vendorConsents: "",

      // parsed vendor LI Status
      vendorLIStatus: "",

      // parsed purpose consents
      purposeConsents: "",

      // parsed purpose LI Status
      purposeLIStatus: "",

      // parsed publisher restrictions
      publisherRestrictions: "",

      // TCString checksum value
      checksum: "",

      // true if consent was provided using non-standard stacks
      usesNonStandardStacks: Boolean

  }
```



### In-App Details <a name="inapp"></a>

#### How is the CMP used in-app? <a name="cmpinapp"></a>

The flow for integrating a CMP into an app is the following:

1. Publisher to embed the CMP SDK and configure it to collect consent as needed. The exact setup how to call from an App side is specific to each CMP.
2. Since multiple CMPs may be shipped in publishers' linked SDKs, the publisher must initialize a single CMP. The initialized CMP to set `IABConsent_CMPPresent` as soon as it gets loaded in the app to notify everyone that a CMP is present.
3. The publisher asks the CMP is to check if GDPR applies, e.g. based on location and / or additional Publisher Information and updates `IABConsent_SubjectToGDPR` accordingly.
4. A Publisher may choose to manually choose the timing of a needed consent request. The CMP will then set the other NSUserDefaults/SharedPreferences variables as needed and all vendors will be able to read from them directly.
5. Vendors should listen to `IABConsent_*` key updates and handle updated consent information.


#### What is the CMP in-app internal structure for the defined API? <a name="inappstructure"></a>

[NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc) (iOS) or [SharedPreferences](https://developer.android.com/training/data-storage/shared-preferences.html) (Android) will be used to store pre-parsed vendor & purpose consent information as well as the “consent string” by the CMP. It allows:

*   Vendors to easily access consent information when they need to
*   Consent information to be persisted across app sessions
*   Consent information to be portable between CMPs to facilitate a publisher exchanging one CMP for another CMP implementation
*   Pre-parsed consent will enable all typical use-cases without need for a consent string parser on the consumer side
*   Known issue: the `IABConsent_` key/value pairs CMPs are inactive/removed from the application. Publishers must include code to wipe out `IABConsent_` key/value pairs when they no longer use a CMP. Another option is to add last updated or last initialized preference to shared prefs. If no CMP has been initialized within X hours/days/weeks(?) vendors should ignore the `IABConsent_` information. Note that client side timestamps are unreliable as they are controlled by users.

Key          | Values        | Comments
------------ | ------------- | -------------
IABConsent_CmpSdkID | String | The ID of CMP SDK.
IABConsent_CmpSdkVersion | String | The version number of CMP SDK.
IABConsent_PolicyVersion | Number | Version of the TCF that these consents adhere to.  Important to differentiate since purposes, especially, have different meanings between versions.
IABConsent_gdprApplies | String <br> 1 - (GDPR applies in current situation),<br>0 - (GDPR does not apply in current situation),<br>Unset - undetermined (default before initialization) | Aligns with IAB OpenRTB GDPR Advisory. <br><br> Value is a String so that value can include the default uninitialized status.
IABConsent_gdprAppliesGlobally | String <br> 1 - (GDPR applies globally), <br> 0 - (GDPR does not apply globally), <br> Unset - undetermined (default before initialization) | Aligns with IAB OpenRTB GDPR Advisory. <br><br> Value is a String so that value can include the default uninitialized status.
IABConsent_TCString | Consent string as defined in [“Cookie and vendor list format specification"](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework) | Aligns with IAB OpenRTB GDPR Advisory
IABConsent_ParsedPurposeConsents | String (of “0” and “1”) where the character in position N indicates the consent status to purpose ID N as defined in the [Global Vendor List](https://vendorlist.consensu.org/vendorlist.json). | String of consent given to enable simple checking. <br> First character from the left being Purpose 1, ...
IABConsent_ParsedVendorConsents | String (of “0” and “1”) where the character in position N indicates the consent status to vendor ID N as defined in the [Global Vendor List](https://vendorlist.consensu.org/vendorlist.json). | String of consent given to enable simple checking. <br> First character from the left being Vendor 1, ...
IABConsent_ParsedPurposeliEstablished | String (of “0” and “1”) where the character in position N indicates the legitimate interest establishes for purpose ID N as defined in the [Global Vendor List](https://vendorlist.consensu.org/vendorlist.json). | String of legitimate interest established per purpose given to enable simple checking. <br><br> First character from the left being legitimate interest established for Purpose 1, ...
IABConsent_ParsedVendorliEstablished | String (of “0” and “1”) where the character in position N indicates the legitimate interest establishes for vendor ID N as defined in the [Global Vendor List](https://vendorlist.consensu.org/vendorlist.json). | String of legitimate interest established per vendor given to enable simple checking. <br><br> First character from the left being legitimate interest established for Vendor 1, ...
IABConsent_SpecialFeaturesOptIn | String (of “0” and “1”) where the character in position N indicates the opt-in status for special feature ID N as defined in the [Global Vendor List](https://vendorlist.consensu.org/vendorlist.json). | String of user opt-in status for special features given to enable simple checking. <br><br> First character from the left being opt-in status for Special Feature 1, ...
IABConsent_Checksum | String, value of checksum | The value of the TC String checksum used for an initial check on whether the TC String is valid.
IABConsent_PublisherRestrictions{ID} | Array (of “0” and “1” and “2” per ID) where ID is indicates a publisher restriction ID and the character in position N indicates the restriction state for vendor ID N as defined in the [Global Vendor List](https://vendorlist.consensu.org/vendorlist.json). | Array of publisher restrictions and the state of each restriction for vendors given to enable simple checking. <br><br> First character to the left for each restriction in the array being the restriction state for Vendor 1, ...
IABConsent_UseNonStandardStacks | String (of “0” and “1”) where the character in position N indicates the use of non-standard stacks for vendor ID N as defined in the [Global Vendor List](https://vendorlist.consensu.org/vendorlist.json). | String indicating the use of non-standard stacks for vendors. <br><br> First character from the left being the use status of non-standard stacks for Vendor 1, ...



#### How do third-party SDKs (vendors) access the consent information in-app? <a name="vendoraccess"></a>

A vendor that needs to rely on certain purpose consent can easily check if the needed consents are available, using the pre-parsed keys: `IABConsent_ParsedPurposeConsents` and `IABConsent_ParsedVendorConsents` using the known Purposes and exact Vendor number.

On both platforms, the vendor can get notified when the values of the shared keys change. See [NSUserDefaultsDidChangeNotification](https://developer.apple.com/documentation/foundation/nsuserdefaultsdidchangenotification?language=objc) and [SharedPreferences.OnSharedPreferenceChangeListener](https://developer.android.com/reference/android/content/SharedPreferences.OnSharedPreferenceChangeListener.html).

On Android, the consent values should be stored in the default shared preferences for the application context. This can be accessed using the `getDefaultSharedPreferences` method from the `android.preference.PreferenceManager` class using the application context.



Example:

```swift
Context mContext = getApplicationContext();
SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(mContext);
```




The consent value can be retrieved from the application Shared preferences by key name using the "get" methods for the `android.content.SharedPreferences` class. For the purposes accessing consent information either the `getString(String key, String defValue)` or `getBoolean(String key, boolean defValue)` methods will be used.



Example:

```swift
Context mContext = getApplicationContext();
SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(mContext);
String consentString = mPreferences.getString("IABConsent_tcString", "");
Boolean cmpPresent = mPreferences.getBoolean("IABConsent_CMPPresent", false);
```




A callback can be registered to update settings when a preference is changed using the `registerOnSharedPreferenceChangeListener` method for the `android.content.SharedPreferences` class.



**Note**: The preference manager does not currently store a strong reference to the listener. If you do not store a strong reference, the listener will be susceptible to garbage collection. External guidance such as this [documentation on setting listeners](https://developer.android.com/guide/topics/ui/settings#Listening) may provide more information on listening for preference changes.



Example:

```swift
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



#### How does ad mediation work in-app? <a name="mediation"></a>

Mediation SDK allows app developers to monetize from multiple vendors.


##### Mediation SDK <a name="mediationsdk"></a>

*   Mediation SDK retrieves `IABConsent_gdprApplies`  and `IABConsent_tcString` from `NSUserDefaults` (iOS) or `SharedPreferences` (Android).
*   If `IABConsent_gdprApplies == 0`, Mediation SDK can run mediation across all ad network SDKs
*   If `IABConsent_gdprApplies == 1`, Mediation SDK will run mediation only among the ad network SDKs that are GDPR ready.

'GDPR ready' means that the vendor retrieves `IABConsent_gdprApplies` and `IABConsent_tcString` from `NSUserDefaults` (iOS) or `SharedPreferences` (Android), and passes on these GDPR values downstream.


##### Vendor <a name="vendor"></a>

*   Vendor retrieves `IABConsent_gdprApplies` and `IABConsent_tcString` from `NSUserDefaults` (iOS) or `SharedPreferences` (Android) and passes on these GDPR values downstream.


## Using the CMP API <a name="usingcmp"></a>

The following details provide information about how ad tags work, using the version parameter in the `__tcfapi()` function, and how vendors can interact with the API.


### How do ad tags work? <a name="tags"></a>

Tag-based demand, especially ad tags, are basically creative files, that are not an advertisement themselves, but are loaded to access additional sources to provide ad creative.

For performance reasons, the preferred way to make this happen in current ad servers are macros. The following two macros the recommendation for ad server implementation:


Macro          | Values         | Comments
-------------- | -------------- | -------------
{gdpr}         | 1 (GDPR Applies), 0 (GDPR does not apply), unset (unknown)         | Aligns with IAB OpenRTB GDPR Advisory
{gdpr_consent} | Consent string | Aligns with IAB OpenRTB GDPR Advisory



### How to handle the Version parameter of `__tcfapi()` function? <a name="version"></a>

The `__tcfapi()` function contains a third parameter called `Version`. This parameter is used in order to distinguish between different versions of existing consent information, such as when there is a version change and two cookies are present for a user.

If the parameter is 0 (Zero) or null, the CMP should return the information for the latest (highest) version present. For example, when a user has a v2 cookie and a v3 cookie, the CMP should return the v3 TC string and consent information.

If the parameter is 1, the CMP should return with success=false, as this TCF version is no longer supported by the v2 API (vendors should query the `__cmp()` API instead in order to get v1 consent information).

If the parameter is an integer higher than 1, the CMP should return with consent information according to this version. This includes the TC Strings, consent data as well as the naming, behavior/logic and contents of the returned objects (e.g. in case new properties are added in v3, a v2 call should not return these new properties).


### Details for vendors <a name="detailsforvendors"></a>


### How can callers in-web determine if there is a CMP present? <a name="ispresent"></a>

In-frame callers can check for the presence of a function named `__tcfapi`. For callers in iframes, the CMP can be determined by the presence of a specially-named child frame named "`__tcfapiLocator`" in the parent (or above) frame. The CMP tag creates an iframe named "`__tcfapiLocator`" on its frame to indicate its presence. Publishers should load the CMP in a parent (or ancestor) of all iframes that may need to request consent.

If a CMP is not present, or if the CMP fails to respond, vendors should assume "no consent" and “no legitimate interest transparency established” for users located in the EU (via geoIP lookup). A reasonable timeout on the "ping" command not returning `cmpLoaded=true` should be implemented by consent-requesters, however, note that the `getConsent` calls can take a long time to be called-back, since they do not return until consent is obtained from the user or the pre-set cookies.


#### How can callers determine if the CMP script is loaded yet? <a name="isloaded"></a>

Typically, code will not need to check if the CMP script is loaded. Code can simply call the `__tcfapi` function: if the stub is still active, it will queue the calls for execution when the full CMP script is loaded; if the full CMP has been loaded, its `__tcfapi` implementation will handle the call normally. If necessary, the "ping" command will immediately return whether or not the CMP script is loaded.


#### What is the sequence of the stub installation and loading of the CMP script? <a name="stubsequence"></a>


1. A CMP tag will be added by the publisher to the header of their page.
2. This tag will:
    1. Define a stub function `__tcfapi`, which stores the parameters to calls made to this stub and stores them.
    2. Define the stub postMessage handler for cross-origin iframe requests.
    3. Load the CMP script via an async javascript load
    4. Create an iframe child named "`__tcfapiLocator`"
    5. Install a postMessage handler
3. When the CMP script loads, it will:
    6. Set the `__tcfapi` function to the CMP’s full API implementation.
    7. Replace the stub’s postMessage handler with the full CMP handler.
    8. Run any queued calls using the parameters stored by the stub, in the order received.


#### Requirements for the CMP stub code <a name="stubrequirements"></a>

A CMP must provide a stub code to its clients that at least supports the following features/logic:



1. `__tcfapi` function that supports ping command (with minimum properties `gdprAppliesGlobally`, `cmpLoaded` and `apiVersion`)
2. Collect all calls to `__tcfapi` that cannot (yet) be handled by the stub
3. Check if `__tcfapiLocator` frame is present, otherwise create an empty iframe with name `__tcfapiLocator`
4. Create an event listener for postMessage events, receive those calls, pass them to the `__tcfapi` function and pass the response from the callback function back to the event source.


#### Is there a sample CMP stub? <a name="stubsample"></a>

This code should be as close-to-top as possible in the header. The tag also includes the postMessage handler


[as described below.]()  In the snippet provided by a CMP to the Publisher, the CMP must replace the value of the `gdprAppliesGlobally` variable with the value as determined by the Publisher in the CMP’s publisher configuration.  Additionally, it is recommended that the CMP provides a minified version of the snippet to publishers.

If immutable-version URLs are used for cmp.js, [a subresource integrity attribute](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) should be provided by the CMP and used.


```javascript
<script type="text/javascript" src="https://my-cmp.mgr.consensu.org/cmp.js" async="true"></script>

<script type="text/javascript">

  (function() {

    const gdprAppliesGlobally = false;

    function addFrame() {

      if (!window.frames['__tcfapiLocator']) {

        if (document.body) {

          const iframe = document.createElement('iframe');

          iframe.style.cssText = 'display:none';
          iframe.name = '__tcfapiLocator';
          document.body.appendChild(iframe);

        } else {

          // In the case where this stub is located in the head,
          // this allows us to inject the iframe more quickly than
          // relying on DOMContentLoaded or other events.
          setTimeout(addFrame, 5);

        }

      }

    }
    addFrame();

    function stubCMP() {

      const b = arguments;

      __tcfapi.a = __tcfapi.a || [];

      if (!b.length) {

        return __tcfapi.a;

      } else if (b[0] === 'ping' && b.length>1) {

        const r = {'gdprAppliesGlobally': gdprAppliesGlobally,
                   "cmpLoaded": false, 'apiVersion': '2.0'};

        b[2](r, true);
        return r;

      } else {

        __tcfapi.a.push([].slice.apply(b));
        return true;

      }

    }

    function cmpMsgHandler(event) {

      const msgIsString = typeof event.data === 'string';

      try {

        var json = msgIsString ? JSON.parse(event.data) : event.data;

      } catch (e) {

        var json = Object();

        /* optional error handling */}
      if (json.__tcfapiCall) {

        const i = json.__tcfapiCall;

        window.__tcfapi(i.command, i.parameter, i.version, function(retValue, success) {

          const returnMsg = {'__tcfapiReturn': {
            'returnValue': retValue,
            'success': success,
              'callId': i.callId,
          }};

          event.source.postMessage(msgIsString ?
            JSON.stringify(returnMsg) : returnMsg, '*');

        });

      }

    }

    if (typeof (__tcfapi) !== 'function') {

      window.__tcfapi = stubCMP;
      __tcfapi.msgHandler = cmpMsgHandler;

      window.addEventListener('message', cmpMsgHandler, false);

    }

  })();

</script>
```
minfied:

```javascript
<script type="text/javascript" src="https://my-cmp.mgr.consensu.org/cmp.js" async="true"></script>

<script type="text/javascript">
!function(){const t=!1;function a(t){const a="string"==typeof t.data;try{var e=a?JSON.parse(t.data):t.data}catch(t){e=Object()}if(e.__tcfapiCall){const n=e.__tcfapiCall;window.__tcfapi(n.command,n.parameter,n.version,function(e,c){const i={__tcfapiReturn:{returnValue:e,success:c,callId:n.callId}};t.source.postMessage(a?JSON.stringify(i):i,"*")})}}!function t(){if(!window.frames.__tcfapiLocator)if(document.body){const t=document.createElement("iframe");t.style.cssText="display:none",t.name="__tcfapiLocator",document.body.appendChild(t)}else setTimeout(t,5)}(),"function"!=typeof __tcfapi&&(window.__tcfapi=function(){const a=arguments;if(__tcfapi.a=__tcfapi.a||[],a.length){if("ping"===a[0]&&a.length>1){const e={gdprAppliesGlobally:t,cmpLoaded:!1,apiVersion:"2.0"};return a[2](e,!0),e}return __tcfapi.a.push([].slice.apply(a)),!0}return __tcfapi.a},__tcfapi.msgHandler=a,window.addEventListener("message",a,!1))}();
</script>
```



### How can vendors that use iframes call the CMP API from an iframe? <a name="iframes"></a>

Two methods are available, depending on whether the publisher implements IAB safeFrames.


#### Via safeFrames <a name="safeframes"></a>

safeFrame can be used to proxy calls to `__tcfapi()`. No changes are required for the CMP or Vendor. SafeFrame implementation should either allow post messages, or if blocking, implement a proxy from a local (to the sandbox) `__tcfapi()` method that internally uses the safeFrame messaging protocol to talk with the real `__tcfapi()` method on the publisher main frame and report back, transparently to the sandbox caller of the proxy `__tcfapi()`.

If allowing postMessage, no change in the implementation is required. Vendors will use the postMessage method described below.

If blocking postMessage, and implementing the proxy, vendors will see a local to the sandboxed iframe scope `__tcfapi()` method that must behave the same as the asynchronous CMP `__tcfapi()` method on the main publisher frame.


#### Without safeFrames, using postMessage <a name="postmessage"></a>

The [postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)</code> function can be used from an iframe to send calls to a parent's (or ancestor's) frame's `__tcfapi()` function. The frame to send the `postMessage` to can be determined by the ancestor with a `.frames["__tcfapiLocator"]` child iframe present.

CMP tags will install an event handler to call `__tcfapi()` for `postMessage` events, returning the data via a `postMessage` event. This is included as part of the [publisher-included tag above](), so that `postMessage` events can be handled as early as possible.

**Sent Message**

The sent message should have the below form where "*command*" and *parameter* are the same as the first two parameters to the `__tcfapi()` function, and a unique `callId` value:


```javascript
{
  __tcfapiCall:{
    command: "command",
    parameter: parameter,
    version: version,
    callId: uniqueId
  }
}
```

and the returned message (`event.data`) will have the below form where `returnValue` and `success` are the two parameters passed to the callback function, and the same value of `callId` that was sent:


```javascript
{
  __tcfapiReturn:{
    returnValue: returnValue,
    success: boolean,
    callId: uniqueId
  }
}
```


**Wrapper Function**

Below is a wrapper function that emulates the in-frame `__tcfapi()` call. It locates the ancestor frame running the CMP, performs the `postMessage` and listens for the return message and passes its values to the callback:


```javascript
// find the CMP frame
let win = window;
let cmpFrame;

while (!cmpFrame && win !== win.top) {


  if (win.frames['__tcfapiLocator']) {

    cmpFrame = win;

  }

  win = win.parent;

}

const cmpCallbacks = {};

/**
 * Set up a __tcfapi function to do the postMessage and stash the callback.
 * This function behaves (from the caller's perspective) identically to the
 * in-frame __tcfapi call
 */
win.__tcfapi = (cmd, arg, version, callback) => {

  if (!cmpFrame) {

    callback({msg: 'CMP not found'}, false);
    return;

  }
  const callId = Math.random() + '';
  const msg = {
  __tcfapiCall: {
      command: cmd,
      parameter: arg,
      version: version,
      callId: callId,
    }
  };

  cmpCallbacks[callId] = callback;
  cmpFrame.postMessage(msg, '*');

};

/*
 * when we get the return message, call the stashed callback
 */
win.addEventListener('message', (event) => {

  // wrap in a try catch because of the JSON.parse
  try {

    const json = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    const response = json.__tcfapiReturn;

    if (response) {

      cmpCallbacks[response.callId](i.returnValue, response.success);
      delete cmpCallbacks[response.callId];

    }

  } catch (parseError) {

    // if there are any odd postMessages we'll ignore them
  }

}, false);

/*
 * example call of the above __tcfapi wrapper function
 */
__tcfapi('ping', 2, (val, success) => {

  console.log('val=', val, ' success=', success);

});
```



### From where will the API retrieve the TC String? <a name="tcstringsource"></a>

See the ‘How should the transparency & consent string be stored?’ section in the ‘Transparency & Consent String and Global Vendor List Format’ spec which describes where CMPs must store the transparency & consent string.


### How will the API prioritize the service-specific and the global configurations? <a name="prioritization"></a>

The service-specific TC String will override the global TC String, if it is being used. The prioritization between these two scenarios is as specified in the policy FAQ. ***[Note for public comment: Policy FAQ document and URL to be updated for final release of version 2]***


### Major Changes from 1.1 <a name="changes"></a>



1. Added `getInAppConsentData`
2. Added properties to ping return object
3. Changes to getVendorConsents return object
4. Renamed `__cmp` to `__tcfapi`
5. Renamed all `__cmp` to `__tcfapi` (e.g. `__cmpLocator` is now `__tcfapiLocator`)
6. Removed `getConsentData` and `getPublisherConsents` commands
7. Added in-app API details throughout where applicable# New Document
