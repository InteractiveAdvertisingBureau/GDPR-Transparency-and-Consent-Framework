# GDPR Consent passing for URL-based services: Transparency and Consent Framework

**May 2018 | Implementation Guidance**

**IAB Tech Lab | IAB Europe**

## GDPR Consent Passing for URL-based services 

This document contains implementation guidance reviewed by the IAB Tech Lab GDPR Commit Group for use within the IAB Europe Transparency and Consent Framework.

## OVERVIEW 

Consent signals (for GDPR) can currently be obtained through the CMP Consent JS javascript API (for services running as a javascript tag), or through OpenRTB extension fields for exchanges and bidders. However, consent signals also need to be provided to pixels, pixel redirects used in beaconing and user ID matching processes, and other URL-based services, because they may collect personal information but, being called by either direct HTTP GET requests from properties of another party or redirects therefrom, the receiving service does not have an opportunity to run javascript in the browser in order to access the CMP Consent javascript API itself. These URL-based service fetches are initiated by publisher's or other vendor's javascript code which has access to the consent signal, or as the impression of a winning bidder which also has access to the consent signal from OpenRTB.

## GOALS

1. Specify an industry-standard proposal for passing consent signals (outside of the OpenRTB fields) suitable for direct HTTP called services

2. Drive AdTech industry-wide adoption of this proposal for consistent and reliable consent passing and handling

## SPECIFICATIONS

### Full consent-string passing

Services that are called using a URL from the user's browser, like cookie staplers, user id associators, and tracking pixels (called the '*callee*') should be passed the following parameters. The creator of the URL should ensure these parameters are added only once, and are passed to services which are expecting them and can handle them properly.

<table>
  <tr>
    <td>URL parameter</td>
    <td>possible values</td>
    <td>purpose</td>
  </tr>
  <tr>
    <td>gdpr</td>
    <td>0 / 1</td>
    <td>0=GDPR does not apply
1=GDPR applies
If not present, callee should do geoIP lookup, and GDPR applies for EU IP addresses</td>
  </tr>
  <tr>
    <td>gdpr_consent</td>
    <td>URL-safe base64-encoded GDPR consent string. Only meaningful if gdpr=1</td>
    <td>Encodes the consented-to purposes and vendor consent string, as obtained from the CMP JS API or OpenRTB.</td>
  </tr>
  <tr>
    <td>gdpr_pd</td>
    <td>0 / 1 (optional, default: 1)</td>
    <td>for generic URL parameters, gdpr_pd=0 indicates none of them contain personal data (from the perspective of the callee). For "defined" URL parameters, their definition should define whether they include personal data.</td>
  </tr>
</table>


Note that other personal data, like IP addresses or callee cookies, may be passed as part of the request, and the 'gdpr' and 'gdpr_consent' should be used by the callee to determine whether an identifier cookie or other personal data can be set and/or used.

### CMP consent redirecting

CMP's can implement a consent redirector and host it at [https://](https://cmpname.mgr.consensu.org/consent?redirect=url)*[cmpnam*e](https://cmpname.mgr.consensu.org/consent?redirect=url)[.mgr.consensu.org/consent?redirect=](https://cmpname.mgr.consensu.org/consent?redirect=url)*[ur*l](https://cmpname.mgr.consensu.org/consent?redirect=url) which can read the (web-wide global) consent cookie which will be sent by the browser and issue a 302 HTTP redirect to *url* using the following URL parameters:

<table>
  <tr>
    <td>redirector (input) URL parameter</td>
    <td>possible values</td>
    <td>purpose</td>
  </tr>
  <tr>
    <td>redirect</td>
    <td>url-encoded URL to redirect to</td>
    <td>a 302 HTTP redirect is issued to that URL. If the strings ("macros") {gdpr} and/or {gdpr_consent} are present, they will be substituted with the output parameters as described below.</td>
  </tr>
  <tr>
    <td>add_parms</td>
    <td>0 / 1</td>
    <td>if present, forces the addition (1)  or non-addition (0) of the 'gdpr' and 'gdpr_consent' parameters below. Macro substitution always occurs in the 'redirect' URL. The default value is 0 if either macro is present in 'redirect', otherwise it defaults to 1</td>
  </tr>
  <tr>
    <td>gdpr</td>
    <td>0 / 1</td>
    <td>forces the value of the 'gdpr' redirect parameter</td>
  </tr>
  <tr>
    <td>apikey</td>
    <td>(optional, CMP-defined)</td>
    <td>If defined by the CMP, an 'apikey' will (weakly) authenticate responses. A fixed string or javascript-signed string is inherently insecure due to the visibility of javascript and HTTP requests. Server-side signing could be implemented, but likely requires an extra request or redirect.</td>
  </tr>
  <tr>
    <td>redirected-to (output) URL parameter or {macro} replacement</td>
    <td>possible values</td>
    <td>purpose</td>
  </tr>
  <tr>
    <td>gdpr</td>
    <td>0 / 1</td>
    <td>indicates if GDPR applies (i.e. user IP is in EU, or has been forced by 'gdpr' input parameter)</td>
  </tr>
  <tr>
    <td>gdpr_consent</td>
    <td>base64url-encoded GDPR consent string. Only meaningful if gdpr=1</td>
    <td>the consent string from the consent cookie</td>
  </tr>
</table>


## OPEN QUESTIONS

* The "CMP consent redirecting" has a major flaw that it can only access the "global" web-wide consent cookie. Many publishers will be using publisher-local first-party cookies to store vendor consent instead: knowing that they are in scope for a given request, and accessing them will be difficult (suggestions welcomed).

## DOCUMENT HISTORY

2018/03/01: first made available for review

2018/03/12: posted for working group review in IAB Tech Lab's working group

2018/05/09: posted as implementation guidance on Tech Lab github, after review by Tech Lab GDPR Commit Group
