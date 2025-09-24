#import <React/RCTViewManager.h>

// Export the Swift CustomButtonManager to React Native
@interface RCT_EXTERN_MODULE(CustomButtonManager, RCTViewManager)

// Export properties
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

@end
