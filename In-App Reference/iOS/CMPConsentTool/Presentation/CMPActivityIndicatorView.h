//
//  CMPActivityIndicatorView.h
//  GDPR
//
//  Created by Smaato Inc on 23.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CMPActivityIndicatorView : UIView
-(void)startAnimating;
-(void)stopAnimating;
-(BOOL)isAnimating;
@end
