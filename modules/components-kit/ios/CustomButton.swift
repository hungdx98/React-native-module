import SwiftUI
import UIKit
import React

// Extension to support hex color strings
extension UIColor {
    convenience init?(hex: String) {
        let r, g, b, a: CGFloat
        
        if hex.hasPrefix("#") {
            let start = hex.index(hex.startIndex, offsetBy: 1)
            let hexColor = String(hex[start...])
            
            if hexColor.count == 6 {
                let scanner = Scanner(string: hexColor)
                var hexNumber: UInt64 = 0
                
                if scanner.scanHexInt64(&hexNumber) {
                    r = CGFloat((hexNumber & 0xff0000) >> 16) / 255
                    g = CGFloat((hexNumber & 0x00ff00) >> 8) / 255
                    b = CGFloat(hexNumber & 0x0000ff) / 255
                    a = 1.0
                    
                    self.init(red: r, green: g, blue: b, alpha: a)
                    return
                }
            }
        }
        
        return nil
    }
}

// SwiftUI CustomButton component
struct CustomButton: View {
    let title: String
    let backgroundColor: Color
    let onPress: () -> Void
    
    var body: some View {
        Button(action: onPress) {
            Text(title)
                .foregroundColor(.white)
                .padding()
                .frame(maxWidth: .infinity)
        }
        .background(backgroundColor)
        .cornerRadius(8)
    }
}

@objc(CustomButtonWrapper)
public class CustomButtonWrapper: UIView {
    private var hostingController: UIHostingController<CustomButton>?

    @objc var title: String = "" {
        didSet { updateView() }
    }

    @objc var backgroundColorHex: String = "#0000FF" {
        didSet { updateView() }
    }

    @objc var onPress: RCTBubblingEventBlock? // RN event callback

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        updateView()
    }

    private func updateView() {

        let swiftUIView = CustomButton(
            title: title,
            backgroundColor: Color(backgroundColorHex),
            onPress: { [weak self] in
                self?.onPress?(["message": "pressed"])
            }
        )

        hostingController?.view.removeFromSuperview()

        let controller = UIHostingController(rootView: swiftUIView)
        controller.view.backgroundColor = .clear
        controller.view.frame = bounds
        addSubview(controller.view)
        hostingController = controller
    }

    override public func layoutSubviews() {
        super.layoutSubviews()
        hostingController?.view.frame = bounds
    }
}
