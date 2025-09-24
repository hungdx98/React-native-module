require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "CustomButton"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => ".git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.private_header_files = "ios/**/*.h"
  
  # Core dependency only; React-RCTView is provided transitively by React-Core in RN 0.80
  s.dependency "React-Core"
  # Fabric runtime (new arch) — safe to include; present in RN distribution
  s.dependency "React-RCTFabric"

  s.swift_version = "5.0"

  install_modules_dependencies(s)
end
