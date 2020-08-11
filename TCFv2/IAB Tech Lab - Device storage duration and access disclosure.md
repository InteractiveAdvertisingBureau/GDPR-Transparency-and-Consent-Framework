# Device Storage Duration & Access Disclosure
A new feature introduced for Transparency and Consent Framework (TCF) v2.1

## Summary

This specification provides vendors with a method to disclose the length of time any vendor-specific information may be stored on a device. The required disclosure is an added section in the Global Vendor List (GVL) and is used by CMPs to display the information to consumers. Additionally, vendors disclose additional storage and access via a JSON file which CMPs display to consumers. This form of transparency took on urgency after a ruling by the Court of Justice of the European Union in Case C-673/17 _Planet49_. 

### Planet49 Ruling

In its Planet49 judgment (available [here](http://curia.europa.eu/juris/document/document.jsf;jsessionid=DA9630A1B5B38A1B6EFD5C9CC1DCD815?text=&docid=218462&pageIndex=0&doclang=EN&mode=lst&dir=&occ=first&part=1&cid=8222720)), the Court of Justice of the European Union (CJEU) ruled that the requirements for informed consent under Article 5(3) of the ePrivacy Directive include the disclosure of “the duration of the operation of cookies and whether or not third parties may have access to those cookies” (para. 81).<sup id="a1">[1](#f1)</sup> The CJEU clarified that the information provided must enable the user to determine the consequences of any consent and be sufficiently detailed so as to enable the user to understand the functioning of the cookies employed. This includes the requirement to provide information about the duration of the cookies and whether or not third parties may have access to those cookies.

### Relevant Documents

*   [Transparency and Consent Framework (TCF) version 2 specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/tree/master/TCFv2)
*   [TCF v2 policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/)

## Global Vendor List Fields<sup id="a2">[2](#f2)</sup>

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
   <td><strong>required</strong>
   </td>
   <td>integer
   </td>
   <td>-
   </td>
   <td>The number, in seconds, of the longest potential duration for storage on a device, as set when using the cookie method of storage. A negative number or a 0 indicate session storage similar to the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie">Set-Cookie</a> spec. If a vendor only uses non-cookie storage the value should not be positive.  <em>Note: this only includes what is declared when the storage is set and does not consider duration extensions should storage be refreshed. </em>
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
   <td>Indicates the vendor’s use of non-cookie storage and access to information already stored on a user’s device. True indicates non-cookie access is used. False indicates only cookie storage and access are used. 
   </td>
  </tr>
</table>

### <code>deviceStorageDisclosureUrl</code>

Link to a recommended, vendor-hosted, secure URL for disclosing additional storage information (see “deviceStorage.json” heading below for additional details). 

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
   <td>Location of vendor-hosted deviceStorage.json file
   </td>
  </tr>
</table>

#### Example of GVL entry with `cookieMaxAgeSeconds, usesNonCookieAccess `and `deviceStorageDisclosureUrl`:

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
  "usesNonCookieAccess": true,
  "deviceStorageDisclosureUrl": "https://vendor123.com/.well-known/deviceStorage.json"
}
...
```

## deviceStorage.json

The deviceStorage.json is hosted at the vendor-supplied URL (<code>deviceStorageDisclosureUrl</code>) to disclose additional storage and access information. It is recommended that deviceStorage.json be hosted in a Vendor's .well-known directory; although not required because the URL is provided by <code>deviceStorageDisclosureUrl</code>. Because CMPs will need to be able to load the JSON file in the browser, [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) must be enabled at the serving location specified by <code>deviceStorageDisclosureUrl</code>.

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
   <td><strong>required</strong>
   </td>
   <td>integer
   </td>
   <td>Only required for the type = ‘cookie’; otherwise null. The number, in seconds, of the duration for storage on a device, as set when using cookie storage. <em>Note: this only includes what is declared when the storage is set and does not consider duration extensions should storage be refreshed.</em>
<p>
For types of mechanisms (non-cookie) where duration cannot be set, this field should be null.
   </td>
  </tr>
  <tr>
   <td><code>domain</code>
   </td>
   <td><strong>optional*</strong>
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

Below is an example JSON for a fictional company named AdTech123.  AdTech123 owns the domain `adtech123.com` and has a "third-party" re-targeting cookie that is set on the domain of `retarget.adtech123.com`.  They also maintain a `localStorage` object that contains a `user` object with key “id” that can be accessed via JavaScript at `window.localStorage.id`. AdTech123 hosts this `deviceStorage.json` at https://vendor123.com/path/to/deviceStorage.json


```javascript
{
  "disclosures": [
    {
      "name": "retarget-adtech123",
      "type": "cookie",
      "maxAgeSeconds": 2592000000,
      "domain": "retarget.adtech123.com", 
      "purposes": [3,4,5,6]
    },
    {
      "name": "id",
      "type": "web",
      "maxAgeSeconds": null,
      "purposes": [3,4,5,6,7,8,9,10]
    }
  ]
}
```

## Footnotes
<b id="f1">1</b> Please note the difference of the legal and technical terms of art: The term “cookies” as used by the CJEU should be understood as a substitute for “storing information, or accessing information already stored, on the terminal equipment of an end user”, i.e. the activity covered by Article 5(3) of the ePrivacy Directive and Purpose 1 “Store and/or access information on a device” of the TCF. The ruling should therefore not be misunderstood as only applying to the more limited, technical concept of cookies as defined by the HTTP protocol specification. [↩](#a1)

<b id="f2">2</b> The use of the Global Vendor List to support device storage duration disclosures means publishers and their CMPs will need to coordinate between themselves how to handle any publisher disclosures. Those parties are welcome to use the structure defined for vendors in this spec, but are not required to. [↩](#a2)
