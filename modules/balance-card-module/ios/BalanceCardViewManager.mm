#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BalanceCardViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(balance, NSString)
RCT_EXPORT_VIEW_PROPERTY(backgroundImage, NSString)
RCT_EXPORT_VIEW_PROPERTY(onButtonPress, RCTDirectEventBlock)

@end
