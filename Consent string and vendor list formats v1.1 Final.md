# Consent String and Vendor List Format: Transparency & Consent Framework

**IAB Europe | IAB Tech Lab**

**Final v1.1 | April 2018**

# Table of Contents
1. [Introduction](#Introduction)
2. [About the Transparency & Consent Framework](#About-the-Framework)
3. [About the Transparency & Consent Standard](#About-the-standard)
4. [License](#License)
5. [Disclaimer](#Disclaimer)
6. [About IAB Tech Lab](#About-Tech-Lab)
7. [About IAB Europe](#About-IAB-Europe)
9. [Consent String and Vendor List Format v1.1](#Consent-string-and-vendor-list-format)
9. [Version History](#Version-History)
10. [In the GDPR Global DaisyBit consent solution, what purpose does the consent string serve?](#in-the-GDPR-global-daisybit)
11. [What information is stored in the consent string?](#what-information-is-stored)
12. [What is not being supported in the consent string format?](#not-supported-consent-string)
13. [What is contained in the vendor list JSON?](#contained-in-vendor-list)
14. [What are the URLs for the vendor (and standard purposes lists?](#URLs-vendorlist)
15. [What is the process of getting on the global vendor list?](#process-vendorlist)
16. [What is the format of the global vendor (and standard purposes) list?](#format-vendorlist)
17. [What are the purposes and features being supported?](#purposes-features)
18. [What are the fields of the global vendor consent cookie?](#fields-consent-cookie)
19. [Vendor Consent String Format](#vendor-consent-string-format)
20. [Example Vendor Consent String](#example-vendor-consent-string)
21. [How is publisher-specific consent stored?](#publisher-consent-stored)
22. [Publisher Purposes Consent String Format](#publisher-purposes-consent-string-format)
23. [Major changes](#major-changes)


# Introduction <a name="Introduction"></a>

In February 2017, the IAB Europe assembled parties representing both the supply and demand sides of the digital advertising ecosystem, to work collectively on guidance and solutions to the requirements of the General Data Protection Regulation (GDPR).  That working group is known as the GDPR Implementation Working Group (GIG).  One of the sub-groups within the GIG was tasked with developing guidance on consent as a legal basis for processing personal data. Out of that effort, an additional working group was formed to develop a technical solution to the challenge of obtaining and disseminating consumer consent to the various parties relying on it as a legal basis of processing personal data.

## About the Transparency & Consent Framework <a name="About-the-Framework"></a>

The scope of the technical working group's initiative increased to include a technical industry solution to allow website operators to:
1.  Control the vendors they wish to allow to access their users' browsers (for setting and reading cookies) and process their personal data and disclose these choices to other parties in the online advertising ecosystem
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

* "**_CMP_**" means a company that can read the vendors chosen by a website operator and the consent status of an end user (either service specific (through a first-party cookie) or global (through a third-party cookie).  A CMP is not synonymous with a company that surfaces the user interface to a user (although it can be the same).

* "**_Purposes_**" mean the purposes for which a Controller enabled by a website operator is using personal data collected from (or received by a third party) about an end user.

* "**_Daisybit_**" means information compressed into a binary value and passed throughout the online advertising ecosystem through the OpenRTB specification.

* "**_Vendor_**" means a third party that a website operator is using in connection with surfacing content to its end users that either (1) accesses an end user's device or browser; and/or (2) collects or receives personal data about the website operator's end users.  As such, a vendor need not be a Controller.

## License <a name="License"></a>

Copyright 2018 IAB Technology Laboratory

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Disclaimer <a name="Disclaimer"></a>

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE "PRODUCTS AND SERVICES") ARE PROVIDED "AS IS" AND "AS AVAILABLE," AND IAB TECHNOLOGY LABORATORY, INC. ("TECH LAB") MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.

## About IAB Tech Lab  <a name="About-Tech-Lab"></a>

he IAB Technology Laboratory ("Tech Lab") is a non-profit research and development consortium that produces and provides standards, software, and services to drive growth of an effective and sustainable global digital media ecosystem. Comprised of digital publishers and ad technology firms, as well as marketers, agencies, and other companies with interests in the interactive marketing arena, IAB Tech Lab aims to enable brand and media growth via a transparent, safe, effective supply chain, simpler and more consistent measurement, and better advertising experiences for consumers, with a focus on mobile and "TV"/digital video channel enablement. The IAB Tech Lab portfolio includes the DigiTrust real-time standardized identity service designed to improve the digital experience for consumers, publishers, advertisers, and third-party platforms. Board members include AppNexus, ExtremeReach, Google, GroupM, Hearst Digital Media, Integral Ad Science, Index Exchange, LinkedIn, MediaMath, Microsoft, Moat, Pandora, PubMatic, Quantcast, Telaria, The Trade Desk, and Yahoo! Japan. Established in 2014, the IAB Tech Lab is headquartered in New York City with an office in San Francisco and representation in Seattle and London.

Learn more about IAB Tech Lab here: [https://www.iabtechlab.com/](https://www.iabtechlab.com/)

## About IAB Europe <a name="About-IAB-Europe"></a>

IAB Europe is the voice of digital business and the leading European-level industry association for the interactive advertising ecosystem. Its mission is to promote the development of this innovative sector by shaping the regulatory environment, investing in research and education, and developing and facilitating the uptake of business standards.
 
Learn more about IAB Europe here: [https://www.iabeurope.eu/](https://www.iabeurope.eu/)

# Consent string and vendor list format v1.1 <a name="Consent-string-and-vendor-list-format"></a>

## Version History <a name="Version-History"></a>

2018/04/24 - Version 1.1 final publication

2018/03/08 - Version 1.1 published for 30-day public comment

2017/12/19 - Initial version v1.0 created

## In the GDPR Global DaisyBit consent solution, what purpose does the consent string serve? <a name="in-the-GDPR-global-daisybit"></a>

After the interaction between an end user and the Consent Manager Provider (CMP) UI, the consent info is stored (for example, as a third-party cookie) in the user's browser. The data in the consent string answers the question: "Which vendors and purposes did the user give consent for?"

## What information is stored in the consent string? <a name="what-information-is-stored"></a>

The data stored in the consent string is divided into 3 parts:

1. Metadata of the consent info, e.g. consent string version, when updated, vendor list version, what compression scheme applied on the data.

2. What standard purposes (not per-vendor) the user has given consent for ([See Policy FAQ](http://advertisingconsent.eu/#resources)). 

3. What vendors the user gave consent to.

## What is not being supported in the consent string format? <a name="not-supported-consent-string"></a>

* Multiple vendor lists support (or regional lists)

* Intelligent handling of deleted vendors

* Distinct recording of "Consent Revoked" (as opposed to "No Consent")

* "Not yet consented" state per vendor (it's either "Consent" or "No Consent", or string-not-present).

* Legal audit trail within the consent string. However, the following details are stored for consent logging and audit record: LastUpdated, CmpId, CmpVersion, ConsentScreen, ConsentLanguage, and VendorListVersion.

## What is contained in the vendor list JSON? <a name="contained-in-vendor-list"></a>

* A vendor list version

* A list of standard purposes (identifies PurposesAllowed and StandardPurposesAllowed consent bits) ([See Policy FAQ for definitions.](http://advertisingconsent.eu/#resources))

* A list of standard features. Vendors can indicate that they use features. Since they span data purposes, they are not individually consentable-to by the user, but should be shown in the vendor details in the UI. 

* A list of vendors with assigned VendorIds, the standard purposes they are requesting consent for, the standard purposes they will be using legitimate interest for, and the URL of their GDPR policy page. VendorIds are incrementally-assigned and never reused; deleted vendors are just marked as deleted.

## What are the URLs for the vendor (and standard purposes) lists? <a name="URLs-vendorlist"></a>

The vendor list will be in JSON and hosted at [https://vendorlist.consensu.org/vendorlist.json](https://vendorlist.consensu.org/vendorlist.json) . Previous and the current version are available at [https://vendorlist.consensu.org/v-](https://vendorlist.consensu.org/vendorlist-versionnum.json)[*versionnum*/](https://vendorlist.consensu.org/vendorlist-versionnum.json)[vendorlist](https://vendorlist.consensu.org/vendorlist-versionnum.json)[.json](https://vendorlist.consensu.org/vendorlist-versionnum.json) , where *versionnum* is a decimal number from 0 to 4095 as indicated in the VendorListVersion field.

Translations of the standard purposes' names and descriptions to non-English languages will be contained in a JSON file including only the 'purposes', 'features', 'vendorListVersion', and 'lastUpdated' keys, and hosted at [https://vendorlist.](https://vendorlist.consensu.org/purposes-language.json)[consensu.org](https://vendorlist.consensu.org/purposes-language.json)[/purposes-](https://vendorlist.consensu.org/purposes-language.json)[*language*](https://vendorlist.consensu.org/purposes-language.json)[.json](https://vendorlist.consensu.org/purposes-language.json) with older versions at [https://vendorlist.consensu.org/v-](https://vendorlist.consensu.org/purposes-language-versionnum.json)*[versionnum*/](https://vendorlist.consensu.org/purposes-language-versionnum.json)[purposes-](https://vendorlist.consensu.org/purposes-language-versionnum.json)[*language*](https://vendorlist.consensu.org/purposes-language-versionnum.json)[.json](https://vendorlist.consensu.org/purposes-language-versionnum.json) where *language* is the two-letter lowercase ISO 639-1 language code.

## What is the process of getting on the global vendor list? <a name="process-vendorlist"></a>

Access [http://advertisingconsent.eu/](http://advertisingconsent.eu/) to register on the global vendor list. Registration guidelines are available on this website as well.

## What is the format of the global vendor (and standard purposes) list? <a name="format-vendorlist"></a>

Purposes, features, and vendors will be sorted by "id".

The JSON format is:

```
{

  "vendorListVersion": 0, *// will be incremented each change*

*  *"lastUpdated": "2018-05-28T00:00:00Z",

  "purposes": [

    { 

      "id": 1,

      "name": "Storage and access of information",

      "description": "The storage of information, or access to information that is already stored, on user device such as accessing advertising identifiers and/or other device identifiers, and/or using cookies or similar technologies.."

    },

    *... more purposes from id=2 to currently, id=5 (max, id=24)*

*  *],

  "features" : [

    {

      "id": 1

      "name": "Matching Data to Offline Sources",

       "description": "combining data from offline sources that were initially collected in other contexts"

    },

    *... more purposes from id=2 up to no higher than id=64. Currently there are 3 planned features*

  ],

  "vendors": [

    {

      "id": 1,

      "name": "Vendor Name",

      "purposeIds": [1], *// list of consentable data purposes*

*      *"legIntPurposeIds": [2, 3], *// list of (non-consentable) data purposes that will be used under legitimate interest*

*     ** *"featureIds": [1, 2], // *list of features*

      "policyUrl": "[https://vendorname.com/gdpr.html](https://vendorname.com/gdpr.html)",

      "deletedDate": "2018-05-28T00:00:00Z", *// if present, vendor should be considered deleted after this date/time*

    },

    *... more vendors, expecting several hundred vendors in the initial Global Vendor List*

  ]

}
```

## What are the purposes and features being supported? <a name="purposes-features"></a>

The entries below are valid for the v1.1 release. Purposes and features are subject to change, so are included in the Global Vendor List. For most up-to-date policy defined purposes, please refer to [http://advertisingconsent.eu/#resources](http://advertisingconsent.eu/#resources). 

Purposes are individually-consentable data uses. Due to space constraints in the consent string, they are not consentable on a per-vendor basis, but which vendors utilize which purpose should be shown in the UI for each vendor. Consent for a purpose applies only to vendors that have declared (via the Global Vendor List) that they use that purpose.

Features are informational and should be shown on the UI as a data use by that vendor for transparency purposes, but since they can span multiple (consentable) purposes, they are not individually consentable.

<table>
  <tr>
    <td>purpose number</td>
    <td>purpose name</td>
    <td>purpose description</td>
  </tr>
  <tr>
    <td>1</td>
    <td>Storage and access of information </td>
    <td>The storage of information, or access to information that is already stored, on user device such as accessing advertising identifiers and/or other device identifiers, and/or using cookies or similar technologies.  </td>
  </tr>
  <tr>
    <td>2</td>
    <td>Personalisation</td>
    <td>The collection and processing of information about user of a site to subsequently personalize advertising for them in other contexts, i.e. on other sites or apps, over time. Typically, the content of the site or app is used to make inferences about user interests, which inform future selections.</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Ad selection, reporting and delivery </td>
    <td>The collection of information and combination with previously collected information, to select and deliver advertisements and to measure the delivery and effectiveness of such advertisements. This includes using previously collected information about user interests to select ads, processing data about what advertisements were shown, how often they were shown, when and where they were shown, and whether they took any action related to the advertisement, including for example clicking an ad or making a purchase.</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Content delivery, selection and reporting</td>
    <td>The collection of information, and combination with previously collected information, to select and deliver content and to measure the delivery and effectiveness of such content. This includes using previously collected information about user interests to select content, processing data about what content was shown, how often or how long it was shown, when and where it was shown, and whether they took any action related to the content, including for example clicking on content. 
</td>
  </tr>
  <tr>
    <td>5</td>
    <td>Measurement</td>
    <td>The collection of information about user use of content, and combination with previously collected information, used to measure, understand, and report on user usage of content. </td>
  </tr>
  <tr>
    <td>feature number</td>
    <td>feature name</td>
    <td>feature description</td>
  </tr>
  <tr>
    <td>1</td>
    <td>Matching Data to Offline Sources</td>
    <td>combining data from offline sources that were initially collected in other contexts</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Linking Devices</td>
    <td>allow processing of a user's data to connect such user across multiple devices.</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Precise Geographic Location Data</td>
    <td>allow processing of a user's precise geographic location data in support of a purpose for which that certain third party has consent.</td>
  </tr>
</table>


## What are the fields of the global vendor consent cookie? <a name="fields-consent-cookie"></a>

<table>
  <tr>
    <td>Cookie Directive</td>
    <td>Value(s)</td>
    <td>Notes</td>
  </tr>
  <tr>
    <td>Name</td>
    <td>euconsent</td>
    <td></td>
  </tr>
  <tr>
    <td>Host</td>
    <td>.consensu.org</td>
    <td>The DNS resolution for the name cmp-name.mgr.consensu.org will be delegated by the standardizing authority (IAB) to each CMP. CMP's will host their code, API's, and CDN at this domain or subdomains.</td>
  </tr>
  <tr>
    <td>Path</td>
    <td>/</td>
    <td></td>
  </tr>
  <tr>
    <td>Max-Age</td>
    <td>33696000</td>
    <td>This represents thirteen 30-day months.</td>
  </tr>
  <tr>
    <td>Value</td>
    <td>base64url-encoding of the concatenated Cookie Value Fields bits described below. Padding '=' characters should be omitted.</td>
    <td>The binary bits should be padded at the end with zeroes to the nearest multiple of 8 bits, packed into a string of bytes, and have base64url-encoding performed.</td>
  </tr>
</table>


## Vendor Consent String Format <a name="vendor-consent-string-format"></a>

The following fields are stored in big-endian format. Example values are provided below, and bit numberings are left-to-right.

<table>
  <tr>
    <td>Vendor Consent String Field Name</td>
    <td>Number of bits (bit offsets)</td>
    <td>Value(s)</td>
    <td>Notes</td>
  </tr>
  <tr>
    <td>Version</td>
    <td>6 bits 
(0-5)</td>
    <td>"1" for this version</td>
    <td>Incremented when consent string format changes</td>
  </tr>
  <tr>
    <td>Created</td>
    <td>36 bits
(6-41)</td>
    <td>Epoch deciseconds when consent string was first created</td>
    <td>Deciseconds fits into 36 bits with enough precision to record a 
user's consent action timing. Javascript: Math.round((new Date()).getTime()/100)</td>
  </tr>
  <tr>
    <td>LastUpdated</td>
    <td>36 bits
(42-77)</td>
    <td>Epoch deciseconds when consent string was last updated</td>
    <td></td>
  </tr>
  <tr>
    <td>CmpId</td>
    <td>12 bits
(78-89)
</td>
    <td>Consent Manager Provider ID that last updated the consent string</td>
    <td>A unique ID will be assigned to each Consent Manager Provider</td>
  </tr>
  <tr>
    <td>CmpVersion</td>
    <td>12 bits
(90-101)</td>
    <td>Consent Manager Provider version</td>
    <td>Each change to the CMP should receive a new version number, for logging proof of consent</td>
  </tr>
  <tr>
    <td>ConsentScreen</td>
    <td>6 bits
(102-107)</td>
    <td>Screen number in the CMP where consent was given</td>
    <td>The screen number is CMP and CmpVersion specific, and is for logging proof of consent</td>
  </tr>
  <tr>
    <td>ConsentLanguage</td>
    <td>12 bits
(108-119)</td>
    <td>Two-letter ISO639-1 language code that CMP asked for consent in</td>
    <td>Each letter should be encoded as 6 bits, A=0..Z=25 . This will result in the base64url-encoded bytes spelling out the language code (in uppercase).</td>
  </tr>
  <tr>
    <td>VendorListVersion</td>
    <td>12 bits
(120-131)</td>
    <td>Version of vendor list used in most recent consent string update.</td>
    <td>Vendor list versions will be released periodically. 12 bits allows for 78 years of weekly updates.</td>
  </tr>
  <tr>
    <td>PurposesAllowed</td>
    <td>24 bits
(132-155)</td>
    <td>For each Purpose, one bit:
0=No Consent
1=Consent</td>
    <td>Purposes are listed in the global Vendor List. Resultant consent value is the "AND" of the applicable bit(s) from this field and a vendor's specific consent bit. Purpose #1 maps to the first (most significant) bit, purpose #24 maps to the last (least significant) bit.</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>Above fields are multiples of 6 bits to fit into base64url-encoded bytes.</td>
  </tr>
  <tr>
    <td>MaxVendorId</td>
    <td>16 bits
(156-171)</td>
    <td>The maximum VendorId for which consent values are given.</td>
    <td>VendorIds are numbered 1 to MaxVendorId. Allows the consent string  to be interpreted without waiting for the vendor list fetch.</td>
  </tr>
  <tr>
    <td>EncodingType</td>
    <td>1 bit
(172)</td>
    <td>0=BitField
1=Range</td>
    <td>The consent encoding used. Either a BitFieldSection or RangeSection follows. Consent string encoding logic should choose the encoding that results in the smaller output.</td>
  </tr>
  <tr>
    <td>BitFieldSection</td>
    <td></td>
    <td></td>
    <td>Encodes one consent bit per VendorId</td>
  </tr>
  <tr>
    <td>BitField</td>
    <td>MaxVendorId bits
(173-...)</td>
    <td>For each Vendor, one bit:
0=No Consent
1=Consent</td>
    <td>The consent value for each VendorId from 1 to MaxVendorId</td>
  </tr>
  <tr>
    <td>RangeSection
</td>
    <td></td>
    <td></td>
    <td>Encodes a default consent value and any number of single or range override entries</td>
  </tr>
  <tr>
    <td>DefaultConsent</td>
    <td>1 bit
(173)</td>
    <td>0=No Consent
1=Consent</td>
    <td>Default consent for VendorIds not covered by a RangeEntry. VendorIds covered by a RangeEntry have a consent value the opposite of DefaultConsent. </td>
  </tr>
  <tr>
    <td>NumEntries</td>
    <td>12 bits
(174-185)</td>
    <td>Number of entries to follow</td>
    <td>NumEntries instances of RangeEntry follow.</td>
  </tr>
  <tr>
    <td>RangeEntry
(repeated NumEntries times, indicated by [idx])</td>
    <td></td>
    <td></td>
    <td>A single or range of VendorIds, whose consent value is the opposite of DefaultConsent. All VendorIds must be between 1 and MaxVendorId.</td>
  </tr>
  <tr>
    <td>SingleOrRange[idx]</td>
    <td>1 bit</td>
    <td>0=Single VendorId
1=VendorId range</td>
    <td>Whether a single VendorId or a start/end range of VendorIds is given</td>
  </tr>
  <tr>
    <td>SingleVendorId[idx]</td>
    <td>16 bits</td>
    <td>A single VendorId.</td>
    <td>Exclusive with Start/EndVendorId.</td>
  </tr>
  <tr>
    <td>StartVendorId[idx]</td>
    <td>16 bits</td>
    <td>The start of an inclusive range of VendorIds</td>
    <td>Exclusive with SingleVendorId. Must be paired with a EndVendorId</td>
  </tr>
  <tr>
    <td>EndVendorId[idx]</td>
    <td>16 bits</td>
    <td>The end of an inclusive range of VendorIds </td>
    <td>Exclusive with SingleVendorId. Must be paired with a StartVendorId.</td>
  </tr>
</table>


## Example Vendor Consent String <a name="example-vendor-consent-string"></a>

Example consent string field values for the case:

* all VendorId consents given, except VendorId=9

* for VendorListVersion=8 which has 2011 VendorIds defined

* by Consent Manager Provider Id #7

<table>
  <tr>
    <td>Field</td>
    <td>Decimal Value</td>
    <td>Meaning</td>
    <td>Binary Value</td>
  </tr>
  <tr>
    <td>Version</td>
    <td>1</td>
    <td>Consent String Format Version #1</td>
    <td>000001</td>
  </tr>
  <tr>
    <td>Created </td>
    <td>15100821554 </td>
    <td>2017-11-07T19:15:55.4Z</td>
    <td>001110000100000101000100000000110010</td>
  </tr>
  <tr>
    <td>LastUpdated</td>
    <td>15100821554</td>
    <td>2017-11-07T19:15:55.4Z</td>
    <td>001110000100000101000100000000110010</td>
  </tr>
  <tr>
    <td>CmpId</td>
    <td>7</td>
    <td>The ID assigned to the CMP</td>
    <td>000000000111</td>
  </tr>
  <tr>
    <td>CmpVersion</td>
    <td>1</td>
    <td>Consent Manager Provider version for logging</td>
    <td>000000000001</td>
  </tr>
  <tr>
    <td>ConsentScreen</td>
    <td>3</td>
    <td>Screen number in the CMP where consent was given</td>
    <td>000011</td>
  </tr>
  <tr>
    <td>ConsentLanguage</td>
    <td>"EN" (E=4, N=13)</td>
    <td>Two-letter ISO639-1 language code that CMP asked for consent in</td>
    <td>000100 001101</td>
  </tr>
  <tr>
    <td>VendorListVersion</td>
    <td>8</td>
    <td>The vendor list version at the time this consent string value was set</td>
    <td>000000001000</td>
  </tr>
  <tr>
    <td>PurposesAllowed</td>
    <td>14680064</td>
    <td>Purposes #1, 2, and 3 are allowed</td>
    <td>111000000000000000000000</td>
  </tr>
  <tr>
    <td>MaxVendorId</td>
    <td>2011</td>
    <td>Number of VendorIds in that vendor list</td>
    <td>0000011111011011</td>
  </tr>
  <tr>
    <td>EncodingType</td>
    <td>1</td>
    <td>Range encoding (not bitfield)</td>
    <td>1</td>
  </tr>
  <tr>
    <td>DefaultConsent</td>
    <td>1</td>
    <td>Default is "Consent"</td>
    <td>1</td>
  </tr>
  <tr>
    <td>NumEntries</td>
    <td>1</td>
    <td>One "range or single" entry</td>
    <td>000000000001</td>
  </tr>
  <tr>
    <td>SingleOrRange[0]</td>
    <td>0</td>
    <td>A single VendorId (which is "No Consent")</td>
    <td>0</td>
  </tr>
  <tr>
    <td>SingleVendorId[0]</td>
    <td>9</td>
    <td>VendorId=9 has No Consent (opposite of Default Consent)</td>
    <td>0000000000001001</td>
  </tr>
  <tr>
    <td>base64url-encoded consent string value</td>
    <td></td>
    <td></td>
    <td>BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA</td>
  </tr>
</table>


## How is publisher-specific consent stored? <a name="publisher-consent-stored"></a>

Under this proposal, there are two types of publisher-specific consent: service-specific vendor consent, and a publisher's purposes consent for its own data use (if needed). For example, a publisher that wants to set a frequency-capping first-party cookie should request Publisher Purposes Consent for Purpose #1 "Accessing a Device".

Service-specific vendor consent can be implemented (optionally) by a CMP using the same Vendor Consent String Format (as detailed above) with the Host, Path, and/or Cookie Name referencing a first-party cookie (or service-shared 3rd-party cookie).  If a CMP allows a subset of vendors to be configured by a publisher, storage of consent in a service-specific cookie is necessary to avoid clearing previously-given consent (on non-included vendors) on the global cookie.

The following table indicates which fields are used by which cookie:

<table>
  <tr>
    <td>Consent String Format Type</td>
    <td>Cookie Location</td>
    <td>Purpose</td>
  </tr>
  <tr>
    <td>Vendor Consent</td>
    <td>3rd-party global location
(.consensu.org). Required cookie name: euconsent</td>
    <td>global vendor consent</td>
  </tr>
  <tr>
    <td>Vendor Consent</td>
    <td>1st-party publisher-configured name & location. Could instead be a 3rd-party shared location, for a service-specific cookie that spans publisher sites. Recommended default cookie name: euconsent</td>
    <td>service-specific vendor consent </td>
  </tr>
  <tr>
    <td>Publisher Purposes Consent</td>
    <td>1st-party publisher-configured name & location (again, could be a shared 3rd-party location as well). Recommended default cookie name: eupubconsent</td>
    <td>publisher's own data usages consent (not looked at by vendors)</td>
  </tr>
</table>


A publisher's purposes consent string stores the publisher's own consent. This is different than the consent string used to collect consumer consent for vendors. The publisher can configure the CMP to request consent for any of the standard list of purposes (which utilizes the StandardPurposesAllowed bitfield and the standard list of purposes from the Vendor List) and/or custom purposes (initialized by the publisher). 

Differences from the Vendor Consent String Format are:

* "PublisherPurposesVersion" augments "VendorListVersion" and is incremented each time the publisher modifies the requested purposes.

* "NumCustomPurposes" replaces "MaxVendorId" and is reduced to 6 bits.

* "BitField" encoding is always used and is indexed by CustomPurposeId's.

* Host, Path, and Cookie Name are configured in the CMP by the publisher, and the consent string data is stored as a first-party cookie by the CMP javascript.

### Publisher Purposes Consent String Format <a name="publisher-purposes-consent-string-format"></a>

The following fields are stored in big-endian format, the binary bits padded at the end with zeroes to the nearest multiple of 8 bits, packed into a string of bytes, and [base64url-encoding](https://tools.ietf.org/html/rfc4648#section-5) performed (with '=' padding omitted).

<table>
  <tr>
    <td>Publisher Purposes Consent String Field Name</td>
    <td>Number of bits
(bit offsets)</td>
    <td>Value(s)</td>
    <td>Notes</td>
  </tr>
  <tr>
    <td>Version</td>
    <td>6 bits
(0-5)</td>
    <td>"1" for this version</td>
    <td>Incremented when consent string format changes</td>
  </tr>
  <tr>
    <td>Created</td>
    <td>36 bits
(6-41)</td>
    <td>Epoch deciseconds when consent string value was first created</td>
    <td>Deciseconds fits into 36 bits with enough precision to record a 
user's consent action timing. Javascript: Math.round((new Date()).getTime()/100)</td>
  </tr>
  <tr>
    <td>LastUpdated</td>
    <td>36 bits
(42-77)</td>
    <td>Epoch deciseconds when consent string value was last updated</td>
    <td></td>
  </tr>
  <tr>
    <td>CmpId</td>
    <td>12 bits
(78-89)
</td>
    <td>Consent Manager Provider ID that last updated the consent string value</td>
    <td>A unique ID will be assigned to each Consent Manager Provider</td>
  </tr>
  <tr>
    <td>CmpVersion</td>
    <td>12 bits
(90-101)</td>
    <td>Consent Manager Provider version</td>
    <td>Each change to the CMP should receive a new version number, for logging proof of consent</td>
  </tr>
  <tr>
    <td>ConsentScreen</td>
    <td>6 bits
(102-107)</td>
    <td>Screen number in the CMP where consent was given</td>
    <td>The screen number is CMP and CmpVersion specific, and is for logging proof of consent</td>
  </tr>
  <tr>
    <td>ConsentLanguage</td>
    <td>12 bits
(108-119)</td>
    <td>Two-letter ISO639-1 language code that CMP asked for consent in</td>
    <td>Each letter should be encoded as 6 bits, a=0..z=25 . This will result in the base64url-encoded bytes spelling out the language code (in uppercase).</td>
  </tr>
  <tr>
    <td>VendorListVersion</td>
    <td>12 bits
(120-131)</td>
    <td>Version of vendor list used in most recent consent string value update.</td>
    <td>The vendor list provides the list of standard purposes, so the version of the vendor list used is recorded.</td>
  </tr>
  <tr>
    <td>PublisherPurposesVersion</td>
    <td>12 bits
(132-143)</td>
    <td>Version of publisher purposes list used in most recent consent string value update.</td>
    <td>Publishers initialize the CMP with this version, and should increment it for any changes to the list of requested purposes so that consent can be re-obtained.</td>
  </tr>
  <tr>
    <td>StandardPurposesAllowed</td>
    <td>24 bits
(144-167)</td>
    <td>For each standard purpose, one bit:
0=No Consent
1=Consent</td>
    <td>Standard purposes are listed in the global Vendor List.</td>
  </tr>
  <tr>
    <td>NumberCustomPurposes</td>
    <td>6 bits
(168-173)</td>
    <td>The number of custom purposes consent bits.</td>
    <td>CustomPurposeIds are numbered 1 to NumberCustomPurposes. Custom purposes will be initialized in the CMP by the publisher.</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>Above fields are multiples of 6 bits to fit into base64url-encoded bytes.</td>
  </tr>
  <tr>
    <td>CustomPurposesBitField</td>
    <td>NumberCustomPurposes bits
(174-...)</td>
    <td>For each custom purpose, one bit:
0=No Consent
1=Consent</td>
    <td>The consent value for each CustomPurposeId from 1 to NumberCustomPurposes</td>
  </tr>
</table>


## Major changes from v1.0 <a name="major-changes"></a>

* 2018-03-20 Features added to vendorlist

* 2018-03-22 "Consent Cookie" wording and title changed to "Consent String" in all places not specifically referring to a cookie

* 2018-03-22 legitimate interest purposes supported (per vendor) with *legIntPurposeIds*

* 2018-03-27 added recommended cookie names for publisher-local cookies

* 2018-04-02 change purposes[].purpose to purposes[].name for consistency

* 2018-04-09 Changed CmpVersion from 6 to 12 bits

