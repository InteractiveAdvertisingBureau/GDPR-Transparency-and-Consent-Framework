//
//  CMPConsentParser.h
//  GDPR
//

#import <Foundation/Foundation.h>

@interface CMPConsentParser : NSObject
+ (NSString *)parseVendorConsentsFrom:(NSString *)consentString;
+ (NSString *)parsePurposeConsentsFrom:(NSString *)consentString;
@end
