//
//  ViewController.m
//  CMPConsentToolDemoApp
//
//  Copyright © 2018 Smaato. All rights reserved.
//

#import "ViewController.h"
//#import "CMPConsentToolAPI.h"
#import "CMPConsentToolViewController.h"

@interface ViewController () <CMPConsentToolViewControllerDelegate>
@property (weak, nonatomic) IBOutlet UILabel *GDPRConsentStringLabel;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
}

- (IBAction)showGDPRConsentTool:(id)sender {
    CMPConsentToolViewController *consentToolVC = [[CMPConsentToolViewController alloc] init];
    consentToolVC.consentToolURL = [NSURL URLWithString: @"https://demofiles.smaato.com/cmp/index.html"];
    consentToolVC.consentToolAPI.subjectToGDPR = SubjectToGDPR_Yes;
    consentToolVC.consentToolAPI.cmpPresent = YES;
    consentToolVC.delegate = self;
    [self presentViewController:consentToolVC animated:YES completion:nil];
}

#pragma mark -
#pragma mark CMPConsentToolViewController delegate
-(void)consentToolViewController:(CMPConsentToolViewController *)consentToolViewController didReceiveConsentString:(NSString *)consentString {
    [consentToolViewController dismissViewControllerAnimated:YES completion:nil];
    
    self.GDPRConsentStringLabel.text = consentString;
    
    NSLog(@"CMPConsentToolViewControllerDelegate - didReceiveConsentString: %@", consentString);
    NSLog(@"IsSubjectToGDPR from CMPDataStorage: %ld", (long)consentToolViewController.consentToolAPI.subjectToGDPR);
    NSLog(@"ConsentString from CMPDataStorage: %@", consentToolViewController.consentToolAPI.consentString);
    NSLog(@"PurposeConsentBitString from CMPDataStorage: %@", consentToolViewController.consentToolAPI.parsedPurposeConsents);
    NSLog(@"VendorConsentBitString from CMPDataStorage: %@", consentToolViewController.consentToolAPI.parsedVendorConsents);
    
    int purposeId = 2;
    BOOL purposeConsent = [consentToolViewController.consentToolAPI isPurposeConsentGivenFor:purposeId];
    NSLog(@"Consent for purpose id %d= %@",purposeId, purposeConsent ? @"YES" : @"NO");
    
    int vendorId = 3;
    BOOL vendorConsent = [consentToolViewController.consentToolAPI isVendorConsentGivenFor:vendorId];
    NSLog(@"Consent for vendor id %d= %@",vendorId, vendorConsent ? @"YES" : @"NO");
}
@end
