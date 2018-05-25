//
//  CMPConsentToolAPI.h
//  GDPR
//
//  Created by Smaato Inc on 24.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CMPDataStorageProtocol.h"

/**
 Object that provides the interface for storing and retrieving GDPR-related information
 */
@interface CMPConsentToolAPI : NSObject

/**
 The consent string passed as a websafe base64-encoded string.
 */
@property (nonatomic, retain) NSString *consentString;

/**
 Enum that indicates    'SubjectToGDPR_Unknown'- value -1, unset.
                        'SubjectToGDPR_No' – value 0, not subject to GDPR
                        'SubjectToGDPR_Yes' – value 1, subject to GDPR,
 */
@property (nonatomic, assign) SubjectToGDPR subjectToGDPR;

/**
 String that contains the consent information for all vendors.
 */
@property (nonatomic, retain, readonly) NSString *parsedVendorConsents;

/**
 String that contains the consent information for all purposes.
 */
@property (nonatomic, retain, readonly) NSString *parsedPurposeConsents;

/**
 Boolean that indicates if a CMP implementing the iAB specification is present in the application
 */
@property (nonatomic, assign) BOOL cmpPresent;

/**
 Returns true if user consent has been given to vendor
 */
- (BOOL)isVendorConsentGivenFor:(int)vendorId;

/**
 Returns true if user consent has been given for purpose
 */
- (BOOL)isPurposeConsentGivenFor:(int)purposeId;

/**
 The object that provides all the GDPR-related data for further processing.
 The default data storage is NSUserDefaults.
 */
@property (nonatomic, retain) id<CMPDataStorageProtocol> dataStorage;

@end
