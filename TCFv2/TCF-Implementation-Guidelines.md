# IAB Europe Transparency and Consent Framework Implementation Guidelines 

<table>
<tr>
	<td><b>Last update</b></td>
    <td>May 2023</td>
</tr>
<tr>
	<td><b>Created</b></td>
    <td>August 2019</td>
</tr>
</table>

This document provides technical implementation guidelines related to the [IAB Europe Transparency and Consent Framework (TCF) v2.2 technical specs](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework). The IAB Tech Lab GDPR Technical Working Group has collaborated on the following implementation guidelines, and will continue to produce resources supporting industry adoption of the Framework. The intended audience of this document includes product and engineering teams who are building technology based on this framework, and who are looking for guidance on implementation strategies such as questions to ask your platform partners or avoiding common pitfalls.

Policy FAQ, webinars, and other resources are available at 
[https://www.iabeurope.eu/tcf](https://www.iabeurope.eu/tcf))

### [Introduction to the TCF](#Intro)<br>
### [Common Questions](#commonquestions)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Do I need to read the Policy?](#needpolicy)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What changed in v2.2?](#changesV2_2)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What changed in v2.1?](#changesV2_1)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What changed in v2?](#changesV2)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Within the Transparency and Consent String (TC String)](#changetcstring)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Within the Global Vendor List (GVL) Format](#changegvl)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Within the Consent Management Platform API](#changecmp)<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How do I evaluate the details provided in the TC String?](#evaluatetcstring)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How should I handle multiple signals with different information?](#mergesignals)**<br>
### [Publisher guidelines](#pub)
&nbsp;&nbsp;&nbsp;&nbsp;**[What is a Consent Management Platform (CMP) and why do I, as a Publisher, need one?](#whatiscmp)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What publisher controls are available?](#pubcontrols)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[The Global Vendor List](#gvl)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Withdrawal of consent](#withdraw)**<br>
### [Vendor guidelines](#vendor)
&nbsp;&nbsp;&nbsp;&nbsp;**[How do I find the TC String?](#findtcstring)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How do I send the TC string?](#sendtcstring)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How to determine legal bases from the TC String?](#detlegalbasis)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How to determine if data may be transmitted?](#handletcstring)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What if I don’t receive the TC string?](#nostring)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How do I determine which Global Vendor List to use?](#choosegvl)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[What else is there to consider when integrating with the TCF?](#whatelse)**<br>
### [Consent Management Platform (CMP) guidelines](#cmp)
&nbsp;&nbsp;&nbsp;&nbsp;**[Collecting consent from users](#collectconsent)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Sharing consent with vendors](#shareconsent)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Storing Consent](#storeconsent)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Other GDPR rights](#otherrights)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Encoding publisher restrictions](#pubrestrenc)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[CMP interface requirements](#cmpreq)**<br>
### [Other Frequently Asked Questions](#otherfaq)
&nbsp;&nbsp;&nbsp;&nbsp;**[Are cookies required for working with the CMP API?](#cookiesrequired)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Can I also use the API for CCPA or other laws?](#ccpa)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Related resources](#resources)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[Will these FAQ be updated?](#faqupdates)**<br>
&nbsp;&nbsp;&nbsp;&nbsp;**[How can I learn more?](#learnmore)**<br>


# Introduction to the TCF <a name="intro"></a>
The Transparency and Consent Framework (TCF) was created to help all parties who display and manage digital advertising and develop targeted content comply with the European Union’s General Data Protection Regulation (GDPR) and ePrivacy Directive (ePD) when processing personal data and/or accessing and/or storing information on a user’s device. 

It allows publishers and website operators to communicate to vendors, in a standardized way, what preferences users have expressed when it comes to their personal data. A vendor is a company that participates in the delivery of digital advertising within a publisher’s website, app, or other digital content, that either accesses an end user’s device or browser or processes personal data about end users visiting the publishers content.

The TCF was first introduced in April 2018. This document refers to version 2.2 of the TCF, announced in May 2023, which introduces significant changes and is not backward-compatible with the earlier versions.

The communication between publishers and vendors must pass through a Consent Management Platform (CMP). A CMP can be operated by anyone, as long as the entity that operates it has completed registration and is approved by IAB Europe. A list of all approved CMPs is available [here](https://iabeurope.eu/cmp-list/).

CMPs centralise and manage transparency for and consent and objections of the end users, acting as an intermediary between the Publisher, end user and vendors, using information distributed via the Global Vendor List (GVL), which contains the updated list of vendors adhering to the framework. Please refer to the Policy for complete definition of a CMP. Only CMPs can write the Transparency and Consent string, where consent is stored. Their role is to make this information available to vendors within the technical specifications that the framework states.

When configuring their CMP, publishers can make a number of decisions, including allowing only a selected list of vendors to process data through their properties. A current list of vendors adhering to the framework can be found [here](https://vendor-list.consensu.org/v2/vendor-list.json).

Any party considering adoption of the TCF must read and follow the TCF Policies, outlined in the [IAB Europe Transparency & Consent Framework Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/). Correct implementation of the framework is impossible without following the requirements in the TCF Policy.

## Who should read this document?
Publishers, Vendors (DMP, AdServer, Advertisers, audience measurement solutions, …) and registered CMPs who want to work within the TCF can use this document as guidance to implement the technology to support their efforts. This document addresses common (technical) questions and makes it easier for companies to understand the coherences of the TCF policy and technical specifications.

## How can I submit my questions?
You can learn more about IAB Tech Lab's support of the TCF and involvement with IAB Europe at the following URL: https://iabtechlab.com/standards/gdpr-transparency-and-consent-framework/

General information about the TCF can be found at: https://iabeurope.eu/transparency-consent-framework/.

You can also submit your inquiries and questions regarding the TCF to framework@iabeurope.eu and transparencyframework@iabtechlab.com.

# Common Questions <a name="commonquestions"></a>
## Do I need to read the Policy? <a name="needpolicy"></a>
Yes, the technical specifications for the TC String and CMP API were developed to support policies outlined in the Transparency and Consent Framework (TCF) Policies. Implementing the technology requires adherence to these policies.

If you have not yet read tech specs or policy, you can access these documents here: 
- [IAB Europe Transparency and Consent Framework Policies](https://iabeurope.eu/iab-europe-transparency-consent-framework-policies/)
- [Transparency and Consent String, Version 2.2](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md)
- [Consent Management Platform API, Version 2.2](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md)

All definitions in the implementation guidelines should reflect definitions provided in the Policy. 

## What changed in v2.2?<a name="changesV2_2"></a>
The TCF v2.2 update further strengthens the TCF as a standard in the industry: revised purpose names and descriptions, introduced retention periods for all purposes, removed legitimate interest for purposes 3 to 6, the introduction of data categories used in conjunction with the purposes, support for legitimate interest claim urls, adding support for localized policy urls, deprecation of the __tcfapi command "getTCData" and introducing a more robust vendor compliance program.

## What changed in v2.1?<a name="changesV2_1"></a>
Added the Device Storage Access & Disclosure to address the Planet 49 ruling.

## What changed in v2?<a name="changesV2"></a>
Version 2 of the policy and technical specification marked significant updates to better support GDPR legislation and enhance the user experience, while remaining flexible to account for unique scenarios within the framework.
Changes across the Framework are listed below and grouped according to supporting documentation for: the TC String, the Global Vendor List, and the CMP API.

### Within the Transparency and Consent String (TC String)<a name="changetcstring"></a>
- Special jurisdiction handling using publisher country code
- Publisher TC String for publisher legal basis establishment*
- Publisher restrictions added
- Legitimate interest establishment signals added
- “Right to object” to legitimate interests support added
- Enhanced TC String Encoding
	- TC String segmentation (core, publisher) 
	- Revised Macro support 
- Text revisions based on requests for clarification/consistency

### Within the Global Vendor List (GVL) Format<a name="changegvl"></a>
- Includes recent policy updates
- Better wording to distinguish between “policy version” and “GVL version”

### Within the Consent Management Platform API<a name="changecmp"></a>
- Event Listeners, Support for CMP status change, such as when a user makes an active choice, and a new TC string is generated
- New parameter order
- New function signature name
- Inclusion of passing “version” argument
- Addition of in-app “command” for in-app specific values
- Updates to support special jurisdiction, and publisher restrictions

## How do I evaluate the details provided in the TC String?<a name="evaluatetcstring"></a>
The TC String returned by the CMP API can include (2) segments of information : the core string and the publisher TC segment. The technical specs describing the TC string provide details on specific information provided in each segment. These details may change from the start of the transaction to the end of the transaction.

## How should I handle multiple signals with different information?<a name="mergesignals"></a>
Sometimes two or more TC Strings might contain different preferences for different vendors. For example, one string includes consent signals for vendors 1, 2, and 3. Later, the user is asked for consent on vendors 3, 4, and 5, but rejects all three. In this example, the most recent signal received for vendor 3 is that of no consent and should be understood as such despite previous signals.

# Publisher guidelines <a name="pub"></a>
## What is a Consent Management Platform (CMP) and why do I, as a Publisher, need one?<a name="whatiscmp"></a>
A Consent Management Platform (CMP) is used to manage transparency and consent (TC) preferences signaled by the end user. The CMP installs a user dialogue on the publisher’s digital properties to capture and manage TC information from a user. This installed user dialogue software also surfaces TC information to vendor technologies operating as part of the publisher’s digital property and supply chain. The CMP acts as an intermediary between the publisher, end user, and vendors.

Please refer to TCF Policy for a complete definition of a CMP. A registered CMP is required if the publisher or website operator wishes to work under the Policies of the TCF.  

The publisher may implement a CMP in one of two ways:

1.	**Build:** Develop an in-house CMP that meets the technical requirements specified by IAB Europe and register as an official CMP using this form.
2.	**Outsource:** Rely on  the service of a CMP registered with IAB Europe and listed here as an official CMP. 

## What publisher controls are available?<a name="pubcontrols"></a>
Starting with v2 of the TC String, a segment of information enables publishers to define restrictions. When a vendor has declared their legal basis for a purpose as flexible, the publisher can change the vendor’s default choice. For instance if a vendor declares flexible with default choice legitimate interest, the publisher can restrict that choice to requires consent.

## The Global Vendor List<a name="gvl"></a>
Publishers can ask their partners (advertising vendors, DMPs, analytics vendors, etc.) to register on the Global Vendor List (GVL), if not already registered. The Global Vendor List is maintained with current registered vendors [here](https://vendor-list.consensu.org/v2/vendor-list.json). 

## Withdrawal of consent<a name="withdraw"></a>
Vendors must support the withdrawal of consent. Since consent choices are transmitted from publisher or CMPs to partners and vendors on each transaction, the publisher or CMP should provide a mechanism for users to withdraw consent. This mechanism may be as simple as providing users with an easily accessible link/setting or a floating icon as to allow users to withdraw their consent as easily as it was to give it.

# Vendor guidelines<a name="vendor"></a>
For vendors or media buyers registered in the Global Vendor List, these guidelines help you understand how to determine whether you have the necessary legal bases to process a user's personal data for the purposes you've disclosed in the GVL, based on the information contained in the TC String.

1.	In order to read or process user data in compliance with the TCF or store and/or access information on a user’s device in compliance with the TCF, vendors must be registered in the Global Vendor List.
3.	Vendors should be able to identify traffic that falls under the GDPR territorial scope.

The instructions from OpenRTB GDPR Advisory should be used to communicate user consent when using the OpenRTB protocol. Vendors can use the two extension fields, GDPR and CONSENT, in OpenRTB to determine action. 
		
## How do I find the TC String?<a name="findtcstring"></a>
If an impression is received server side (through openRTB for example), you should read the information from the TC data payload. For openRTB, technical specifications were updated to provide information on where and how the information is passed. For other non-standard server side delivery, clarify with the partner on how the TC data payload is passed.

When the impression is received client side (redirect, prebid, etc.), the TCF API provided through the CMP should be used to access the TC data object. This information can be collected whether you are in the top parent page (using the __tcfapi method) or from an iframe (using postMessage method as defined by the CMP API technical specifications). Use a callback function passed to the TCF API event listener API (addEventListener) to retrieve the most up to date TC data object.

## How do I send the TC string?<a name="sendtcstring"></a>
For any server side call, if using openRTB, the consent payload should be sent according to the openRTB specs.

For any client side call, once the consent payload has been obtained leveraging the CMP, you can validate that it reflects user-intentful consent by checking the status of certain fields. For example:
- the field `cmpStatus` is `loaded`, and
- the field `eventStatus` is `tcloaded` or `useractioncomplete`

The status of these two fields as indicated above show that the CMP has been loaded and the user has engaged. After validating the TC data payload is suitable for your case, you should pass it in the ad call using the URL-passing macro solution detailed in documentation for the TC String.

## How to determine legal bases from the TC String?<a name="detlegalbasis"></a>
In order to determine if they have the necessary legal basis to process a user’s personal data for a specific purpose registered in the GVL, vendors must follow all relevant signals from the TC String in accordance with what they disclose in the GVL. 
The relevant signals in the TC string are the GVL version, the publisher restrictions signal, the purpose legal basis signal and the vendor legal basis signal.

Prior to processing a user’s personal data for a purpose registered in the GVL, for each purpose vendors must:

**Evaluate publisher restrictions** prior to any other signal:
1.  Check if the publisher completely disallowed processing based on this purpose using a purpose restriction 
2.  Check if the publisher restricted the applicable legal basis for this purpose using a legal basis restriction (e.g. the publisher only allows "consent" as legal basis for this purpose, or only allows "legitimate interest" as legal basis for this purpose):
    -  In the absence of a legal basis restriction, vendors must apply their default legal basis
    -  If there is a legal basis restriction vendors must apply the publisher defined legal basis, which is only allowed if that purpose is either declared with the allowed legal basis as default legal basis, or if that purpose was declared as flexible
    
In case the publisher disallows processing or in case the acceptable legal basis defined by the publisher in the restrictions is not registered by the vendor as default purpose nor is the vendor declaring that purpose as flexible, the vendor may not process personal data based on that purpose. For example, if a vendor registered legitimate interest as legal basis for a purpose and is not declaring legal basis for that purpose as flexible, it may not process in the presence of a legal basis restriction that requires consent.

**Evaluate purpose and vendor legal basis** 

After determining the applicable legal basis, vendors must then check:
1. the presence of a purpose legal basis signal for each purpose 
2. the presence of a vendor legal basis signal 

Only if both signals are positive for the applicable legal basis in the TC String may the vendor process for that purpose.

## How to determine if data may be transmitted?<a name="handletcstring"></a>
According to the policies of the Transparency and Consent Framework, a vendor may choose not to transmit data to another vendor for any reason, but a vendor must not transmit data to another vendor without a justified basis for relying on that vendor’s legal basis for processing the personal data. If a vendor has or obtains personal data and has no legal basis for the access to and processing of that data, the vendor should cease collection and storage of the data and refrain from passing the data on to other parties, even if those parties have a legal basis. To determine if a vendor has at least one legal basis to process a user’s personal data [see "How to determine legal bases from the TC String?"](#detlegalbasis).

## What if I don’t receive the TC string?<a name="nostring"></a>
If transparency or consent information is unavailable in situations where TCF applies, you may not be able to process the user's data.

## How do I determine which Global Vendor List to use?<a name="choosegvl"></a>
With TCF v2.2 the global vendor list specification version will be set to 3. We will restart the vendor list version at 1 and increment for each update. TCF 2.2 supports the TCF policy version 4 or higher. The global vendor list (spec version 3) has the policy version encoded accordingly to 4 or higher. The TC string corresponding to TCF 2.2 will also have the policy version set to 4. Vendors need to read the policy version in the TCString to determine which global vendor list to use. (A policy version of 4 or higher requires the global vendor list with gvlSpecificationVersion set to 3.)

## What else is there to consider when integrating with the TCF?<a name="whatelse"></a>
- Tag management containers should integrate CMP code. In addition to enriching ad calls, a CMP should also support calling a third-party tag management container that will handle robust tag logic already implemented on behalf of the publisher. 
- Syndication for buy-side DMPs centralizes marketing information associated with pseudonymous IDs, which enables marketers to improve their media planning, syndication and cross-vendor reporting.
	- Syndication of audience segments is often initiated by a marketer ruleset to send information from the DMP to take-action systems (DSP, DCO, Site Optimization, etc.).
	- Because the TC string maintains the current consent state for all vendors, the DMP can send only pseudonymous IDs with consent state=1 to recipient vendors.

# Consent Management Platform (CMP) guidelines<a name="cmp"></a>
This section outlines implementation guidelines for CMPs to be compliant with the TCF technical specification when collecting, storing and sharing user consent.

Register to be on the CMP list: https://register.consensu.org/. This step is required to be a TCF recognised CMP trusted by vendors receiving the consents that you collect. Upon registration a CMP is assigned an ID, which is passed with each request. Since September 1st 2021, new registering CMPs are no longer granted access to the “consensu.org” domain. Starting from July 10th 2023, CMPs who have been registered with the TCF before September 1st 2021 will no longer be able to host their tags at https://[cmpname].mgr.consensu.org/.

## Collecting consent from users<a name="collectconsent"></a>
The TCF defines a set of common purposes and features that vendors can act on. Vendors are responsible for providing up-to-date information on the purposes they support and the legal basis under which they wish to operate these purposes. This information is captured in the  Global Vendor List (GVL). 

For a given publisher, a CMP must collect the user consent for all purposes and vendors declared/chosen by the publisher.

A range of requirements on how consent must be presented, collected and stored can be found in the TCF policy document.

## Sharing consent with vendors<a name="shareconsent"></a>
The TCF defines standard APIs and formats for communicating between CMPs collecting consent from end users and vendors embedded on a website or in a mobile application.
This API provides a unified interface for seamless interaction between the parties in the advertising industry.

As a CMP, you will need to:
- Collect consent from the end user that is compliant with the TCF Technical Specifications and Policy.
- Generate an encoded data string, the TC String, containing the set of preferences expressed by the user
- Share the TC String with vendors through the available APIs.

## Storing Consent<a name="storeconsent"></a>
In version 2 of the TCF Specifications, the storage mechanism used for service-specific and group-specific TC Strings is up to a CMP, including any non-cookie storage mechanism.

For long-term storage, the following methods are common across CMPs:

Method | Pros | Cons
------------ | ------------- | -------------
Cookies | Easy to use and cheap. Fast and provide a good user experience. | Short-lived. First-party cookies might be regularly deleted by browsers
Server-side storage | Long-lived. Can be used as proof of consent | Can be slow (use cookies/local storage as client-side cache). Requires a long-term ID (cookie ID or email or similar user ID)
Mobile: internal data storage / shared preferences | Easy to use and cheap. Fast and provide a good user experience | Cannot be shared across apps so group-specific consent can be hard to achieve

## Other GDPR rights <a name="otherrights"></a>
Certain GDPR rights, such as portability and the right to be forgotten, are not covered in the IAB Europe TCF. CMPs, publishers and vendors should address other GDPR rights outside the TCF separately and on their own.

## 5. Encoding publisher restrictions <a name="pubrestrenc"></a>
In order to reduce the size of the TC string, CMPs are advised to store/provide publisher restrictions only when necessary to reflect the publisher's choice to restrict a vendor's processing of personal data. In terms of reflecting a publisher’s choice:

* In case a vendor has not been disclosed to the user via the CMP UI, there is no need to store restrictions for that vendor in the TC String. Given the vendor was not disclosed both vendor consent and vendor legitimate interest signals in the TC String can be left undefined which suffices to signal that the vendor may not process personal data.
* Purpose restrictions that disallow a vendor from processing personal data for a specific purpose only need to be stored in case the vendor was disclosed by the CMP (reflecting the restriction in the UI) and registered for that purpose in the GVL.
* Legal Basis restrictions are only needed in situations where the vendor was disclosed by the CMP (reflecting the restriction in the UI) and is declaring flexibility in the GVL for the corresponding purpose, meaning that:

    1. The vendor registered a purpose as legitimate interest (default legal basis), but also registered this purpose as flexible (i.e. also accepts consent as a legal basis). In this case a "require consent" restriction is needed to signal that the vendor may only process using consent as legal basis.
    2. The vendor registered a purpose as consent (default legal basis), but also registered this purpose as flexible (i.e. also accepts legitimate interest as a legal basis).  In this case a "require legitimate interest" restriction is needed to signal that the vendor may only process using legitimate interest as legal basis.
    
Note that the above does not preclude the use of efficient encoding/decoding schemes in certain scenarios. For example, in cases where a publisher wants to restrict a purpose for all vendors to consent, it might be more efficient to encode a small number of range restriction segments using a specific encoding scheme.

## 6. CMP interface requirements<a name="cmpreq"></a>
Please refer to the policies for the minimal information / functionality that needs to be shown on the first screen of the UI and the information that must be present on second/additional layers of the UI.

# Other Frequently Asked Questions<a name="otherfaq"></a>
## Are cookies required for working with the CMP API?<a name="cookiesrequired"></a>
No, in version 2 and higher of the TCF Specifications, the storage mechanism used for service-specific and group-specific TC strings is up to a CMP, including any non-cookie storage mechanism.

For further explanations, please go to the section [Storing Consent](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/TCF-Implementation-Guidelines.md#3-storing-consent) above.

## Can I also use the API for CCPA or other laws?<a name="ccpa"></a>
At this time, the IAB Europe Transparency and Consent Framework is designed for compliance with GDPR. The CMP API was designed to only support a special use case of the GDPR, which involves the use of user data in the context of digital advertising or content. Consult your local IAB or the IAB Tech Lab to learn more about other ongoing projects for privacy tool development such as the Global Privacy Platform (GPP).

## Related resources<a name="resources"></a>
A v2 consent string encoder/decoder can be found here: https://iabtcf.com/#/ as well as links to further implementation libraries.

## Will these FAQ be updated?<a name="faqupdates"></a>
Yes, these guidelines will be updated as questions arise.

## How can I learn more?<a name="learnmore"></a>
Visit our TCF web page at https://iabeurope.eu/tcf-2-0/ and join the working group.
