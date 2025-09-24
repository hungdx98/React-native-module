# CustomButtonFabric

A React Native Fabric component that demonstrates creating a container with multiple CustomButtons from the components-kit module.

## Features

- **Fabric Architecture**: Built for React Native's New Architecture
- **Legacy Support**: Includes legacy architecture fallback
- **Customizable**: Configurable button titles and colors
- **Event Handling**: Supports button press events with context

## Usage

```tsx
import CustomButtonContainer from '@coin98/custom-button-fabric';

function App() {
  const handleButtonPress = (buttonIndex: number, message: string) => {
    console.log(`Button ${buttonIndex} pressed: ${message}`);
  };

  return (
    <CustomButtonContainer
      buttonTitle1="First Button"
      buttonTitle2="Second Button"
      buttonColor1="#007AFF"
      buttonColor2="#FF3B30"
      onButtonPress={handleButtonPress}
      style={{ margin: 20 }}
    />
  );
}
```

## Props

- `buttonTitle1` (string): Title for the first button
- `buttonTitle2` (string): Title for the second button  
- `buttonColor1` (string): Background color for first button (hex format)
- `buttonColor2` (string): Background color for second button (hex format)
- `onButtonPress` (function): Callback when buttons are pressed
- `style` (ViewStyle): Container styling

## Architecture

This component uses React Native's Fabric architecture for optimal performance while maintaining backward compatibility with the legacy architecture.
