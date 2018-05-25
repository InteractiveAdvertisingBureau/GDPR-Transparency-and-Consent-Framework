//
//  CMPConsentToolUtil.h
//  GDPR
//
//  Created by Smaato Inc on 23.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
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
