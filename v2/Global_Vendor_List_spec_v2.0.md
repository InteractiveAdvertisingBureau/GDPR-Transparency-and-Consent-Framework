 ![iab tech lab](https://user-images.githubusercontent.com/19175352/38649177-0d37d17c-3daa-11e8-8934-f0fb47919716.png)

 # Global Vendor List (GVL)

 **IAB Europe Transparency & Consent Framework**

 **Final v.2.0 | August 2019, Updated December 2019**

 Table of Contents

 * [The Global Vendor List](#the-global-vendor-list)
   + [I’m a vendor, how do I get added to the Global Vendor List?](#im-a-vendor-how-do-i-get-added-to-the-global-vendor-list)
   + [What is contained in the Global Vendor List?](#what-is-contained-in-the-global-vendor-list)
   + [Where can I access the Global Vendor List?](#where-can-i-access-the-global-vendor-list)
   + [TCF version 1 of the Global Vendor List (deprecated)](#tcf-version-1-of-the-global-vendor-list-deprecated)
   + [Translations for Purposes, Special Purposes, Features, and Special Features](#translations-for-purposes-special-purposes-features-and-special-features)
   + [How often is the Global Vendor List updated?](#how-often-is-the-global-vendor-list-updated)
   + [CMPs using the GVL](#cmps-using-the-gvl)
   + [Vendors using the GVL](#vendors-using-the-gvl)
   + [Caching the Global Vendor List](#caching-the-global-vendor-list)
     - [CMPs caching the GVL](#cmps-caching-the-gvl)
     - [Vendors caching the GVL](#vendors-caching-the-gvl)
     - [Caching previous versions of the GVL](#caching-previous-versions-of-the-gvl)
     - [Using a compressed version of the Global Vendor List](#using-a-compressed-version-of-the-global-vendor-list)
     - [Global Vendor List and TCF Policy Updates](#global-vendor-list-and-tcf-policy-updates)
   + [Example Global Vendor List JSON Object](#example-global-vendor-list-json-object)
 * [License](#license)
 * [Disclaimer](#disclaimer)


## The Global Vendor List

The Global Vendor List (GVL) is a technical document that CMPs download from a domain managed and published by IAB Europe. It lists all registered and approved Vendors, as well as standard Purposes, Special Purposes, Features, Special Features and Stacks. The information stored in the GVL is used for determining what legal disclosures must be made to the user.

### I’m a vendor, how do I get added to the Global Vendor List?

The registration process is described here: [https://iabeurope.eu/tcf](https://iabeurope.eu/tcf)

### What is contained in the Global Vendor List?

*   A Global Vendor List Specification Version
*   A Global Vendor List version
*   A TCF Policy Version
*   A Last Updated Date
*   A list of standard Purposes
*   A list of Special Purposes
*   A list of standard Features
*   A list of Special Features.
*   A list of Stacks
*   A list of Vendors and their:
    *   Numeric ID which is incrementally assigned and never re-used – deleted Vendors are just marked as deleted.
    *   Name.
    *   List of Purposes for which they are requesting consent.
    *   List of Purposes for which they require to be transparently disclosed as their legitimate interest.
    *   List of Purposes they have the flexibility to either use a consent or a legitimate interest legal basis.
    *   List of Special Purposes to transparently disclose as their legitimate interest that a user has no right to object.
    *   List of Features they use across Purposes.
    *   List of Special Features they use accross Purposes.
    *   GDPR/privacy policy page URL.
    *   HTTP “overflow” options which includes a <code>GET</code> request maximum size in kilobytes to help diagnose problems with TC String passing as well as limit oversized strings.


### Where can I access the Global Vendor List?

The GVL is in JSON format and the current version at any given time can be retrieved using the following URL structure:

[https://vendorlist.consensu.org/v2/vendor-list.json](https://vendorlist.consensu.org/v2/vendor-list.json)

Previous versions of the Global Vendor List are available here:

[https://vendorlist.consensu.org/v2/archives/vendor-list-v{vendor-list-version}.json](https://vendorlist.consensu.org/v2/archives/vendorlist-v{vendor-list-version}.json)

Where ‘vendor-list-version’ corresponds to the ‘vendorListVersion’ property in the GVL, for example, the following URL would retrieve the GVL update published with version 138

https://vendorlist.consensu.org/v2/archives/vendor-list-v138.json

Previous versions of the GVL may only be used in cases when the current version cannot be downloaded (such as when operating in-app while offline), or for change control management.

### TCF version 1 of the Global Vendor List (deprecated)

For reference, the URL for version 1 of the TCF was:

[https://vendorlist.consensu.org/vendorlist.json](https://vendorlist.consensu.org/vendorlist.json)

Version 1 of the Global Vendor List and all version 1 archives will continue to be maintained until support officially ends in 2020. At that time, these files will be deprecated and only version 2 and newer of the Global Vendor List will be available.

### Translations for Purposes, Special Purposes, Features, and Special Features

Translations of the names and descriptions for Purposes, Special Purposes, Features, and Special Features to non-English languages are contained in a file where attributes containing English content (except vendor declaration information) are translated, and can be found here:

https://vendorlist.consensu.org/v2/purposes-{language}.json

Where ‘language’ is a two letter lowercase [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code. Supported languages are listed at the following URL:

[https://register.consensu.org/Translation](https://register.consensu.org/Translation)

### How often is the Global Vendor List updated?

As of the publication of this document, changes to the Global Vendor List are published weekly at 5:00 PM Central European Time on Thursdays. IAB Europe reserves the right to change this time and will notify CMP members of any changes.

### CMPs using the GVL

Any time the CMP user interface is surfaced  to a user to provide transparency and request consent, the **current** version of the GVL must be used to populate the user interface – this includes first-time interactions and renewal interactions.  When a user summons the CMP user interface manually to review their settings, the version of the GVL encoded in the TC String is used instead.

Within a mobile in-app context where the current version of the GVL cannot be loaded because of a lack of Internet connectivity, the most recently cached version of the GVL may be used – The latest version of the GVL must be retrieved as soon as connectivity is restored.

CMPs must, of course, use specific versions of the GVL to determine if a CMP should be resurfaced to a user whom has a TC String encoded with a GVL version that is not the latest or if they are resurfacing the user interface upon the user’s request to review their settings.

### Vendors using the GVL

Vendors must use the version of the GVL encoded in the TC String received to determine if they have the legal bases they need to process the user's personal data.

### Caching the Global Vendor List

**Strict restrictions on caching the GVL apply and are detailed in the following section.**

Given the scale of the TCF and the high volume of requests for the Global Vendor List, current and previous versions are configured with cache-control headers. All requests for the Global Vendor List must honour these headers and must not cache the resource with different settings. In this respect, “cache busting” techniques, like appending a query string parameter and a randomly generated value as part of the URL request to download the Global Vendor List in order to bypass the cache must not be used.

**Note:** There may be a delay of up to the maximum cache interval in retrieving the latest version of the Global Vendor List.

#### CMPs caching the GVL

CMPs shall set [cache-control headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) on HTTP responses sent to client-side requests for GVL files to prevent users from repeatedly downloading the file. When cache-control headers are set browsers will automatically cache the GVL file and return the file from cache to the client-side script running when it makes the request circumventing the need to fetch the file over HTTP again and again.


#### Vendors caching the GVL

Because vendor requests for a GVL file will not be in a browser context, GVL files must be cached server-side.

Vendor application logic must only request one version of the GVL per vendor during the cache period specified in the cache-control header. For example, if the caching period is one week, only one request for the current GVL file must be received for a given vendor per week.

**Note:** The volume of usage will be monitored carefully by the managing organisation (MO) and any vendor not adhering to this request limit will be blocked from accessing the GVL.


#### Caching previous versions of the GVL

Previous versions of the GVL must be cached for at least the period specified by the cache-control headers and may be cached indefinitely as they are static resources.

#### Using a compressed version of the Global Vendor List

In order to control the bandwidth used by requests for the GVL file, vendors and CMPs must request a compressed version of the GVL. This can be done by sending `Accept-Encoding` headers on the `GET` request for the file.

**Example:**

```
Accept-Encoding: gzip, deflate, br
```


A browser will add this header automatically and, therefore, nothing needs to be done for an in-browser request.  Server-side requests are another matter because server software may not decompress the response automatically. Make sure your server requests send the options your service is capable of decoding in your `Accept-Encoding` header.


#### Global Vendor List and TCF Policy Updates

When a change occurs in the TCF [Policies](http://www.iabeurope.eu/tcfdocuments/documents/legal/tcfpolicyFINALv2.pdf), the update invalidates the previous declarations of vendors listed on the previous version of the GVL. These policy changes happen infrequently, but when they do, a CMP is required to discard the user’s current TC String and resurface the user interface to provide new disclosures, capture new consent, and encode a new TC String without migrating any old values over from the old one.

To determine if TCF [Policies](http://www.iabeurope.eu/tcfdocuments/documents/legal/tcfpolicyFINALv2.pdf) have changed, CMPs shall compare the _**TcfPolicyVersion**_ encoded in a TC String with the _**TcfPolicyVersion**_ property in the latest Global Vendor List published by the Managing Organisation – if the values are different then the TCF Policy has changed and a CMP will be required to provide new disclosures, capture new consent, and encode a new TC String.


### Example Global Vendor List JSON Object

Here is an annotated example of the GVL’s JSON format:

```javascript
{
  "gvlSpecificationVersion": 2,
  "vendorListVersion": 133, // incremented with each published file change
  "tcfPolicyVersion": 2, // The TCF MO will increment this value whenever a GVL change (such as adding a new Purpose or Feature or a change in Purpose wording) legally invalidates existing TC Strings and requires CMPs to re-establish transparency and consent from users. TCF Policy changes should be relatively infrequent and only occur when necessary to support changes in global mandate. If the policy version number in the latest GVL is different from the value in your TC String, then you need to re-establish transparency and consent for that user. A version 1 format TC String is considered to have a version value of 1.
  "lastUpdated": "2018-05-28T00:00:00Z",
  "purposes": {

    /**
     * Information published for each Purpose
     *
     * "id": number, REQUIRED
     * "name": string, REQUIRED
     * "description": string, REQUIRED
     * "descriptionLegal": string, REQUIRED
     * "consentable": boolean, OPTIONAL, default=true  false means CMPs should never afford users the means to provide an opt-in consent choice
     * "rightToObject": boolean, OPTIONAL, default=true  false means CMPs should never afford users the means to exercise a right to object
    */
    "1": {
      "id": 1,
      "name": "Storage and access of information",
      "description": "...",
      "descriptionLegal": "..."
    },
    // ... more purposes from id=2 to id=9 (up to no higher than id=24)
    "10": {
      "id": 10,
      "name": "Develop and improve product",
      "description": "...",
      "descriptionLegal": "...",
      "consentable": false,
      "rightToObject": false
    }
  },
  "specialPurposes" : {
    "1": {
      "id": 1,
      "name": "Security, Fraud Prevention, Debugging",
      "description": "...",
      "descriptionLegal": "...",
      "consentable": false,
      "rightToObject": false
    },
    "2": {
      "id": 2,
      "name": "Technical ad and content delivery",
      "description": "...",
      "descriptionLegal": "...",
      "consentable": false,
      "rightToObject": false
    }
  },
  "features" : {
    "1": {
      "id": 1,
      "name": "Matching Data to Offline Sources",
      "description": "Combining data from offline sources that were initially collected in other contexts",
      "descriptionLegal": "..."
    }

  // ... more features from id=2 up to no higher than id=64.

  },

  /**
   * Special features differ from simple features in that CMPs MUST provide
   * users with a means to signal an opt-in choice as to whether vendors
   * may employ the feature when performing any purpose processing.
   * See Policies for specifics.
   */
  "specialFeatures" : {
    "1": {
      "id": 1,
      "name": "Precise Geolocation",
      "description": "...",
      "descriptionLegal": "..."
    },
    "2": {
      "id": 2,
      "name": "Active Fingerprinting",
      "description": "...",
      "descriptionLegal": "..."
    }

  // ... more special features from id=3 up to no higher than id=8.
    //
  },
  "vendors": {
  /**
   * Information published for each vendor
   *
   * "id": numeric, REQUIRED
   *
   * "name": string, REQUIRED
   *
   * "purposes": array of positive integers, either purposes or
   *
   * "legIntPurposes" REQUIRED. Array may be empty. List of purpose ids
   * declared as performed on the legal basis of consent
   *
   * "specialPurposes": array of positive integers, OPTIONAL. Array may be
   * empty. List of Special Purposes declared as performed on the legal basis
   * of a legitimate interest
   *
   * "flexiblePurposes": array of positive integers, OPTIONAL. Array may be
   * empty. List of purpose ids where the vendor is flexible regarding the
   * legal basis; they will perform the processing based on consent or a
   * legitimate interest. The 'default' is determined by which of the other two
   * mutually-exclusive purpose fields is used to declare the purpose for the
   * vendor
   *
   * Constraints:
   *   Either purposes OR legIntPurposes can be missing/empty, but not
   *   both.
   *
   *   A Purpose id must not be present in both purposes and legIntPurposes
   *
   *   A Purpose id listed in flexiblePurposes must have been declared in one
   *   of purposes or legIntPurposes.
   *
   *   Purpose id values included in the three purpose fields must be in the
   *   range from 1 to N, where N is the highest purpose id published in this
   *   GVL file.
   *
   * "features": array of positive integers, OPTIONAL. Array may be empty. List
   * of Features the Vendor may utilize when performing some declared Purposes
   * processing.
   *
   * "specialFeatures": array of positive integers, OPTIONAL. Array may be
   * empty. List of Special Features the Vendor may utilize when performing
   * some declared Purposes processing.
   *
   * "SpecialPurposes": array of positive integers, OPTIONAL. Array may be
   * empty. List of Special Purposes declared as performed on the legal basis
   * of a legitimate interest
   *
   * "policyUrl": url string, REQUIRED URL to the Vendor's privacy policy
   * document.
   *
   * "deletedDate": date string ("2019-05-28T00:00:00Z") OPTIONAL, If present,
   * vendor is considered deleted after this date/time and MUST NOT be
   * established to users.
   *
   * "overflow": object specifying the vendor's http GET request length  limit
   * OPTIONAL. Has the following members & values
   *
   *   "overflow": {
   *     "httpGetLimit": 32   /* 32 or 128 are supported options */
   *   }
   *    If a vendor entry does not include this attribute then the vendor has no
   *    overflow options and none can be inferred.
   */

  "1":{
    "id": 1,
    "name": "Vendor Name",
    "purposes": [1],
    "specialPurposes": [1],
    "legIntPurposes": [2, 3],
    "flexiblePurposes": [1, 2],
    "features": [1, 2],
    "specialFeatures": [1, 2],
    "policyUrl": "https://vendorname.com/gdpr.html",
    "deletedDate": "2019-02-28T00:00:00Z",
    "overflow": {
      "httpGetLimit": 32   /* 32 or 128 are supported options */
      }
    }
  // ... more vendors
  },

  "stacks": {
    "1": {
      "id": 1,
      "purposes" : [],
      "specialFeatures" : [1,2],
      "name" : "Precise geolocation data, and identification through device scanning",
      "description" : "Precise geolocation and information about device characteristics can be used."
    }
  }
}
````

### License

IAB Europe Transparency and Consent Framework technical specifications governed by the IAB Tech Lab is licensed under a Creative Commons Attribution 3.0 License.   To view a copy of this license, visit[ creativecommons.org/licenses/by/3.0/](https://creativecommons.org/licenses/by/3.0/) or write to Creative Commons, 171 Second Street, Suite 300, San Francisco, CA 94105, USA.

![](https://drive.google.com/uc?id=1cbwEGlb8S69SndIDoHnvc5_3TfmkGM7R)


### Disclaimer

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE “PRODUCTS AND SERVICES”) ARE PROVIDED “AS IS” AND “AS AVAILABLE,” AND IAB TECHNOLOGY LABORATORY, INC. (“TECH LAB”) MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.
