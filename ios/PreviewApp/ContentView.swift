//
//  ContentView.swift
//  PreviewApp
//
//  Created by Dinh Xuan Hung on 9/30/25.
//

import SwiftUI
import Foundation
import UIKit
import React

// Extension để hỗ trợ hex color
extension UIColor {
    convenience init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        
        self.init(
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            alpha: Double(a) / 255
        )
    }
}

@objc(BalanceCardView)
class BalanceCardView: UIView {
  
  @objc var balance: NSString = "" {
    didSet {
      balanceLabel.text = balance as String
    }
  }
  
  // Removed React Native dependencies for PreviewApp
  
  private let balanceLabel = UILabel()
  private let sendButton = UIButton(type: .system)
  private let receiveButton = UIButton(type: .system)
  private let buyButton = UIButton(type: .system)
  private let moreButton = UIButton(type: .system)
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupUI()
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
    setupUI()
  }
  
  private func buttonActions() {
    let button = UIButton(type: .system)
    button.backgroundColor = UIColor(hex: "#fef7ee")
  }
  
  private func setupUI() {
  let backgroundImageView = UIImageView(image: UIImage(named: "zenBG"))
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

  balanceLabel.font = UIFont.boldSystemFont(ofSize: 28)
  balanceLabel.textColor = .white
  balanceLabel.textAlignment = .center

  sendButton.setTitle("Send", for: .normal)
  receiveButton.setTitle("Receive", for: .normal)
  buyButton.setTitle("Buy", for: .normal)

  // Set background color using hex #f4b152
  sendButton.backgroundColor = UIColor(hex: "#fef7ee")
  receiveButton.backgroundColor = UIColor(hex: "#f4b152")
  buyButton.backgroundColor = UIColor(hex: "#f4b152")
  
  // Set text color to white for better contrast
  sendButton.setTitleColor(.white, for: .normal)
  receiveButton.setTitleColor(.white, for: .normal)
  buyButton.setTitleColor(.white, for: .normal)
  
  // Add corner radius for better appearance
  sendButton.layer.cornerRadius = 8
  receiveButton.layer.cornerRadius = 8
  buyButton.layer.cornerRadius = 8

  sendButton.addTarget(self, action: #selector(onSend), for: .touchUpInside)
  receiveButton.addTarget(self, action: #selector(onReceive), for: .touchUpInside)
  buyButton.addTarget(self, action: #selector(onBuy), for: .touchUpInside)

  let sendReceiveStack = UIStackView(arrangedSubviews: [sendButton, receiveButton])
  sendReceiveStack.axis = .horizontal
  sendReceiveStack.distribution = .fillEqually
  sendReceiveStack.spacing = 10

  let stack = UIStackView(arrangedSubviews: [balanceLabel, sendReceiveStack])
  stack.axis = .vertical
  //  stack.spacing = 16
  //  stack.alignment = .fill
  stack.translatesAutoresizingMaskIntoConstraints = false

  self.addSubview(stack)

  NSLayoutConstraint.activate([
  //    stack.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 16),
  //    stack.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -16),
  //    stack.centerYAnchor.constraint(equalTo: self.centerYAnchor)
  ])
}

  
  @objc private func onSend() {
    print("some text")
  }
  
  @objc private func onReceive() {
    print("some text")
  }
  
  @objc private func onBuy() {
    print("some text")
  }
}

// Wrap BalanceCardView để SwiftUI có thể render
struct BalanceCardPreview: UIViewRepresentable {
    func makeUIView(context: Context) -> BalanceCardView {
        let view = BalanceCardView()
        view.balance = "$12"
        return view
    }
    
    func updateUIView(_ uiView: BalanceCardView, context: Context) {
        // có thể update props nếu cần
//        uiView.balance = "222"
    }
}

struct ContentView: View {
    var body: some View {
        VStack(spacing: 20) {
            Text("Balance Card Preview")
                .font(.title)
                .padding()
            
             BalanceCardPreview()
                 .frame(width: 350, height: 200)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
