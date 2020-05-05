
//
// StyleDictionaryColor.m
//
// Do not edit directly
// Generated on Tue, 05 May 2020 18:32:55 GMT
//

#import "StyleDictionaryColor.h"


@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:0.922f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.208f green:0.208f blue:0.208f alpha:1.000f],
[UIColor colorWithRed:0.804f green:0.804f blue:0.804f alpha:1.000f],
[UIColor colorWithRed:0.620f green:0.620f blue:0.620f alpha:1.000f],
[UIColor colorWithRed:0.537f green:0.125f blue:0.102f alpha:1.000f],
[UIColor colorWithRed:0.980f green:0.557f blue:0.510f alpha:1.000f],
[UIColor colorWithRed:0.443f green:0.682f blue:0.976f alpha:1.000f],
[UIColor colorWithRed:0.078f green:0.451f blue:0.902f alpha:1.000f],
[UIColor colorWithRed:0.047f green:0.275f blue:0.553f alpha:1.000f],
[UIColor colorWithRed:0.361f green:0.898f blue:0.361f alpha:1.000f],
[UIColor colorWithRed:0.031f green:0.541f blue:0.031f alpha:1.000f],
[UIColor colorWithRed:0.031f green:0.329f blue:0.039f alpha:1.000f],
[UIColor colorWithRed:0.851f green:0.643f blue:0.424f alpha:1.000f],
[UIColor colorWithRed:0.671f green:0.400f blue:0.067f alpha:1.000f],
[UIColor colorWithRed:0.388f green:0.243f blue:0.078f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.973f green:0.973f blue:0.973f alpha:1.000f],
[UIColor colorWithRed:0.937f green:0.937f blue:0.937f alpha:1.000f],
[UIColor colorWithRed:0.376f green:0.376f blue:0.376f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.000f blue:0.000f alpha:1.000f]
    ];
  });

  return colorArray;
}

@end
