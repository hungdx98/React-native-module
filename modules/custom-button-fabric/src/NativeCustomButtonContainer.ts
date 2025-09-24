import type { ViewProps, HostComponent } from 'react-native';
import { codegenNativeComponent } from 'react-native';
import type { BubblingEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

export interface CustomButtonContainerEvent {
  buttonIndex: string;
  message: string;
}

export interface CustomButtonContainerProps extends ViewProps {
  /**
   * Title for the first button
   */
  buttonTitle1?: string;
  
  /**
   * Title for the second button
   */
  buttonTitle2?: string;
  
  /**
   * Background color for first button in hex format
   */
  buttonColor1?: string;
  
  /**
   * Background color for second button in hex format
   */
  buttonColor2?: string;
  
  /**
   * Event fired when either button is pressed
   */
  onButtonPress?: BubblingEventHandler<CustomButtonContainerEvent>;
}

export default codegenNativeComponent<CustomButtonContainerProps>('CustomButtonContainer') as HostComponent<CustomButtonContainerProps>;
