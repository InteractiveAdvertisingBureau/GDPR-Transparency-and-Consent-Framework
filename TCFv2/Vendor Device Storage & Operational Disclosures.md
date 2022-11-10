# Vendor Device Storage & Operational Disclosures

 **IAB Europe Transparency & Consent Framework**

**Final v.2.0 | August 2019, Updated November 2022**

 Table of Contents
 
* [Version History](#version-history)
* [Summary](#summary)
* [Audience](#audience)
  + [Relevant Documents](#relevant-documents)
* [Required Information and JSON Structure](#required-information-and-json-structure)
  + [Disclosures array](#disclosures-array)
    - [Example 1](#example-1)
    - [Example 2](#example-2)
  + [Domains array](#domains-array)
    - [Example](#example)
* [Serving the JSON Resource](#serving-the-json-resource)
  + [Around the JSON file](#around-the-json-file)
  + [The role of the CMP](#the-role-of-the-cmp)
  + [Access method](#access-method)
* [FAQ](#faq)

 
## Version History

| Date | Version | Comments |
| :-- | :-- | :-- |
| September 2022 | 1.0 | Adding a new FAQ |
| June 2022 | 1.0 | Update on the structure of the URL (path and filename) and use of this file by the CMPs |
| April 2022 | 1.0 | Wildcards are now permitted through the field named `identifier`, adding a new field named `domains` and **Disclosures object** can be empty if the vendor does not make use of any `client-side storage`. |
| February 2022 | 1.0 | Initial version. Augments and supersedes the [Device Storage Duration & Access Disclosure](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Device%20storage%20duration%20and%20access%20disclosure.md) specification.  |

## Summary

This document is one of the IAB Europe Transparency and Consent Framework Specifications. It defines operational information disclosures required of Vendors by the Framework and the structure for publishing them. This information includes granular vendor device storage disclosures, as well as the complete list of domains the vendor uses. CMPs may disclose portions of this information to data subjects in Framework UIs. Transparency related to device storage took on urgency after a ruling by the Court of Justice of the European Union in Case C-673/17 _Planet49_.

## Audience

Vendors who need to publish these disclosures, or registered CMPs, Publishers and others who wish to process them can use this document. 

### Relevant Documents
* [Transparency and Consent Framework (TCF) version 2 specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md)
* [TCF v2 Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/)

## Required Information and JSON Structure

The TCF registration process requires Vendors to provide a secure URL to a JSON resource that conforms to the content and structure specified below. The Managing Organisation publishes the URL in the deviceStorageDisclosureURL` field in the Global Vendor List (GVL) along with other Vendor registration information.

The JSON contains two types of information, disclosures related to device storage access and duration (the _Disclosures_ array and attributes) and the web domains the Vendor uses (the _Domains_ array and attributes). Both are required, though not all information within each array is required. See the tables below. 

### Disclosures array

Vendors that use web-based storage MUST publish granular disclosures for ‘cookie’ and ‘web’ mechanism types. Vendors MAY provide ’app’ storage type disclosures, but are not required to do so. Vendors should leave the **Disclosures array** empty if they do not make use of any `client-side storage`.

<table>
  <tr><td>Field</td><td>Scope</td><td>Type</td><td>Description</td></tr>
  <tr><td><code>identifier</code></td><td>required</td><td>string</td><td>Key or object name, depending on type, for the storage item.
   Wildcards '*' are permitted. For example, "id*" or "*id" describes multiple prefixed or suffixed identifiers, all having the same purpose(s). 
<br><br>
   <b>Note</b> : A wildcard alone is invalid. A wildcard MUST NOT be used to group different identifiers with different purpose(s), therefore disclose a separate record for each specific identifier.
   </td></tr>
  <tr><td><code>type</code></td><td>required</td><td>enum</td><td>What type of storage or access mechanism is used: 'cookie', 'web', ‘app’. 
    Note 'web' <em>can represent local/session storage and IndexedDB</em>.</td></tr>
  <tr><td><code>maxAgeSeconds</code></td><td>required if type = 'cookie' else null</td><td>integer</td><td>Only required if type = ‘cookie’; otherwise null. The number, in seconds, of the duration for storage on a device, as set when using cookie storage. A 0 indicates session storage similar to the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie">Set-Cookie spec</a>. <em>Note: this only includes what is declared when the storage is set and does not consider duration extensions should storage be refreshed.</em>
<br>For types of mechanisms (non-cookie) where duration cannot be set, this field should be null.
</td></tr>
  <tr><td><code>cookieRefresh</code></td><td>only required if type = ‘cookie’</td><td>boolean</td><td>Indicates the vendor is refreshing a cookie. See <em>cookieRefresh</em> description in the <a href="https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md">core specification</a>. True indicates the vendor refreshes this cookie. False indicates the vendor does not refresh the cookie any time the browser reloads.</td></tr>
 <tr><td><code>domains</td><td>optional</td><td>array</td><td>
  
  <em>Use of this field is preferred. The less flexible `domain` field may be deprecated in a future release.</em> <br><br>
<b>Required if type='cookie' or type='web'</b>.<br><br>
Value is one or more strings describing a domain.<br><br> Wildcards '&ast;' are permitted. For example, "*.adtech123.com" indicates the identifier is used across multiple subdomains.<br><br>
A wildcard alone is permitted only in cases where the number of domains is large and dynamic, such as when managing `first party` storage on many partners' properties.<br><br>
  <b>Note</b> : A wildcard MUST NOT be used to group identifiers having different purpose(s) with a group of domains. </td></tr>
  <tr><td><code>domain</td><td>optional</td><td>string</td><td>
   
  <em> This field cannot be used at the same time as the field named `domains` when declaring one or multiple identifier(s). This field can only be used to declare one or multiple identifier(s) with only one domain. <b>This field may be removed in a future release to only use the field `domains`</b>.</em>
   <br><br>
   <b>Required if type='cookie' or type='web'.</b>
   <br><br>
Wildcards '&ast;' are permitted. For example, "*.adtech123.com" indicates the identifier is used across multiple subdomains.   <br><br>
A wildcard alone is permitted only in cases where the number of domains is large and dynamic, such as when managing `first party` storage on many partners' properties.   <br><br>
   <b>Note</b> : A wildcard MUST NOT be used to group identifiers having different purpose(s) with a group of domains. If an identifier is used for the same purposes on a finite set of domains, then disclose a separate record for each specific domain, e.g. one each for 'retarget.adtech123.com', 'retarget.adtech123.net' 'register.adtech123svcs.com', and so on.</td></tr>
  <tr>
   <td><code>purposes</code>
   </td>
   <td>required
   </td>
   <td>array&lt;integer>
   </td>
   <td>The purpose ID or purpose IDs from the Global Vendor List (GVL) for which the storage is used. 
<p>
To indicate that use of the storage <span style="text-decoration:underline;">is</span> subject to the consent requirement of the ePrivacy Directive, include Purpose ID 1 from the GVL.
<p>
To indicate that the use of storage is <span style="text-decoration:underline;">exempted from</span> (and therefore <span style="text-decoration:underline;">not</span> subject to) the consent requirement of the ePrivacy Directive, do not include Purpose ID 1 from the GVL.
   </td>
  </tr>
</table>

#### Example 1

Below is sample JSON for a fictional TCF Vendor named _AdTech123_. _AdTech123_ owns the domain <code>adtech123.com</code> and has a "third-party" retargeting cookie that is set on the domain of <code>retarget.adtech123.com</code>.  They also maintain a <code>localStorage</code> object that contains a user object with key “id” that can be accessed via JavaScript at <code>window.localStorage.id</code>. 

````javascript
{
  "disclosures": [
    {
      "identifier": "retarget-adtech123",
      "type": "cookie",
      "maxAgeSeconds": 2592000000,
      "cookieRefresh": false,
      "domains": ["retarget.adtech123.com"], 
      "purposes": [1,3,4,5,6]
    },
    {
      "identifier": "id",
      "type": "web",
      "maxAgeSeconds": null,
      "cookieRefresh": false,
      "domains": ["tracking.adtech123.com"], 
      "purposes": [1,3,4,5,6,7,8,9,10]
    }
  ],
  "domains": [
    ...
  ]
}

````


#### Example 2

Below is sample JSON for a fictional TCF Vendor that does not make use of any `client-side storage`.

````javascript
{
    "disclosures": [],
    "domains": [
        ...
    ]
}
````

### Domains array

Vendors MUST publish the domains they use for collecting and processing personal data in the context of their TCF registration. Vendors MUST NOT include Publishers’ delegated domains or subdomains they may use.

<table>
  <tr><td>Field</td><td>Scope</td><td>Type</td><td>Description</td></tr>
  <tr><td><code>domain</code></td><td>required</td><td>string</td><td>“*.vendor.com” means multiple subdomains may exist.
<br><br>
Entry MUST NOT contain “http(s)://” or text other than the domain.
</td></tr>
  <tr><td><code>use</code></td><td>optional</td><td>string</td><td>Textual explanation of what the domain is used for.
<br><br>
There is no mechanism for requesting alternate translations. For widest readability, it is suggested that Vendors use English for the optional explanatory text. </td></tr>
</table>

#### Example

````javascript
{
  "disclosures": [
    ...
  ],
  "domains": [
    {
      "domain": "retarget.adtech123.com",
      "use": "Retargeting and conversion tracking"
    },
    {
      "domain": "static.adtech123.com",
      "use": "Static CSS and JavaScript"
    },
    {
      "domain": "tracking.adtech123.com",
      "use": "Ad server and tracking"
    },
    {
      "domain": "video.adtech123.com",
      "use": "Video and banner distribution"
    }
  ]
}
````

## Serving the JSON Resource

### Around the JSON file

The vendor publishes the information and provides the URL (the specification makes no assumptions or requirements about the URL) to the TCF during the registration process. This file :
- is in JSON format,
- is created, named and published by the vendor,
- is publicly accessible, 
- contains cookies and/or other storage mechanisms (Localstorage etc...) and domains used for collecting and processing personal data in the context of TCF.

### The role of the CMP
In order to allow CMPs to request and load the JSON on the client side, the vendor must enable [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) at the location servicing the URL.
However, regardless of whether the CMP requests the JSON file from the vendor's server or CMP's server, [Access-Control-Allow-Credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials) must be set to false in order to not include any cookie in the request. Vendors must respond with the appropriate `content-type` header (`application/json`) and [Cache-control directives](https://www.keycdn.com/support/cache-control) so that CMPs are accessing the latest content when fetching from users’ browsers. The URL need not be served by the Vendor’s company domain. It could be served from a CDN. 
 
Usually, CMP requests the file only when/if a user clicks to review additional information (it's unusual for the information to be disclosed directly on the secondary layer).

### Access method

For secure communications, the vendor must make publicly accessible the JSON file via <b>HTTPS only</b> (uses [TLS](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security) or [SSL](https://developer.mozilla.org/en-US/docs/Glossary/SSL) to encrypt HTTP requests and responses) on the standard ports (80 and 443, respectively).

## FAQ

The [FAQ](https://iabeurope.eu/transparency-consent-framework-file/tcf-framework-faq-vendor-device-storage-and-operational-disclosures.pdf) addresses questions including the use of <code>domains</code> instead of <code>domain</code> field, the use of wildcards, when the storage mechanism is set by a first party etc… The document will be updated over the time.
