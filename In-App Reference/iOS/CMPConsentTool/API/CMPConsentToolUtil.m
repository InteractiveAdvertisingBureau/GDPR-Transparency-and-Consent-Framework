//
//  CMPConsentToolUtil.m
//  GDPR
//
//  Created by Smaato Inc on 23.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#import "CMPConsentToolUtil.h"

@implementation CMPConsentToolUtil

+(unsigned char*)NSDataToBinary:(NSData *)decodedData {
    const char *byte = [decodedData bytes];
    NSUInteger length = [decodedData length];
    unsigned long bufferLength = decodedData.length*8 - 1;
    unsigned char *buffer = (unsigned char *)calloc(bufferLength, sizeof(unsigned char));
    int prevIndex = 0;
    
    for (int byteIndex=0; byteIndex<length; byteIndex++) {
        char currentByte = byte[byteIndex];
        int bufferIndex = 8*(byteIndex+1);
        
        while(bufferIndex > prevIndex) {
            if(currentByte & 0x01) {
                buffer[--bufferIndex] = '1';
            } else {
                buffer[--bufferIndex] = '0';
            }
            currentByte >>= 1;
        }
        
        prevIndex = 8*(byteIndex+1);
    }
    
    return buffer;
}

+(NSInteger)BinaryToDecimal:(unsigned char*)buffer fromIndex:(int)startIndex toIndex:(int)endIndex {
    size_t length =  (int)strlen((const char *)buffer);

    if (length <= startIndex || length <= endIndex) {
        return 0;
    }
    
    int bit = 1;
    NSInteger total = 0;
    
    for (int i=endIndex; i>=startIndex; i--) {
        if (buffer[i] == '1') {
            total += bit;
        }
        
        bit *= 2;
    }
    
    return total;
}

+(NSInteger)BinaryToDecimal:(unsigned char*)buffer fromIndex:(int)startIndex length:(int)totalOffset {
    size_t length =  (int)strlen((const char *)buffer);
    
    if (length <= startIndex || length <= startIndex + totalOffset - 1) {
        return 0;
    }
    
    int bit = 1;
    NSInteger total = 0;
    
    for (int i=startIndex + totalOffset - 1; i>=startIndex; i--) {
        if (buffer[i] == '1') {
            total += bit;
        }
        
        bit *= 2;
    }
    
    return total;
}

+(NSString*)addPaddingIfNeeded:(NSString*)base64String {
    int padLenght = (4 - (base64String.length % 4)) % 4;
    NSString *paddedBase64 = [NSString stringWithFormat:@"%s%.*s", [base64String UTF8String], padLenght, "=="];
    return paddedBase64;
}

+(NSString*)replaceSafeCharacters:(NSString*)consentString {
    NSString *stringreplace = [consentString stringByReplacingOccurrencesOfString:@"-" withString:@"+"];
    NSString *finalString = [stringreplace stringByReplacingOccurrencesOfString:@"_" withString:@"/"];
    return finalString;
}

+(NSString*)safeBase64ConsentString:(NSString*)consentString {
    NSString *safeString = [CMPConsentToolUtil replaceSafeCharacters:consentString];
    NSString *base64String = [CMPConsentToolUtil addPaddingIfNeeded:safeString];
    return base64String;
}

@end
