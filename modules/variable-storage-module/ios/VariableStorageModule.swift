import Foundation
import React

@objc(VariableStorageModule)
public class VariableStorageModule: NSObject, RCTBridgeModule {
    
    @objc
    public static func moduleName() -> String! {
        return "VariableStorageModule"
    }
    
    public static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    // MARK: - String Variables
    
    @objc
    func setString(
        _ key: String,
        value: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        UserDefaults.standard.set(value, forKey: "VariableStorage_\(key)")
        resolve(true)
    }
    
    @objc
    func getString(
        _ key: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        let value = UserDefaults.standard.string(forKey: "VariableStorage_\(key)")
        resolve(value ?? NSNull())
    }
    
    // MARK: - Number Variables
    
    @objc
    func setNumber(
        _ key: String,
        value: NSNumber,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        UserDefaults.standard.set(value, forKey: "VariableStorage_\(key)")
        resolve(true)
    }
    
    @objc
    func getNumber(
        _ key: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        let value = UserDefaults.standard.object(forKey: "VariableStorage_\(key)")
        resolve(value ?? NSNull())
    }
    
    // MARK: - Boolean Variables
    
    @objc
    func setBoolean(
        _ key: String,
        value: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        UserDefaults.standard.set(value, forKey: "VariableStorage_\(key)")
        resolve(true)
    }
    
    @objc
    func getBoolean(
        _ key: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        if UserDefaults.standard.object(forKey: "VariableStorage_\(key)") != nil {
            let value = UserDefaults.standard.bool(forKey: "VariableStorage_\(key)")
            resolve(NSNumber(value: value))
        } else {
            resolve(NSNull())
        }
    }
    
    // MARK: - Utility Methods
    
    @objc
    func removeVariable(
        _ key: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        UserDefaults.standard.removeObject(forKey: "VariableStorage_\(key)")
        resolve(true)
    }
    
    @objc
    func getAllKeys(
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
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
    func clearAll(
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        let allKeys = UserDefaults.standard.dictionaryRepresentation().keys
        let storageKeys = allKeys.filter { $0.hasPrefix("VariableStorage_") }
        for key in storageKeys {
            UserDefaults.standard.removeObject(forKey: key)
        }
        resolve(true)
    }
}
