# **Macro** as a web-wide standard for URL-based services to pass/receive the Transparency and Consent String 


## Document status 

Published on April 25 2019 as part of the IAB Europe Transparency and Consent Framework v2 public comment period. This document is intended to replace the former guidance for URL-based consent string passing.


## Background 

GDPR Consent signals (in particular, the Transparency and Consent String (TCString)) can currently be obtained through the CMP Consent JavaScript API (for services running as a JavaScript tag), or through OpenRTB extension (for RTB bidders and exchanges). 

For URL-based services that do not run as a JavaScript tag, [GDPR Consent passing for URL-based services: Transparency and Consent Framework](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/URL-based%20Consent%20Passing_%20Framework%20Guidance.md) currently proposes a mechanism to retrieve web-wide global consent by redirecting through [https://cmpnam*e.mgr.consensu.org/consent?redirect=ur*l](https://cmpnam*e.mgr.consensu.org/consent?redirect=ur*l). URL-based services can include ad servers (e.g. 3rd-party vendors that provide creative rendering) as well as the “pixels” that are part of a rendered creative. The current specification does *not* address how individual vendors on the “call chain” of a creative or a pixel (i.e. the current vendor, and potentially subsequent callout/redirection to additional vendors) will be able to propagate and receive the Transparency and Consent String. 


## Summary 

This document proposes an addition to the [current IAB specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/URL-based%20Consent%20Passing_%20Framework%20Guidance.md) that leverages a pre-defined “macro” as a web-wide standard for URL-based services to pass and receive the Transparency and Consent String. Adoption of this macro will allow individual vendors on the call chain to reliably propagate and receive Transparency and Consent String via TCF, attaining maximal interoperability in the ecosystem.


## Technical Problem & Proposed Solution 

When a creative is rendered, it may contain a number of pixels under `<img>` tags. For example, `<img src="http://vendor-a.com/key1=val1&key2=val2">` may be one such example for a pixel, which fires an HTTP GET request from the browser to Vendor A’s domain. A number of observations can be made: 

*   Since the pixel is in an `<img>` tag, CMP Consent JavaScript API cannot be used to obtain the Transparency and Consent String. 
*   In order for Vendor A to receive the Transparency and Consent String, a solution is needed for the Ad Server that renders the creative to “insert” Transparency and Consent String into Vendor A pixel’s URL. 
*   Vendor A may also further call out to additional vendors (for example, Vendor B) by redirecting to `http://vendor-b.com/key3=val3&key4=val4`. In order for Vendor B to also receive the Transparency and Consent String, a solution is needed for Vendor A to insert Transparency and Consent String into the Vendor B’s URL. 
*   The same applies along the call chain of this pixel through the remaining Vendors.

The proposed solution is for all participants in the TCF that need to transact with URL-based services (in the example above, these would be Ad Server, Vendor A, Vendor B, and so on) to adopt a “macro” in the form of <code>${gdpr_consent}</code> as the common placeholder for the Transparency and Consent String in their respective URLs. A caller, who has access to the Transparency and Consent String, is required to substitute the Transparency and Consent String for the macro in a callee’ URL. 

In the example above, the new request flow becomes: 

*   Vendor A’s pixel URL now becomes <code>http://vendor-a.com/key1=val1&key2=val2&some_key=${gdpr_consent}</code>. There will be no stipulation by TCF as to what URL key should be used that corresponds to <code>${gdpr_consent}</code>; it is up to individual vendors as long as the payload can be correctly parsed by the vendor. 
*   Ad Server renders Vendor A’s pixel by substituting the actual Transparency and Consent String for the macro, leading to <code>http://vendor-a.com/key1=val1&key2=val2&some_key=BOPnWgIOPnWgIAAABAENAI4AAAAA0ABA</code>, where <code>BOPnWgIOPnWgIAAABAENAI4AAAAA0ABA</code> is an example of a URL-safe base64-encoded Transparency and Consent String. Vendor A thus receives the Transparency and Consent String when its pixel fires. 
*   Vendor B’s URL now becomes <code>http://vendor-b.com/key3=val3&key4=val4&some_other_key=${gdpr_consent}</code>.
*   If and when Vendor A makes a further callout/redirect to Vendor B, the macro is similarly replaced with the actual Transparency and Consent String that Vendor A has received earlier, leading to <code>http://vendor-b.com/key3=val3&key4=val4&some_other_key=BOPnWgIOPnWgIAAABAENAI4AAAAA0ABA</code>. Note that Transparency and Consent String should always be propagated as is, and not modified. Vendor B thus also receives the Transparency and Consent String.
*   The process goes on along the call chain of this pixel through the remaining Vendors. 

The above macro, <code>${gdpr_consent}</code>, is consistent with what the [current specification](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/URL-based%20Consent%20Passing_%20Framework%20Guidance.md) already includes. Note that, also as part of the current specification, a second macro, in the form of <code>${gdpr}</code>, can be included in addition to indicate [if GDPR is in effect](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/URL-based%20Consent%20Passing_%20Framework%20Guidance.md#full-consent-string-passing), with the caller substituting “1” for the macro value when GDPR is in effect. When this second macro is absent, the framework specifies that a callee should carry out its own resolution based on IpGeo information. 

Based on current specification, this proposal further expands the use of macros in order to fully realize interoperability amongst individual URL-based services in the ecosystem under the TCF. 

## Transition & Proposed Timeline  

It is proposed that the aforementioned improvements be included in the overall TCF v2.0. As part of the implementation of finalized specifications for TCF 2.0, this URL based consent passing mechanism should be communicated to all participants, and requested that updates be made by:


1. URL-based vendors (for example, to add the capability to receive, propagate, and otherwise make use of Transparency and Consent String via the proposed macro), and
2. Advertising customers that work with such vendors (for example, to transition the creatives where such vendors are utilized), so that they can correctly propagate and receive the Transparency and Consent String through the proposed macro solution above.
