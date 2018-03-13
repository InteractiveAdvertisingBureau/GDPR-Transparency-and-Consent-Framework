# GDPR Transparency and Consent Framework

## Table of Contents

- [GDPR Transparency and Consent Framework](#gdpr-transparency-and-consent-framework)
  * [Technical specifications](#technical-specifications)
    + [IAB Europe Transparency and Consent Framework ("Framework")](#iab-europe-transparency-and-consent-framework---framework--)
  * [Repository contents](#repository-contents)
  
## Technical specifications

Here is the technical specification for public comment for IAB Europe Transparency and Consent Framework that will help the digital advertising industry interpret and comply with EU rules on data protection and privacy - notably the General Data Protection Regulation (GDPR) that comes into effect on May 25, 2018. 

### IAB Europe Transparency and Consent Framework ("Framework")

In November 2017, IAB Europe and a cross-section of the publishing and advertising industry, announced a new Transparency & Consent Framework ('Framework") to help publishers, advertisers and technology companies comply with key elements of GDPR. The Framework will give the publishing and advertising industries a common language with which to communicate consumer consent for the delivery of relevant online advertising and content. 

The documents published here that support the Framework are draft specifications for public comment. IAB Tech Lab is charged with the technical governance of these specifications. 

* [Draft_for_Public_Comment_Transparency & Consent Framework Formatted CMP JS API v1.0.pdf](Draft_for_Public_Comment_Transparency%20%26%20Consent%20Framework%20Formatted%20CMP%20JS%20API%20v1.0.pdf)
* [Draft_for_Public_Comment_Transparency & Consent Framework - cookie and vendor list format specification v1.0a.pdf](Draft_for_Public_Comment_Transparency%20%26%20Consent%20Framework%20-%20cookie%20and%20vendor%20list%20format%20specification%20v1.0a.pdf)

Please submit your general feedback to feedback@advertisingconsent.eu and any technical feedback to transparencyframework@iabtechlab.com by April 8, 2018.

## Repository contents

This repository contains specifications for review, a reference
implementation of a consent manager provider (CMP) and 
utility files to help visualize the currently proposed specs.

This project's directory structure is as follows:

```
GDPR-Transparency-and-Consent-Framework/
  qc-cmp/
    build/
    node_modules/
    src/
    utils/
      README.md
      cookie-workshop.html
    vendorlist-example/
    index.html
    package.json
    README.md
  README.md
```

 * The `qc-cmp` folder contains a reference implementation of a consent
  manager provider (CMP) created by Quantcast. This CMP is currently a 
  working beta. <br> For additional information see this folder's [README](qc-cmp/README.md).

    * The `utils` folder contains helpful utilities for the Consent Framework.
  It currently contains just the cookie workshop 
  which shows resultant consent cookie values for given input field
  values. <br> For addtional information see this folder's
  [README](qc-cmp/utils/README.md).
