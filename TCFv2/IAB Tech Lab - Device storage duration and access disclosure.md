# Device Storage Duration & Access Disclosure (deprecated and superseded by this new [doc](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/Vendor%20Device%20Storage%20%26%20Operational%20Disclosures.md))
A new feature introduced for Transparency and Consent Framework (TCF) v2.1.

## Summary

This document is one of the IAB Europe Transparency and Consent Framework Specifications. It defines operational information disclosures required of Vendors by the Framework and the structure for publishing them. This information includes the length of time any vendor-specific information may be stored on a device, as well as the complete list of domains the vendor uses. CMPs may disclose portions of this information to data subjects in Framework UIs. Transparency related to device storage took on urgency after a ruling by the Court of Justice of the European Union in Case C-673/17 _Planet49_.  

### Planet49 Ruling

In its Planet49 judgment (available [here](http://curia.europa.eu/juris/document/document.jsf;jsessionid=DA9630A1B5B38A1B6EFD5C9CC1DCD815?text=&docid=218462&pageIndex=0&doclang=EN&mode=lst&dir=&occ=first&part=1&cid=8222720)), the Court of Justice of the European Union (CJEU) ruled that the requirements for informed consent under Article 5(3) of the ePrivacy Directive include the disclosure of “the duration of the operation of cookies and whether or not third parties may have access to those cookies” (para. 81).<sup id="a1">[1](#f1)</sup> The CJEU clarified that the information provided must enable the user to determine the consequences of any consent and be sufficiently detailed so as to enable the user to understand the functioning of the cookies employed. This includes the requirement to provide information about the duration of the cookies and whether or not third parties may have access to those cookies.

### Relevant Documents

*   [Transparency and Consent Framework (TCF) version 2 specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/tree/master/TCFv2)
*   [TCF v2 policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/)

## Global Vendor List Fields<sup id="a2">[2](#f2)</sup>

### <code>usesCookies</code>

This true or false field indicates whether the vendor uses cookie storage (session or otherwise).

<table>
  <tr>
   <td>Field
   </td>
   <td>Scope
   </td>
   <td>Type
   </td>
   <td>Default
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><code>usesCookies</code>
   </td>
   <td><strong>required</strong>
   </td>
   <td>Boolean
   </td>
   <td>-
   </td>
   <td>Indicates whether the vendor uses cookie storage (session or otherwise). True indicates cookie storage is used. False cookie storage is not used. 
   </td>
  </tr>
</table>

### <code>cookieMaxAgeSeconds</code>

The number of seconds representing the longest potential duration for cookie storage on a device. If a Vendor uses multiple cookies with differing durations, <code>cookieMaxAgeSeconds</code> represents the cookie with the longest duration. Note: cookies are the only method of storage or device access that permit a predictable duration to be set. 

<table>
  <tr>
   <td>Field
   </td>
   <td>Scope
   </td>
   <td>Type
   </td>
   <td>Default
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><code>cookieMaxAgeSeconds</code>
   </td>
   <td><strong>required if usesCookies is set to true, else optional</strong>
   </td>
   <td>integer
   </td>
   <td>-
   </td>
   <td>The number, in seconds, of the longest potential duration for storage on a device, as set when using the cookie method of storage. A negative number or a 0 indicate session storage similar to the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie">Set-Cookie</a> spec. A "-100" value no longer indicates no cookie usage. <em>Note: this only includes what is declared when the storage is set and does not consider duration extensions should storage be refreshed. </em>
   </td>
  </tr>
</table>

### <code>cookieRefresh</code>

This true or false field indicates whether any cookies in scope for <code>cookieMaxAgeSeconds</code> are refreshed after being initially set. The following is an example of a cookie "refresh" scenario. On Day 0 a user visits a webpage which loads Vendor A who seeks Purpose 1 consent. She consents to Purpose 1 which includes Vendor A's 90 day max age cookie disclosure. This cookie is set to expire 90 days from now on Day 90 using <code>Set-Cookie: Max-Age=7776000</code>. On Day 5 the same user again visits the same webpage loading Vendor A. The webpage's CMP previously recorded her data processing choices and does not surface a new consent request. Vendor A is considered to "refresh" the cookie if it resets the countdown to 90 days from day 5, which would now be 96 days after the user made her choice when the webpage's CMP displayed a transparency and control experience to her.

<table>
  <tr>
   <td>Field
   </td>
   <td>Scope
   </td>
   <td>Type
   </td>
   <td>Default
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><code>cookieRefresh</code>
   </td>
   <td><strong>required</strong>
   </td>
   <td>boolean
   </td>
   <td>-
   </td>
   <td>Indicates the vendor’s refreshing a cookie (see example above). True indicates the vendor refreshes this cookie. False indicates the vendor does not refresh the cookie any time the browser reloads.</em>
   </td>
  </tr>
</table>

### <code>usesNonCookieAccess</code>

This true or false field indicates whether the vendor uses other, non-cookie methods of storage or accessing information already stored on a user’s device (see footnote 1). Examples of non-cookie storage and access may be localStorage, indexDB, mobile ad IDs, etc.

<table>
  <tr>
   <td>Field
   </td>
   <td>Scope
   </td>
   <td>Type
   </td>
   <td>Default
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><code>usesNonCookieAccess</code>
   </td>
   <td><strong>required</strong>
   </td>
   <td>Boolean
   </td>
   <td>-
   </td>
   <td>Indicates the vendor’s use of non-cookie storage and access to information already stored on a user’s device. True indicates non-cookie access is used. False indicates non-cookie storage and access to information already stored on a user's device <em>is not</em> used. 
   </td>
  </tr>
</table>

### <code>deviceStorageDisclosureUrl</code>

Link to a recommended, vendor-hosted, secure URL for disclosing additional information (see "Required Information and JSON Structure" heading below for additional details). 

<table>
  <tr>
   <td>Field
   </td>
   <td>Scope
   </td>
   <td>Type
   </td>
   <td>Default
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><code>deviceStorageDisclosureUrl</code>
   </td>
   <td><strong>optional</strong>
   </td>
   <td>string
   </td>
   <td>-
   </td>
   <td>Location of vendor-hosted deviceStorage.json file.
   </td>
  </tr>
</table>

#### Example of GVL entry with `cookieMaxAgeSeconds, cookieRefresh, usesNonCookieAccess `and `deviceStorageDisclosureUrl`:

```javascript
...
"1": {
  "id": 1,
  "name": "Ad Server Vendor",
  "purposes": [1, 3, 4],
  "legIntPurposes": [2, 7, 8, 9],
  "flexiblePurposes": [2, 9],
  "specialPurposes": [1, 2],
  "features": [1, 2],
  "specialFeatures": [],
  "policyUrl": "https://adservervendor.eu/privacy-policy/",
  "cookieMaxAgeSeconds": 31536000,
  "cookieRefresh": false,
  "usesNonCookieAccess": true,
  "deviceStorageDisclosureUrl": "https://vendor123.com/.well-known/deviceStorage.json"
}
...
```

## Required Information and JSON Structure

The TCF registration process requires Vendors to provide a URL to a JSON resource that conforms to the content and structure specified below. The Managing Organisation publishes the URL on the GVL along with other Vendor registration information. The MO may publish some registration information separately from the GVL. Because CMPs must load the JSON file in the browser, Vendors must enable [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) at the location servicing the URL.

The JSON contains two types of information, disclosures related to device storage access and duration (the _Disclosures_ object and attribute) and the web domains the Vendor uses (the _Domains_ object and attribute). Both are required, though not all information within each object is required. See the tables below. 

### Disclosures Object

<table>
  <tr>
   <td>Field
   </td>
   <td>Scope
   </td>
   <td>Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td><code>identifier</code>
   </td>
   <td><strong>required</strong>
   </td>
   <td>string
   </td>
   <td>Key or object name, depending on type, for the storage item 
   </td>
  </tr>
  <tr>
   <td><code>type</code>
   </td>
   <td><strong>required</strong>
   </td>
   <td>enum
   </td>
   <td>What type of storage or access mechanism is used. 'cookie', 'web', ‘app’. <em>Note “web” can represent local storage and indexDB.</em>
   </td>
  </tr>
  <tr>
   <td><code>maxAgeSeconds</code>
   </td>
   <td><strong>required if type = 'cookie' else null</strong>
   </td>
   <td>integer
   </td>
   <td>Only required for the type = ‘cookie’; otherwise null. The number, in seconds, of the duration for storage on a device, as set when using cookie storage. <em>Note: this only includes what is declared when the storage is set and does not consider duration extensions should storage be refreshed.</em>
<p>
For types of mechanisms (non-cookie) where duration cannot be set, this field should be null.
   </td>
  </tr>
  <tr>
   <td><code>cookieRefresh</code>
   </td>
   <td><strong>optional</strong>
   </td>
   <td>boolean
   </td>
   <td>Only required for the type = ‘cookie’; otherwise false. Indicates the vendor is refreshing a cookie (see example above). True indicates the vendor refreshes this cookie. False indicates the vendor does not refresh the cookie any time the browser reloads.
   </td>
  </tr>
  <tr>
   <td><code>domain</code>
   </td>
   <td><strong>optional</strong>
   </td>
   <td>string
   </td>
   <td>“*” = any domain (ex. first party cookie)
<p>
“*.vendor.com” means multiple subdomains may exist
<p>
Required if type='cookie' or type='web'
   </td>
  </tr>
  <tr>
   <td><code>purposes</code>
   </td>
   <td><strong>required</strong>
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

#### Example

Below is sample JSON for a fictional company named AdTech123. AdTech123 owns the domain `adtech123.com` and has a "third-party" retargeting cookie that is set on the domain of `retarget.adtech123.com`.  They also maintain a `localStorage` object that contains a `user` object with key “id” that can be accessed via JavaScript at `window.localStorage.id`. AdTech123 hosts this `deviceStorage.json` at https://vendor123.com/path/to/deviceStorage.json.


```javascript
{
  "disclosures": [
    {
      "identifier": "retarget-adtech123",
      "type": "cookie",
      "maxAgeSeconds": 2592000000,
      "cookieRefresh": false,
      "domain": "retarget.adtech123.com", 
      "purposes": [3,4,5,6]
    },
    {
      "identifier": "id",
      "type": "web",
      "maxAgeSeconds": null,
      "cookieRefresh": false,
      "purposes": [3,4,5,6,7,8,9,10]
    }
  ],
  "domains": [
    ...
  ]
}
```
### Domains Object

<table>
  <tr><td>Field</td><td>Scope</td><td>Field</td><td>Description</td></tr>
  <tr><td>domain</td><td>required</td><td>string</td><td>“*.vendor.com” means multiple subdomains may exist.<br><br>Entry must not contain “http(s)://” or text other than the domain.</td></tr>
  <tr><td>use</td><td>optional</td><td>string</td><td>Textual explanation of what the domain is used for.</td></tr>
</table>

#### Example

The example below provides a list of the domains used by the fictional AdTech123 company, including details of what each domain is used for:

```javascript
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
```

## Footnotes
<b id="f1">1</b> Please note the difference of the legal and technical terms of art: The term “cookies” as used by the CJEU should be understood as a substitute for “storing information, or accessing information already stored, on the terminal equipment of an end user”, i.e. the activity covered by Article 5(3) of the ePrivacy Directive and Purpose 1 “Store and/or access information on a device” of the TCF. The ruling should therefore not be misunderstood as only applying to the more limited, technical concept of cookies as defined by the HTTP protocol specification. [↩](#a1)

<b id="f2">2</b> The use of the Global Vendor List to support device storage duration disclosures means publishers and their CMPs will need to coordinate between themselves how to handle the Publisher’s storage disclosures. Those parties are welcome to use the structure defined by this Specification, but are not required to. [↩](#a2)
