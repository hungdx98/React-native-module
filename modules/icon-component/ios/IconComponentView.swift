import Foundation
import UIKit
import React

// Singleton để lưu icon mappings
@objc(IconSetManager)
class IconSetManager: NSObject, RCTBridgeModule {
    static let shared = IconSetManager()
    private var iconMappings: [String: Int] = [:]
    
    override init() {
        super.init()
    }
    
    static func moduleName() -> String! {
        return "IconSetManager"
    }
    
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    func getIconMappings() -> [String: Int] {
        return iconMappings
    }
    
    @objc func createIconSetFromIcoMoon(_ selectionJson: NSDictionary) -> String {
        guard let json = selectionJson as? [String: Any],
              let icons = json["icons"] as? [[String: Any]] else {
            return "Error: Could not load selection.json - invalid format"
        }
        
        iconMappings.removeAll()
        
        for iconData in icons {
            if let properties = iconData["properties"] as? [String: Any],
               let name = properties["name"] as? String,
               let code = properties["code"] as? Int {
                iconMappings[name] = code
            }
        }
        
        let message = "Loaded \(iconMappings.count) icons successfully"
        print(message)
        return message
    }
}

@objc(IconComponentView)
class IconComponentView: UIView {
    
    private var iconLabel: UILabel!
    
    // Props
    @objc var iconName: String = "" {
        didSet {
            updateIcon()
        }
    }
    
    @objc var size: CGFloat = 24 {
        didSet {
            updateSize()
        }
    }
    
    @objc var color: UIColor = UIColor.black {
        didSet {
            updateColor()
        }
    }
    
    @objc var fontFamily: String = "icomoon" {
        didSet {
            updateFont()
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }
    
    private func setupView() {
        iconLabel = UILabel()
        iconLabel.textAlignment = .center
        iconLabel.adjustsFontSizeToFitWidth = true
        iconLabel.minimumScaleFactor = 0.5
        addSubview(iconLabel)
        
        updateFont()
        updateSize()
        updateColor()
        updateIcon()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        iconLabel.frame = bounds
    }
    
    private func updateIcon() {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            // Lấy icon mappings từ singleton
            let iconMappings = IconSetManager.shared.getIconMappings()
            
            // Tìm icon theo tên trong iconMappings
            if !self.iconName.isEmpty,
               let unicodeValue = iconMappings[self.iconName],
               let scalar = UnicodeScalar(unicodeValue) {
                self.iconLabel.text = String(Character(scalar))
            } else {
                // Nếu không tìm thấy, hiển thị tên icon hoặc ký tự mặc định
                self.iconLabel.text = self.iconName.isEmpty ? "?" : "■"
            }
        }
    }
    
    private func updateSize() {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            self.updateFont()
        }
    }
    
    private func updateColor() {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            self.iconLabel.textColor = self.color
        }
    }
    
    private func updateFont() {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            let fontSize = self.size
            if let font = UIFont(name: self.fontFamily, size: fontSize) {
                self.iconLabel.font = font
            } else {
                // Fallback to system font
                self.iconLabel.font = UIFont.systemFont(ofSize: fontSize)
            }
        }
    }
}

// Manager class for React Native
@objc(IconComponentManager)
class IconComponentManager: RCTViewManager {
    
    override func view() -> UIView {
        return IconComponentView()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
