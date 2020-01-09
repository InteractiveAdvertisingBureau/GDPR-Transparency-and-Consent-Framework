//
//  CMPConsentToolUtil.h
//  GDPR
//

#import <Foundation/Foundation.h>

@interface CMPConsentToolUtil : NSObject

+(NSString*)addPaddingIfNeeded:(NSString*)base64String;
+(unsigned char*)NSDataToBinary:(NSData *)decodedData;
+(NSString*)replaceSafeCharacters:(NSString*)consentString;
+(NSString*)safeBase64ConsentString:(NSString*)consentString;
+(NSInteger)BinaryToDecimal:(unsigned char*)buffer fromIndex:(int)startIndex toIndex:(int)endIndex;
+(NSInteger)BinaryToDecimal:(unsigned char*)buffer fromIndex:(int)startIndex length:(int)totalOffset;

@end
