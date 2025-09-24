import UIKit
import React

public class CustomButtonContainerComponentView: UIView {
  private let stackView = UIStackView()
  private let button1 = UIButton(type: .system)
  private let button2 = UIButton(type: .system)
  
    // Correct initializer
      public override init(frame: CGRect) {
        super.init(frame: frame)
        setupViews()
      }
    
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  private func setupViews() {
    // Setup stack view
    stackView.axis = .horizontal
    stackView.distribution = .fillEqually
    stackView.spacing = 16
    stackView.translatesAutoresizingMaskIntoConstraints = false
    addSubview(stackView) // ✅

    
    // Setup buttons
    button1.setTitle("Button 1", for: .normal)
    button1.backgroundColor = UIColor.systemBlue
    button1.setTitleColor(.white, for: .normal)
    button1.layer.cornerRadius = 8
    button1.addTarget(self, action: #selector(button1Tapped), for: .touchUpInside)
    
    button2.setTitle("Button 2", for: .normal)
    button2.backgroundColor = UIColor.systemRed
    button2.setTitleColor(.white, for: .normal)
    button2.layer.cornerRadius = 8
    button2.addTarget(self, action: #selector(button2Tapped), for: .touchUpInside)
    
    stackView.addArrangedSubview(button1)
    stackView.addArrangedSubview(button2)
    
    // Constraints
    NSLayoutConstraint.activate([
      stackView.topAnchor.constraint(equalTo: topAnchor, constant: 16),
      stackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
      stackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
      stackView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -16),
      button1.heightAnchor.constraint(equalToConstant: 44),
      button2.heightAnchor.constraint(equalToConstant: 44)
    ])
  }
  
  @objc private func button1Tapped() {
    sendButtonPressEvent(buttonIndex: 0, message: "Button 1 pressed")
  }
  
  @objc private func button2Tapped() {
    sendButtonPressEvent(buttonIndex: 1, message: "Button 2 pressed")
  }
  
  private func sendButtonPressEvent(buttonIndex: Int, message: String) {
    // For now, we'll use a simple approach for event emission
    // In a full Fabric implementation, this would use the generated event emitter
    // For this demo, we can handle events through props or use a simpler mechanism
    print("Button \(buttonIndex) pressed: \(message)")
  }
  
  // For now, we'll handle props through a simpler mechanism
  // In a full Fabric implementation, this would use the generated Props types
  public func updateButtonTitles(title1: String?, title2: String?) {
    if let title1 = title1 {
      button1.setTitle(title1, for: .normal)
    }
    
    if let title2 = title2 {
      button2.setTitle(title2, for: .normal)
    }
  }
  
  public func updateButtonColors(color1: String?, color2: String?) {
    if let color1 = color1 {
      button1.backgroundColor = UIColor(hexString: color1)
    }
    
    if let color2 = color2 {
      button2.backgroundColor = UIColor(hexString: color2)
    }
  }
}

// Extension to convert hex string to UIColor
extension UIColor {
  convenience init(hexString: String) {
    let hex = hexString.hasPrefix("#") ? String(hexString.dropFirst()) : hexString
    let scanner = Scanner(string: hex)
    var hexNumber: UInt64 = 0
    
    if scanner.scanHexInt64(&hexNumber) {
      let red = CGFloat((hexNumber & 0xff0000) >> 16) / 255
      let green = CGFloat((hexNumber & 0x00ff00) >> 8) / 255
      let blue = CGFloat(hexNumber & 0x0000ff) / 255
      self.init(red: red, green: green, blue: blue, alpha: 1.0)
    } else {
      self.init(red: 0, green: 0, blue: 0, alpha: 1.0)
    }
  }
}

// Legacy architecture manager
@objc(CustomButtonContainerManager)
public class CustomButtonContainerManager: RCTViewManager {
  
  override public func view() -> UIView {
    return CustomButtonContainerLegacyView()
  }
  
  override public static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

// Legacy architecture view
@objcMembers
public class CustomButtonContainerLegacyView: UIView {
  private let stackView = UIStackView()
  private let button1 = UIButton(type: .system)
  private let button2 = UIButton(type: .system)
  
  @objc public var onButtonPress: RCTBubblingEventBlock?
  
  @objc public var buttonTitle1: NSString = "Button 1" {
    didSet { button1.setTitle(buttonTitle1 as String, for: .normal) }
  }
  
  @objc public var buttonTitle2: NSString = "Button 2" {
    didSet { button2.setTitle(buttonTitle2 as String, for: .normal) }
  }
  
  @objc public var buttonColor1: NSString = "#007AFF" {
    didSet { button1.backgroundColor = UIColor(hexString: buttonColor1 as String) }
  }
  
  @objc public var buttonColor2: NSString = "#FF3B30" {
    didSet { button2.backgroundColor = UIColor(hexString: buttonColor2 as String) }
  }

  override public init(frame: CGRect) {
    super.init(frame: frame)
    setupViews()
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  private func setupViews() {
    // Same setup as Fabric version
    stackView.axis = .horizontal
    stackView.distribution = .fillEqually
    stackView.spacing = 16
    stackView.translatesAutoresizingMaskIntoConstraints = false
    addSubview(stackView)
    
    button1.setTitle("Button 1", for: .normal)
    button1.backgroundColor = UIColor.systemBlue
    button1.setTitleColor(.white, for: .normal)
    button1.layer.cornerRadius = 8
    button1.addTarget(self, action: #selector(button1Tapped), for: .touchUpInside)
    
    button2.setTitle("Button 2", for: .normal)
    button2.backgroundColor = UIColor.systemRed
    button2.setTitleColor(.white, for: .normal)
    button2.layer.cornerRadius = 8
    button2.addTarget(self, action: #selector(button2Tapped), for: .touchUpInside)
    
    stackView.addArrangedSubview(button1)
    stackView.addArrangedSubview(button2)
    
    NSLayoutConstraint.activate([
      stackView.topAnchor.constraint(equalTo: topAnchor, constant: 16),
      stackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
      stackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
      stackView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -16),
      button1.heightAnchor.constraint(equalToConstant: 44),
      button2.heightAnchor.constraint(equalToConstant: 44)
    ])
  }
  
  @objc func button1Tapped() {
    onButtonPress?([
      "buttonIndex": "0",
      "message": "Button 1 pressed"
    ])
  }
  
  @objc func button2Tapped() {
    onButtonPress?([
      "buttonIndex": "1", 
      "message": "Button 2 pressed"
    ])
  }
}
