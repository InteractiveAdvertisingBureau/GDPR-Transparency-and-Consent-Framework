# Additional Vendor Information List Specification

## Summary

The Additional Vendor Information List is a technical document that can be downloaded from a domain managed and published by IAB Europe. It lists additional information registered by approved Vendors, such as B2B contact details, territorial scope or environments supported by their technology. The information stored in the list is not intended for user disclosures and can be used by publishers for determining which Vendors they wish to establish transparency and consent for on their digital properties.

## What is contained in the Additional Vendor Information List?

 * Full Legal Entity Address
 * B2B Contact details
 * Territorial scope (EU/EEA/EFTA/UK countries where the vendor operates)
   + Jurisdictions list with [ISO 3166 country codes](https://www.iso.org/obp/ui/#search): Belgium (BE), Bulgaria (BG), Czechia (CZ), Denmark (DK), Germany (DE), Estonia (EE), Ireland (IE), Greece (GR), Spain (ES), France (FR), Croatia (HR), Iceland (IS), Italy (IT), Cyprus (CY), Latvia (LV), Liechtenstein (LI), Lithuania (LT), Luxembourg (LU), Hungary (HU), Malta (MT), Netherlands (NL), Norway (NO), Austria (AT), Poland (PL), Portugal (PT), Romania (RO), Slovenia (SI), Slovakia (SK), Finland (FI), Sweden (SE), Switzerland (CH), United Kingdom (GB)
 * Environment (environments where the vendor operates)
   + Web
   + Native App (Mobile)
   + Native App (CTV)
   + Other
 * Type of Services
   + SSP
   + DSP
   + Verification
   + Ad serving
   + Header bidding
   + DMP / Data provider
   + Identity resolution services
   + Content delivery network
   + Recommendation service
   + Website analytics
   + Buyer
   + Campaign Analytics
   + Audience analytics
   + Other
 * International Transfers outside of the EU/EEA
   + Y/N
   + When Y, transfer mechanisms
     - Adequacy decision
     - SCCs
     - BCRs
     - Other

## Where can I access the Additional Vendor Information List?

The Additional Vendor Information List is in JSON format and the current version at any given time can be retrieved using the following URL structure:

https://vendor-list.consensu.org/v2/additional-vendor-information-list.json

## Example Additional Vendor Information List Object

````javascript
{
  "aviSpecificationVersion": 1,
  "aviListVersion": 1, // incremented with each published file change
  "lastUpdated": "2022-05-28T00:00:00Z",
  "vendors": {
  /**
   * Information published for each vendor
   *
   * "id": numeric, REQUIRED
   *
   * "name": string, REQUIRED
   *
   * "legalAddress": string, REQUIRED 
   *
   * "contact" string, REQUIRED
   *
   * "territorialScope": array of enum, REQUIRED. Indicates EU/EEA/UK 
   * jurisdictions where the vendor operates with TCF. Note that this is 
   * different from the vendor’s place of establishment. ‘BE’, ‘BG’, ‘CZ’, 
   * ‘DK’, ‘DE’, ‘EE’, ‘IE’, ‘GR’, ‘ES’, ‘FR’, ‘HR’, ‘IS’, ‘IT’, ‘CY’, ‘LV’, 
   * ‘LI’, ‘LT’, ‘LU’, ‘HU’, ‘MT’, ‘NL’, ‘NO’, ‘AT’, ‘PL’, ‘PT’, ‘RO’, ‘SI’, 
   * ‘SK’, ‘FI’, ‘SE’, ‘CH’, ‘GB’
   *
   * "environments": array of enum, REQUIRED. Indicates the environments where 
   * the vendor operates. ‘web’, ‘native app (mobile)’, ‘native app (CTV)’, 
   * ‘other’.       
   *
   * "serviceTypes": array of enum, REQUIRED. Indicates the type of services 
   * offered by the vendor. ‘SSP’, ‘DSP’, ‘Verification’, ‘Ad serving’,    
   * ‘Header bidding’, ‘DMP / Data provider’, ‘Identity resolution services’, 
   * ‘Content delivery network’, ‘Recommendation service’, ‘Website   
   * analytics’, ‘Buyer campaign analytics’, ‘Audience analytics’, ‘Other’.
   *
   * "internationalTransfers": boolean, REQUIRED. Indicates whether the   
   * vendors transfer personal data outside of the EU/EEA.
   *
   * "transferMechanisms": array of enum, REQUIRED IF internationalTransfers = 
   * true else null. ‘Adequacy decision’, ‘SCCs’, ‘BCRs’, ‘Other’
   *
   */

  "1":{
    "id": 1,
    "name": "Vendor Name",
    "legalAddress": "Vendor Name",
    "contact": "vendor@vendor.com",
    "territorialScope": ["BE", "FI"],
    "environments": ["web","other"],
    "serviceTypes": ["SSP", "Ad serving"],
    "internationalTransfers": true,
    "transfersMechanisms": ["BCRs"]
      }
    
  // ... more vendors
  }
}
````

