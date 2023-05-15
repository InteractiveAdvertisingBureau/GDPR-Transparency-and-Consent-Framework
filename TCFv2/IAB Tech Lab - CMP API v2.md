![iab tech lab](https://user-images.githubusercontent.com/19175352/38649177-0d37d17c-3daa-11e8-8934-f0fb47919716.png)
# Consent Management Platform API
**IAB Europe Transparency & Consent Framework**

**Final v.2.2 May 2023**

- [Version History](#version-history)
- [Introduction](#introduction)
  - [About the Transparency & Consent Framework](#about-the-transparency--consent-framework)
  - [License](#license)
  - [Disclaimer](#disclaimer)
  - [About IAB Tech Lab](#about-iab-tech-lab)
  - [About IAB Europe](#about-iab-europe)
- [CMP API v2.0](#cmp-api-v20)
  - [What does the CMP API support?](#what-does-the-cmp-api-support)
  - [What is the Global Vendor List?](#what-is-the-global-vendor-list)
  - [How does the CMP provide the API?](#how-does-the-cmp-provide-the-api)
  - [What required API commands must a CMP support?](#what-required-api-commands-must-a-cmp-support)
    - [`getTCData`](#gettcdata)
    - [`ping`](#ping)
    - [`addEventListener`](#addeventlistener)
    - [`removeEventListener`](#removeeventlistener)
  - [What optional API commands might a CMP support?](#what-optional-api-commands-might-a-cmp-support)
    - [`getInAppTCData`](#getinapptcdata)
    - [`getVendorList`](#getvendorlist)
  - [What objects are returned from the API?](#what-objects-are-returned-from-the-api)
    - [`TCData`](#tcdata)
    - [`PingReturn`](#pingreturn)
      - [Ping Status Codes](#ping-status-codes)
    - [`InAppTCData`](#inapptcdata)
  - [In-App Details](#in-app-details)
    - [How is a CMP used in-app?](#how-is-a-cmp-used-in-app)
    - [What is the CMP in-app internal structure for the defined API?](#what-is-the-cmp-in-app-internal-structure-for-the-defined-api)
    - [How do third-party SDKs (vendors) access the consent information in-app?](#how-do-third-party-sdks-vendors-access-the-consent-information-in-app)
    - [How does ad mediation work in-app?](#how-does-ad-mediation-work-in-app)
      - [Mediation SDK](#mediation-sdk)
      - [Vendor](#vendor)
- [Using the CMP API](#using-the-cmp-api)
  - [How do ad tags work?](#how-do-ad-tags-work)
  - [How does the "version" parameter work?](#how-does-the-version-parameter-work)
  - [What does the gdprApplies value mean?](#what-does-the-gdprapplies-value-mean)
  - [Details for vendors](#details-for-vendors)
    - [How can scripts on a page determine if there is a CMP present?](#how-can-scripts-on-a-page-determine-if-there-is-a-cmp-present)
    - [How can scripts determine if the CMP script is loaded yet?](#how-can-scripts-determine-if-the-cmp-script-is-loaded-yet)
    - [How does the CMP “stub” API work?](#how-does-the-cmp-stub-api-work)
    - [Requirements for the CMP “stub” API script](#requirements-for-the-cmp-stub-api-script)
    - [Is there a sample CMP “stub” API script?](#is-there-a-sample-cmp-stub-api-script)
  - [How can vendors that use iframes call the CMP API from an iframe?](#how-can-vendors-that-use-iframes-call-the-cmp-api-from-an-iframe)
    - [Using postmessage](#using-postmessage)
    - [Is there a sample iframe script call to the CMP API?](#is-there-a-sample-iframe-script-call-to-the-cmp-api)
  - [From where will the API retrieve the TC string?](#from-where-will-the-api-retrieve-the-tc-string)
  - [Major Changes from 2.0](#major-changes-from-20)
  - [Major Changes from 1.1](#major-changes-from-11)

## Version History

| Date | Version | Comments |
| :-- | :-- | :-- |
| May 2023 | 2.2 | Update to further strengthen the TCF as a standard in the industry: Deprecated API command "getTCData".
| September 2021 | 2.0 | Deprecation of Global Scope and OOB |
| February 2020 | 2.0 | Removed CMP List; added included in the Consent String and Vendor List Specification |
| February 2020 | 2.0 | Updated stub example to reference open-source library, change addEventListener/removeEventListener interface, clarify addEventListener callback invocation time, and remove SafeFrame proxy communications |
| December 2019 | 2.0 | Updated with reference to CMP List, Updated macros to be upper case, Added cmpStatus to be surfaced in both the API calls and the TCData object, and fixed case in a reference to IABTCF_CmpSdkID |
| August 2019 | 2.0 | Final version released for adoption |
| April 2019 | 2.0 | Released for public comment |
| April 2018 | 1.1 | First version released to the public |


## Introduction

This document is one of the IAB Europe Transparency and Consent Framework (TCF) Specifications. It defines the API for Consent Management Providers (CMPs). The CMP API v2 is the interface a CMP provides for callers (web and in-app) to access information regarding the transparency and consent disclosed and obtained from the end user by the CMP. Both required functionality that the CMP must provide and optional features are described.

The General Data Protection Regulation (GDPR) requires a high level of accountability for how personal data is processed for users consuming content online or in-app. Specifically, GDPR requires a legal basis for such processing. Two of the legal bases described in the GDPR are the most relevant to organizations that operate in the digital advertising ecosystem. Such organizations need to either obtain consent from the user to process their personal data, or establish legitimate interests for processing data such that the interests and fundamental rights of the user are not overriding.

Under the GDPR, controllers are required to create and maintain records of compliance. While compliance is important, implementation came with heavy technical challenges. Clear standards for a common technical solution would be needed.

IAB Europe established the TCF to support compliance with the GDPR in the context of digital advertising. This framework is built on four components: a Global Vendor List (GVL), a Transparency and Consent String (TC String) to store data, an API for CMPs to create and process the TC String, and the Policies that govern how the TCF is used.

Prescribed use of the TCF establishes an audit trail to help maintain compliance with the GDPR, but the real benefit to the digital advertising ecosystem is a safer Internet for consumers, and more reliable data for brands and publishers. As adoption of the TCF increases, compliance becomes more scalable and data becomes more meaningful.

To participate in the use of the TCF, become familiar with the Policies for using it. To have transparency and consent established and signaled  for your online services, apply to be added to the GVL. To play a role in creating a TC String for signaling status on transparency and user consent, sign up with IAB Europe to become a CMP. CMPs must follow technical standards provided in this document for creating TC Strings in compliance with [TCF Policy](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/). They must also follow technical standards  for using the CMP API specified in this document to receive and process information provided in the TC String.

### About the Transparency & Consent Framework

IAB Europe Transparency & Consent Framework (TCF) has a simple objective to help all parties in the digital advertising chain ensure that they comply with the EU’s General Data Protection Regulation and ePrivacy Directive when processing personal data or accessing and/or storing information on a user’s device, such as cookies, advertising identifiers, device identifiers and other tracking technologies. IAB Tech Lab stewards the development of these technical specifications.

Resources including policy FAQ, Global Vendor List, and CMP List can be found at [iabeurope.eu/tcf](http://iabeurope.eu/tcf).

### License

IAB Europe Transparency and Consent Framework technical specifications governed by the IAB Tech Lab is licensed under a Creative Commons Attribution 3.0 License.   To view a copy of this license, visit[ creativecommons.org/licenses/by/3.0/](http://creativecommons.org/licenses/by/3.0/) or write to Creative Commons, 171 Second Street, Suite 300, San Francisco, CA 94105, USA.

![](https://drive.google.com/uc?id=1cbwEGlb8S69SndIDoHnvc5_3TfmkGM7R)

### Disclaimer

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE “PRODUCTS AND SERVICES”) ARE PROVIDED “AS IS” AND “AS AVAILABLE,” AND IAB TECHNOLOGY LABORATORY, INC. (“TECH LAB”) MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.

### About IAB Tech Lab

The IAB Technology Laboratory (Tech Lab) is a non-profit consortium that engages a member community globally to develop foundational technology and standards that enable growth and trust in the digital media ecosystem.. Comprised of digital publishers, ad technology firms, agencies, marketers, and other member companies, IAB Tech Lab focuses on improving the digital advertising supply chain, measurement, and consumer experiences, while promoting responsible use of data. Its work includes the OpenRTB real-time bidding protocol, ads.txt anti-fraud specification, Open Measurement SDK for viewability and verification, VAST video specification, and DigiTrust identity service. Board members include ExtremeReach, Facebook, Google, GroupM, Hearst Digital Media, Index Exchange, Integral Ad Science, LinkedIn, LiveRamp, MediaMath, Microsoft, Oracle Data Cloud, Pandora, PubMatic, Quantcast, Rakuten Marketing, Telaria, The Trade Desk, Verizon Media Group, Xandr, and Yahoo! Japan. Established in 2014, the IAB Tech Lab is headquartered in New York City with staff in San Francisco, Seattle, and London. Learn more at [iabtechlab.com](https://www.iabtechlab.com).

### About IAB Europe

IAB Europe is the European-level association for the digital marketing and advertising ecosystem. Through its membership of National IABs and media, technology and marketing companies, its mission is to lead political representation and promote industry collaboration to deliver frameworks, standards and industry programmes that enable business to thrive in the European market.

Learn more about IAB Europe here: [iabeurope.eu/](https://www.iabeurope.eu/)

## CMP API v2.0

### What does the CMP API support?

Consent Management Providers (CMPs) provide a user interface to establish transparency to users, and obtain consent or register objections from end users, and capture their preferences in Signals. These Signals are packaged in a standardized, easily-communicated payload called a TC String. The CMP API provides a standardized means for parties, such as the hosting publisher or an advertising vendor, to access these preferences managed by the CMP.

Using the API, scripts may obtain the TC String payload as well as the information it contains, which is ready to use without having to understand how to "unpack" the payload format. This makes it easy to make immediate data processing decisions based on the returned information.

CMPs may provide proprietary interfaces for specialised features or capabilities. The design and operation of a proprietary interface is documented in the IAB Europe Transparency and Consent Framework Policies.

This document specifies required functionality that the CMP must provide in accordance with the TCF. Any CMP functionality, including a publisher CMP or any UI and configuration, are provided by a designated CMP and using this CMP API. Other standardized APIs fall outside the TCF and may not be aligned to TCF policies.

### What is the Global Vendor List?

The Global Vendor List (GVL) is a technical document that CMPs download from a domain managed by IAB Europe. It lists all registered and approved Vendors, as well as standard Purposes, Features, Special Purposes, Special Features, Stacks and Data Categories used in conjunction with purposes. The information stored in the GVL is used for determining what legal disclosures must be made to the user. IAB Europe manages and publishes the GVL.

See the ‘The Global Vendor List’ section in the ‘Consent string and vendor list formats v2’ spec which describes the content and the use of the global vendor list in detail.

### How does the CMP provide the API?

Every consent manager MUST provide the following API function:

**`__tcfapi(command, version, callback, parameter)`**

The function `__tcfapi` **must always be a function** and cannot be any other type, even if only temporarily on initialization – the API must be able to handle calls at all times.

Secondarily, CMPs must provide a proxy for postMessage events targeted to the `__tcfapi` interface sent from within nested iframes. See [the section on iframes](#how-can-vendors-that-use-iframes-call-the-cmp-api-from-an-iframe) for information.

### What required API commands must a CMP support?

All CMPs must support three required API commands: [`'ping'`](#ping), [`'addEventListener'`](#addeventlistener) and [`'removeEventListener'`](#removeeventlistener).

______

#### `getTCData`

Deprecated in TCF v2.2. Add an [`'addEventListener'`](#addeventlistener) and use its callback function to access the tcData object.

______

#### `ping`

| argument name | type  | value |
|--:|:-:|:--|
| command | string | `'ping'` |
| [version](#how-does-the-version-parameter-work) | number | `2` |
| callback | function | `function(pingReturn: PingReturn)` |

**Example:**

```javascript
__tcfapi('ping', 2, (pingReturn) => {

  // do something with pingReturn

});
```

The ping command invokes the callback immediately without any asynchronous logic and returns a [`PingReturn`](#pingreturn) object for determining whether or not the main CMP script has loaded yet and whether GDPR applies; therefore, the only command required to be on the page in a stub before the rest of the commands are implemented. See the section ["What does the gdprApplies value mean?"](#what-does-the-gdprapplies-value-mean) for more.

The `callback` shall be invoked only once per api call with this command.

______

#### `addEventListener`

| argument name | type  | value |
|--:|:-:|:--|
| command | string | `'addEventListener'` |
| [version](#how-does-the-version-parameter-work) | number | `2` |
| callback | function | `function(tcData: TCData, success: boolean)` |

**Example:**

```javascript
const callback = (tcData, success) => {

  if(success && tcData.eventStatus === 'tcloaded') {

    // do something with tcData.tcString

  } else {

    // do something else

  }

}

__tcfapi('addEventListener', 2, callback);
```

Registers a callback function with a CMP (or a postmessage to respond to for cross-domain case). The callback will be invoked with the [`TCData`](#tcdata) object as an argument whenever the TC String is changed and a new one is available. The [`TCData`](#tcdata) object will contain CMP-assigned `listenerId` for the registered listener. The [`eventStatus`](#addeventlistener) property of the [`TCData`](#tcdata) object shall be one of the following:

| eventStatus | Description |
| :--- | :--- |
| `'tcloaded'` | This shall be the value for the `eventStatus` property of the [`TCData`](#tcdata) object when a CMP is loaded and is prepared to surface a TC String to any calling scripts on the page. A CMP is only prepared to surface a TC String for this `eventStatus` if an existing, <span style="text-decoration:underline;">valid</span> TC String is available to the CMP and it is not intending to surface the UI. If, however, the CMP will surface the UI because of an invalid TC String (e.g. it is too old, incorrect or does not reflect all the information the CMP needs to gather from the user) then an event with this `eventStatus` must not be triggered. |
| `'cmpuishown'` | This shall be the value for the `eventStatus` property of the [`TCData`](#tcdata) object any time the UI is surfaced or re-surfaced, a TC String is available and has rendered "Transparency" in accordance with the [TCF Policy](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/). The CMP shall create a TC string with all the surfaced vendors’ legitimate interest signals set to true and all the consent signals set to false.  If previous TC signals are present a CMP may also merge those into the now-available TC String in accordance with the policy. |
| `'useractioncomplete'` | This shall be the value for the `eventStatus` property of the [`TCData`](#tcdata) object whenever a user has confirmed or re-confirmed their choices in accordance with [TCF Policy](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/) and a CMP is prepared to respond to any calling scripts with the corresponding TC String. |

The CMP will, in most cases, invoke the callback when  either the `'tcloaded'` OR `'cmpuishown'` + `'useractioncomplete'` `eventStatus`(s) occur, but never for all three `eventStatuses` within the same page view. However, if an existing and valid TC string is available and the CMP does not intend to to surface a UI automatically (`'tcloaded'`) but the user manually surfaces the UI and changes their selected choices (`'cmpuishown'` + `'useractioncomplete'`) all three `eventStatuses` would appear within the same page view.

The callback shall be invoked with `false` as the argument for the `success` parameter if the callback could not be registered as a listener for any reason.

> **Note**: The `addEventListener` callback shall be immediately called upon registration with the current TC data, even if the CMP status is `loading` and the CMP has incomplete TC Data, so that the calling script may have access to its registered `listenerId`. Furthermore, on every TC String change the callback shall be called unless it is removed via `removeEventListener`.
______

#### `removeEventListener`

| argument name | type  | value |
|--:|:-:|:--|
| command | string | `'removeEventListener'` |
| [version](#how-does-the-version-parameter-work) | number | `2` |
| callback | function | `function(success: boolean)` |
| parameter | number | `listenerId`, the unique ID assigned by the CMP to the registered callback (via `addEventListener`) |

**Example:** see [`'addEventListener'`](#addeventlistener)

The callback shall be called with `false` as the argument for the `success` parameter if the listener could not be removed (e.g. the CMP cannot find a registered listener corresponding to `listenerId`).

______

### What optional API commands might a CMP support?

A CMP may choose to support two optional API commands: [`'getInAppTCData'`](#getinapptcdata) and [`'getVendorList'`](#getvendorlist).

______

#### `getInAppTCData`

| argument name | type  | value |
|--:|:-:|:--|
| command | string | `'getInAppTCData'` |
| [version](#how-does-the-version-parameter-work) | number | `2` |
| callback | function | `function(inAppTCData: InAppTCData, success: boolean)` |

**Example:**

```javascript
__tcfapi('getInAppTCData', 2, (inAppTCData, success) => {

  if(success) {

    // do something with inAppTCData

  } else {

    // do something else

  }

});
```

A mobile in-app CMP that uses a web-based UI in a mobile web view may choose to implement API calls with this command for the purpose of retrieving the TC String and pre-parsed TC signals from that web-based UI for the purpose of storing them in the [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android). (see [What is the CMP in-app internal structure for the defined API?](#what-is-the-cmp-in-app-internal-structure-for-the-defined-api))

The callback shall be invoked only once per api call with this command.

______

#### `getVendorList`

| argument name | type | optional | value |
|--:|:---:|:-:|:--|
| command | string | | `'getVendorList'` |
| [version](#how-does-the-version-parameter-work) | number | | `2` |
| callback | function | | `function(gvl: GlobalVendorList, success: boolean)` |
| parameter | int or string | ✔️  | `vendorListVersion` |

**Example:**

```javascript
__tcfapi('getVendorList', 2, (gvl, success) => {

  if(success) {

    // do something with gvl

  } else {

    // do something else

  }

}, 'LATEST');
```

Calling with this command and a valid `vendorListVersion` parameter shall return a `GlobalVendorList` object to the `callback` function.  The caller may specify a [Global Vendor List](#what-is-the-global-vendor-list) version number with the `vendorListVersion` parameter.  If no version is specified, the [Global Vendor List](#what-is-the-global-vendor-list) version returned shall be the same as that which is encoded in the current TC String – If no TC String exists the latest version of the [Global Vendor List](#what-is-the-global-vendor-list) shall be returned.  The calling function may also pass `'LATEST'` as the argument to the `vendorListVersion` parameter to explicitly receive the latest [Global Vendor List](#what-is-the-global-vendor-list) version as the `GlobalVendorList` object.

If an invalid `vendorListVersion` argument is passed with the `getVendorList` command the callback function shall receive a `null` argument for the `GlobalVendorList` parameter and the `success` parameter shall receive a `false` argument.  Valid `vendorListVersion`s are integers (or integer strings) greater than `1`.  The `success` parameter shall receive a `false` argument for any unsuccessful call with the `getVendorList` command. (eg. invalid `vendorListVersion` argument, network error, etc…)

The callback shall be invoked only once per api call with this command.

______

### What objects are returned from the API?

______

#### `TCData`

This object contains both the encoded and unencoded values of the TC String as well as information about the CMP `eventStatus` and whether or not GDPR applies to this user in this context (see the section ["What does the gdprApplies value mean?"](#what-does-the-gdprapplies-value-mean) for more).  If GDPR does not apply to this user in this context then only `gdprApplies`, `tcfPolicyVersion`, `cmpId` and `cmpVersion` shall exist in the object. If it is unknown just yet whether GDPR Applies to this user in this context or if this is CMP Stub code then the `callback` shall not be invoked until that `gdprApplies` is known.

``` javascript
TCData = {
  tcString: 'base64url-encoded TC string with segments',
  tcfPolicyVersion: 4,
  cmpId:1000,
  cmpVersion: 1000,

  /**
   * true - GDPR Applies
   * false - GDPR Does not apply
   * undefined - unknown whether GDPR Applies
   * see the section: "What does the gdprApplies value mean?"
   */
  gdprApplies: Boolean | undefined,

  /*
   * see addEventListener command
   */
  eventStatus: String,

  /**
   * see Ping Status Codes in following table
   */
  cmpStatus: 'string',

  /**
   * If this TCData is sent to the callback of addEventListener: number,
   * the unique ID assigned by the CMP to the listener function registered
   * via addEventListener.
   * Others: undefined.
   */
  listenerId: Number | undefined,

  /*
   * true - Default value
   * false - TC String is invalid.
   * since Sept 1st 2021, TC strings established with global-scope are considered invalid.
   * see the section: ["What happened to Global Scope and Out of Band?"](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/TCF-Implementation-Guidelines.md#gsoob) in "IAB Europe Transparency and Consent Framework Implementation Guidelines"
   */
  isServiceSpecific: Boolean,

  /**
   * true - CMP is using publisher-customized stack descriptions and/or modified or supplemented standard Illustrations
   * false - CMP is NOT using publisher-customized stack descriptions and or modified or supplemented standard Illustrations
   */
  useNonStandardTexts: Boolean,

  /**
   * Country code of the country that determines the legislation of
   * reference.  Normally corresponds to the country code of the country
   * in which the publisher's business entity is established.
   */
  publisherCC: 'Two-letter ISO 3166-1 alpha-2 code',

  /**
   *
   * true - Purpose 1 not disclosed at all. CMPs use PublisherCC to
   * indicate the publisher's country of establishment to help Vendors
   * determine whether the vendor requires Purpose 1 consent.
   *
   * false - There is no special Purpose 1 treatment status. Purpose 1 was
   * disclosed normally (consent) as expected by TCF Policy
   */
  purposeOneTreatment: Boolean,

  purpose: {
    consents: {

      /**
       * true - Consent
       * false | undefined - No Consent.
       */
      '[purpose id]': Boolean
    },
   legitimateInterests: {

      /**
       * true - Legitimate Interest Established
       * false | undefined - No Legitimate Interest Established
       */
      '[purpose id]': Boolean
    }
  },
  vendor: {

    consents: {

      /**
       * true - Consent
       * false | undefined - No Consent
       */
      '[vendor id]': Boolean

    },
    legitimateInterests: {

      /**
       * true - Legitimate Interest Established
       * false | undefined - No Legitimate Interest Established
       */
      '[vendor id]': Boolean

    }
  },
  specialFeatureOptins: {

      /**
       * true - Special Feature Opted Into
       * false | undefined - Special Feature NOT Opted Into
       */
      '[special feature id]': Boolean
  },
  publisher: {
    consents: {

      /**
       * true - Consent
       * false | undefined - No Consent
       */
      '[purpose id]': Boolean
    },
    legitimateInterests: {

      /**
       * true - Legitimate Interest Established
       * false | undefined - No Legitimate Interest Established
       */
      '[purpose id]': Boolean
    },
    customPurpose: {
      consents: {

        /**
         * true - Consent
         * false | undefined - No Consent
         */
        '[purpose id]': Boolean
      },
      legitimateInterests: {

        /**
         * true - Legitimate Interest Established
         * false | undefined - No Legitimate Interest Established
         */
        '[purpose id]': Boolean
      },
    },
    restrictions: {

      '[purpose id]': {

        /**
         * 0 - Not Allowed
         * 1 - Require Consent
         * 2 - Require Legitimate Interest
         */
        '[vendor id]': 1
      }
    }
  }
}
```

______

#### `PingReturn`

This object contains information about the loading status and configuration of the CMP.

``` javascript
PingReturn = {

  /**
   * true - GDPR Applies
   * false - GDPR Does not apply
   * undefined - unknown whether GDPR Applies
   * see the section: "What does the gdprApplies value mean?"
   */
  gdprApplies: Boolean | undefined,

  /**
   * true - CMP main script is loaded
   * false - still running stub
   */
  cmpLoaded: Boolean,

  /**
   * see Ping Status Codes in following table
   */
  cmpStatus: String,

  /**
   * see Ping Status Codes in following table
   */
  displayStatus: String,

  /**
   * version of the CMP API that is supported, e.g. "2.0"
   */
  apiVersion: String,

  /**
   * CMPs own/internal version that is currently running
   * undefined if still the stub
   */
  cmpVersion: Number | undefined,

  /**
   * IAB Assigned CMP ID
   * undefined if still the stub
   */
  cmpId: Number | undefined,

  /**
   * Version of the GVL currently loaded by the CMP
   * undefined if still the stub
   */
  gvlVersion: Number | undefined,

  /**
   * Number of the supported TCF version
   * undefined if still the stub
   */
  tcfPolicyVersion: Number | undefined,
};
```
**Note:** `cmpLoaded` must be set to `true` if the main script is loaded and the stub interface is replaced, regardless of whether or not the user will see the UI or interact with it.

#### Ping Status Codes

| Status Code | Applicable for | Description |
| :-------- | :------------- | :------------- |
| `'stub'` | cmpStatus | CMP not yet loaded – stub still in place |
| `'loading'` | cmpStatus | DEPRECATED (this status is not distinct and will be removed in a future version) |
| `'loaded'` | cmpStatus | CMP is finished loading |
| `'error'` | cmpStatus | CMP is in an error state. A CMP shall not respond to any other API requests if this cmpStatus is present. A CMP may set this status if, for any reason, it is unable to perform the operations in compliance with the TCF. |
| `'visible'` | displayStatus | User interface is currently displayed |
| `'hidden'` | displayStatus | User interface is not yet or no longer displayed |
| `'disabled'` | displayStatus | User interface will not show (e.g. GDPR does not apply or TC data is current and does not need renewal) |

______

#### `InAppTCData`

```javascript
InAppTCData = {
  tcString: 'base64url-encoded TC string with segments',
  tcfPolicyVersion: 2,
  cmpId:1000,
  cmpVersion: 1000,

  /**
   * 1 - GDPR Applies
   * 0 - GDPR Does not apply
   * undefined - unknown whether GDPR applies
   * see the section: "What does the gdprApplies value mean?"
   */
  gdprApplies: 1,

  /*
   * see addEventListener command
   */
  eventStatus: 'string',

  /*
   * 1 - Default value
   * 0 - TC String is invalid.
   * since Sept 1st 2021, TC strings established with global-scope are considered invalid.
   * see the section: ["What happened to Global Scope and Out of Band?"](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/TCF-Implementation-Guidelines.md#gsoob) in "IAB Europe Transparency and Consent Framework Implementation Guidelines"
   */
  isServiceSpecific: 1,

  /**
   * 1 - CMP is using publisher-customized stack descriptions and/or modified or supplemented standard Illustrations
   * 0 - CMP is NOT using publisher-customized stack descriptions and/or modified or supplemented standard Illustrations
   */
  useNonStandardTexts: 1,

  /**
   * Country code of the country that determines the legislation of
   * reference.  Normally corresponds to the country code of the country
   * in which the publisher's business entity is established.
   */
  publisherCC: 'Two-letter ISO 3166-1 alpha-2 code',

  /**
   * 1 - Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate
   * the publisher's country of establishment to help vVendors determine
   * whether the vendor requires Purpose 1 consent.
   *
   * 0 - There is no special Purpose 1 treatment status. Purpose 1 was
   * disclosed normally (consent) as expected by TCF Policy.
   */
  purposeOneTreatment: 1,

  purpose: {

    /**
     * 1 - Consent
     * 0 | undefined - No Consent
     */
    consents: '01010 -- Purpose bitfield',

    /**
     * 1 - Legitimate Interest Established
     * 0 | undefined - No Legitimate Interest Established
     */
    legitimateInterests: '01010 -- Purpose bitfield'
  },
  vendor: {

    /**
     * 1 - Consent
     * 0 | undefined - No Consent
     */
    consents: '01010 -- Vendor bitfield',

    /**
     * 1 - Legitimate Interest Established
     * 0 | undefined - No Legitimate Interest Established
     */
    legitimateInterests: '01010 -- Vendor bitfield'
  },

  /**
   * 1 - Special Feature Opted Into
   * 0 | undefined - Special Feature NOT Opted Into
   */
  specialFeatureOptins: '01010 -- Special Feature bitfield',

  publisher: {

    /**
     * 1 - Consent
     * 0 | undefined - No Consent
     */
    consents: '01010 -- Purpose bitfield',

    /**
     * 1 - Legitimate Interest Established
     * 0 | undefined - No Legitimate Interest Established
     */
    legitimateInterests: '01010 -- Purpose bitfield',

    customPurpose: {

      /**
       * 1 - Consent
       * 0 | undefined - No Consent
       */
      consents: '01010 -- Purpose bitfield',

      /**
       * 1 - Legitimate Interest Established
       * 0 | undefined - No Legitimate Interest Established
       */
      legitimateInterests: '01010 -- Purpose bitfield'
    },
    restrictions: {

      /**
       * 0 - Not Allowed
       * 1 - Require Consent
       * 2 - Require Legitimate Interest
       * _ - No Restriction (maintains indexing)
       *
       * each position represents vendor id and number represents restriction
       * type 0-2
       */
      '[purpose id]': '01201221'
    }
  }
}
```
______

### In-App Details

#### How is a CMP used in-app?

The steps for integrating a CMP SDK into an app are the following:

1. An app publisher should embed a CMP SDK – The setup and configuration as well as the protocol for  how to initialize the CMP SDK  are all proprietary to each CMP SDK.
2. Since more than one CMP SDK may be included in publishers' linked SDKs, the publisher must initialize only one of them. The initialized CMP shall set `IABTCF_CmpSdkID` with its ID as soon as it is initialized in the app to signal to vendors that a CMP is present.
3. The CMP SDK will determine if GDPR applies (see the section ["What does the gdprApplies value mean?"](#what-does-the-gdprapplies-value-mean)) to this user in this context. But, a publisher may choose to initialize a CMP dialogue UI manually.
4. The CMP shall set the [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android) variables and vendors will then be able to read from them directly.
5. Vendors should listen to `IABTCF_* `key updates to retrieve new TC data from [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android).

#### What is the CMP in-app internal structure for the defined API?

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
| `IABTCF_UseNonStandardTexts`  | `Number`: <p>`1` - CMP uses customized stack descriptions and/or modified or supplemented standard Illustrations</p><p>`0` - CMP did not use a non-standard stack desc. and/or modified or supplemented Illustrations</p> |
| `IABTCF_TCString` | `String`: Full encoded TC string |
| `IABTCF_VendorConsents` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the consent status for Vendor ID **n+1**; `false` and `true` respectively. eg. `'1'` at index `0` is consent `true` for vendor ID `1` |
| `IABTCF_VendorLegitimateInterests` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the legitimate interest status for Vendor ID **n+1**; `false` and `true` respectively. eg. `'1'` at index `0` is legitimate interest established `true` for vendor ID `1` |
| `IABTCF_PurposeConsents` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the consent status for purpose ID **n+1**; `false` and `true` respectively. eg. `'1'` at index `0` is consent `true` for purpose ID `1` |
| `IABTCF_PurposeLegitimateInterests` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the legitimate interest status for purpose ID **n+1**; `false` and `true` respectively. eg. `'1'` at index `0` is legitimate interest established `true` for purpose ID `1` |
| `IABTCF_SpecialFeaturesOptIns` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the opt-in status for special feature ID **n+1**; `false` and `true` respectively. eg. `'1'` at index `0` is opt-in `true` for special feature ID `1` |
| `IABTCF_PublisherRestrictions{ID}` | `String ['0','1', or '2']`: The value at position **n** – where **n**'s indexing begins at `0`  – indicates the publisher restriction type (0-2) for vendor **n+1**; (see Publisher Restrictions Types). eg. `'2'` at index `0` is restrictionType `2` for vendor ID `1`.  `{ID}` refers to the purpose ID. |
| `IABTCF_PublisherConsent` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the purpose consent status for purpose ID **n+1** for the publisher as they correspond to the [Global Vendor List](#what-is-the-global-vendor-list) Purposes; `false` and `true` respectively. eg. `'1'` at index `0` is consent `true` for purpose ID `1` |
| `IABTCF_PublisherLegitimateInterests` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the purpose legitimate interest status for purpose ID **n+1** for the publisher as they correspond to the [Global Vendor List](#what-is-the-global-vendor-list) Purposes; `false` and `true` respectively. eg. `'1'` at index `0` is legitimate interest established `true` for purpose ID `1` |
| `IABTCF_PublisherCustomPurposesConsents` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the purpose consent status for the publisher's custom purpose ID **n+1** for the publisher; `false` and `true` respectively. eg. `'1'` at index `0` is consent `true` for custom purpose ID `1` |
| `IABTCF_PublisherCustomPurposesLegitimateInterests` | `Binary String`: The `'0'` or `'1'` at position **n** – where **n**'s indexing begins at `0`  – indicates the purpose legitimate interest status for the publisher's custom purpose ID **n+1** for the publisher; `false` and `true` respectively. eg. `'1'` at index `0` is legitimate interest established `true` for custom purpose ID `1` |

#### How do third-party SDKs (vendors) access the consent information in-app?

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
int gdprApplies = mPreferences.getInt("IABTCF_gdprApplies", "");
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
#### How does ad mediation work in-app?

Mediation SDK allows app developers to monetize from multiple vendors.

##### Mediation SDK

*   Mediation SDK retrieves `IABTCF_gdprApplies` and `IABTCF_TCString` from [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android).
*   If `IABTCF_gdprApplies == 0`, Mediation SDK can run mediation across all ad network SDKs.
*   If `IABTCF_gdprApplies == 1`, Mediation SDK will run mediation only among the ad network SDKs that are GDPR ready.

'GDPR ready' means that the vendor retrieves `IABTCF_gdprApplies` and `IABTCF_TCString` from [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android), and passes on these GDPR values downstream.

##### Vendor

*   Vendor retrieves `IABTCF_gdprApplies` and `IABTCF_TCString` from [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc)(iOS) or [`SharedPreferences`](https://developer.android.com/training/data-storage/shared-preferences.html)(Android), and passes on these GDPR values downstream and passes on these GDPR values downstream.

______

## Using the CMP API

The following details provide information about how ad tags work, using the version parameter in the `__tcfapi()` function, and how vendors can interact with the API.

### How do ad tags work?

Tag-based demand, especially ad tags, are basically creative files, that are not an advertisement themselves, but are loaded to access additional sources to provide ad creative.

For performance reasons, the preferred way to make this happen in current ad servers are macros. The following two macros are recommended for ad server implementation:

| Macro | Values |
| :-- | :-- |
| `${GDPR}`| <p>**1** - GDPR Applies</p><p>**0** - GDPR does not apply</p><p>**unset** - unknown</p> |
| `${GDPR_CONSENT_XXXX}`| Encoded TC String where XXXX is the numeric Vendor ID of the vendor receiving the TC string. |

**Note**: Values align with IAB OpenRTB GDPR Advisory

**Note**: For more information on GDPR Applies see the section ["What does the gdprApplies value mean?"](#what-does-the-gdprapplies-value-mean)

### How does the "version" parameter work?

The `Version` parameter of the API is used to enable scripts to specify what version of the API they are prepared to handle. The CMP shall respond in kind with the appropriately versioned information, if available.

If the argument is `0` (Zero), `null` or `undefined`, the CMP shall return the information for the latest (highest) version available. For example, when a user has a v2 TC string and a v3 TC string, the CMP should return the v3 TC string and TC data.

If the argument is invalid (i.e. not a positive integer greater than `1` or higher than the highest supported version for this CMP) the CMP shall invoke the callback with an argument of `false` for the success parameter and a `null` argument for any expected TC data parameter.

If the argument is `1`, the CMP shall invoke the callback with an argument of `false` for the success parameter and a `null` argument for any expected TC data parameter, as this TCF version is no longer supported by this API.

If the argument is an integer higher than `1`, the CMP shall invoke the callback with defined data according to the specified version if it exists in that version.  For obvious reasons, if new properties of the version-specific outlined TC data objects are added in v3, a v2 TC data object shall not contain these new properties because they may either not exist or may have different meaning from version to version.

### What does the gdprApplies value mean?

`gdprApplies` is a `boolean` value that may be `undefined`.  A CMP shall determine whether or not GDPR applies in its current context and set the `gdprApplies` value.  A publisher may determine that GDPR applies to all traffic on their site and signal their CMP to always return `true` for `gdprApplies`, a CMP may invoke a geo-tagging service call to make a determination on a specific user or may have some other proprietary solution for determining whether or not GDPR applies in accordance with [TCF Policy](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/).  In any case, vendors shall respect the value of `gdprApplies` put forth by the CMP.  If `gdprApplies` value is `undefined` but exists in the schema outlined in the response object in this document, then calling scripts shall assume that the CMP is still pending a determination on whether or not GDPR applies in this context.

### Details for vendors

#### How can scripts on a page determine if there is a CMP present?

Scripts can check for the presence of a function named `__tcfapi` – if it exists then a CMP can be assumed to be present for scripts.  In iframes, the presence of a CMP can be determined by the existence of a specially-named iframe named `"__tcfapiLocator"` in the parent (or above) frame. The CMP shall create an iframe as a signal to scripts nested in other iframes that a CMP exists in a higher frame and name it `"__tcfapiLocator"` on the current `DOM` to indicate its own presence; since iframe properties can be accessed from other iframes. Publishers must load the CMP in a parent (or ancestor) of all iframes that may need to establish a GDPR legal basis.

If a CMP is not present, or if the CMP fails to respond, vendors should assume "no consent" and “no legitimate interest transparency established” in contexts where GDPR applies (see the section ["What does the gdprApplies value mean?"](#what-does-the-gdprapplies-value-mean) for more).

#### How can scripts determine if the CMP script is loaded yet?

Typically, scripts will not need to check if the CMP script is loaded. Scripts can simply call the `__tcfapi` function as it will queue the calls for execution when the full CMP script is loaded.  If the full CMP has been loaded, its `__tcfapi` implementation will handle the call normally. If necessary, the [`'ping'`](#ping) command will return a [`PingReturn`](#pingreturn) object that contains the `boolean` property `cmpLoaded` to indicate whether the cmp is loaded.

#### How does the CMP "stub" API work?

1. A CMP-provided synchronous "stub" script must be added by the publisher to their page before any other scripts that rely on `__tcfapi` (this usually means between the `<head></head>` tags of the HTML document).
2. This "stub" will:
    1. Define a queuing function named `__tcfapi` at the `Window` scope.
    2. All arguments for a given call to the stubbed `__tcfapi` method will be enqueued as a set.
    3. Define the postMessage handler function for cross-origin iframe requests.
    4. Add the newly-created `postMessage` handler function as an event listener on the `Window` object listening for the `‘message’` event.
    5. Create an iframe named `'__tcfapiLocator'` in the current DOM.
3. When the main CMP implementation script loads and executes, it will:
    1. Create an internal reference to the queued argument sets of the "stub".
    2. Redefine the `__tcfapi` function to the CMP’s full API implementation.
    3. Iterate and dequeue the queued argument sets in a first-in-first-out (FIFO) order and `apply` each set of arguments to the fully-implemented `__tcfapi` function.

#### Requirements for the CMP "stub" API script

A CMP must provide stub script to its clients that at least supports the following features/logic:

1. `__tcfapi` function that supports the ping command, with the minimum properties of `cmpLoaded` and `apiVersion`. **Note**: `gdprApplies` may also be set in the [`PingReturn`](#pingreturn) object if the "stub" is set by the publisher to apply GDPR to all traffic.  However, `gdprApplies` may not be available until the CMP is finished loading and the value will, therefore, be `undefined`. See the section ["What does the gdprApplies value mean?"](#what-does-the-gdprapplies-value-mean) for more.
2. Collect all calls to `__tcfapi` that cannot (yet) be handled by the “stub” in a queue
3. Check if `window.frames['__tcfapiLocator']` exists, indicating that a CMP is already present, otherwise create an empty iframe named `'__tcfapiLocator'` in the current DOM.
4. Create an event listener for `postMessage` events on the `Window` object. When the event handler function receives a postMessage (`‘message’`) event it shall proxy the `__tcfapi` function requests to send the response back through the `postMessage` event channel
5. The stub code must be loaded and executed synchronously before any other scripts that depend on the `__tcfapi` function to be there – this usually means between the `<head></head>` tags of the HTML document – in order to ensure that it can be executed before all calls from third parties.

#### Is there a sample CMP “stub” API script?

You can find an iab-supported open-source implementation of the stub API here: https://github.com/InteractiveAdvertisingBureau/iabtcf-es/blob/master/modules/stub/

This code should be executed on the page before any other scripts that require the `__tcfapi` function – this usually means between the `<head></head>` tags of the HTML document. The sample script also includes the `postMessage` handler.


### How can vendors that use iframes call the CMP API from an iframe?

The only way to request TC Data from a parent or ancestor’s frame is [using postmessage](#using-postmessage).

#### Using postmessage

The [`window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method may be used from a child iframe to make requests from a parent or any ancestor frame's CMP API. To locate an ancestor frame capable of responding to `postMessage()` CMP API calls, search for an ancestor frame that has a child frame named `'__tcfapiLocator'` (see [sample code](#is-there-a-sample-iframe-script-call-to-the-cmp-api)).

CMPs shall create an event listener to handle `postMessage` requests via the [CMP “stub” API script](#how-does-the-cmp-stub-api-work) so that `postMessage` events can be queued and processed by the full-implementation of the CMP API as soon as it is initialized.

**Sent Message**

The sent message shall follow the form outlined below. The command, parameter and version object properties correspond to their namesake parameters defined as method argument parameters for `__tcfapi()` method. The “sent message” also requires a unique callId property to help match the request with a response. The `callId` property shall be either a string or a number, but the calling script shall not use the two types interchangeably.

```javascript
{
  __tcfapiCall: {
    command: "command",
    parameter: parameter,
    version: version
  }
}
```

The `event.data` object payload shall follow the form outlined below. The `returnValue` object property shall be the corresponding TC data object for the `command` used upon sending the “sent message”. The `success` object property shall reflect the `__tcfapi()` `success` callback argument and the `callId` will correspond to the “sent message” unique id passed in the `callId` property.

```javascript
{
  __tcfapiReturn: {
   returnValue: returnValue,
   success: boolean,
   callId: uniqueId
  }
}
```

#### Is there a sample iframe script call to the CMP API?

Below is an example script that emulates the in-frame `__tcfapi()` call. It locates the ancestor frame running the CMP, performs the `postMessage` and listens for the return message and passes its values to the callback:

```javascript
(function() {

  //start here at our window
  let frame = window;

  // if we locate the CMP iframe we will reference it with this
  let cmpFrame;

  // map of calls
  const cmpCallbacks = {};

  while(frame) {

    try {

      /**
       * throws a reference error if no frames exist
       */

      if (frame.frames['__tcfapiLocator']) {

        cmpFrame = frame;
        break;

      }

    } catch(ignore) {}

    if(frame === window.top) {

      break;

    }

    frame = frame.parent;

  }

 /**
  * Set up a __tcfapi proxy method to do the postMessage and map the callback.
  * From the caller's perspective, this function behaves identically to the
  * CMP API's __tcfapi call
  */

  window.__tcfapi = function(cmd, version, callback, arg) {

    if (!cmpFrame) {

      callback({msg: 'CMP not found'}, false);

    } else {

      const callId = Math.random() + '';
      const msg = {
        __tcfapiCall: {
          command: cmd,
          parameter: arg,
          version: version,
          callId: callId,
        },
      };

      /**
       * map the callback for lookup on response
       */

      cmpCallbacks[callId] = callback;
      cmpFrame.postMessage(msg, '*');

    }

  };

  function postMessageHandler(event) {

  /**
    * when we get the return message, call the mapped callback
    */

    let json = {};

    try {

      /**
        * if this isn't valid JSON then this will throw an error
        */

      json = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

    } catch (ignore) {}

    const payload = json.__tcfapiReturn;

    if (payload) {

      /**
        * messages we care about will have a payload
        */

      if (typeof cmpCallbacks[payload.callId] === 'function') {

        /**
         * call the mapped callback and then remove the reference
         */

        cmpCallbacks[payload.callId](payload.returnValue, payload.success);
        cmpCallbacks[payload.callId] = null;

      }

    }

  }

  window.addEventListener('message', postMessageHandler, false);

}());

__tcfapi('ping', 2, (pingReturn, success) => {

  // should get response from window.top's CMP

});
```
### From where will the API retrieve the TC string?

See the ‘How should the transparency & consent string be stored?’ section in the ‘Transparency & Consent String and Global Vendor List Format’ spec which describes where CMPs must store the transparency & consent string.

## Major Changes from 2.0
1. Deprecated command `getTCData`

## Major Changes from 1.1

1. Added `getInAppTCData`
2. Added properties to `PingReturn`
3. Added `addEventListener`
4. Added `TCData`
5. Removed `VendorConsents`
6. Removed `VendorConsentData`
7. Changed `getVendorConsents` to `getTCData`
8. Renamed `__cmp` to `__tcfapi`
9. Renamed all `__cmp*` to `__tcfapi*` (e.g. `__cmpLocator` is now `__tcfapiLocator`)
10. Removed `getConsentData` and `getPublisherConsents` commands (data moved to `getTCData`)
11. Added in-app API details throughout where applicable
12. Removed SafeFrame proxy communication
