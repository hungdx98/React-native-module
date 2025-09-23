import Foundation
import React

@objc(IconStorageModule)
public class IconStorageModule: NSObject, RCTBridgeModule {
  private var iconProps: [String: Any] = [:]

  @objc
  public static func moduleName() -> String! {
    return "IconStorageModule"
  }

  @objc
  public static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  func setIconProps(_ props: NSDictionary) {
    iconProps = props as? [String: Any] ?? [:]
  }

  @objc
  func getIconProps(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock) {
    resolve(iconProps)
  }
}