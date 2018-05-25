//
//  CMPDataStorageUserDefaults.m
//  GDPR
//
//  Created by Smaato Inc on 23.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#import "CMPDataStorageUserDefaults.h"

NSString *const IABConsent_SubjectToGDPRKey = @"IABConsent_SubjectToGDPR";
NSString *const IABConsent_ConsentStringKey = @"IABConsent_ConsentString";
NSString *const IABConsent_ParsedVendorConsentsKey = @"IABConsent_ParsedVendorConsents";
NSString *const IABConsent_ParsedPurposeConsentsKey = @"IABConsent_ParsedPurposeConsents";
NSString *const IABConsent_CMPPresentKey = @"IABConsent_CMPPresent";

@implementation CMPDataStorageUserDefaults

@synthesize consentString;
@synthesize subjectToGDPR;
@synthesize cmpPresent;
@synthesize parsedVendorConsents;
@synthesize parsedPurposeConsents;

-(NSString *)consentString {
    return [self.userDefaults objectForKey:IABConsent_ConsentStringKey];
}

-(void)setConsentString:(NSString *)consentString{
    [self.userDefaults setObject:consentString forKey:IABConsent_ConsentStringKey];
    [self.userDefaults synchronize];
}

-(SubjectToGDPR)subjectToGDPR {
    NSString *subjectToGDPRAsString = [self.userDefaults objectForKey:IABConsent_SubjectToGDPRKey];
    
    if (subjectToGDPRAsString != nil) {
        if ([subjectToGDPRAsString isEqualToString:@"0"]) {
            return SubjectToGDPR_No;
        } else if ([subjectToGDPRAsString isEqualToString:@"1"]) {
            return SubjectToGDPR_Yes;
        } else {
            return SubjectToGDPR_Unknown;
        }
    } else {
        return SubjectToGDPR_Unknown;
    }
}

-(void)setSubjectToGDPR:(SubjectToGDPR)subjectToGDPR {
    NSString *subjectToGDPRAsString = nil;

    if (subjectToGDPR == SubjectToGDPR_No || subjectToGDPR == SubjectToGDPR_Yes) {
        subjectToGDPRAsString = [NSString stringWithFormat:@"%li", (long)subjectToGDPR];
    }
    
    [self.userDefaults setObject:subjectToGDPRAsString forKey:IABConsent_SubjectToGDPRKey];
    [self.userDefaults synchronize];
}

-(BOOL)cmpPresent {
    return [[self.userDefaults objectForKey:IABConsent_CMPPresentKey] boolValue];
}

-(void)setCmpPresent:(BOOL)cmpPresent {
    [self.userDefaults setBool:cmpPresent forKey:IABConsent_CMPPresentKey];
    [self.userDefaults synchronize];
}

-(NSString *)parsedVendorConsents {
    return [self.userDefaults objectForKey:IABConsent_ParsedVendorConsentsKey];
}

-(void)setParsedVendorConsents:(NSString *)parsedVendorConsents {
    [self.userDefaults setObject:parsedVendorConsents forKey:IABConsent_ParsedVendorConsentsKey];
    [self.userDefaults synchronize];
}

-(NSString *)parsedPurposeConsents {
    return [self.userDefaults objectForKey:IABConsent_ParsedPurposeConsentsKey];
}

-(void)setParsedPurposeConsents:(NSString *)parsedPurposeConsents {
    [self.userDefaults setObject:parsedPurposeConsents forKey:IABConsent_ParsedPurposeConsentsKey];
    [self.userDefaults synchronize];
}

- (NSUserDefaults *)userDefaults {
    if (!_userDefaults) {
        _userDefaults = [NSUserDefaults standardUserDefaults];
        NSDictionary *dataStorageDefaultValues = [NSDictionary dictionaryWithObjectsAndKeys:
                                                  @"", IABConsent_ConsentStringKey,
                                                  @"", IABConsent_ParsedVendorConsentsKey,
                                                  @"", IABConsent_ParsedPurposeConsentsKey,
                                                  [NSNumber numberWithBool:NO], IABConsent_CMPPresentKey,
                                                  nil];
        [_userDefaults registerDefaults:dataStorageDefaultValues];
    }
    return _userDefaults;
}

@end
