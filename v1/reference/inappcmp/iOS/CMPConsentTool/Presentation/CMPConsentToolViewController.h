//
//  CMPConsentToolViewController.h
//  GDPR
//

#import <UIKit/UIKit.h>
#import "CMPConsentToolAPI.h"

@class CMPConsentToolViewController;
@protocol CMPConsentToolViewControllerDelegate <NSObject>
- (void)consentToolViewController:(CMPConsentToolViewController *)consentToolViewController didReceiveConsentString:(NSString*)consentString;
@end

@interface CMPConsentToolViewController : UIViewController

/**
 NSURL that is used to create and load the request into the WKWebView – it is the request for the consent webpage. This property is mandatory.
 */
@property (nonatomic, strong) NSURL *consentToolURL;

/**
 Object that provides the API for storing and retrieving GDPR-related information
 */
@property (nonatomic, retain) CMPConsentToolAPI *consentToolAPI;

/**
 Optional delegate to receive callbacks from the CMP web tool
 */
@property (nonatomic, weak) id<CMPConsentToolViewControllerDelegate> delegate;
@end
