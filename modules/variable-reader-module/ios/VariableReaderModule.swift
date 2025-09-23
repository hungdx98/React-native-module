import Foundation
import React

@objc(VariableReaderModule)
class VariableReaderModule: NSObject, RCTBridgeModule {
    
    @objc
    static func moduleName() -> String! {
        return "VariableReaderModule"
    }
    
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    // MARK: - Reading Shared Variables from VariableStorageModule
    
    @objc
    func readSharedString(
        _ key: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        // Access UserDefaults directly to read values set by VariableStorageModule
        let value = UserDefaults.standard.string(forKey: "VariableStorage_\(key)")
        resolve(value ?? NSNull())
    }
    
    @objc
    func readSharedNumber(
        _ key: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        // Access UserDefaults directly
        let value = UserDefaults.standard.object(forKey: "VariableStorage_\(key)")
        resolve(value ?? NSNull())
    }
    
    @objc
    func readSharedBoolean(
        _ key: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        // Access UserDefaults directly
        if UserDefaults.standard.object(forKey: "VariableStorage_\(key)") != nil {
            let value = UserDefaults.standard.bool(forKey: "VariableStorage_\(key)")
            resolve(NSNumber(value: value))
        } else {
            resolve(NSNull())
        }
    }
    
    @objc
    func getAvailableKeys(
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        // Get all UserDefaults keys that start with "VariableStorage_"
        let allKeys = UserDefaults.standard.dictionaryRepresentation().keys
        let storageKeys = allKeys.compactMap { key -> String? in
            if key.hasPrefix("VariableStorage_") {
                return String(key.dropFirst("VariableStorage_".count))
            }
            return nil
        }
        resolve(Array(storageKeys))
    }
    
    @objc
    func hasKey(
        _ key: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        // Check if key exists in UserDefaults
        let exists = UserDefaults.standard.object(forKey: "VariableStorage_\(key)") != nil
        resolve(exists)
    }
    
    @objc
    func getStorageInfo(
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        // Get storage info from UserDefaults
        let allKeys = UserDefaults.standard.dictionaryRepresentation().keys
        let storageKeys = allKeys.compactMap { key -> String? in
            if key.hasPrefix("VariableStorage_") {
                return String(key.dropFirst("VariableStorage_".count))
            }
            return nil
        }
        let info: [String: Any] = [
            "totalKeys": storageKeys.count,
            "keys": Array(storageKeys)
        ]
        resolve(info)
    }
}
