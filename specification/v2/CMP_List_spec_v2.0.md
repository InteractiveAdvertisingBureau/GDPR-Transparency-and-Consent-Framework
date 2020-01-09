![iab tech lab](https://user-images.githubusercontent.com/19175352/38649177-0d37d17c-3daa-11e8-8934-f0fb47919716.png)

# CMP List

 **IAB Europe Transparency & Consent Framework**

 **Final v.2.0 | August 2019, Updated December 2019**

* [Global CMP List Specification](#global-cmp-list-specification)
  + [What is contained in the Global CMP List?](#what-is-contained-in-the-global-cmp-list)
  + [Where can I access the Global CMP List?](#where-can-i-access-the-global-cmp-list)
  + [How often is the Global CMP List updated?](#how-often-is-the-global-cmp-list-updated)
  + [Caching the Global CMP List](#caching-the-global-cmp-list)
  + [Server-side caching of the GCL](#server-side-caching-of-the-gcl)
  + [Using a compressed version of the Global CMP List](#using-a-compressed-version-of-the-global-cmp-list)
  + [Example Global CMP List JSON Object](#example-global-cmp-list-json-object)
 * [License](#license)
 * [Disclaimer](#disclaimer)

## Global CMP List Specification
The Global CMP List (GCL) is a JSON format document that lists all CMPs registered with the Transparency and Consent Framework (TCF). This file is used by vendors to determine which CMPs are compliant and active within the framework, in order to ascertain whether a given CMP ID found in a consent string or TC String is valid.

IMPORTANT NOTE: all CMPs that have registered with the TCF are listed in this file. CMPs that are no longer active for whatever reason, have the `deletedDate` property set. Consent strings or TC Strings for CMPs with a `deletedDate` set must be considered invalid after that date/time and must be discarded immediately and not passed downstream.

##### What is contained in the Global CMP List?
* A Last Updated Date.
* A list of CMPs detailing:
  * A Numeric ID which is incrementally assigned and never re-used - inactive CMPs are marked as deleted.
  * Their Name.
  * Whether or not the CMP is a commercial service.
  * If applicable, the date/time after which CMP is considered inactive.

##### Where can I access the Global CMP List?
The GCL is in JSON format and the current version at any given time can be retrieved using the following URL:

https://cmplist.consensu.org/cmp-list.json

##### How often is the Global CMP List updated?
As of the publication of this document, changes to the Global CMP List are published weekly at 5:00 PM Central European Time on Thursdays. IAB Europe reserves the right to change this time and will notify members of any changes.

##### Caching the Global CMP List
Strict restrictions on caching the GCL apply.

All requests for the Global CMP List must honour the cache-control headers and must not cache the resource with different settings.

Note: There may be a delay of up to the maximum cache interval in retrieving the latest version of the Global CMP List.

##### Server-side caching of the GCL
As requests for a GCL file will not be in a browser context, GCL files must be cached explicitly server-side according to the cache-control headers.

Application logic must only request one version of the GCL during the cache period specified in the cache-control header. For example, if the caching period is one week, only one request for the current GCL file must be received per week.

Note: The volume of usage will be monitored carefully by the managing organisation (MO) and any organisations not adhering to this request limit will be blocked from accessing the GCL.

##### Using a compressed version of the Global CMP List
A compressed version of the GCL must be requested. This can be done by sending Accept-Encoding headers on the GET request for the file:

- Example: Accept-Encoding: gzip, deflate, br

##### Example Global CMP List JSON Object
Here is an example of the GCL’s JSON format:


```
{
  "lastUpdated": "2019-10-31T00:00:00Z",
  "cmps": {

    /**
     * Information published for each CMP
     *
     * "id": numeric, REQUIRED
     * "name": string, REQUIRED
     * "isCommercial": boolean, REQUIRED
     * "deletedDate": date string ("2019-05-28T00:00:00Z") OPTIONAL
     *  If present, CMP is considered deleted after this date/time and
     *  consent string or TC String must be discarded immediately.
     */

    "2":{
      "id": 2,
      "name": "Chandago",
      "isCommercial": true
    },

    // ... more CMPs

    "136":{
      "id": 136,
      "name": "M6 Web",
      "isCommercial": false,
      "deletedDate": "2019-08-06T00:00:00Z"
    }

    // ... more CMPs

  }
}
```

### License

IAB Europe Transparency and Consent Framework technical specifications governed by the IAB Tech Lab is licensed under a Creative Commons Attribution 3.0 License.   To view a copy of this license, visit[ creativecommons.org/licenses/by/3.0/](http://creativecommons.org/licenses/by/3.0/) or write to Creative Commons, 171 Second Street, Suite 300, San Francisco, CA 94105, USA.

![](https://drive.google.com/uc?id=1cbwEGlb8S69SndIDoHnvc5_3TfmkGM7R)

### Disclaimer

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE “PRODUCTS AND SERVICES”) ARE PROVIDED “AS IS” AND “AS AVAILABLE,” AND IAB TECHNOLOGY LABORATORY, INC. (“TECH LAB”) MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.
