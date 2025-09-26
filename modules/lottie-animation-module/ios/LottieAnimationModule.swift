import UIKit
import React
import Lottie

@objc(LottieAnimationModule)
public class LottieAnimationModule: UIView {
  private let animationView = LottieAnimationView()
  private var shouldAutoplay = true

  public override init(frame: CGRect) {
    super.init(frame: frame)
    setupAnimationView()
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc public func updateProps(_ props: [AnyHashable : Any]!) {
    updateLottieProps(props)
  }
  
  // Individual property setters that React Native expects
  @objc public func setSource(_ source: NSDictionary?) {
    guard let sourceDict = source as? [String: Any] else { return }
    updateLottieSource(sourceDict)
  }
  
  @objc public func setLoop(_ loop: Bool) {
    animationView.loopMode = loop ? .loop : .playOnce
  }
  
  @objc public func setAutoplay(_ autoplay: Bool) {
    shouldAutoplay = autoplay
    // Never autoplay - always show first frame only
    animationView.pause()
    animationView.currentProgress = 0
  }
  
  @objc public func setSpeed(_ speed: CGFloat) {
    animationView.animationSpeed = speed
  }
  
  @objc public func setProgress(_ progress: CGFloat) {
    animationView.currentProgress = progress
  }

  private func setupAnimationView() {
    animationView.translatesAutoresizingMaskIntoConstraints = false
    animationView.contentMode = .scaleAspectFit
    addSubview(animationView)
    NSLayoutConstraint.activate([
      animationView.topAnchor.constraint(equalTo: topAnchor),
      animationView.leadingAnchor.constraint(equalTo: leadingAnchor),
      animationView.trailingAnchor.constraint(equalTo: trailingAnchor),
      animationView.bottomAnchor.constraint(equalTo: bottomAnchor)
    ])
  }
  
  private func updateLottieSource(_ src: [String: Any]) {
    // Check if it's a structured source object with uri/local
    if let uri = src["uri"] as? String {
      // load from remote URL
      if let url = URL(string: uri) {
        LottieAnimation.loadedFrom(url: url, closure: { [weak self] animation in
          DispatchQueue.main.async {
            self?.animationView.animation = animation
            if self?.shouldAutoplay == true {
              self?.animationView.play()
            }
          }
        }, animationCache: DefaultAnimationCache.sharedCache)
      }
    } else if let local = src["local"] as? String {
      animationView.animation = LottieAnimation.named(local)
      if shouldAutoplay {
        animationView.play()
      }
    } else {
      // Handle JSON object from require() - create animation from JSON dictionary
      do {
        let jsonData = try JSONSerialization.data(withJSONObject: src, options: [])
        animationView.animation = try LottieAnimation.from(data: jsonData)
        // Show first frame but don't play animation
        animationView.currentProgress = 0
        animationView.play()
      } catch {
        print("Error creating Lottie animation from JSON: \(error)")
      }
    }
  }

  private func updateLottieProps(_ props: [AnyHashable : Any]!) {
    // parse source
    if let src = props["source"] as? [String: Any] {
      // Check if it's a structured source object with uri/local
      if let uri = src["uri"] as? String {
        // load from remote URL
        if let url = URL(string: uri) {
          LottieAnimation.loadedFrom(url: url, closure: { [weak self] animation in
            DispatchQueue.main.async {
              self?.animationView.animation = animation
              // Show first frame but don't play animation
              self?.animationView.currentProgress = 0
            }
          }, animationCache: DefaultAnimationCache.sharedCache)
        }
      } else if let local = src["local"] as? String {
        animationView.animation = LottieAnimation.named(local)
        animationView.currentProgress = 0
        animationView.play()
      } else {
        // Handle JSON object from require() - create animation from JSON dictionary
        do {
          let jsonData = try JSONSerialization.data(withJSONObject: src, options: [])
          animationView.animation = try LottieAnimation.from(data: jsonData)
          // Show first frame but don't play animation
          animationView.currentProgress = 0
          animationView.play()
        } catch {
          print("Error creating Lottie animation from JSON: \(error)")
        }
      }
    } else if let srcName = props["source"] as? String {
      // fallback: treat as local file name
      animationView.animation = LottieAnimation.named(srcName)
      // Show first frame but don't play animation
      animationView.currentProgress = 0
    }

    if let loop = props["loop"] as? Bool {
      animationView.loopMode = loop ? .loop : .playOnce
    }
    if let speed = props["speed"] as? CGFloat {
      animationView.animationSpeed = speed
    }
    if let progress = props["progress"] as? CGFloat {
      animationView.currentProgress = progress
    }
  }
}

// Manager class for New Architecture
@objc(LottieAnimationModuleManager)
class LottieAnimationModuleManager: RCTViewManager {
  
  override func view() -> UIView! {
    return LottieAnimationModule()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}