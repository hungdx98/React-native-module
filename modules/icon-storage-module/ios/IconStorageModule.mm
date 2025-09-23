#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(IconStorageModule, NSObject)

RCT_EXTERN_METHOD(setIconProps:(NSDictionary *)props)

RCT_EXTERN_METHOD(getIconProps:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
