import React from 'react';
import { NativeModules, requireNativeComponent, ViewStyle } from 'react-native';
import selectionPath from '../assets/selection.json';

interface IconComponentProps {
  iconName: string;
  size?: number;
  color?: string;
  fontFamily?: string;
  style?: ViewStyle;
}

const { IconSetManager } = NativeModules;
IconSetManager.createIconSetFromIcoMoon(selectionPath); // Ensure the icon set is created at module load time

const IconComponentNative = requireNativeComponent<IconComponentProps>('IconComponentView');

const IconComponent: React.FC<IconComponentProps> = ({
  iconName,
  size = 24,
  color = '#000000',
  fontFamily = 'icomoon',
  style,
}) => {
  return (
    <IconComponentNative
      iconName={iconName}
      size={size}
      color={color}
      fontFamily={fontFamily}
      style={style}
    />
  );
};

export default IconComponent;
