#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(CustomButtonContainerManager, RCTViewManager)

// Export properties
RCT_EXPORT_VIEW_PROPERTY(buttonTitle1, NSString)
RCT_EXPORT_VIEW_PROPERTY(buttonTitle2, NSString)
RCT_EXPORT_VIEW_PROPERTY(buttonColor1, NSString)
RCT_EXPORT_VIEW_PROPERTY(buttonColor2, NSString)
RCT_EXPORT_VIEW_PROPERTY(onButtonPress, RCTBubblingEventBlock)

@end
