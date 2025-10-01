import SwiftUI

// Wrap BalanceCardView để SwiftUI có thể render
struct BalanceCardPreview: UIViewRepresentable {
    func makeUIView(context: Context) -> BalanceCardView {
        let view = BalanceCardView()
        view.balance = "1,234.56 USDT"
        return view
    }
    
    func updateUIView(_ uiView: BalanceCardView, context: Context) {
        // có thể update props nếu cần
        uiView.balance = "Updated: 2,345.67 USDT"
    }
}

#Preview {
    BalanceCardPreview()
        .frame(width: 300, height: 180)
        .padding()
}
