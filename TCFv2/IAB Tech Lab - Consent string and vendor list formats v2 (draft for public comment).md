## IAB Europe Transparency & Consent Framework 
# Transparency and Consent String with Global Vendor List Format

**Draft for Public Comment April 25 2019  **

**V2.0**

This version of the Transparency and Consent String with Global Vendor List Format is provided for public comment beginning April 25th, 2019. Please give special attention to the appendices which propose solutions for handling out of band (OOB) legal basis (Appendix A) and country-specific consent (Appendix B).

**Please submit any technical feedback to [transparencyframework@iabtechlab.com](transparencyframework@iabtechlab.com) by EOD May 25, 2019.**


[Version History](#versionhistory)

### [Introduction](#introduction)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Audience](#audience)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Relevant Documents](#relevantdocs)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[About the Transparency & Consent Framework](#aboutTCframework)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[License](#license)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[About IAB Tech Lab](#about-iabtechlab)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[About IAB Europe](#about-iabeurope)**<br>

### [About the Transparency & Consent String (TC String)](#about-tcstring)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Definitions](#definitions)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What purpose does the TC String serve?](#tcstring-purpose)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What information is stored in the TC String?](#info-stored)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Who should create the TC String?](#who-create)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[When should the TC String be created?](#when-create)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What are the different scopes for a TC String?](#tcstring-scopes)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Working with global TC Strings](#global-tcstrings)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What are publisher restrictions?](#pubrestrictions)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How should the Transparency & Consent String be stored?](#howtostore)**<br>

### [The Global Vendor List](#globalvendorlist)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[I’m a vendor, how do I get added to the Global Vendor List?](#howtogetadded)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What is contained in the Global Vendor List?](#contained-in-globalvendorlist)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Where can I access the Global Vendor List?](#listaccess)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[TCF version 1 of the Global Vendor List (deprecated)](#TCFv1)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Translations for Purposes, Special Purposes, Features, and Special Features](#translations)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How often is the Global Vendor List updated?](#howoftenupdated)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[CMPs using the GVL](#CMPs-using-GVL)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Vendors using the GVL](#vendors-using-GVL)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Caching the Global Vendor List](#cachingGVL)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[CMPs caching the GVL](#CMPscaching)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Vendors caching the GVL](#vendorscaching)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Caching previous versions of the GVL](#caching-prev-ver)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Using a compressed version of the Global Vendor List](#compressedGVL)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Global Vendor List change control](#GVL-changecontrol)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Example Global Vendor List JSON Object](#GVLexampleJSON)**<br>

### [Creating a TC String](#creatingTCstring)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What are the Purposes and Features being supported?](#supported-pandf)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How should the TC String be created?](#howshouldcreate)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[TC String Format](#tcstringformat)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How is the checksum used to check the TC String?](#checksum-tcstring)**<br>

### [Examples: TC String and GVL](#ex-tcs-GVL)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Example TC String](#example-tcstring)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Example Global Vendor List JSON Object](#ex-GVL-JSON)**<br>

### [Appendix A: Proposal for handling legal bases established out-of-band (OOB)](OOB-proposal)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Proposed additions to the TC String format](#proposed-additions)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Special considerations](#special-considerations)**<br>

### [Appendix B: Proposal for handling specific jurisdiction consent](#appendixb)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Proposed solution](#b-proposed-solution)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Usage for CMPs](#b-usage-CMPs)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Usage for Vendors](#b-usage-vendors)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Important notes](#b-notes)**<br>



## Version History: <a name="versionhistory"></a>


<table>
  <tr>
   <td>Date
   </td>
   <td>Version
   </td>
   <td>Comments
   </td>
  </tr>
  <tr>
   <td>April 2019
   </td>
   <td>2.0
   </td>
   <td>Released for public comment
   </td>
  </tr>
  <tr>
   <td>April 2018
   </td>
   <td>1.1
   </td>
   <td>First version released to the public
   </td>
  </tr>
</table>



## Introduction <a name="introduction"></a>

This document is one of the IAB Europe Transparency and Consent Framework Specifications. It defines the technical implementation of the structure and encoding for a Transparency and Consent String (TC String), and the format for a Global Vendor List (GVL) maintained by IAB Europe. The TC String is a technical component of the IAB Europe Transparency & Consent Framework (TCF or “the Framework”).

The General Data Protection Regulation (GDPR) requires a high level of accountability for how personal data is processed. While important to all parties in the digital advertising ecosystem, implementation of the GDPR came with heavy technical challenges.

The GDPR requires, amongst others, a legal basis for such processing. The two most relevant legal bases the consent of the user to the processing of their personal data, and the legitimate interests of the controller or a third party to the processing of a user’s personal data, provided that the interests and fundamental rights of the user are not overriding. Both legal bases require the provision of disclosures to ensure transparency, and the opportunity for user choice either through the user’s consent to the processing of their personal data before the processing starts if the legal basis is consent, or through the user’s objection to the processing of their personal data after the processing starts if the legal basis is a legitimate interest. Under the GDPR, controllers are required to create and maintain records of compliance, including, but not limited to user consent records. This warrants clear standards for a common technical solution for all affected parties and policies to govern how that solution is used.

IAB Europe established the TCF to support compliance with the GDPR in the context of digital advertising. This framework is built on four components: a Global Vendor List (GVL), a Transparency and Consent String (TC String), an API for Consent Management Providers (CMPs) to create and process the TC String, and the Policies that govern how the TCF is used.

Prescribed use of the TCF may support compliance with the GDPR, but the real benefit to the digital advertising ecosystem is a safer Internet for consumers, and more reliable data for brands and publishers. As adoption of the TCF increases, compliance becomes more scalable and data becomes more meaningful.

To participate in the use of the TCF, become familiar with the Policies for using it. To have transparency and consent established and signaled status for your online services stored in a global database, apply to be added to the GVL. To play a role in creating a TC String for signaling status on transparency and user consent, sign up with IAB Europe to become a CMP. CMPs must follow technical standards provided in this document for creating TC Strings in compliance with TCF Policies. They must also follow technical standards guidance for using the CMP API specified in this document to receive and process information provided in the TC String.


### Audience <a name="audience"></a>

Engineers for a registered CMP can use this document to design or update a solution for generating a TC String. In particular, first parties (content publishers, advertisers, and other suppliers of online services) and third-party (vendors for data-driven services) organizations should be familiar with the purpose and scope of a TC String as well as what information it provides, and support its implementation.


### Relevant Documents <a name="relevantdocs"></a>

IAB Europe Transparency & Consent Framework Policies

Consent Manager Provider JS API


### About the Transparency & Consent Framework <a name="aboutTCframework"></a>

IAB Europe Transparency & Consent Framework (TCF) has a simple objective to help all parties in the digital advertising chain ensure that they comply with the EU’s General Data Protection Regulation and ePrivacy Directive when processing personal data or accessing and/or storing information on a user’s device, such as cookies, advertising identifiers, device identifiers and other tracking technologies.

Resources including policy FAQ, Global Vendor List, and CMP List can be found at [iabeurope.eu/tcf](http://iabeurope.eu/tcf).


### License <a name="license"></a>

IAB Europe Transparency and Consent Framework technical specifications governed by the IAB Tech Lab is licensed under a Creative Commons Attribution 3.0 License.   To view a copy of this license, visit [creativecommons.org/licenses/by/3.0/](http://creativecommons.org/licenses/by/3.0/) or write to Creative Commons, 171 Second Street, Suite 300, San Francisco, CA 94105, USA.

![](https://camo.githubusercontent.com/1ff27c0c79d2341ccab9cc19089e67d1985b8228/68747470733a2f2f64726976652e676f6f676c652e636f6d2f75633f69643d3163627745476c6238533639536e6449446f486e7663355f3354666d6b474d3752)


Disclaimer

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE “PRODUCTS AND SERVICES”) ARE PROVIDED “AS IS” AND “AS AVAILABLE,” AND IAB TECHNOLOGY LABORATORY, INC. (“TECH LAB”) MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.


### About IAB Tech Lab <a name="about-iabtechlab"></a>

The IAB Technology Laboratory (Tech Lab) is a non-profit consortium that engages a member community globally to develop foundational technology and standards that enable growth and trust in the digital media ecosystem.. Comprised of digital publishers, ad technology firms, agencies, marketers, and other member companies, IAB Tech Lab focuses on improving the digital advertising supply chain, measurement, and consumer experiences, while promoting responsible use of data. Its work includes the OpenRTB real-time bidding protocol, ads.txt anti-fraud specification, Open Measurement SDK for viewability and verification, VAST video specification, and DigiTrust identity service. Board members include ExtremeReach, Facebook, Google, GroupM, Hearst Digital Media, Index Exchange, Integral Ad Science, LinkedIn, LiveRamp, MediaMath, Microsoft, Oracle Data Cloud, Pandora, PubMatic, Quantcast, Rakuten Marketing, Telaria, The Trade Desk, Verizon Media Group, Xandr, and Yahoo! Japan. Established in 2014, the IAB Tech Lab is headquartered in New York City with staff in San Francisco, Seattle, and London. Learn more at [iabtechlab.com](https://www.iabtechlab.com/).


### About IAB Europe <a name="about-iabeurope"></a>

IAB Europe is the leading European-level industry association for the digital advertising ecosystem. Its mission is to promote the development of this innovative sector and ensure its sustainability by shaping the regulatory environment, demonstrating the value digital advertising brings to Europe’s economy, to consumers and to the market, and developing and facilitating the uptake of harmonised business practices that take account of changing user expectations and enable digital brand advertising to scale in Europe.



Learn more about IAB Europe here: [iabeurope.eu](https://www.iabeurope.eu/)  



## About the Transparency & Consent String (TC String) <a name="about-tcstring"></a>

In the TCF, a TC String is used to provide relevant details about how transparency and consent was established and encoded as it applies for each of the Purposes and/or Special Features defined by the Policies and for participating Vendors. This document specifies how that string must be formatted, who should use it, and how it must be used.


### Definitions <a name="definitions"></a>

Regarding specific definitions as they relate to TCF Policies and the technology described in this document, please refer to IAB Europe Transparency and Consent Framework Policies located at the following link:

[https://www.iabeurope.eu/policy/draft-for-public-comment-of-transparency-consent-framework-policies/](https://www.iabeurope.eu/policy/draft-for-public-comment-of-transparency-consent-framework-policies/)


### What purpose does the TC String serve? <a name="tcstring-purpose"></a>

All the information communicated to or obtained from the end user through a Consent Management Platform (CMP) is saved in the Transparency & Consent String (TC String). This information includes the Vendors and Purposes to which the user consented, as well as the Vendors and Purposes for which transparency for processing on the basis of a legitimate interest was established. Where legitimate interest is concerned, a user’s right to object is also signalled in the TC String. And there is a provision for Publishers to restrict the Purposes by Vendor.

All this information is stored for each user so that when they return to a Publisher’s service, their preferences are remembered and they do not have to interact with the CMP again, unless there are significant changes they need to consider, such as a change of legal basis for one of the vendors disclosed on the site or new vendors published to the Global Vendor List that had not been disclosed to the user.


### What information is stored in the TC String? <a name="info-stored"></a>

The TC String contains the following information:



1. **General metadata:** standard markers that indicate details about the TC String such as which version, when it was last updated, the version of the Global Vendor List used, etc.
2. **User consent:** the user’s expression of consent given for processing user’s personal data. The information provided signals user’s consent status on two levels:
    * Per standard Purpose
    * Per Vendor
3. **Legitimate interest:** the status on whether a CMP has established legitimate interest transparency for a vendor or purpose and user objection to legitimate interests. The information provided includes:
    * Legitimate interest transparency status per standard Purpose
    * Legitimate interest transparency status per Vendor
    * User objections to legitimate interests per standard Purpose
    * User objections to legitimate interests per Vendor:
4. **Publisher restrictions:** Only valid on a service-specific TC String, which is restricted to use by the service on which it is running. Publisher restrictions are any publisher restrictions on standard Purposes and vendor processing, which override Purpose and Vendor data included in the TC String.


### Who should create the TC String? <a name="who-create"></a>

The Transparency & Consent String may only be created by an IAB Europe TCF registered CMP using its assigned CMP ID number in accordance with the Policies. Vendors or any other third-party service providers must neither create nor alter TC Strings. These and other requirements are articulated in the TCF Policies to which all participants, CMPs, Publishers, and Vendors, are bound.


### When should the TC String be created? <a name="when-create"></a>

A TC String that contains consent signals must not be created before affirmative action from the user.

A TC String may be created with legitimate interest signals without affirmative action from the user, providing that legitimate interest transparency has been established according to TCF Policies; however, vendors making calls to the API will receive a string with no consent signals. Since no second callback is made, a second TC String created with consent signals will not get passed until the next page load or app refresh.

As a best practice, a TC String containing both consent and legitimate interest signals should not be created until after affirmative action from the user for the TC String’s consent signals.


### What are the different scopes for a TC String? <a name="tcstring-scopes"></a>

There are two main contexts in which a TC String can be created:



*   **Service-specific** - a service-specific TC String is only used by the site(s) or app(s) on which it is running. A service-specific TC String will be created for every user on a given site/app or group of sites/apps. Service-specific TC Strings may contain Publisher Purpose restrictions.
*   **Global** - a global TC String is saved to a global context and is used by CMPs running on other sites. This means that a user’s consent and legitimate interest signals are shared between sites and/or apps. Global TC Strings must not contain Publisher restrictions.

CMPs must be set up to operate in either a service-specific or global configuration.


### Working with global TC Strings <a name="global-tcstrings"></a>

When configured to use global TC Strings CMPs must not overwrite any of the consent or legitimate interest signals found in an existing TC String. Therefore CMPs must do the following:



*   Parse the existing global TC String to load and preserve all existing signals
*   Set signals for the vendors specified in the CMP user interface. If a subset of vendors is shown in the CMP user interface, the CMP must only set signals for those vendors
*   Where any conflict is found, for example Vendor A on the current site is set to ‘no’ after user interaction with the CMP, but Vendor A is already set to ‘yes’ in the existing global TC String, the current newer ‘no’ signal must override the existing ‘yes’ signal
*   Overwrite the existing global TC String with the new updated version

Global TC Strings must not contain publisher restrictions.


### What are publisher restrictions? <a name="pubrestrictions"></a>

Version 2.0 of the Framework introduced the ability for publishers to signal restrictions on how vendors may process data:



*   **Purposes.** Restrict the purposes for which personal data is processed by a vendor.
*   **Legal basis.** Specify the legal basis upon which a publisher requires a vendor to operate where a vendor has signaled flexibility on legal basis in the GVL.

Publisher restrictions are custom requirements specified by a publisher and must only be saved to a service-specific TC String.


### How should the Transparency & Consent String be stored? <a name="howtostore"></a>

In version 1 of the TCF Specifications the consent string was specified to be stored as either a 1st party cookie for service-specific consent or a 3rd party cookie for global consent. From version 2.0 of the TCF it is clarified that the storage mechanism used for service-specific TC Strings is up to the CMP (*), however global TC Strings must still be stored as cookies under the consensu.org.domain.

The following table summarises where data should be stored:


<table>
  <tr>
   <td><strong>Scope</strong>
   </td>
   <td><strong>Storage</strong>
   </td>
   <td><strong>Purpose</strong>
   </td>
  </tr>
  <tr>
   <td>Global
   </td>
   <td>3rd-party.consensu.org cookie. CMPs may “backup” the global TC String using a different storage mechanism in order to prevent 3rd-party cookies from being blocked/erased by the browser.
   </td>
   <td>Global vendor transparency & consent
   </td>
  </tr>
  <tr>
   <td>Service-specific
   </td>
   <td>Storage mechanism chosen by CMP (*).
   </td>
   <td>Service-specific vendor transparency & consent (if configured, overrides global vendor transparency & consent)
   </td>
  </tr>
</table>


(*) Note that TCF version 2.0 introduces Publisher restrictions, which theoretically could result in long TC Strings that are larger than the size limit for cookies. Publisher restrictions are only allowed in service-specific TC Strings, therefore CMPs should take this into consideration when deciding on the storage mechanism for service-specific TC Strings.


## The Global Vendor List <a name="globalvendorlist"></a>

The Global Vendor List (GVL) is managed by IAB Europe and lists all registered and approved Vendors, as well as standard Purposes and Features.


### I’m a vendor, how do I get added to the Global Vendor List?  <a name="howtogetadded"></a>

The registration process is described here: [https://iabeurope.eu/tcf](https://iabeurope.eu/tcf)


### What is contained in the Global Vendor List? <a name="contained-in-globalvendorlist"></a>



*   A Global Vendor List version.
*   A list of standard Purposes, including any Special Purposes.
*   A list of standard Features. Vendors can indicate that they use Features. Since they span purposes, users cannot exercise choice  about any of them, but Features Vendors use should be disclosed  in the CMP’s UI.
*   A list of Special Features, which are Features for which users are given an opt-in choice.
*   A list of Vendors with assigned Vendor IDs (denoted as **VendorIds** in the string), the standard Purposes for which they are requesting consent, the standard Purposes they will be using on the legitimate interest legal basis, the Features they may use across declared Purposes, and the URL of their GDPR/privacy policy page. _VendorIds_ are incrementally-assigned and not reused; deleted Vendors are just marked as deleted.
*   Vendor GET limits to inform overflow option. This provides the information needed to support Vendor’s ability to use the http GET request.


### Where can I access the Global Vendor List? <a name="listaccess"></a>

The GVL is in JSON format and the current version at any given time can be retrieved using the following URL structure:

[https://vendorlist.consensu.org/v2/vendor-list.json](https://vendorlist.consensu.org/v2/vendorlist.json)

Previous versions of the Global Vendor List are available here:

[https://vendorlist.consensu.org/v2/archives/vendor-list-v{vendor-list-version}.json](https://vendorlist.consensu.org/v2/archives/vendorlist-v{vendor-list-version}.json)

Where ‘vendor-list-version’ corresponds to the ‘vendorListVersion’ property in the GVL, for example, the following URL would retrieve the GVL update published with version 138

[https://vendorlist.consensu.org/v2/archives/vendor-list-v138.json](https://vendorlist.consensu.org/v2/vendor-list.json)

Previous versions of the GVL may only be used in cases when the current version cannot be downloaded (such as when operating in-app while offline), or for change control management.


### TCF version 1 of the Global Vendor List (deprecated) <a name="TCFv1"></a>

For reference, the URL for version 1 of the TCF was:

[https://vendorlist.consensu.org/vendorlist.json](https://vendorlist.consensu.org/vendorlist.json)

Version 1 of the Global Vendor List and all version 1 archives will continue to be maintained until support officially ends in 2020. At that time, these files will be deprecated and only version 2 and newer of the Global Vendor List will be available.


### Translations for Purposes, Special Purposes, Features, and Special Features <a name="translations"></a>

Translations of the names and descriptions for Purposes, Special Purposes, Features, and Special Features to non-English languages are contained in a file where attributes containing English content (except vendor declaration information) are translated, and can be found here:

https://vendorlist.consensu.org/v2/purposes-{language}.json

Where ‘language’ is a two letter lowercase ISO 639-1 language code. Supported languages are listed at the following URL:

[https://register.consensu.org/Translation](https://register.consensu.org/Translation) **[Note for public comment: this URL is inactive until the official release of version 2 and is subject to change before release.]**


### How often is the Global Vendor List updated? <a name="howoftenupdated"></a>

As of the publication of this document, changes to the Global Vendor List are published weekly at 5:00 PM Central European Time on Thursdays. IAB Europe reserves the right to change this time and will notify CMP members of any changes.


### CMPs using the GVL <a name="CMPs-using-GVL"></a>

Any time the CMP user interface is shown to the user, the **current** version of the GVL must be used to populate the user interface.

In a mobile app context where the current version of the GVL cannot be loaded because the app is offline for a long period, the most recent cached version of the GVL may be used. In this scenario, the current version of the GVL must be loaded the next time the app is online.

CMPs may use previous versions of the GVL for change control management, to determine when a CMP should be resurfaced to an existing user.


### Vendors using the GVL <a name="vendors-using-GVL"></a>

Vendors must use a locally cached archived version (see below “Caching the Global Vendor List”) of the Global Vendor List stated in the TC String received to determine:



1. If they are entitled to receive and process personal data and/or store and or access information on the user’s device.
2. Which other vendors may receive and process personal data and/or store and or access information on the user’s device.

**Strict restrictions on caching the GVL apply and are detailed in the following section.**


### Caching the Global Vendor List <a name="cachingGVL"></a>

Given the high volume of requests for the Global Vendor List, current and previous versions are configured with cache-control headers. All requests for the Global Vendor List must honour these headers and must not cache the resource with different settings. In this respect, cache-busting techniques where a random query string parameter is passed to the Global Vendor List to bypass the cache must not be used.

By observing the caching policies it is acknowledged there may be a delay of up to the maximum cache interval in retrieving the latest version of the Global Vendor List.


#### CMPs caching the GVL <a name="CMPscaching"></a>

CMPs should cache the Global Vendor List server-side so that client-side JavaScript code does not need to retrieve the GVL for every user. As above, CMPs that cache the GVL server-side must only do so for the period of time specified in the cache-control headers.


#### Vendors caching the GVL <a name="vendorscaching"></a>

As vendor requests for the GVL will not be in a browser context, the GVL must be cached server-side.

Vendor application logic must only request one version of the GVL per vendor during the cache period specified in the cache-control header. For example, if the caching period is one week, only one request to the current GVL must be received for a given vendor per week.

It should be noted that the volume of usage will be monitored carefully by the managing organisation (MO) and any vendor not adhering to this caching requirement will be blocked from accessing the GVL.


#### Caching previous versions of the GVL <a name="caching-prev-ver"></a>

Previous versions of the GVL must be cached for at least the period specified by the cache-control headers and may be cached indefinitely as they are static resources.


#### Using a compressed version of the Global Vendor List <a name="compressedGVL"></a>

In order to control the bandwidth used by requests to the GVL, and to minimise latency for the end user, vendors and CMPs must retrieve a compressed version of the GVL. This can be done by sending the following header (which a browser will send by default):


```
Accept-Encoding: gzip, deflate, br
```


For server-side requests, where your code must decode the content encoding, only send the options your service is capable of decoding.


#### Global Vendor List change control <a name="GVL-changecontrol"></a>

CMPs may run a change control process to compare the version of the GVL in the TC String with the current version of the GVL to determine whether changes in the current version of the GVL warrant presenting the user interface to the end user once again.

CMPs must compare the `TcfPolicyVersion` in the TC String with the `TcfPolicyVersion` property in the current Global Vendor List, and if it is different, the CMP user interface must be shown to the user once again. The reason for this is that a change to the policy may include legal details that invalidate any TC Strings created under previous versions.


### Example Global Vendor List JSON Object <a name="GVLexampleJSON"></a>

Please see an example of the GVL object returned in JSON format [here](#ex-GVL-JSON).


## Creating a TC String <a name="creatingTCstring"></a>


### What are the Purposes and Features being supported? <a name="supported-pandf"></a>

The IAB Europe Transparency & Consent Framework Policies defines Purposes, Special Purposes, Features, Special Features, and Stacks (groupings of Purposes and/or Special Features). You can reference the details of these purposes and features in the document found at the following URL:

[https://www.iabeurope.eu/policy/draft-for-public-comment-of-transparency-consent-framework-policies/](https://www.iabeurope.eu/policy/draft-for-public-comment-of-transparency-consent-framework-policies/)



### How should the TC String be created? <a name="howshouldcreate"></a>


<table>
  <tr>
   <td><strong>Cookie Directive</strong>
   </td>
   <td><strong>Value(s)</strong>
   </td>
   <td><strong>Notes</strong>
   </td>
  </tr>
  <tr>
   <td>Name
   </td>
   <td><em>euconsent-v2</em>
   </td>
   <td>To avoid conflicts between CMPs using different TC String versions (which might happen during or after the transition period), starting with version 2.0 the name of the global cookie and mobile local storage (NSUserDefault and SharedPreferences) will include the TC String version, for example ‘euconsent-v2’.
   </td>
  </tr>
  <tr>
   <td>Host
   </td>
   <td>.consensu.org
   </td>
   <td>The DNS resolution for the name <code><em>cmp-name</em>.mgr.consensu.org</code> will be delegated by the standardizing authority (IAB) to each CMP. CMPs will host their code, APIs, and CDN at this domain or subdomains.
   </td>
  </tr>
  <tr>
   <td>Path
   </td>
   <td>/
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Max-Age
   </td>
   <td>33696000
   </td>
   <td>This represents thirteen 30-day months.
   </td>
  </tr>
  <tr>
   <td>Value
   </td>
   <td>TC String as generated by the Transparency & Consent String SDK.
   </td>
   <td>
   </td>
  </tr>
</table>



### TC String Format <a name="tcstringformat"></a>

The following fields are stored in big-endian format. Example values are provided below, and bit numberings are left-to-right.

[note for public comment: new fields and additions are provided in blue text]


<table>
  <tr>
   <td><strong>TC String field name</strong>
   </td>
   <td><strong>Bits (bit offsets)</strong>
   </td>
   <td><strong>Value(s)</strong>
   </td>
   <td><strong>Notes</strong>
   </td>
  </tr>
  <tr>
   <td>Version
   </td>
   <td>6 bits
<p>
(0-5)
   </td>
   <td>“2” for this version
   </td>
   <td>Incremented when TC String format changes.
   </td>
  </tr>
  <tr>
   <td>Checksum
   </td>
   <td>18 bits
<p>
(6-23)
   </td>
   <td>CRC-16-IBM/ANSI Checksum
   </td>
   <td>A 16-bit CRC-16-IBM (alternately known as CRC-16 or CRC-16-ANSI) checksum value of the bitstream after this value. This is the "bitwise end of the message," not the base64 (6-bit-padded) or byte-wise (8-bit padded) end of the string, since CRC is dependent on the precise end-of-bitstring used as input.E.g. Accidental truncation of the string.
   <br>
   A Vendor/CMP encountering a string that fails checksum validation must consider that string invalid.
   </td>
  </tr>
  <tr>
   <td>Created
   </td>
   <td>36 bits
<p>
(24-59)
   </td>
   <td>Epoch deciseconds when TC String was first created
   </td>
   <td rowspan="2" >Deciseconds fits into 36 bits with enough precision to record a
<p>
user’s consent action timing. Javascript: <code>Math.round((new Date()).getTime()/100)</code>
   </td>
  </tr>
  <tr>
   <td>LastUpdated
   </td>
   <td>36 bits
<p>
(60-95)
   </td>
   <td>Epoch deciseconds when TC String was last updated
   </td>
  </tr>
  <tr>
   <td>CmpId
   </td>
   <td>12 bits
<p>
(96-107)
   </td>
   <td>Consent Manager Provider ID that last updated the TC String
   </td>
   <td>A unique ID will be assigned to each Consent Manager Provider.
   </td>
  </tr>
  <tr>
   <td>CmpVersion
   </td>
   <td>12 bits
<p>
(108-119)
   </td>
   <td>Consent Manager Provider version
   </td>
   <td>Each change to an operating CMP should receive a new version number, for logging proof of consent. CmpVersion defined by each CMP.
   </td>
  </tr>
  <tr>
   <td>ConsentScreen
   </td>
   <td>6 bits
<p>
(120-125)
   </td>
   <td>Screen number in the CMP where consent was given
   </td>
   <td>The screen number is CMP and CmpVersion specific, and is for logging proof of consent.(For example, a CMP could keep records so that a publisher can request information about the context in which consent was gathered.)
   </td>
  </tr>
  <tr>
   <td>ConsentLanguage
   </td>
   <td>12 bits
<p>
(126-137)
   </td>
   <td>Two-letter ISO639-1 language code in which the CMP UI was presented
   </td>
   <td>Each letter should be encoded as 6 bits, a=0..z=25 . This will result in the <a href="https://tools.ietf.org/html/rfc4648#section-5">base64url-encoded</a> bytes spelling out the language code (in uppercase).
   </td>
  </tr>
  <tr>
   <td>VendorListVersion
   </td>
   <td>12 bits
<p>
(120-131)
   </td>
   <td>Version of the GVL used to create this string.
   </td>
   <td>Version of the GVL used to create this string. Global Vendor List versions will be released periodically. 12 bits allows for 78 years of weekly updates.
   </td>
  </tr>
  <tr>
   <td>TcfPolicyVersion
   </td>
   <td>6 bits
<p>
(132-137)
   </td>
   <td>Version of policy used within GVL
   </td>
   <td>From the corresponding field in the GVL that was used for obtaining consent. A new policy version invalidates existing strings and requires CMPs to re-establish transparency and consent from users.
<p>
If a TCF policy version number is different from the one from the latest GVL, the CMP must re-establish transparency and consent.
   </td>
  </tr>
  <tr>
   <td>IsServiceSpecific
   </td>
   <td>1 bit
<p>
(138)
   </td>
   <td>0=False <br>
1=True
   </td>
   <td>Whether the signals encoded in this TC String were from site-specific storage (True) versus ‘global’ consensu.org shared storage (False).
<p>
A string intended to be stored in global/shared scope but the CMP is unable to store due to a user agent not accepting third-party cookies would be considered site-specific (True).
   </td>
  </tr>
  <tr>
   <td>UseNonStandardStacks
   </td>
   <td>1 bit
<p>
(139)
   </td>
   <td>1=CMP used non-standard stacks during consent gathering;
<p>
0=IAB standard stacks were used.
   </td>
   <td>Non-standard stacks means that a CMP is using publisher-customized stack descriptions.
<p>
Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are titles. Descriptions are pre-set, but publishers can customize them. If they do, they need to set this bit to indicate that they've customized descriptions.
   </td>
  </tr>
  <tr>
   <td>SpecialFeatureOptIns
   </td>
   <td>12 bits
<p>
(140-151)
   </td>
   <td>For each feature, one bit: 1=user has opted in; 0= user has not opted in.
   </td>
   <td>The TCF designates certain Features as special, that is, a CMP must afford the user a means to opt in to their use. These Special Features are published and numbered in the GVL separately from normal Features. Provides for up to 12 special features.
   </td>
  </tr>
  <tr>
   <td>PurposesConsent
<p>
(renamed from PurposesAllowed)
   </td>
   <td>24 bits
<p>
(152-175)
   </td>
   <td>For each Purpose, one bit: 0=No Consent; 1=Consent.
   </td>
   <td>The user’s consent value for each Purpose established on the legal basis of consent.
<p>
Purposes are published in the Global Vendor List. Purpose #1 maps to the first (most significant) bit, purpose #24 maps to the last (least significant) bit.
   </td>
  </tr>
  <tr>
   <td>PurposesLITransparency
   </td>
   <td>24 bits
<p>
(176-199)
   </td>
   <td>For each Purpose, one bit: 0=legitimate interest NOT established; 1= legitimate interest established
   </td>
   <td>The user’s permission for each Purpose established on the legal basis of legitimate interest.
<p>
If the user has exercised right-to-object for a purpose, the corresponding bit for that purpose should be set to 0. Purpose #1 maps to the first (most significant) bit, purpose #24 maps to the last (least significant) bit.
   </td>
  </tr>
  <tr>
   <td><strong>Vendor Consent Section</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>MaxVendorId
   </td>
   <td>16 bits
<p>
(200-215)
   </td>
   <td>The maximum VendorId for which consent values are given.
   </td>
   <td>VendorIds are numbered 1 to MaxVendorId. Allows the consent string to be interpreted without waiting for the vendor list fetch.
   </td>
  </tr>
  <tr>
   <td>EncodingType
   </td>
   <td>1 bit
<p>
(216)
   </td>
   <td>0=BitField 1=Range
   </td>
   <td>The consent encoding used. Either a BitFieldSection or RangeSection follows. Consent string encoding logic should choose the encoding that results in the smaller output.
   </td>
  </tr>
  <tr>
   <td><strong>BitFieldSection</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td><strong>Encodes one consent bit per VendorId</strong>
   </td>
  </tr>
  <tr>
   <td>BitField
   </td>
   <td>MaxVendorId bits
   </td>
   <td>For each Vendor, one bit: 0=No Consent 1=Consent
   </td>
   <td>The consent value for each VendorId from 1 to MaxVendorId.
<p>
Set the bit corresponding to a given vendor to 1 if the user has consented to this vendor processing their data
   </td>
  </tr>
  <tr>
   <td><strong>RangeSection</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td><strong>Encodes a default consent value and any number of single or range override entries</strong>
   </td>
  </tr>
  <tr>
   <td>DefaultConsent
   </td>
   <td>1 bit
   </td>
   <td>0=No Consent 1=Consent
   </td>
   <td>Default consent for VendorIds not covered by a RangeEntry. VendorIds covered by a RangeEntry have a consent value the opposite of DefaultConsent.
   </td>
  </tr>
  <tr>
   <td>NumEntries
   </td>
   <td>12 bits
   </td>
   <td>Number of entries to follow
   </td>
   <td>NumEntries instances of RangeEntry follow.
   </td>
  </tr>
  <tr>
   <td>RangeEntry (repeated NumEntries times, indicated by [idx])
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>A single or range of VendorIds, whose consent value is the opposite of DefaultConsent. All VendorIds must be between 1 and MaxVendorId.
   </td>
  </tr>
  <tr>
   <td>SingleOrRange[idx]
   </td>
   <td>1 bit
   </td>
   <td>0=Single VendorId 1=VendorId range
   </td>
   <td>Whether a single VendorId or a start/end range of VendorIds is given
   </td>
  </tr>
  <tr>
   <td>SingleVendorId[idx]
   </td>
   <td>16 bits
   </td>
   <td>A single VendorId.
   </td>
   <td>Exclusive with Start/EndVendorId.
   </td>
  </tr>
  <tr>
   <td>StartVendorId[idx]
   </td>
   <td>16 bits
   </td>
   <td>The start of an inclusive range of VendorIds
   </td>
   <td>Exclusive with SingleVendorId. Must be paired with a EndVendorId
   </td>
  </tr>
  <tr>
   <td>EndVendorId[idx]
   </td>
   <td>16 bits
   </td>
   <td>The end of an inclusive range of VendorIds
   </td>
   <td>Exclusive with SingleVendorId. Must be paired with a StartVendorId.
   </td>
  </tr>
  <tr>
   <td><strong>Vendor Legitimate Interest Section</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>MaxVendorId
   </td>
   <td>16 bits
   </td>
   <td>The maximum VendorId for which legitimate interest values are given.
   </td>
   <td>VendorIds are numbered 1 to MaxVendorId. Allows the string to be interpreted without waiting for the vendor list fetch.
   </td>
  </tr>
  <tr>
   <td>EncodingType
   </td>
   <td>1 bit
   </td>
   <td>0=BitField 1=Range
   </td>
   <td>The encoding used. Either a BitFieldSection or RangeSection follows. String encoding logic should choose the encoding that results in the smaller output.
   </td>
  </tr>
  <tr>
   <td><strong>BitFieldSection</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td><strong>Encodes one legitimate interest bit per VendorId</strong>
   </td>
  </tr>
  <tr>
   <td>BitField
   </td>
   <td>MaxVendorId bits
   </td>
   <td>For each Vendor, one bit: 0=LI Not Established 1=LI Established
   </td>
   <td>The legitimate interest value for each VendorId from 1 to MaxVendorId.
<p>
Set the bit corresponding to a given vendor to 1 if the CMP has established transparency for a vendor's legitimate interest.  \
If a user exercises their Right To Object to a vendor’s processing based on a legitimate interest, then that vendor’s bit must be set to 0.
   </td>
  </tr>
  <tr>
   <td><strong>RangeSection</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td><strong>Encodes a default legitimate interest value and any number of single or range override entries</strong>
   </td>
  </tr>
  <tr>
   <td>DefaultLI
   </td>
   <td>1 bit
   </td>
   <td>0=LI Not Established (or user objected)
<p>
1=LI Established
   </td>
   <td>Default legitimate interest for VendorIds not covered by a RangeEntry. VendorIds covered by a RangeEntry have a value the opposite of DefaultLI.
   </td>
  </tr>
  <tr>
   <td>NumEntries
   </td>
   <td>12 bits
   </td>
   <td>Number of entries to follow
   </td>
   <td>NumEntries instances of RangeEntry follow.
   </td>
  </tr>
  <tr>
   <td>RangeEntry (repeated NumEntries times, indicated by [idx])
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>A single or range of VendorIds, whose legitimate interest value is the opposite of DefaultLI. All VendorIds must be between 1 and MaxVendorId.
   </td>
  </tr>
  <tr>
   <td>SingleOrRange[idx]
   </td>
   <td>1 bit
   </td>
   <td>0=Single VendorId 1=VendorId range
   </td>
   <td>Whether a single VendorId or a start/end range of VendorIds is given
   </td>
  </tr>
  <tr>
   <td>SingleVendorId[idx]
   </td>
   <td>16 bits
   </td>
   <td>A single VendorId.
   </td>
   <td>Exclusive with Start/EndVendorId.
   </td>
  </tr>
  <tr>
   <td>StartVendorId[idx]
   </td>
   <td>16 bits
   </td>
   <td>The start of an inclusive range of VendorIds
   </td>
   <td>Exclusive with SingleVendorId. Must be paired with a EndVendorId
   </td>
  </tr>
  <tr>
   <td>EndVendorId[idx]
   </td>
   <td>16 bits
   </td>
   <td>The end of an inclusive range of VendorIds
   </td>
   <td>Exclusive with SingleVendorId. Must be paired with a StartVendorId.
   </td>
  </tr>
  <tr>
   <td><strong>Publisher Restrictions Section</strong>
   </td>
   <td>
   </td>
   <td><strong>The content of this section is optional. </strong>
   </td>
   <td><strong>Encodes any number of single or range restriction entries</strong>
   </td>
  </tr>
  <tr>
   <td>NumEntries
   </td>
   <td>12 bits
   </td>
   <td>Number of entries to follow (i.e. number of restrictions to follow). A value of 0 indicates no publisher restrictions content follows.
   </td>
   <td>NumEntries instances of RangeEntry follow.
   </td>
  </tr>
  <tr>
   <td>RangeEntry (repeated NumEntries times, indicated by [idx])
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>A single or range of VendorIds. All VendorIds must be between 1 and MaxVendorId.
   </td>
  </tr>
  <tr>
   <td>
SingleOrRange[idx]
   </td>
   <td>1 bit
   </td>
   <td>0=Single VendorId 1=VendorId range
   </td>
   <td>
Whether a single VendorId or a start/end range of VendorIds is given
   </td>
  </tr>
  <tr>
   <td>SingleVendorId[idx]
   </td>
   <td>16 bits
   </td>
   <td>A single VendorId.
   </td>
   <td>
Exclusive with Start/EndVendorId.
   </td>
  </tr>
  <tr>
   <td>
StartVendorId[idx]
   </td>
   <td>16 bits
   </td>
   <td>The start of an inclusive range of VendorIds
   </td>
   <td>
Exclusive with SingleVendorId. Must be paired with a EndVendorId
   </td>
  </tr>
  <tr>
   <td>EndVendorId[idx]
   </td>
   <td>16 bits
   </td>
   <td>The end of an inclusive range of VendorIds
   </td>
   <td>
Exclusive with SingleVendorId. Must be paired with a StartVendorId.
   </td>
  </tr>
  <tr>
   <td>PurposeId
   </td>
   <td>6 bits
   </td>
   <td>The current spec allows support for up to 24 purposes; so here we allow the specification of the id of one of those 24 possible purposes (even though only 12 purposes are used by TCF so far)
   </td>
   <td>The purpose Id associated with a publisher purpose-by-vendor restriction that resulted in a different consent or LI status than the consent or LI purposes allowed lists.
   </td>
  </tr>
  <tr>
   <td>RestrictionType
   </td>
   <td>2 bits
   </td>
   <td>Numeric, enum-like value. \
0=Purpose Not Allowed by Publisher (restricted by Publisher)
<p>
1=Require Consent for flexible legal basis (e.g. the default value is LI)
<p>
2=Require LI for flexible legal basis (e.g. the default value is Consent)
<p>
3=UNDEFINED
   </td>
   <td>Vendors who declared <em>flexible<strong> </strong></em>legal basis for the given purpose must respect 0, 1, or 2 if their vendor id is included in this restriction.
<p>
Vendors who declared <em>fixed<strong> </strong></em>legal basis for the given purpose must respect 0, but can ignore values 1 & 2.
<p>
Note that consent is required for purpose 1 as defined in the TCF Policies, but vendors must register with a fixed legal basis for consent on purpose 1, so any operation otherwise is in violation of the Policies.
   </td>
  </tr>
</table>



### How is the checksum used to check the TC String? <a name="checksum-tcstring"></a>

From version 2.0 on, the TC String will contain a checksum in order to see if the TC String is “valid” (e.g. not truncated during transmission). The calculation of the checksum is (example JS syntax):


```
var version = 2;
var content = "... TC String starting from Created field to/including the last field (e.g. Publisher Restrictions section) in bit representation  ...";
var checksum = crc16(content); //byte representation of crc16 checksum
var tcstring = btoaWebSafe(bits2bytes("010000") + bytes2bits(checksum) + content));
```


Example how to check the TC String:


```
var tcstring = "... full TC String in byte representation ...";
var version = tcstring.substr(0,1);
var checksum = tcstring.substr(1,3);
var content = bytes2bits(tcstring.substr(4,99999));
if(crc16(content) == checksum){/* checksum is ok*/}
```


**Important:** A CMP must check if the checksum of a TC String is valid before transmitting any information from that TC String. If a TC String is found to be invalid, the TC String must be deleted (e.g. clear the cookie). The CMP must not transmit the corresponding data and must also resurface the UI in order to establish new consent in a valid TC String.

**Important:** In each case the TC String is changed by the CMP (e.g. when applying OOB signals to an existing TC String), the CMP must calculate the new checksum.


## Examples: TC String and GVL <a name="ex-tcs-GVL"></a>

The following two examples demonstrate: the bits of a generated TC String for a given use case, and a sample of the returned GVL as a JSON object.


### Example TC String <a name="example-tcstring"></a>

**[Note for public comment: the following example is from version 1.1. A new table will be added after public comment when new fields are final.]**

Example TC String field values for the case:



*   all `VendorId` consents given, except VendorId=9
*   for VendorListVersion=8 which has 2011 VendorIds defined
*   by Consent Manager Provider Id #7

<table>
  <tr>
   <td>
<strong>Field</strong>
   </td>
   <td><strong>Decimal Value</strong>
   </td>
   <td><strong>Meaning</strong>
   </td>
   <td><strong>Binary Value</strong>
   </td>
  </tr>
  <tr>
   <td>Version
   </td>
   <td><p style="text-align: right">
1</p>

   </td>
   <td>TC String format version #1
   </td>
   <td>000001
   </td>
  </tr>
  <tr>
   <td>Created
   </td>
   <td><p style="text-align: right">
15100811449 </p>

   </td>
   <td>2017-11-07T18:59:04.9Z
   </td>
   <td>001110000100000101000100000000110010
   </td>
  </tr>
  <tr>
   <td>LastUpdated
   </td>
   <td><p style="text-align: right">
15100811449</p>

   </td>
   <td>2017-11-07T18:59:04.9Z
   </td>
   <td>001110000100000101000100000000110010
   </td>
  </tr>
  <tr>
   <td>CmpId
   </td>
   <td><p style="text-align: right">
7</p>

   </td>
   <td>The ID assigned to the CMP
   </td>
   <td>000000000111
   </td>
  </tr>
  <tr>
   <td>CmpVersion
   </td>
   <td><p style="text-align: right">
1</p>

   </td>
   <td>Consent Manager Provider version for logging
   </td>
   <td>000000000001
   </td>
  </tr>
  <tr>
   <td>ConsentScreen
   </td>
   <td><p style="text-align: right">
3</p>

   </td>
   <td>Screen number in the CMP where consent was given
   </td>
   <td>000011
   </td>
  </tr>
  <tr>
   <td>ConsentLanguage
   </td>
   <td>"en" (e=4, n=13)
   </td>
   <td>Two-letter ISO639-1 language code in which the CMP UI was presented
   </td>
   <td>000100 001101
   </td>
  </tr>
  <tr>
   <td>VendorListVersion
   </td>
   <td><p style="text-align: right">
8</p>

   </td>
   <td>The Global Vendor List version at the time this TC String value was set
   </td>
   <td>000000001000
   </td>
  </tr>
  <tr>
   <td>PurposesAllowed
   </td>
   <td><p style="text-align: right">
14680064</p>

   </td>
   <td>Purposes #1, 2, and 3 are allowed
   </td>
   <td>111000000000000000000000
   </td>
  </tr>
  <tr>
   <td>MaxVendorId
   </td>
   <td><p style="text-align: right">
2011</p>

   </td>
   <td>Number of VendorIds in that Global Vendor List
   </td>
   <td>0000011111011011
   </td>
  </tr>
  <tr>
   <td>EncodingType
   </td>
   <td><p style="text-align: right">
1</p>

   </td>
   <td>Range encoding (not bitfield)
   </td>
   <td>1
   </td>
  </tr>
  <tr>
   <td>DefaultConsent
   </td>
   <td><p style="text-align: right">
1</p>

   </td>
   <td>Default is “Consent”
   </td>
   <td>1
   </td>
  </tr>
  <tr>
   <td>NumEntries
   </td>
   <td><p style="text-align: right">
1</p>

   </td>
   <td>One “range or single” entry
   </td>
   <td>000000000001
   </td>
  </tr>
  <tr>
   <td>SingleOrRange[0]
   </td>
   <td><p style="text-align: right">
0</p>

   </td>
   <td>A single VendorId (which is “No Consent”)
   </td>
   <td>0
   </td>
  </tr>
  <tr>
   <td>SingleVendorId[0]
   </td>
   <td><p style="text-align: right">
9</p>

   </td>
   <td>VendorId=9 has No Consent (opposite of Default Consent)
   </td>
   <td>00000000000001001
   </td>
  </tr>
  <tr>
   <td><a href="https://tools.ietf.org/html/rfc4648#section-5">base64url-encoded</a> TC String value
   </td>
   <td>
   </td>
   <td>
   </td>
   <td><code>BOJObISOJObISAABAAENAA4AAAAAoAAA</code>
   </td>
  </tr>
</table>



### Example Global Vendor List JSON Object <a name="ex-GVL-JSON"></a>

Here is an annotated example of the GVL’s JSON format:


```
{
  "gvlSpecificationVersion": 2,
  "vendorListVersion": 133, // incremented with each published file change
  "tcfPolicyVersion": 2, // The TCF MO will increment this value whenever a GVL change (such as adding a new Purpose or Feature or a change in Purpose wording) legally invalidates existing TC Strings and requires CMPs to re-establish transparency and consent from users.
If the policy version number in the latest GVL is different from the value in your TC String, then you need to re-establish transparency and consent for that user. A version 1 format TC String is considered to have a version value of 1.

  "lastUpdated": "2018-05-28T00:00:00Z",
  "purposes": {
	/*
  	Information published for each Purpose


  	"id": numeric, REQUIRED
  	"name": string, REQUIRED
      "description": string, REQUIRED
      "descriptionLegal": string, REQUIRED
  	"consentable": boolean, OPTIONAL, default=true  false means CMPs should never afford users the means to provide an opt-in consent choice
  	"rightToObject": boolean, OPTIONAL, default=true  false means CMPs should never afford users the means to exercise a right to object
	*/


      "1": {
    "id": 1,
  		"name": "Storage and access of information",
  		"description": "..."
  		"descriptionLegal": "..."
	},
	// ... more purposes from id=2 to id=9 (up to no higher than id=24)
	{
      "10": {
    "id": 10,
  		"name": "Develop and improve product",
  		"description": "...",
  		"descriptionLegal": "...",
  		"consentable": false,
  		"rightToObject": false
	},
	{
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
  		"id": 1
  		"name": "Matching Data to Offline Sources",
  		"description": "Combining data from offline sources that were initially collected in other contexts",
  		"descriptionLegal": "..."
	}
	// ... more features from id=2 up to no higher than id=64.
  },
  // Special features differ from simple features in that CMPs MUST provide
  // users with a means to signal an opt-in choice as to whether vendors
  // may employ the feature when performing any purpose processing.
  // See Policies for specifics.
  "specialFeatures" : {
	"1": {
  		"id": 1
  		"name": "Precise Geolocation",
  		"description": "...",
  		"descriptionLegal": "..."
	},
	"2": {
  		"id": 2
  		"name": "Active Fingerprinting",
  		"description": "...",
  		"descriptionLegal": "..."
	}
	// ... more special features from id=3 up to no higher than id=8.
  },
  "vendors": {
	/*
  	Information published for each vendor

  	"id": numeric, REQUIRED
  	"name": string, REQUIRED
      "purposeIds": array of positive integers, either purposeIds or legIntPurposeIDs REQUIRED. Array may be empty. List of purpose ids declared as performed on the legal basis of consent
  	"legIntPurposeIds": array of positive integers, either purposeIds or legIntPurposeIDs REQUIRED. Array may be empty. List of purpose ids declared as performed on the legal basis of a legitimate interest
  	"flexiblePurposeIds": array of positive integers, OPTIONAL. Array may be empty. List of purpose ids where the vendor is flexible regarding the legal basis; they will perform the processing based on consent or a legitimate interest. The 'default' is determined by which of the other two mutually-exclusive purpose fields is used to declare the purpose for the vendor

```


Constraints:
*   Either purposeIds OR legIntPurposeIds can be missing/empty, but not both.
*   A purpose id must not be present in both purposeIds and legIntPurposeIds
*   A purpose id listed in flexiblePurposeIds must have been declared in one of purposeIds or legIntPurposeIds.
*   Purpose id values included in the three purpose fields must be in the range from 1 to N, where N is the highest purpose id published in this GVL file.


```
  	"featureIds": array of positive integers, OPTIONAL. Array may be empty. List of Features the Vendor may utilize when performing some declared Purposes processing.
      "specialFeatureIds": array of positive integers, OPTIONAL. Array may be empty. List of Special Features the Vendor may utilize when performing some declared Purposes processing.
  	"policyUrl": url string, REQUIRED URL to the Vendor's privacy policy document.
      "deletedDate": date string ("2019-05-28T00:00:00Z") OPTIONAL, If present, vendor should be considered deleted after this date/time and MUST NOT be established to users.
      "overflow": object specifying the vendor's http GET request length  limit OPTIONAL. Has the following members & values

      "overflow": {
          "httpGetLimit": 32   /* 32 or 128 are supported options */
      }
If a vendor entry does not include this attribute then the vendor has no overflow options and none can be inferred.
    */

    "1":{
	"id": 1,
  	"name": "Vendor Name",
  	"purposeIds": [1],
  	"legIntPurposeIds": [2, 3],
      "flexiblePurposeIds": [1, 2],
      "featureIds": [1, 2],
  	"specialFeatureIds": [1, 2],
  	"policyUrl": "https://vendorname.com/gdpr.html",
  	"deletedDate": "2019-02-28T00:00:00Z",
      "overflow": {
          "httpGetLimit": 32   /* 32 or 128 are supported options */
      }
    },
    // ... more vendors
  }

 "stacks": {
  "1": {
   	"id": 1,
   	"purposes" : [1,2,3 ...],
   	"specialPurposes" : [1,2,3 ...],
   	"name" : "...",
   	"description" : "...",
  }
 }
}
```





## Appendix A: Proposal for handling legal bases established out-of-band (OOB) <a name="OOB-proposal"></a>

The TCF supports the ability to communicate the status of transparency for legitimate interest (LI) or consent as a legal basis for processing user data. However, a legal basis may sometimes be obtained outside the Framework, which is referred to as out-of-band (OOB). Such OOB Legal Bases may be relied upon only under the following conditions:



*   Vendors must not rely on OOB Legal Bases where the TC String is service-specific
*   Vendors must not rely on OOB Legal Bases where the user has interacted with the Vendor, for example by the Vendor having been disclosed and/or the user making a choice about the Vendor, within the Framework
*   Vendors must not rely on OOB Legal Bases where the Publisher does not allow reliance on OOB Legal Bases
*   Vendors must not rely on OOB Legal Bases unless the above can be verified through the TC String

This proposal offers a means for Vendors to meet the above requirements, enabling the Framework to provide a way to indicate to Vendors that they may rely on OOB Legal Bases in transactions that may also include Signals that have been generated through the Framework, by keeping track of a user’s interaction with Vendors in the Framework, and allowing Publishers to indicate whether they allow OOB Legal Bases.

The following key points form the basis of this proposal:



*   Global TC Strings include a new mandatory field that signals which Vendors have been disclosed
*   Publishers have service-specific settings for whether or not they allow OOB Legal Bases, and if so for which Vendors
*   The TC String made available on the Publisher's service via the CMP API is created by merging the global TC String and the Publisher’s service-specific OOB settings


### Proposed additions to the TC String format <a name="proposed-additions"></a>

The following additions to the TC String are proposed to support OOB Legal Bases:



*   **A new flag - OOBAllowed** - this flag specifies whether the Publisher allows Vendors to use OOB Legal Bases. The default is ‘0’ (disallowed). If this flag is ‘1’ the OOBAllowedVendors section below will be present; if the flag is ‘0’ the OOBAllowedVendors section will NOT be present. This flag is mandatory in the TC String retrieved from the CMP JS API, however as this setting is specific to the Publisher, it must not be present in the global TC String. The means of storing this data is at the discretion of the CMP.
*   **A new section - OOBAllowedVendors** - this section has the same structure as the Vendor Consent section in the TC String and indicates which Vendors the Publisher allows to use OOB Legal Bases. As above this section must only be present if the OOBAllowed flag is set to ‘1’. As this setting is specific to the Publisher, it must not be present in the global TC String. The means of storing this data is at the discretion of the CMP.
*   **A new section - DisclosedVendors** - this section has the same structure as the Vendor Consent section and indicates which Vendors have been shown to the user via a CMP UI. This section is mandatory and must always be updated in the global TC String by CMPs using a global configuration.

A Vendor may therefore only use OOB Legal Bases when lawfully obtained if:



*   isServiceSpecific is set to ‘0’ (the CMP is using a global configuration); AND
*   OOBAllowed is set to ‘1’; AND
*   The Vendor has its corresponding bit set to ‘1’ in the OOBAllowedVendors section; AND
*   The Vendor has its corresponding bit set to ‘0’ in the DisclosedVendors section.

In order to generate a final TC String, CMPs must process both the Publisher-specific OOB settings and the global TC String (if it exists). The final TC string will therefore be generated by CMPs using the information from these two data sources.


### Special considerations <a name="special-considerations"></a>

CMPs that do not support global configuration need not support OOB signalling.

CMPs that do support global configurations but do not support OOB signalling, must support writing and storing the DisclosedVendors section and must support setting OOBAllowed to ‘0’.

CMPs that do support global configuration and do support OOB signalling, must support the DisclosedVendors section and must support both the OOBAllowed flag and the OOBAllowedVendors section.

It should be noted that using OOB adds a significant amount of data to the TC String, which will increase its size impacting both storage and transmission. However the size increase is only 1 bit for Publishers who decide not to support OOB.

Note that as CMPs will generate the TC String ‘on-the-fly’, TC Strings must only be retrieved via the CMP API, as the TC String contained in the local or 3rd-party cookie may not represent the final TC String with OOB settings.

All CMPs that support global configuration must support merging the TC String with the OOBAllowed flag set to ‘0’.




## Appendix B: Proposal for handling specific jurisdiction consent <a name="appendixb"></a>

While GDPR does not require consent for device storage/access (Purpose 1). The ePrivacy Directive requires consent for device storage/access separately from the GDPR.

While a regulation -- like the GDPR -- is directly applicable in its entirety in every country in the EU/EEA, a directive -- like the ePrivacy Directive -- requires implementing legislation in each EU/EEA country.

Germany has not implemented the ePrivacy Directive. As such there is no law governing device storage/access (Purpose 1) in Germany as a self-standing processing activity. Purpose 1 can therefore be ignored in Germany.


The TCF version 2 will require consent for the corresponding purpose 1 “where such consent is necessary” leaving it open to publishers and vendors to decide if consent in those countries is required or not.

With the current TC String version, a CMP that does not ask for consent for purpose 1 would automatically write the corresponding bit in the purposesConsent field to 0. While the publisher understands that LI should be used, the vendor could potentially see the 0 as a rejection of the user (purpose was presented but user rejected). This intransparency could cause losses in ad revenue for the publisher.


### Proposed solution <a name="b-proposed-solution"></a>

In order to reflect these cases “where such consent is NOT necessary”, the TC String needs to become more transparent regarding where the publisher’s legislation lays and where the user is from so that the vendor can make his choice. In order to achieve this, there should be the following addition to the TC String:


<table>
  <tr>
   <td>Field
   </td>
   <td>Bits
   </td>
   <td>Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>publisherCC
   </td>
   <td>12 bits
   </td>
   <td>ISO 3166-1 alpha-2 code
   </td>
   <td>Country code of the publisher, determined by the CMP-settings of the publisher
   </td>
  </tr>
  <tr>
   <td>userCC
   </td>
   <td>12 bits
   </td>
   <td>ISO 3166-1 alpha-2 code
   </td>
   <td>Country code of the user, determined by the CMP (e.g. using IP lookup)
   </td>
  </tr>
  <tr>
   <td>deviceAccessStatus
   </td>
   <td>2 bit
   </td>
   <td>enum
   </td>
   <td>0 if Purpose 1 was NOT presented with a choice for the (only shown).  \
1 if Purpose 1 was presented to the user and user accepted.  \
2 if Purpose 1 was presented to the user and user rejected \
3 if the Purpose 1 was NOT shown to the user at all
   </td>
  </tr>
</table>



### Usage for CMPs <a name="b-usage-CMPs"></a>

Once the consent screen is presented to the user, there can be different options, depending on the publishers choice and law requirements:




1. If the publisher is required by law to ask for consent for purpose 1,
<br>OR <br>
If the publisher is not required by law to ask for consent for purpose 1 and wants the CMP to (anyhow) ask for this purpose,
then the CMP would:
  * present the user with a choice for the purpose in the user interface
  * set publisherCC and userCC to the corresponding countries
  * set deviceAccessStatus to 1 or 2 depending on users choice
  * set PurposesConsent for bit to value 1 or 0 depending on users choice

2. If the publisher is not required by law to ask for consent for purpose 1 and wants the CMP to not ask for consent for this purpose, then the CMP would
  * not present the user with a choice for the purpose in the user interface
  * set publisherCC and userCC to the corresponding countries
  * set deviceAccessStatus to 0
  * set PurposesConsent for bit to value 0

3. If purpose is not presented at all, then the CMP would
  * set publisherCC and userCC to the corresponding countries
  * set deviceAccessStatus to 3
  * set PurposesConsent for bit to value 0

NB: This use case is currently limited to Germany, where the ePrivacy Directive’s requirement to obtain consent under Article 5(3) ePrivacy Directive has not been transposed into national law.


In cases when a user visits website A, makes a choice on global scope and then moves to website B the CMP would set publisherCC and userCC to the corresponding countries but leave the other fields untouched. Based on the existing deviceAccessStatus a CMP can decide whether it is necessary to resurface the UI again or not. If the UI is surfaced, the above rules apply.


### Usage for Vendors <a name="b-usage-vendors"></a>

If a vendor wants to determine if device access is allowed or not the vendor would do:


1. If deviceAccessStatus = 0, the vendor can check the publisherCC and/or userCC in order to determine if consent is required. Whether or not the vendor is required for consent is up to interpretation of the vendor.

2. if deviceAccessStatus = 1, the vendor is allowed to access the device.

3. if deviceAccessStatus = 2, the vendor is not allowed to access the device independent of the country of publisher and/or user

4. if deviceAccessStatus = 3, the vendor is not allowed to access the device independent of the country of publisher and/or user

Note: A vendor must always read the publisher restrictions section first (if present) and check if a restriction is in place. If a publisher restriction is in place for purpose 1, the vendor must use this publisher restriction or may not access the device.


### Important notes <a name="b-notes"></a>

Vendors are not allowed to take the TC String directly from the cookie/local storage but must always query the CMP API in order to receive an updated version of the TC String containing the right country codes.

A CMP needs to verify & modify TC String according to publisher/user country before passing it on (even if no UI was shown).
