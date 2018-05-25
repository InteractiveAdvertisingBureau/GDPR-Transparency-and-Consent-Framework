
# CMP Wrapper Implementation Guide for iOS App Publishers


* Configure the consent tool by providing a `cosentToolURL` to `CMPConsentToolViewController`.
	* `consentToolURL`: `NSURL` 
		* It is used to create and load the request into the `WKWebView` – it is the request for the consent webpage. This property is mandatory.
		* `cmpPresent`:`BOOL`
			* You should set this to true as a CMP implementation is present inside the application.
	* `CMPConsentToolViewControllerDelegate`
		* delegate `consentToolViewController: didReceiveConsentString:` will be called once consent tool receives base-64 encoded string from given `consentToolURL`.
* You can configure `subjectToGDPR` available in `CMPConsentToolAPI` and once you set it, it will be stored automatically to `NSUserDefaults`. It is accessible through object of `CMPConsentToolViewController`.
	* `SubjectToGDPR`: Enum that indicates 
		* `SubjectToGDPR_Unknown` - value -1, unset or unknown
		* `SubjectToGDPR_No` - value 0, not subject to GDPR
		* `SubjectToGDPR_Yes` - value 1, subject to GDPR
	* `consentString`: If this property is given, it enforces reinitialization with the given string, configured based on the `consentToolURL`. If not set by publisher, it will be fetched from `NSUserDefaults` if available. This property is optional. 

```
#import "CMPConsentToolViewController.h"

@interface  ViewController () <CMPConsentToolViewControllerDelegate>
@end

- (void)viewDidLoad {
	[super  viewDidLoad];

	CMPConsentToolViewController *consentToolVC = [[CMPConsentToolViewController  alloc] init];
	consentToolVC.consentToolURL = [NSURL  URLWithString:@"consent tool URL"];
	consentToolVC.consentToolAPI.cmpPresent = YES;
	consentToolVC.consentToolAPI.subjectToGDPR = SubjectToGDPR_Yes;
	consentToolVC.delegate = self;
	[self  presentViewController:consentToolVC animated:YES  completion:nil];
}

-(void)consentToolViewController:(CMPConsentToolViewController *)consentToolViewController didReceiveConsentString:(NSString *)consentString {
	[consentToolViewController dismissViewControllerAnimated:YES  completion:nil];
	// your code
}
```

* Once the base-64 consent string is returned by `consentToolURL`, it will be stored automatically to `NSUserDefaults` along with `parsedVendorConsents` and `parsedPurposeConsents`. These properties are available with `CMPConsentToolAPI` class.

* To access purpose consent for given purposeId, `isPurposeConsentGivenFor:` can be used. Return type is YES if consent is given else returns NO.
````
int purposeId = <purpose id>;
BOOL purposeConsent = [consentToolViewController.consentToolAPI isPurposeConsentGivenFor:purposeId];
````

* To access vendor consent for given vendorId `isVendorConsentGivenFor:` can be used. Return type is YES if consent is given else returns NO.
````
int vendorId = <vendor id>;
BOOL vendorConsent = [consentToolViewController.consentToolAPI isVendorConsentGivenFor:vendorId];
````