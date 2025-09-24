import UIKit
import React

@objcMembers
public class CustomButtonView: UIView {
  @objc public let button = UIButton(type: .system)
  
  @objc public var onPress: RCTBubblingEventBlock?

  @objc public var title: NSString = "Button" {
    didSet { button.setTitle(title as String, for: .normal) }
  }

  override public init(frame: CGRect) {
    super.init(frame: frame)
    button.translatesAutoresizingMaskIntoConstraints = false
    button.setTitle("Button", for: .normal)
    addSubview(button)
    NSLayoutConstraint.activate([
      button.centerXAnchor.constraint(equalTo: centerXAnchor),
      button.centerYAnchor.constraint(equalTo: centerYAnchor)
    ])
    
    // Add button target for tap events
    button.addTarget(self, action: #selector(didTapButton), for: .touchUpInside)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc func didTapButton() {
    onPress?([:])
  }
}

// The view manager
@objc(CustomButtonManager)
public class CustomButtonManager: RCTViewManager {
  
  override public func view() -> UIView {
    return CustomButtonView()
  }
  
  override public static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
