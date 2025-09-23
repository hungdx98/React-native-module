import Foundation
import React

@objc(IconComponentViewManager)
class IconComponentViewManager: RCTViewManager {
    
    override func view() -> UIView! {
        return IconComponentView()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    override func constantsToExport() -> [AnyHashable : Any]! {
        return [:]
    }
}

// MARK: - Props
extension IconComponentViewManager {
    
    @objc func setIconName(_ view: IconComponentView, iconName: String) {
        view.iconName = iconName
    }
    
    @objc func setIconSet(_ view: IconComponentView, iconSet: String) {
        view.iconSet = iconSet
    }
    
    @objc func setSize(_ view: IconComponentView, size: NSNumber) {
        view.size = CGFloat(size.floatValue)
    }
    
    @objc func setColor(_ view: IconComponentView, color: UIColor?) {
        view.color = color
    }
    
    @objc func setFontFamily(_ view: IconComponentView, fontFamily: String) {
        view.fontFamily = fontFamily
    }
    
    @objc func setUnicode(_ view: IconComponentView, unicode: String?) {
        view.unicode = unicode
    }
    
    @objc func setFallbackText(_ view: IconComponentView, fallbackText: String?) {
        view.fallbackText = fallbackText
    }
    
    @objc func setShowFallback(_ view: IconComponentView, showFallback: Bool) {
        view.showFallback = showFallback
    }
}
