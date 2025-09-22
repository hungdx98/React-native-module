import React from 'react';
import type { NativeSyntheticEvent } from 'react-native';
import { requireNativeComponent, ViewStyle } from 'react-native';

interface CustomButtonPressEvent {
  message: string;
}

export interface CustomButtonProps {
  style?: ViewStyle;
  title: string;
  backgroundColorHex?: string;
  onPress?: (event: NativeSyntheticEvent<CustomButtonPressEvent>) => void;
}

const NativeCustomButtonComponent = requireNativeComponent<CustomButtonProps>('CustomButton');

// Create a properly typed wrapper component
const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return <NativeCustomButtonComponent {...props} />;
};

export default CustomButton;

// import type { ViewProps } from 'react-native';
// import type { HostComponent } from 'react-native';
// import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

// export interface CustomButtonProps extends ViewProps {
//     title: string;            // text hiển thị
//     color?: string;           // màu nền
//     onPress?: () => void;     // callback
// }

// // codegenNativeComponent sẽ tạo HostComponent + codegen props cho Fabric
// export default codegenNativeComponent<CustomButtonProps>(
//     'CustomButton'
// ) as HostComponent<CustomButtonProps>;