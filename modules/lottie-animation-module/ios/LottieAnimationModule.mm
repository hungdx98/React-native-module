#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(LottieAnimationModuleManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(loop, BOOL)
RCT_EXPORT_VIEW_PROPERTY(autoplay, BOOL)
RCT_EXPORT_VIEW_PROPERTY(speed, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(progress, CGFloat)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
