//
//  CMPActivityIndicatorView.m
//  GDPR
//
//  Created by Smaato Inc on 23.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#import "CMPActivityIndicatorView.h"

@interface CMPActivityIndicatorView()
@property (nonatomic, retain) UIActivityIndicatorView *activityIndicatorView;
@property (nonatomic, retain) UIView *backgroundView;
@end

@implementation CMPActivityIndicatorView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        _backgroundView = [[UIView alloc] initWithFrame:frame];
        _backgroundView.backgroundColor = [UIColor colorWithWhite:0.0 alpha:0.6];
        [self addSubview:_backgroundView];
        
        _activityIndicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
        _activityIndicatorView.center = self.center;
        _activityIndicatorView.frame = CGRectIntegral(_activityIndicatorView.frame);
        _activityIndicatorView.hidesWhenStopped = YES;
        [self addSubview:_activityIndicatorView];
    }
    return self;
}

- (void)startAnimating {
    [_activityIndicatorView startAnimating];
    _backgroundView.hidden = NO;
}

- (void)stopAnimating {
    [_activityIndicatorView stopAnimating];
    _backgroundView.hidden = YES;
}

- (BOOL)isAnimating {
    return _activityIndicatorView.isAnimating;
}

@end
