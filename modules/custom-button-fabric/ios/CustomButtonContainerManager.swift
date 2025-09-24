import React

#if !RCT_NEW_ARCH_ENABLED

@objc(CustomButtonContainerManager)
public class CustomButtonContainerManager: RCTViewManager {
  
  override public func view() -> UIView {
    return CustomButtonContainerLegacyView()
  }
  
  override public static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

#endif
