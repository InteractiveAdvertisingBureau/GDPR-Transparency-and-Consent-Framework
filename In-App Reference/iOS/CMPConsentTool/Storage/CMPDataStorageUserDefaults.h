//
//  CMPDataStorageUserDefaults.h
//  GDPR
//
//  Created by Smaato Inc on 23.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CMPDataStorageProtocol.h"

@interface CMPDataStorageUserDefaults : NSObject<CMPDataStorageProtocol>
@property (nonatomic, retain) NSUserDefaults *userDefaults;
@end
