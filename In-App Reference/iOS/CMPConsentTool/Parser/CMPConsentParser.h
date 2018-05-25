//
//  CMPConsentParser.h
//  GDPR
//
//  Created by Smaato Inc on 23.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CMPConsentParser : NSObject
+ (NSString *)parseVendorConsentsFrom:(NSString *)consentString;
+ (NSString *)parsePurposeConsentsFrom:(NSString *)consentString;
@end
