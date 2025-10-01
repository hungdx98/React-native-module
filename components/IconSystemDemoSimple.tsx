import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import IconStorageModule from '@coin98/icon-storage-module';
import IconComponent from '../modules/icon-component/src/IconComponent';

const IconSystemDemo: React.FC = () => {
  const [iconName, setIconName] = useState('cloudkit');
  const [iconSize, setIconSize] = useState(24);
  const [iconColor, setIconColor] = useState('#007AFF');
  const [storedProps, setStoredProps] = useState<any>(null);

  const storeIconProps = async () => {
    try {
      const props = {
        name: iconName,
        size: iconSize,
        color: iconColor,
        unicode: 'ec3b', // Unicode for cloudkit icon
        fontFamily: 'icomoon'
      };
      
      await IconStorageModule.setIconProps(props);
      Alert.alert('Success', 'Icon props stored successfully!');
      await getStoredProps();
    } catch (error) {
      Alert.alert('Error', `Failed to store props: ${error}`);
    }
  };

  const getStoredProps = async () => {
    try {
      const props = await IconStorageModule.getIconProps();
      setStoredProps(props);
    } catch (error) {
      Alert.alert('Error', `Failed to get props: ${error}`);
    }
  };

  const clearProps = async () => {
    try {
      await IconStorageModule.setIconProps({});
      setStoredProps(null);
      Alert.alert('Success', 'Props cleared!');
    } catch (error) {
      Alert.alert('Error', `Failed to clear props: ${error}`);
    }
  };

  React.useEffect(() => {
    getStoredProps();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Icon System Demo</Text>
      
      {/* Input Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icon Configuration</Text>
        
        <Text style={styles.label}>Icon Name:</Text>
        <TextInput
          style={styles.input}
          value={iconName}
          onChangeText={setIconName}
          placeholder="Enter icon name"
        />
        
        <Text style={styles.label}>Size:</Text>
        <TextInput
          style={styles.input}
          value={iconSize.toString()}
          onChangeText={(text) => setIconSize(parseInt(text, 10) || 24)}
          placeholder="Enter size"
          keyboardType="numeric"
        />
        
        <Text style={styles.label}>Color:</Text>
        <TextInput
          style={styles.input}
          value={iconColor}
          onChangeText={setIconColor}
          placeholder="Enter color (hex)"
        />
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={storeIconProps}>
          <Text style={styles.buttonText}>Store Icon Props</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={getStoredProps}>
          <Text style={styles.buttonText}>Get Stored Props</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={clearProps}>
          <Text style={styles.buttonText}>Clear Props</Text>
        </TouchableOpacity>
      </View>

      {/* Stored Props Display */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stored Props</Text>
        {storedProps ? (
          <View style={styles.propsBox}>
            <Text>Name: {storedProps.name || 'N/A'}</Text>
            <Text>Size: {storedProps.size || 'N/A'}</Text>
            <Text>Color: {storedProps.color || 'N/A'}</Text>
            <Text>Unicode: {storedProps.unicode || 'N/A'}</Text>
            <Text>Font Family: {storedProps.fontFamily || 'N/A'}</Text>
          </View>
        ) : (
          <Text>No props stored</Text>
        )}
      </View>

      {/* Icon Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icon Preview</Text>
        <View style={styles.iconPreview}>
          <IconComponent
            iconName={iconName}
            size={iconSize}
            color={iconColor}
          />
          <Text style={styles.iconLabel}>
            {iconName} ({iconSize}px)
          </Text>
        </View>
      </View>

      {/* Sample Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sample Icons</Text>
        <View style={styles.iconGrid}>
          {['cloudkit', 'lds-ic-check', 'lds-ic-email', 'lds-ic-edit', 'lds-ic-send'].map((name) => (
            <TouchableOpacity
              key={name}
              style={styles.iconItem}
              onPress={() => setIconName(name)}
            >
              <IconComponent
                iconName={name}
                size={32}
                color="#333"
              />
              <Text style={styles.iconItemText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  propsBox: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 6,
  },
  iconPreview: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  iconItem: {
    alignItems: 'center',
    padding: 12,
    margin: 4,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    minWidth: 60,
  },
  iconItemText: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default IconSystemDemo;
