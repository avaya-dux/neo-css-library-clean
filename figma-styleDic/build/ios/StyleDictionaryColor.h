
//
// StyleDictionaryColor.h
//
// Do not edit directly
// Generated on Tue, 05 May 2020 18:32:55 GMT
//

#import <UIKit/UIKit.h>


typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
ColorBaseSemanticRedMid,
ColorBaseSecondary7,
ColorBaseSecondary4,
ColorBaseSecondary5,
ColorBaseSemanticRedDark,
ColorBaseSemanticRedLight,
ColorBaseSemanticBlueLight,
ColorBaseSemanticBlueMid,
ColorBaseSemanticBlueDark,
ColorBaseSemanticGreenLight,
ColorBaseSemanticGreenMid,
ColorBaseSemanticGreenDark,
ColorBaseSemanticBronzeLight,
ColorBaseSemanticBronzeMid,
ColorBaseSemanticBronzeDark,
ColorBaseSecondary1,
ColorBaseSecondary2,
ColorBaseSecondary3,
ColorBaseSecondary6,
ColorBaseSecondary8
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
