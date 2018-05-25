//
//  CMPConsentToolViewController.m
//  GDPR
//
//  Created by Smaato Inc on 23.04.18.
//  Copyright © 2018 Smaato Inc. All rights reserved.
//

#import "CMPConsentToolViewController.h"
#import "CMPActivityIndicatorView.h"
#import <WebKit/WebKit.h>

NSString *const ConsentStringPrefix = @"consent://";
NSString *const ConsentStringQueryParam = @"code64";

@interface CMPConsentToolViewController ()<WKNavigationDelegate>
@property (nonatomic, retain) WKWebView *webView;
@property (nonatomic, retain) CMPActivityIndicatorView *activityIndicatorView;
@end

@implementation CMPConsentToolViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initWebView];
    [self initActivityIndicator];
    
    self.view.backgroundColor = [UIColor whiteColor];
}

-(void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
    NSURLRequest *request = [self requestForConsentTool];
    if (request) {
        [_webView loadRequest:request];
    }
}

-(void)initWebView {
    WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
    _webView = [[WKWebView alloc] initWithFrame:self.view.frame configuration:configuration];
    _webView.navigationDelegate = self;
    _webView.scrollView.scrollEnabled = YES;
    [self.view addSubview:_webView];
    [self layoutWebView];
}

-(void)layoutWebView {
    _webView.translatesAutoresizingMaskIntoConstraints = NO;
    
    if (@available(iOS 11, *)) {
        UILayoutGuide *guide = self.view.safeAreaLayoutGuide;
        [NSLayoutConstraint activateConstraints:@[
                                                  [self.webView.topAnchor constraintEqualToAnchor:guide.topAnchor],
                                                  [self.webView.leadingAnchor constraintEqualToAnchor:guide.leadingAnchor],
                                                  [self.webView.trailingAnchor constraintEqualToAnchor:guide.trailingAnchor],
                                                  [self.webView.bottomAnchor constraintEqualToAnchor:guide.bottomAnchor]
                                                  ]];
    } else {
        id topGuide = self.topLayoutGuide;
        NSDictionary *viewsDictionary = NSDictionaryOfVariableBindings(_webView, topGuide);

        [self.view addConstraints:[NSLayoutConstraint
                                   constraintsWithVisualFormat:@"V:[topGuide]-[_webView]-0-|"
                                   options:NSLayoutFormatDirectionLeadingToTrailing
                                   metrics:nil
                                   views:viewsDictionary]];
        
        [self.view addConstraints:[NSLayoutConstraint
                                   constraintsWithVisualFormat:@"H:|-0-[_webView]-0-|"
                                   options:NSLayoutFormatDirectionLeadingToTrailing
                                   metrics:nil
                                   views:viewsDictionary]];
    }
}

-(void)initActivityIndicator {
    _activityIndicatorView = [[CMPActivityIndicatorView alloc] initWithFrame:self.view.frame];
    _activityIndicatorView.userInteractionEnabled = NO;
    [self.view addSubview:_activityIndicatorView];
    [_activityIndicatorView startAnimating];
}

-(void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    WKNavigationActionPolicy policy = WKNavigationActionPolicyAllow;
    NSURLRequest *request = navigationAction.request;
    
    // new base64-encoded consent string received
    if ([request.URL.absoluteString.lowercaseString hasPrefix:ConsentStringPrefix]) {
        NSString *newConsentString = [self consentStringFromRequest:request];
        
        if (newConsentString.length > 0) {
            self.consentToolAPI.consentString = newConsentString;
        }
        
        if ([self.delegate respondsToSelector:@selector(consentToolViewController:didReceiveConsentString:)]) {
            [self.delegate consentToolViewController:self didReceiveConsentString:newConsentString];
        }
    }

    decisionHandler(policy);
}

-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    [_activityIndicatorView stopAnimating];
}

-(NSURLRequest*)requestForConsentTool{
    if (_consentToolURL.absoluteString.length > 0) {
        if (self.consentToolAPI.consentString.length > 0) {
            return [NSURLRequest requestWithURL:[self base64URLEncodedWithURL:_consentToolURL queryValue:self.consentToolAPI.consentString]];
        }
        return [NSURLRequest requestWithURL:_consentToolURL];
    }
    return nil;
}

-(CMPConsentToolAPI*)consentToolAPI  {
    if (!_consentToolAPI) {
        _consentToolAPI = [[CMPConsentToolAPI alloc] init];
    }
    return _consentToolAPI;
}

-(NSString*)consentStringFromRequest:(NSURLRequest *)request {
    NSRange consentStringRange = [request.URL.absoluteString rangeOfString:ConsentStringPrefix options:NSBackwardsSearch];
    if (consentStringRange.location != NSNotFound) {
        NSString *responseString = [request.URL.absoluteString substringFromIndex:consentStringRange.location + consentStringRange.length];
        NSArray *response = [responseString componentsSeparatedByString:@"/"];
        NSString *consentString = response.firstObject;
        return consentString;
    }
    
    return nil;
}

-(NSURL *)base64URLEncodedWithURL:(NSURL *)URL queryValue:(NSString *)queryValue {
    NSURLComponents *components = [[NSURLComponents alloc] initWithURL:URL resolvingAgainstBaseURL:NO];
    NSURLQueryItem * consentStringQueryItem = [[NSURLQueryItem alloc] initWithName:ConsentStringQueryParam value:queryValue];
    NSMutableArray * allQueryItems = [[NSMutableArray alloc] init];
    [allQueryItems addObject:consentStringQueryItem];
    [components setQueryItems:allQueryItems];
    
    return [components URL];
}

@end
