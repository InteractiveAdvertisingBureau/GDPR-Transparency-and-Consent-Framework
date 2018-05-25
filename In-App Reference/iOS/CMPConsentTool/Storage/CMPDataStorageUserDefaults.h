//
//  CMPDataStorageUserDefaults.h
//  GDPR
//

#import <Foundation/Foundation.h>
#import "CMPDataStorageProtocol.h"

@interface CMPDataStorageUserDefaults : NSObject<CMPDataStorageProtocol>
@property (nonatomic, retain) NSUserDefaults *userDefaults;
@end
