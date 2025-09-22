#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CustomButtonManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(backgroundColorHex, NSString) 
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

@end
