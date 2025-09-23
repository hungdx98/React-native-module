require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "VariableReaderModule"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => ".git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.private_header_files = "ios/**/*.h"
  
  s.swift_version = "5.0"
  
  s.dependency "React-Core"
  s.dependency "ReactCommon/turbomodule/core"
  s.dependency "VariableStorageModule"

  s.pod_target_xcconfig = {
    "USE_HEADERMAP" => "YES",
    "DEFINES_MODULE" => "YES",
    "SWIFT_OBJC_INTERFACE_HEADER_NAME" => "VariableReaderModule-Swift.h"
  }

  install_modules_dependencies(s)
end
