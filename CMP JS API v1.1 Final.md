# Consent Management Provider JavaScript API v1.1: Transparency & Consent Framework

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
8. [CMP JS API v1.1](#CMP-JS-API) 
9. [Version History](#Version-History)
10. [What is supported by this API?](#supported-API)
11. [What API will need to be provided by the CMP?](#API-provided)
12. [What are the return data objects passed to the callbacks?](#return-objects)
13. [VendorConsents](#vendorconsents)
14. [VendorConsentData](#vendorconsentdata)
15. [PublisherConsents](#publisherconsents)
16. [PingReturn](#pingreturn)
17. [How can callers determine if there is a CMP present?](#CMP-present)
18. [How can callers determine if the CMP script is loaded yet?](#CMP-loaded)
19. [What is sequence of the stub installation and loading of the CMP script?](#stub-sequence)
20. [Is there a sample CMP stub?](#CMP-stub-sample)
21. [How can vendors that use iframes call the CMP API from an iframe?](#iframe)
22. [Via safeFrames](#safeframe)
23. [Without safeFrames, using postMessage](#postmessage)
24. [Where will the API retrieve the vendor consent information from?](#retrieve)
25. [How will the API prioritize the service-specific and the global cookies?](#prioritize)
26. [Major-changes](#major-changes) 

# Introduction <a name="Introduction"></a>

In February 2017, the IAB Europe assembled parties representing both the supply and demand sides of the digital advertising ecosystem, to work collectively on guidance and solutions to the requirements of the General Data Protection Regulation (GDPR).  That working group is known as the GDPR Implementation Working Group (GIG).  One of the sub-groups within the GIG was tasked with developing guidance on consent as a legal basis for processing personal data. Out of that effort, an additional working group was formed to develop a technical solution to the challenge of obtaining and disseminating consumer consent to the various parties relying on it as a legal basis of processing personal data.

## About the Transparency & Consent Framework <a name="About-the-Framework"></a>

The scope of the technical working group?s initiative increased to include a technical industry solution to allow website operators to:
1.  Control the vendors they wish to allow to access their users? browsers (for setting and reading cookies) and process their personal data and disclose these choices to other parties in the online advertising ecosystem
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

* "**_Vendor_**" means a third party that a website operator is using in connection with surfacing content to its end users that either (1) accesses an end user?s device or browser; and/or (2) collects or receives personal data about the website operator?s end users.  As such, a vendor need not be a Controller.

## License <a name="License"></a>

Copyright 2018 IAB Technology Laboratory

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Disclaimer <a name="Disclaimer"></a>

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE "PRODUCTS AND SERVICES") ARE PROVIDED ?AS IS? AND ?AS AVAILABLE,? AND IAB TECHNOLOGY LABORATORY, INC. (?TECH LAB?) MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.  TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.  THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE.  TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.

## About IAB Tech Lab  <a name="About-Tech-Lab"></a>

The IAB Technology Laboratory (?Tech Lab?) is a non-profit research and development consortium that produces and provides standards, software, and services to drive growth of an effective and sustainable global digital media ecosystem. Comprised of digital publishers and ad technology firms, as well as marketers, agencies, and other companies with interests in the interactive marketing arena, IAB Tech Lab aims to enable brand and media growth via a transparent, safe, effective supply chain, simpler and more consistent measurement, and better advertising experiences for consumers, with a focus on mobile and ?TV?/digital video channel enablement. The IAB Tech Lab portfolio includes the DigiTrust real-time standardized identity service designed to improve the digital experience for consumers, publishers, advertisers, and third-party platforms. Board members include AppNexus, ExtremeReach, Google, GroupM, Hearst Digital Media, Integral Ad Science, Index Exchange, LinkedIn, MediaMath, Microsoft, Moat, Pandora, PubMatic, Quantcast, Telaria, The Trade Desk, and Yahoo! Japan. Established in 2014, the IAB Tech Lab is headquartered in New York City with an office in San Francisco and representation in Seattle and London.

Learn more about IAB Tech Lab here: [https://www.iabtechlab.com/](https://www.iabtechlab.com/)

## About IAB Europe <a name="About-IAB-Europe"></a>

IAB Europe is the voice of digital business and the leading European-level industry association for the interactive advertising ecosystem. Its mission is to promote the development of this innovative sector by shaping the regulatory environment, investing in research and education, and developing and facilitating the uptake of business standards.
 
Learn more about IAB Europe here: [https://www.iabeurope.eu/](https://www.iabeurope.eu/)



# Consent Management Provider JavaScript API v1.1 <a name="CMP-JS-API"></a>

## Version History <a name="Version-History"></a>

2018/04/24 - Version 1.1 final publication

2018/03/08 - Version 1.1 published for 30-day public comment

2017/12/19 - Initial version v1.0 created

## What is supported by this API? <a name="supported-API"></a>

This API can be used by on-page javascript tags to obtain consent and vendor list information from the Consent Manager Provider. This API draft takes the approach of specifying the minimum-necessary functionality that the CMP needs to provide DSP?s and SSP?s vendor consent info. There?s a large potential surface area of publisher-CMP functionality (including publisher UI control and configuration) that is best provided by CMP-specific, rather than standardized, API?s.

## What API will need to be provided by the CMP? <a name="API-provided"></a>

Every consent manager MUST provide the following API:

**__cmp(_Command, Parameter, Callback_)**


In addition, an event handler will handle postMessage events with a *__cmpCall* key in the event data (see below), for [calling the CMP from iframes](#heading=h.u31621utoivt).

** **

This API has to support the following functionality:

<table>
  <tr>
    <td>Command: String</td>
    <td>Parameter</td>
    <td>Callback function signature</td>
    <td>Comments</td>
  </tr>
  <tr>
    <td>Required calls to be implemented by CMP</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>getVendorConsents</td>
    <td>vendorIds: Uint16Array</td>
    <td>Callback(
VendorConsents object, success: boolean)</td>
    <td>The vendorIds array contains the vendor ids (as identified in the Global Vendor List) for which consent is being requested. If vendorIds is null or empty, the operation will return consent status for all vendors in the vendor list.
The callback function will be called with a VendorConsents object as the parameter. If vendorIds is provided and not empty, then VendorConsents.vendorConsents will only included IDs from vendorIds, The callback is called only after consent is obtained from the UI or existing cookies.

The consent will be returned false ("No Consent") for any invalid vendorId. 
The boolean success parameter passed to the callback indicates whether the call to getVendorConsents() was successful.</td>
  </tr>
  <tr>
    <td>getConsentData</td>
    <td>consentStringVersion: string</td>
    <td>Callback(VendorConsentData object, success: boolean)</td>
    <td>If consentStringVersion is provided, then fetch that version if available (else returns null). If consentStringVersion is null, then the latest supported version of the consent string is returned.
The callback is called only after consent is obtained from the UI or existing cookies.
The boolean success parameter passed to the callback indicates whether the call to getConsentData() was successful.
</td>
  </tr>
  <tr>
    <td>ping</td>
    <td>ignored</td>
    <td>Callback(PingReturn object, success: boolean)</td>
    <td>The "ping" command invokes the callback immediately with information about whether the main CMP script has loaded yet and if GDPR has been configured for all users or just EU users. (This requires this command's implementation and this configuration to be in the stub).</td>
  </tr>
  <tr>
    <td>Optional calls to be implemented by CMP</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>getPublisherConsents</td>
    <td>purposeIds: Uint16Array</td>
    <td>Callback(
PublisherConsents object, success: boolean)</td>
    <td>The purposeIds lists the purpose ids the publisher is requesting consent for. If this array is null or empty, it will default to all configured purposes. PurposeId's 1-24 indicate standard purposes, while 25-88 indicate custom (publisher-configured) purposes.
The callback function will be called with a PublisherConsents object as the parameter.
The purpose ids would be set by the publisher using a CMP-defined initialization function.
The callback is called only after consent is obtained from the UI or existing cookies.
The boolean success parameter passed to the callback indicates whether the call to getPublisherConsents() was successful.
</td>
  </tr>
  <tr>
    <td>getVendorList</td>
    <td>vendorListVersion (scalar)</td>
    <td>Callback(GlobalVendorList object, success:boolean)</td>
    <td>The callback function will be called with the GlobalVendorList parameter being the vendor list object of the requested version. 
If the vendorListVersion is null, the vendor list for the VendorListVersion in the current consent string is returned. If no consent string value is currently set, the latest version of the vendor list is returned.
If the vendorListVersion value is ?LATEST?, the latest version available is returned.
If the vendorListVersion is invalid, the callback function will be called with 'null' as the first argument and false as the success argument.
The boolean success parameter passed to the callback indicates whether the call to getVendorList() was successful.
</td>
  </tr>
</table>


## What are the return data objects passed to the callbacks? <a name="return-objects"></a>

### VendorConsents <a name="vendorconsents"></a>

This object contains the global purposes, and vendors, consented to by the user:

```
{ 

  metadata: [base64url-encoded](https://tools.ietf.org/html/rfc4648#section-5) string (header data from the vendor consent format, as described below),

    gdprApplies: *Boolean*,

  hasGlobalScope: *Boolean,  // true if the vendor consent data is retrieved from the global cookie, false if a publisher-specific (or publisher-group-specific) cookie*

  purposeConsents: {

    *purposeId*: *consentBoolean*,

    ?

  },

  vendorConsents: { 

    *vendorId* : *c**onsentBoolean*, 

    ?

  },

}
```

where *vendorId* and *purposeId* are the keys and *consentBoolean *are the values for the consent (false="No Consent?, true=?Consent?). The *gdprApplies *field will be true if the user is determined (by geo-IP lookup) to be in the EU, or the publisher has configured the CMP (via a CMP-specific method not specified by this spec) that they are a EU publisher and thus the CMP UI should be shown for everyone. The *metadata* will be the  [base64url-encoded](https://tools.ietf.org/html/rfc4648#section-5) value of the following "header" information described in the cookie format:

1. Cookie Version

2. Created Timestamp

3. Last Updated Timestamp

4. Cmp Id

5. Cmp Version

6. Consent Screen

7. Vendor List Version

8. Publisher Purposes Version (for the *PublisherConsent* metadata only)

### VendorConsentData <a name="vendorconsentdata"></a>

This object contains the entire [base64url-encoded](https://tools.ietf.org/html/rfc4648#section-5) string of the vendor consent data:

```
	{

                consentData:  [base64url-encoded](https://tools.ietf.org/html/rfc4648#section-5) encoded string,		

	    gdprApplies:  *Boolean*,

	  hasGlobalScope: *Boolean // true if the vendor consent data is retrieved from the global cookie, false if from a publisher-specific (or publisher-group-specific) cookie*

}
```


### PublisherConsents <a name="publisherconsents"></a>

This object contains the publisher-specific (both global and custom) purposes consented to:

```
{  

  metadata: [base64url-encoded](https://tools.ietf.org/html/rfc4648#section-5) encoded string in the publisher consent format,

    gdprApplies:  *Boolean*,

  hasGlobalScope: *Boolean,*

  standardPurposeConsents: {

    *purposeId*: *consentBoolean*,

    ?

  },

  customPurposeConsents: {

    *customPurposeId*: *consentBoolean*,

    ?

  }

}
```


### PingReturn <a name="pingreturn"></a>

This object contains information about the loading status and configuration of the CMP.

```
{

    gdprAppliesGlobally:  *Boolean*, // true if publisher has configured CMP to apply GDPR to all (including non-EU) visitors

  cmpLoaded: *Boolean *// true if CMP main script is loaded, false if still running stub

}
```


## How can callers determine if there is a CMP present? <a name="CMP-present"></a>

In-frame callers can check for the presence of a function named **__cmp**. For callers in iframes, the CMP can be determined by the presence of a specially-named child frame named "__cmpLocator" in the parent (or above) frame. The CMP tag creates an iframe named "__cmpLocator" on its frame to indicate its presence. Publishers should load the CMP in a parent (or ancestor) of all iframes that may need to request consent.

If a CMP is not present, or if the CMP fails to respond, vendors should assume "no consent" for users located in the EU (via geoIP lookup). A reasonable timeout on the "ping" command not returning cmpLoaded=true should be implemented by consent-requesters, however, note that the get*Consent calls can take a long time to be called-back, since they do not return until consent is obtained from the user or the pre-set cookies.

## How can callers determine if the CMP script is loaded yet? <a name="CMP-loaded"></a>

Typically, code will not need to check if the CMP script is loaded. Code can simply call the **__cmp** function: if the stub is still active, it will will queue the calls for execution when the full CMP script is loaded; if the full CMP has been loaded, its **__cmp** implementation will handle the call normally. If necessary, the "ping" command will immediately return whether or not the CMP script is loaded.

## What is sequence of the stub installation and loading of the CMP script? <a name="stub-sequence"></a>

1. A CMP tag will be added by the publisher to the header of their page.

2. This tag will:

    1. Define a stub function **__cmp,** which stores the parameters to calls made to this stub and stores them.

    2. Define the stub postMessage handler for cross-origin iframe requests.

    3. Load the CMP script via an async javascript load

    4. Create an iframe child named "__cmpLocator"

    5. Install a postMessage handler

3. When the CMP script loads, it will:

    6. Set the **__cmp** function to the CMP?s full API implementation.

    7. Replace the stub?s postMessage handler with the full CMP handler.

    8. Run any queued calls using the parameters stored by the stub, in the order received.

## Is there a sample CMP stub? <a name="CMP-stub-sample"></a>

This code should be as close-to-top as possible in the header. The tag also includes the postMessage handler [as described below.](#heading=h.b8yti5hje2qu)  In the snippet provided by a CMP to the publisher, the CMP must replace the value of the gdprAppliesGlobally variable with the value as determined by the publisher in the CMP?s publisher configuration.  Additionally, it is recommended that the CMP provide a minified version of the snippet to publishers.

If immutable-version URL's are used for cmp.js, [a subresource integrity attribute](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) should be provided by the CMP and used.

```
<script type="text/javascript" src="https://my-cmp.mgr.consensu.org/cmp.js" async="true"></script>

<script type="text/javascript">

(function() {

  var gdprAppliesGlobally = false;

  function addFrame() {

    if (!window.frames['__cmpLocator']) {

      if (document.body) {

        var body = document.body,

            iframe = document.createElement('iframe');

        iframe.style = 'display:none';

        iframe.name = '__cmpLocator';

        body.appendChild(iframe);

	 } else {

        // In the case where this stub is located in the head,

        // this allows us to inject the iframe more quickly than

        // relying on DOMContentLoaded or other events.

        setTimeout(addFrame, 5);

      }

    }

  }

  addFrame();

  function stubCMP() {

    var b = arguments;

    __cmp.a = __cmp.a || [];

    if (!b.length) return __cmp.a;

    else if (b[0] === 'ping') {

      b[2]({"gdprAppliesGlobally": gdprAppliesGlobally,

        "cmpLoaded": false}, true);

    }

    else {

      __cmp.a.push([].slice.apply(b));

    }

  }

  function cmpMsgHandler(event) {

    var msgIsString = typeof event.data === "string";

    var json = msgIsString ? JSON.parse(event.data) : event.data;

    if (json.__cmpCall) {

      var i = json.__cmpCall;

      window.__cmp(i.command, i.parameter, function(retValue, success) {

        var returnMsg = {"__cmpReturn": {

          "returnValue": retValue,

          "success": success,

        	"callId": i.callId

        }};

        event.source.postMessage(msgIsString ?

          JSON.stringify(returnMsg) : returnMsg, '*');

      });

    }

  }

  if (typeof (__cmp) !== 'function') {

    window.__cmp = stubCMP;

    __cmp.msgHandler = cmpMsgHandler;

    if (window.addEventListener)

      window.addEventListener('message', cmpMsgHandler, false);

    else window.attachEvent('onmessage', cmpMsgHandler);

  }

})();

</script>
```

## How can vendors that use iframes call the CMP API from an iframe? <a name="iframe"></a>

Two methods are available, depending if publisher implements IAB safeFrames or not.

### Via safeFrames <a name="safeframe"></a>

safeFrame can be used to proxy calls to __cmp(). No changes are required for the CMP, apart from implementing the [proposed local API](#heading=h.m458abg1kvs4) above. An updated safeFrame implementation/specification will provide the method $sf.ext.cmp(command, parameter), where vendors can initiate the cmp request flow identically to calling __cmp() on the main page/frame. The only difference for the vendor is the callback argument not being necessary, since safeFrame already provides a callback mechanism. For the publisher, safeFrame will handle all the messaging and tracking of which iframe made the request.

Vendors already supporting safeFrames should add the following sample changes to their existing implementation:
 
 ```
 function sf_callback(msgName, data){
    // existing code that process other msgNames
    if( msgName === 'cmpReturn' ){
      vendor_process_cmp(

          data.cmpCommand,// added by SF

          data.VendorConsents, // values from __cmp original return

          data.success

      );
    }
  }
  $sf.ext.register(300, 250, sf_callback);
  $sf.ext.cmp('getVendorConsents');
```


### Without safeFrames, using postMessage <a name="postmessage"></a>

The [postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) function can be used from an iframe to send calls to an parent's (or ancestor's) frame's __cmp() function. The frame to send the postMessage to can be determined by the ancestor with a .frames["__cmpLocator"] child iframe present. 

CMP tags will install an event handler to call __cmp() for postMessage events, returning the data via a postMessage* *event. This is included as part of the [publisher-included tag above](#heading=h.dx2gmec9b7bh), so that postMessage events can be handled as early as possible.

The sent message should have the below form where "*command*" and *parameter* are the same as the first two parameters to the __cmp() function, and a unique callId value:

```
{__cmpCall: 

  {command: "*command*", 

   parameter: *parameter, *

   callId: *uniqueId*}}* *
```
   

and the returned message (event.data) will have the below form where returnValue and success are the two parameters passed to the callback function, and the same value of callId that was sent:

```
{__cmpReturn: 

  {returnValue: *returnValue*, 

   success: *boolean*, 

   callId: *uniqueId*}} 
 ```

Below is a wrapper function that emulates the in-frame __cmp() call. It locates the ancestor frame running the CMP, performs the postMessage and listens for the return message and passes its values to the callback:

 
```
// find the CMP frame

var f = window;

var cmpFrame;

while(!cmpFrame) {

  try {

    if(f.frames["__cmpLocator"]) cmpFrame = f;

  } catch(e) {}

  if(f === window.top) break;

  f = f.parent;

}

var cmpCallbacks = {}

/* Set up a __cmp function to do the postMessage and 

   stash the callback.

   This function behaves (from the caller's perspective)

   identically to the in-frame __cmp call */

window.__cmp = function(cmd, arg, callback) {

  if(!cmpFrame) {

    callback({msg:"CMP not found"}, false);

    return;

  }

  var callId = Math.random() + "";

  var msg = {__cmpCall: {

    command: cmd,

    parameter: arg,

    callId: callId

  }};

  cmpCallbacks[callId] = callback;

  cmpFrame.postMessage(msg, '*');

}

/* when we get the return message, call the stashed callback */

window.addEventListener("message", function(event) {

  var json = typeof event.data === "string" ? JSON.parse(event.data) : event.data;

  if(json.__cmpReturn) {

    var i = json.__cmpReturn;

    cmpCallbacks[i.callId](i.returnValue, i.success);

    delete cmpCallbacks[i.callId];

  }

}, false);

/* example call of the above __cmp wrapper function */

__cmp("ping", null, function(val, success) {

  console.log("val=",val," success=",success)

});
```


## Where will the API retrieve the vendor consent information from? <a name="retrieve"></a>

CMP implementations will retrieve vendor consent from the [third party global cookie](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/Consent%20string%20and%20vendor%20list%20formats%20v1.1%20Final.md), or if configured and implemented by the CMP, a first-party service-specific cookie (or, for service-specific vendor consent that needs to be shared between sites, a shared third-party cookie location).

#### How will the API prioritize the service-specific and the global cookies? <a name="prioritize"></a>

The prioritization between these two cookies is as specified in the [policy FAQ](http://advertisingconsent.eu/wp-content/uploads/2018/04/FAQ_Transparency_Consent_Framework_V12_170418.pdf).

The service-specific cookie consents will override the global consent cookie, if it is being used. These are the following resolutions of consent for each vendor:

<table>
  <tr>
    <td>Service-specific Consent</td>
    <td>Global Consent</td>
    <td>Service-specific cookie being used?</td>
    <td>Resultant Consent</td>
  </tr>
  <tr>
    <td>No</td>
    <td>don't care</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>don't care</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>don't care</td>
    <td>No</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td>don't care</td>
    <td>Yes</td>
    <td>No</td>
    <td>Yes</td>
  </tr>
</table>


## Major Changes from v1.0 <a name="major-changes"></a>

1. added 'success' second parameter to __cmp callback functions

2. changed 'isUserInEu' to 'gdprApplies'

3. specified the callback will not be called until the UI collects consent (if necessary)

4. provide useful behavior when __cmp functions passed empty or null values

5. control of which vendor list version is returned by getVendorList

6. control of which cookie version is returned (for future-compatibility)

7. specified that customPurposeId's are numbered 25-88 (to be distinct from standardPurposeIds)

8. 2018-04-02 name changes in return object keys consistently indicating "Consents" ("purposes"  ? "purposeConsents", "standardPurposes" ? "standardPurposeConsents", "customPurposes" ? "customPurposeConsents")

9. 2018-04-05: added "ping" command, iframe named "_cmp_" for children to find, revamped postMessage handler and tag code.

10. 2018-04-12: parameter wording change of "cookieVersion" -> "consentStringVersion" (no functional change)

11. 2018-04-13: renamed "_cmp_" frame to "__cmpLocator"

