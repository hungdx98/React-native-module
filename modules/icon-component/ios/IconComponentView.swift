import Foundation
import UIKit
import React

@objc(IconComponentView)
class IconComponentView: UIView {
    
    private var iconLabel: UILabel!
    
    // Props
    @objc var iconName: String = "" {
        didSet {
            updateIcon()
        }
    }
    
    @objc var iconSet: String = "default" {
        didSet {
            updateIcon()
        }
    }
    
    @objc var size: CGFloat = 24 {
        didSet {
            updateSize()
        }
    }
    
    @objc var color: UIColor? {
        didSet {
            updateColor()
        }
    }
    
    @objc var fontFamily: String = "icomoon" {
        didSet {
            updateFont()
        }
    }
    
    @objc var unicode: String? {
        didSet {
            updateIcon()
        }
    }
    
    @objc var fallbackText: String? {
        didSet {
            updateIcon()
        }
    }
    
    @objc var showFallback: Bool = false {
        didSet {
            updateIcon()
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
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        iconLabel.frame = bounds
    }
    
    private func updateIcon() {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            if self.showFallback {
                self.iconLabel.text = self.fallbackText ?? "?"
            } else if let unicode = self.unicode, !unicode.isEmpty {
                // Convert unicode to character
                if let unicodeInt = Int(unicode.replacingOccurrences(of: "\\u", with: ""), radix: 16),
                   let scalar = UnicodeScalar(unicodeInt) {
                    self.iconLabel.text = String(Character(scalar))
                } else {
                    self.iconLabel.text = self.fallbackText ?? "?"
                }
            } else {
                self.iconLabel.text = self.fallbackText ?? "?"
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
            self.iconLabel.textColor = self.color ?? UIColor.black
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
