 ![iab tech lab](https://user-images.githubusercontent.com/19175352/38649177-0d37d17c-3daa-11e8-8934-f0fb47919716.png)

# IAB Europe Transparency & Consent Framework

## Specifications
 - [Consent Management Provider JavaScript API v1.1](./CMP_API_spec_v1.1.md)
 - [Consent String and Vendor List Format v1.1](./Consent_String_and_Vendorlist_spec_v1.1.md)
 - [Mobile In-App CMP API v1.0](./In-App_spec_v1.0.md)
 - [URL-Based Consent Passing](./URL-Based_Consent_Passing_v1.1.md)

## Implementation Guidelines

 - [Implementation Guidelines](./Implementation_Guidelines_v1.1.md)

## Version History

| Date | Version | Comments |
| :-- | :-- | :-- |
| April 2018 | 1.1 | First version released to the public |

## Introduction

This document is one of the IAB Europe Transparency and Consent Framework Specifications. It defines the technical implementation of the structure and encoding for a Transparency and Consent String (TC String), and the format for a [Global Vendor List (GVL)](./Consent_String_and_Vendorlist_spec_v1.1.md) maintained by IAB Europe. The TC String is a technical component of the IAB Europe Transparency & Consent Framework (TCF).

The General Data Protection Regulation (GDPR) requires a high level of accountability for how personal data is processed. While important to all parties in the digital advertising ecosystem, implementation of the GDPR came with heavy technical challenges.

The GDPR requires, amongst others, a legal basis for such processing. The two most relevant legal bases are the consent of the user to the processing of their personal data, and the legitimate interests of the controller or a third party to the processing of a user’s personal data, provided that the interests and fundamental rights of the user are not overriding. Both legal bases require the provision of disclosures to ensure transparency, and the opportunity for user choice either through the user’s consent to the processing of their personal data before the processing starts if the legal basis is consent, or through the user’s objection to the processing of their personal data after the processing starts if the legal basis is a legitimate interest. Under the GDPR, controllers are required to create and maintain records of compliance, including, but not limited to user consent records. This warrants clear standards for a common technical solution for all affected parties and policies to govern how that solution is used.

IAB Europe established the TCF to support compliance with the GDPR in the context of digital advertising. This framework is built on four components: a [Global Vendor List (GVL)](./Consent_String_and_Vendorlist_spec_v1.1.md), a Transparency and Consent String (TC String), an API for Consent Management Providers (CMPs) to create and process the TC String, and the Policies that govern how the TCF is used.

Prescribed use of the TCF may support compliance with the GDPR, but the real benefit to the digital advertising ecosystem is a safer Internet for consumers, and more reliable data for brands and publishers. As adoption of the TCF increases, compliance becomes more scalable and data becomes more meaningful.

To participate in the use of the TCF, vendors must make a public attestation of compliance with the Policies for using it. To have transparency and consent established and signaled status for your online services stored in a global database, apply to be added to the [GVL](./Consent_String_and_Vendorlist_spec_v1.1.md). To play a role in creating a TC String for signaling status on transparency and user consent, sign up with IAB Europe to become a CMP. CMPs must follow technical standards provided in this document for creating TC Strings in compliance with TCF Policies. They must also follow technical standards guidance for using the CMP API specified in this document to receive and process information provided in a TC String.


### About the Transparency & Consent Framework

IAB Europe Transparency & Consent Framework (TCF) has a simple objective to help all parties in the digital advertising chain ensure that they comply with the EU’s General Data Protection Regulation and ePrivacy Directive when processing personal data or accessing and/or storing information on a user’s device, such as cookies, advertising identifiers, device identifiers and other tracking technologies. IAB Tech Lab stewards the development of these technical specifications.

Resources including policy FAQ, and [Global Vendor List](./Consent_String_and_Vendorlist_spec_v1.1.md) can be found at [iabeurope.eu/tcf](https://iabeurope.eu/tcf).

### License

IAB Europe Transparency and Consent Framework technical specifications governed by the IAB Tech Lab is licensed under a Creative Commons Attribution 3.0 License.   To view a copy of this license, visit[ creativecommons.org/licenses/by/3.0/](https://creativecommons.org/licenses/by/3.0/) or write to Creative Commons, 171 Second Street, Suite 300, San Francisco, CA 94105, USA.

![](https://drive.google.com/uc?id=1cbwEGlb8S69SndIDoHnvc5_3TfmkGM7R)


Disclaimer

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE “PRODUCTS AND SERVICES”) ARE PROVIDED “AS IS” AND “AS AVAILABLE,” AND IAB TECHNOLOGY LABORATORY, INC. (“TECH LAB”) MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.



### About IAB Tech Lab

The IAB Technology Laboratory (Tech Lab) is a non-profit consortium that engages a member community globally to develop foundational technology and standards that enable growth and trust in the digital media ecosystem.. Comprised of digital publishers, ad technology firms, agencies, marketers, and other member companies, IAB Tech Lab focuses on improving the digital advertising supply chain, measurement, and consumer experiences, while promoting responsible use of data. Its work includes the OpenRTB real-time bidding protocol, ads.txt anti-fraud specification, Open Measurement SDK for viewability and verification, VAST video specification, and DigiTrust identity service. Board members include ExtremeReach, Facebook, Google, GroupM, Hearst Digital Media, Index Exchange, Integral Ad Science, LinkedIn, LiveRamp, MediaMath, Microsoft, Oracle Data Cloud, Pandora, PubMatic, Quantcast, Rakuten Marketing, Telaria, The Trade Desk, Verizon Media Group, Xandr, and Yahoo! Japan. Established in 2014, the IAB Tech Lab is headquartered in New York City with staff in San Francisco, Seattle, and London. Learn more at [https://www.iabtechlab.com](https://www.iabtechlab.com/).



### About IAB Europe

IAB Europe is the European-level association for the digital marketing and advertising ecosystem. Through its membership of National IABs and media, technology and marketing companies, its mission is to lead political representation and promote industry collaboration to deliver frameworks, standards and industry programmes that enable business to thrive in the European market.

Learn more about IAB Europe here: [https://www.iabeurope.eu/](https://www.iabeurope.eu/)
