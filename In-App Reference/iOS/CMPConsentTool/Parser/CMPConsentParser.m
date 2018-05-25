//
//  CMPConsentParser.m
//  GDPR
//
//  Created by Smaato Inc on 23.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#import "CMPConsentParser.h"
#import "CMPConsentConstant.h"
#import "CMPConsentToolUtil.h"

@implementation CMPConsentParser

+ (NSString *)parseVendorConsentsFrom:(NSString *)consentString {
    unsigned char* buffer = [[self class] binaryConsentFrom:consentString];
    
    if (!buffer) {
        return nil;
    }
    
    NSMutableString *vendorConsentString = [NSMutableString new];
    NSInteger maxVendorId = [CMPConsentToolUtil BinaryToDecimal:buffer fromIndex:MAX_VENDOR_ID_BIT_OFFSET length:MAX_VENDOR_ID_BIT_LENGTH];
    if (buffer[ENCODING_TYPE_BIT] == '0') {
        for (int i = 1 ; i <= (int)maxVendorId ; i++) {
            [vendorConsentString appendString:[NSString stringWithFormat:@"%c",buffer[ENCODING_TYPE_BIT + i]]];
        }
    } else {
        NSInteger numEntries = [CMPConsentToolUtil BinaryToDecimal:buffer fromIndex:NUM_ENTRIES_BIT_OFFSET length:NUM_ENTRIES_BIT_LENGTH];
        NSMutableArray *vendorConsentIds = [NSMutableArray new];
        
        int singleOrRangeStartIndex = NUM_ENTRIES_BIT_OFFSET + NUM_ENTRIES_BIT_LENGTH;
        for (int i = 0 ; i < (int)numEntries ; i++) {
            if (buffer[singleOrRangeStartIndex] == '0') {
                NSInteger singleVendorId = [CMPConsentToolUtil BinaryToDecimal:buffer fromIndex:singleOrRangeStartIndex + 1  length:SINGLE_VENDOR_ID_BIT_LENGTH];
                [vendorConsentIds addObject:[NSNumber numberWithInteger:singleVendorId]];
                singleOrRangeStartIndex += (SINGLE_VENDOR_ID_BIT_LENGTH + 1);
            } else {
                NSInteger startVendorId = [CMPConsentToolUtil BinaryToDecimal:buffer fromIndex:singleOrRangeStartIndex + 1 length:START_VENDOR_ID_BIT_LENGTH];
                NSInteger endVendorId = [CMPConsentToolUtil BinaryToDecimal:buffer fromIndex:singleOrRangeStartIndex + START_VENDOR_ID_BIT_LENGTH + 1 length:END_VENDOR_ID_BIT_LENGTH];
                singleOrRangeStartIndex += (START_VENDOR_ID_BIT_LENGTH + END_VENDOR_ID_BIT_LENGTH + 1);
                for (int i = (int)startVendorId ; i <= (int)endVendorId ; i++) {
                    [vendorConsentIds addObject:[NSNumber numberWithInteger:i]];
                }
            }
        }
        
        for (int i = 1 ; i <= (int)maxVendorId ; i++) {
            if ([vendorConsentIds containsObject:[NSNumber numberWithInteger:i]]) {
                [vendorConsentString appendString:buffer[DEFAULT_CONSENT_BIT] == '0' ? @"1":@"0"];
            } else {
                [vendorConsentString appendString:buffer[DEFAULT_CONSENT_BIT] == '0' ? @"0":@"1"];
            }
        }
    }
    free(buffer);
    return vendorConsentString;
}

+ (NSString *)parsePurposeConsentsFrom:(NSString *)consentString {
    unsigned char* buffer = [[self class] binaryConsentFrom:consentString];
    
    if (!buffer) {
        return nil;
    }
    
    NSMutableString *purposeConsentString = [NSMutableString new];
    for (int i = 1; i <= PURPOSES_ALLOWED_BIT_LENGTH; i++) {
        [purposeConsentString appendString:[[self class] isPurposeAllowedForBinary:buffer atBitPosition:i-1]];
    }
    free(buffer);
    return purposeConsentString;
}

+(unsigned char*)binaryConsentFrom:(NSString *)consentString {
    NSString* safeString = [CMPConsentToolUtil safeBase64ConsentString:consentString];
    NSData *decodedData = [[NSData alloc] initWithBase64EncodedString:safeString options:NSDataBase64DecodingIgnoreUnknownCharacters];
    
    if (!decodedData) {
        return nil;
    }
    
    return [CMPConsentToolUtil NSDataToBinary:decodedData];
}

+(NSString *)isPurposeAllowedForBinary:(unsigned char*)buffer atBitPosition:(NSInteger)bitPosition {
    const NSInteger purposeStartBit = PURPOSES_ALLOWED_BIT_OFFSET;
    
    size_t binaryLength =  (int)strlen((const char *)buffer);
    NSInteger purposeId = purposeStartBit + bitPosition;
    
    if (binaryLength <= purposeId || purposeId > purposeStartBit + PURPOSES_ALLOWED_BIT_LENGTH) {
        return @"0";
    }
    
    return buffer[purposeId] == '1' ? @"1" : @"0";
}

@end
