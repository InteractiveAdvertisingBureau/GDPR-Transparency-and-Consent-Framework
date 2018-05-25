//
//  CMPConsentToolAPI.m
//  GDPR
//
//  Created by Smaato Inc on 24.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#import "CMPConsentToolAPI.h"
#import "CMPConsentToolUtil.h"
#import "CMPDataStorageUserDefaults.h"
#import "CMPConsentConstant.h"
#import "CMPConsentParser.h"

@interface CMPConsentToolAPI()
@property (nonatomic, retain, readwrite) NSString *parsedVendorConsents;
@property (nonatomic, retain, readwrite) NSString *parsedPurposeConsents;
@end

@implementation CMPConsentToolAPI
-(id<CMPDataStorageProtocol>)dataStorage  {
    if (!_dataStorage) {
        _dataStorage = [[CMPDataStorageUserDefaults alloc] init];
    }
    return _dataStorage;
}

-(NSString *)consentString {
    return self.dataStorage.consentString;
}

-(void)setConsentString:(NSString *)consentString {
    self.dataStorage.consentString = consentString;
    self.parsedVendorConsents = [CMPConsentParser parseVendorConsentsFrom:consentString];
    self.parsedPurposeConsents = [CMPConsentParser parsePurposeConsentsFrom:consentString];
}

-(SubjectToGDPR)subjectToGDPR {
    return self.dataStorage.subjectToGDPR;
}

-(void)setSubjectToGDPR:(SubjectToGDPR)subjectToGDPR {
    self.dataStorage.subjectToGDPR = subjectToGDPR;
}

-(BOOL)cmpPresent {
    return self.dataStorage.cmpPresent;
}

-(void)setCmpPresent:(BOOL)cmpPresent {
    self.dataStorage.cmpPresent = cmpPresent;
}

-(NSString *)parsedVendorConsents {
    return self.dataStorage.parsedVendorConsents;
}

- (void)setParsedVendorConsents:(NSString *)parsedVendorConsents {
    self.dataStorage.parsedVendorConsents = parsedVendorConsents;
}

-(NSString *)parsedPurposeConsents {
    return self.dataStorage.parsedPurposeConsents;
}

- (void)setParsedPurposeConsents:(NSString *)parsedPurposeConsents {
    self.dataStorage.parsedPurposeConsents = parsedPurposeConsents;
}

- (BOOL)isVendorConsentGivenFor:(int)vendorId {
    NSString *vendorConsentBits = self.dataStorage.parsedVendorConsents;
    if (!vendorConsentBits || vendorConsentBits.length < vendorId) {
        return NO;
    }
    
    return [[vendorConsentBits substringWithRange:NSMakeRange(vendorId-1, 1)] boolValue];
}

- (BOOL)isPurposeConsentGivenFor:(int)purposeId {
    NSString *purposeConsentBits = self.dataStorage.parsedPurposeConsents;
    if (!purposeConsentBits || purposeConsentBits.length < purposeId) {
        return NO;
    }
    
    return [[purposeConsentBits substringWithRange:NSMakeRange(purposeId-1, 1)] boolValue];
}

@end
