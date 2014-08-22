//
//  N5NavigationBar.m
//  Kotak-Tools
//
//  Created by Barada Sahu on 13/12/13.
//
//

#import "N5NavigationBar.h"

@interface N5NavigationBar ()
@property (nonatomic, strong) CALayer *colorLayer;
@end

@implementation N5NavigationBar

static CGFloat const kDefaultColorLayerOpacity = 0.5f;

    - (void)setBarTintColor:(UIColor *)barTintColor {
    
    [super setBarTintColor:barTintColor];
    
        if (self.colorLayer == nil) {
            self.colorLayer = [CALayer layer];
            self.colorLayer.opacity = kDefaultColorLayerOpacity;
            [self.layer addSublayer:self.colorLayer];
        }
        
        self.colorLayer.backgroundColor = barTintColor.CGColor;
}

@end
