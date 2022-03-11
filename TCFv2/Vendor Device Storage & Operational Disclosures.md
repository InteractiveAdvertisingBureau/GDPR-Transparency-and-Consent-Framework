# Vendor Device Storage & Operational Disclosures

 **IAB Europe Transparency & Consent Framework**

**Final v.2.0 | August 2019, Updated February 2022**

 Table of Contents
 
* [Version History](#version-history)
* [Summary](#summary)
* [Audience](#audience)
  + [Relevant Documents](#relevant-documents)
* [Required Information and JSON Structure](#required-information-and-json-structure)
  + [Disclosures Object](#disclosures-object)
    - [Example](#example)
* [Serving the JSON Resource](#serving-the-json-resource)

 
## Version History

| Date | Version | Comments |
| :-- | :-- | :-- |
| Feb 2022 | 1.0 | Initial version. Augments and supersedes the [Device Storage Duration & Access Disclosure](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Device%20storage%20duration%20and%20access%20disclosure.md) specification.  |

## Summary

This document is one of the IAB Europe Transparency and Consent Framework Specifications. It defines operational information disclosures required of Vendors by the Framework and the structure for publishing them. This information includes granular vendor device storage disclosures, as well as the complete list of domains the vendor uses. CMPs may disclose portions of this information to data subjects in Framework UIs. Transparency related to device storage took on urgency after a ruling by the Court of Justice of the European Union in Case C-673/17 _Planet49_.

## Audience

Vendors who need to publish these disclosures, or registered CMPs, Publishers and others who wish to process them can use this document. 

### Relevant Documents
* [Transparency and Consent Framework (TCF) version 2 specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md)
* [TCF v2 Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/)

## Required Information and JSON Structure

The TCF registration process requires Vendors to provide a secure URL to a JSON resource that conforms to the content and structure specified below. The Managing Organisation publishes the URL on the GVL along with other Vendor registration information.

The JSON contains two types of information, disclosures related to device storage access and duration (the _Disclosures_ object and attributes) and the web domains the Vendor uses (the _Domains_ object and attributes). Both are required, though not all information within each object is required. See the tables below. 

### Disclosures Object

Vendors MUST publish granular disclosures for web-based storage - ‘cookie’ and ‘web’ mechanism types. Vendors MAY provide ’app’ storage type disclosures, but are not required to do so. 

<table>
  <tr><td>Field</td><td>Scope</td><td>Type</td><td>Description</td></tr>
  <tr><td><code>identifier</code></td><td>required</td><td>string</td><td>Key or object name, depending on type, for the storage item</td></tr>
  <tr><td><code>type</code></td><td>required</td><td>enum</td><td>What type of storage or access mechanism is used: 'cookie', 'web', ‘app’. 
    Note 'web' <em>can represent local/session storage and IndexedDB</em>.</td></tr>
  <tr><td><code>maxAgeSeconds</code></td><td>required if type = 'cookie' else null</td><td>integer</td><td>Only required if type = ‘cookie’; otherwise null. The number, in seconds, of the duration for storage on a device, as set when using cookie storage. <em>Note: this only includes what is declared when the storage is set and does not consider duration extensions should storage be refreshed.</em>
<br>For types of mechanisms (non-cookie) where duration cannot be set, this field should be null.
</td></tr>
  <tr><td><code>cookieRefresh</code></td><td>only required if type = ‘cookie’</td><td>boolean</td><td>Indicates the vendor is refreshing a cookie. See <em>cookieRefresh</em> description in the <a href="https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md">core specification</a>. True indicates the vendor refreshes this cookie. False indicates the vendor does not refresh the cookie any time the browser reloads.</td></tr>
  <tr><td><code>domain</td><td>optional</td><td>string</td><td><b>Required if type='cookie' or type='web'</b>
<br><br>
“*” = any domain (ex. first party cookie)
    <br><br>
“*.vendor.com” means multiple subdomains may exist
</td></tr>
  <tr><td><code>purposes</code></td><td>required</td><td>array<integer></td><td>The purpose ID or purpose IDs from the Global Vendor List (GVL) for which the storage is used.
 <br><br>
To indicate that use of the storage is subject to the consent requirement of the ePrivacy Directive, include Purpose ID 1 from the GVL.
    <br><br>
To indicate that the use of storage is exempted from (and therefore not subject to) the consent requirement of the ePrivacy Directive, do not include Purpose ID 1 from the GVL.
</td></tr>
</table>

#### Example

Below is sample JSON for a fictional TCF Vendor named _AdTech123_. _AdTech123_ owns the domain <code>adtech123.com</code> and has a "third-party" retargeting cookie that is set on the domain of <code>retarget.adtech123.com</code>.  They also maintain a <code>localStorage</code> object that contains a user object with key “id” that can be accessed via JavaScript at <code>window.localStorage.id</code>. 

````javascript
{
  "disclosures": [
    {
      "identifier": "retarget-adtech123",
      "type": "cookie",
      "maxAgeSeconds": 2592000000,
      "cookieRefresh": false,
      "domain": "retarget.adtech123.com", 
      "purposes": [1,3,4,5,6]
    },
    {
      "identifier": "id",
      "type": "web",
      "maxAgeSeconds": null,
      "cookieRefresh": false,
      "domain": "tracking.adtech123.com", 
      "purposes": [1,3,4,5,6,7,8,9,10]
    }
  ],
  "domains": [
    ...
  ]
}

````
_AdTech123_ publishes this information at https://www.adtech123.com/path/to/deviceStorage.json, and provides this URL to the TCF during the registration process. 

### Domains Object

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

Because CMPs must load the JSON file in the browser, Vendors must enable [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) at the location servicing the URL. Vendors must respond with the appropriate <code>content-type</code> header (<code>application/json</code>) and [cache -control directives](https://www.keycdn.com/support/cache-control) so that CMPs are accessing the latest content when fetching from users’ browsers. The URL need not be served by the Vendor’s company domain. It could be served from a CDN. 


