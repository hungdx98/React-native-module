#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

// Bridge the Swift IconSetManager to React Native
@interface RCT_EXTERN_MODULE(IconSetManager, NSObject)

RCT_EXTERN_METHOD(createIconSetFromIcoMoon:(NSDictionary *)selectionJson)

@end

// Bridge the Swift IconComponentManager to React Native
@interface RCT_EXTERN_MODULE(IconComponentManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(iconName, NSString)
RCT_EXPORT_VIEW_PROPERTY(size, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(color, UIColor)
RCT_EXPORT_VIEW_PROPERTY(fontFamily, NSString)

@end