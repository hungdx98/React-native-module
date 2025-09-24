import React from 'react';
import type { ViewStyle, NativeSyntheticEvent } from 'react-native';
import NativeCustomButtonContainer, { 
  type CustomButtonContainerProps as NativeCustomButtonContainerProps,
  type CustomButtonContainerEvent
} from './NativeCustomButtonContainer';

export interface CustomButtonContainerProps extends Omit<NativeCustomButtonContainerProps, 'onButtonPress'> {
  style?: ViewStyle;
  onButtonPress?: (buttonIndex: number, message: string) => void;
}

/**
 * CustomButtonContainer - A Fabric component that creates a container with multiple CustomButtons
 * This component demonstrates how to use components-kit's CustomButton within a Fabric component
 */
const CustomButtonContainer: React.FC<CustomButtonContainerProps> = ({ 
  onButtonPress, 
  buttonTitle1 = "Button 1",
  buttonTitle2 = "Button 2",
  buttonColor1 = "#007AFF",
  buttonColor2 = "#FF3B30",
  ...otherProps 
}) => {
  const handleButtonPress = React.useCallback((event: NativeSyntheticEvent<CustomButtonContainerEvent>) => {
    const { buttonIndex, message } = event.nativeEvent;
    // Convert string buttonIndex back to number
    onButtonPress?.(parseInt(buttonIndex, 10), message);
  }, [onButtonPress]);

  return (
    <NativeCustomButtonContainer
      {...otherProps}
      buttonTitle1={buttonTitle1}
      buttonTitle2={buttonTitle2}
      buttonColor1={buttonColor1}
      buttonColor2={buttonColor2}
      onButtonPress={handleButtonPress}
    />
  );
};

export default CustomButtonContainer;
