import type { ViewProps, ColorValue } from 'react-native';
import type {
  Float,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import { codegenNativeComponent } from 'react-native';

export interface NativeProps extends ViewProps {
  // Icon identification
  iconName: string;
  iconSet?: WithDefault<string, 'default'>;

  // Visual properties
  size?: WithDefault<Float, 24>;
  color?: ColorValue;

  // Font properties
  fontFamily?: WithDefault<string, 'icomoon'>;
  unicode?: string;

  // Accessibility
  accessibilityLabel?: string;

  // Loading state
  fallbackText?: string;
  showFallback?: WithDefault<boolean, false>;
}

export default codegenNativeComponent<NativeProps>('IconComponent');
