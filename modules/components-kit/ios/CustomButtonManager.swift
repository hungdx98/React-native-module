import Foundation
import React

@objc(CustomButtonManager)
public class CustomButtonManager: RCTViewManager {
    
    override public func view() -> UIView! {
        return CustomButtonWrapper()
    }

    public override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
