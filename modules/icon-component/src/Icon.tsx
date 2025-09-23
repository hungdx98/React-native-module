import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import IconStorageModule from '@coin98/icon-storage-module';
import IconComponentNativeComponent from './IconComponentNativeComponent';

export interface IconProps {
  name: string;
  set?: string;
  size?: number;
  color?: string;
  style?: any;
  fallbackText?: string;
  onIconNotFound?: () => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  set = 'default',
  size = 24,
  color,
  style,
  fallbackText,
  onIconNotFound,
}) => {
  const [iconData, setIconData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadIconData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, set, size, color]);

  const loadIconData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Store current icon props to native module
      const iconProps = {
        name,
        set,
        size,
        color: color || '#000000',
        fallbackText: fallbackText || '?'
      };
      
      await IconStorageModule.setIconProps(iconProps);
      
      // Get stored props back to verify
      const storedProps = await IconStorageModule.getIconProps();
      setIconData(storedProps);
      
    } catch (err) {
      setError(`Failed to load icon: ${err}`);
      onIconNotFound?.();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[{ width: size, height: size }, style]}>
        <Text style={{ fontSize: size * 0.7, textAlign: 'center' }}>
          {fallbackText || '⏳'}
        </Text>
      </View>
    );
  }

  if (error || !iconData) {
    return (
      <View style={[{ width: size, height: size }, style]}>
        <Text style={{ fontSize: size * 0.7, textAlign: 'center' }}>
          {fallbackText || '❓'}
        </Text>
      </View>
    );
  }

  return (
    <IconComponentNativeComponent
      style={[{ width: size, height: size }, style]}
      iconName={iconData?.name || name}
      iconSet={iconData?.set || set}
      size={iconData?.size || size}
      color={iconData?.color || color}
      unicode={iconData?.unicode || ''}
      fontFamily="icomoon"
      accessibilityLabel={`${name} icon`}
      fallbackText={iconData?.fallbackText || fallbackText}
      showFallback={!!error}
    />
  );
};

export default Icon;
