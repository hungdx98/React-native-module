import Foundation
import UIKit

@objc(BalanceCardView)
class BalanceCardView: UIView {
  
  @objc var balance: NSString = "" {
    didSet {
      balanceLabel.text = balance as String
    }
  }
  
  @objc var onButtonPress: RCTDirectEventBlock?
  
  private let balanceLabel = UILabel()
  private let sendButton = UIButton(type: .system)
  private let receiveButton = UIButton(type: .system)
  private let buyButton = UIButton(type: .system)
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupUI()
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
    setupUI()
  }
  
  private func setupUI() {
  // xoá background màu
  // self.backgroundColor = UIColor.systemYellow 

  // thêm UIImageView làm background
  let backgroundImageView = UIImageView(image: UIImage(named: "card_bg"))
  backgroundImageView.contentMode = .scaleAspectFill
  backgroundImageView.translatesAutoresizingMaskIntoConstraints = false
  self.addSubview(backgroundImageView)
  self.sendSubviewToBack(backgroundImageView)

  NSLayoutConstraint.activate([
    backgroundImageView.topAnchor.constraint(equalTo: self.topAnchor),
    backgroundImageView.bottomAnchor.constraint(equalTo: self.bottomAnchor),
    backgroundImageView.leadingAnchor.constraint(equalTo: self.leadingAnchor),
    backgroundImageView.trailingAnchor.constraint(equalTo: self.trailingAnchor)
  ])

  self.layer.cornerRadius = 20
  self.clipsToBounds = true

  // setup các view con như trước
  balanceLabel.font = UIFont.boldSystemFont(ofSize: 28)
  balanceLabel.textAlignment = .center

  sendButton.setTitle("Send", for: .normal)
  receiveButton.setTitle("Receive", for: .normal)
  buyButton.setTitle("Buy", for: .normal)

  sendButton.addTarget(self, action: #selector(onSend), for: .touchUpInside)
  receiveButton.addTarget(self, action: #selector(onReceive), for: .touchUpInside)
  buyButton.addTarget(self, action: #selector(onBuy), for: .touchUpInside)

  let buttonsStack = UIStackView(arrangedSubviews: [sendButton, receiveButton, buyButton])
  buttonsStack.axis = .horizontal
  buttonsStack.distribution = .fillEqually
  buttonsStack.spacing = 10

  let stack = UIStackView(arrangedSubviews: [balanceLabel, buttonsStack])
  stack.axis = .vertical
  stack.spacing = 16
  stack.alignment = .fill
  stack.translatesAutoresizingMaskIntoConstraints = false

  self.addSubview(stack)

  NSLayoutConstraint.activate([
    stack.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 16),
    stack.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -16),
    stack.centerYAnchor.constraint(equalTo: self.centerYAnchor)
  ])
}

  
  @objc private func onSend() {
    onButtonPress?(["action": "send"])
  }
  
  @objc private func onReceive() {
    onButtonPress?(["action": "receive"])
  }
  
  @objc private func onBuy() {
    onButtonPress?(["action": "buy"])
  }
}

@objc(BalanceCardViewManager)
class BalanceCardViewManager: RCTViewManager {
  override func view() -> UIView! {
    return BalanceCardView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

