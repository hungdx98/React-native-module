import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import VariableStorageModule from '@coin98/variable-storage-module';
import VariableReaderModule from '@coin98/variable-reader-module';

interface StorageInfo {
  totalKeys: number;
  keys: string[];
}

const VariableModuleDemo: React.FC = () => {
  const [stringKey, setStringKey] = useState('');
  const [stringValue, setStringValue] = useState('');
  const [numberKey, setNumberKey] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [booleanKey, setBooleanKey] = useState('');
  const [readKey, setReadKey] = useState('');
  const [readResult, setReadResult] = useState<any>(null);
  const [storageInfo, setStorageInfo] = useState<StorageInfo>({ totalKeys: 0, keys: [] });

  const refreshStorageInfo = async () => {
    try {
      const info = await VariableReaderModule.getStorageInfo();
      setStorageInfo(info);
    } catch (error) {
      console.error('Error getting storage info:', error);
    }
  };

  useEffect(() => {
    refreshStorageInfo();
  }, []);

  const handleSetString = async () => {
    if (!stringKey || !stringValue) {
      Alert.alert('Error', 'Please enter both key and value');
      return;
    }
    
    try {
      const success = await VariableStorageModule.setString(stringKey, stringValue);
      if (success) {
        Alert.alert('Success', `String saved: ${stringKey} = ${stringValue}`);
        setStringKey('');
        setStringValue('');
        refreshStorageInfo();
      }
    } catch (error) {
      Alert.alert('Error', `Failed to save string: ${error}`);
    }
  };

  const handleSetNumber = async () => {
    if (!numberKey || !numberValue) {
      Alert.alert('Error', 'Please enter both key and value');
      return;
    }
    
    try {
      const numValue = parseFloat(numberValue);
      if (isNaN(numValue)) {
        Alert.alert('Error', 'Please enter a valid number');
        return;
      }
      
      const success = await VariableStorageModule.setNumber(numberKey, numValue);
      if (success) {
        Alert.alert('Success', `Number saved: ${numberKey} = ${numValue}`);
        setNumberKey('');
        setNumberValue('');
        refreshStorageInfo();
      }
    } catch (error) {
      Alert.alert('Error', `Failed to save number: ${error}`);
    }
  };

  const handleSetBoolean = async (value: boolean) => {
    if (!booleanKey) {
      Alert.alert('Error', 'Please enter a key');
      return;
    }
    
    try {
      const success = await VariableStorageModule.setBoolean(booleanKey, value);
      if (success) {
        Alert.alert('Success', `Boolean saved: ${booleanKey} = ${value}`);
        setBooleanKey('');
        refreshStorageInfo();
      }
    } catch (error) {
      Alert.alert('Error', `Failed to save boolean: ${error}`);
    }
  };

  const handleReadVariable = async () => {
    if (!readKey) {
      Alert.alert('Error', 'Please enter a key to read');
      return;
    }
    
    try {
      // Try reading as different types
      const stringResult = await VariableReaderModule.readSharedString(readKey);
      const numberResult = await VariableReaderModule.readSharedNumber(readKey);
      const booleanResult = await VariableReaderModule.readSharedBoolean(readKey);
      
      const result = {
        key: readKey,
        asString: stringResult,
        asNumber: numberResult,
        asBoolean: booleanResult,
      };
      
      setReadResult(result);
    } catch (error) {
      Alert.alert('Error', `Failed to read variable: ${error}`);
    }
  };

  const handleClearAll = async () => {
    try {
      const success = await VariableStorageModule.clearAll();
      if (success) {
        Alert.alert('Success', 'All variables cleared');
        setReadResult(null);
        refreshStorageInfo();
      }
    } catch (error) {
      Alert.alert('Error', `Failed to clear variables: ${error}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Variable Storage & Reader Demo</Text>
      
      {/* Storage Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage Info (from Reader Module)</Text>
        <Text>Total Keys: {storageInfo.totalKeys}</Text>
        <Text>Keys: {storageInfo.keys.join(', ') || 'None'}</Text>
        <TouchableOpacity style={styles.button} onPress={refreshStorageInfo}>
          <Text style={styles.buttonText}>Refresh Info</Text>
        </TouchableOpacity>
      </View>

      {/* Set String */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Set String (Storage Module)</Text>
        <TextInput
          style={styles.input}
          placeholder="Key"
          value={stringKey}
          onChangeText={setStringKey}
        />
        <TextInput
          style={styles.input}
          placeholder="Value"
          value={stringValue}
          onChangeText={setStringValue}
        />
        <TouchableOpacity style={styles.button} onPress={handleSetString}>
          <Text style={styles.buttonText}>Set String</Text>
        </TouchableOpacity>
      </View>

      {/* Set Number */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Set Number (Storage Module)</Text>
        <TextInput
          style={styles.input}
          placeholder="Key"
          value={numberKey}
          onChangeText={setNumberKey}
        />
        <TextInput
          style={styles.input}
          placeholder="Value"
          value={numberValue}
          onChangeText={setNumberValue}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSetNumber}>
          <Text style={styles.buttonText}>Set Number</Text>
        </TouchableOpacity>
      </View>

      {/* Set Boolean */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Set Boolean (Storage Module)</Text>
        <TextInput
          style={styles.input}
          placeholder="Key"
          value={booleanKey}
          onChangeText={setBooleanKey}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonTrue]} 
            onPress={() => handleSetBoolean(true)}
          >
            <Text style={styles.buttonText}>Set True</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.buttonFalse]} 
            onPress={() => handleSetBoolean(false)}
          >
            <Text style={styles.buttonText}>Set False</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Read Variable */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Read Variable (Reader Module)</Text>
        <TextInput
          style={styles.input}
          placeholder="Key to read"
          value={readKey}
          onChangeText={setReadKey}
        />
        <TouchableOpacity style={styles.button} onPress={handleReadVariable}>
          <Text style={styles.buttonText}>Read Variable</Text>
        </TouchableOpacity>
        
        {readResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Read Result:</Text>
            <Text>Key: {readResult.key}</Text>
            <Text>As String: {readResult.asString?.toString() || 'null'}</Text>
            <Text>As Number: {readResult.asNumber?.toString() || 'null'}</Text>
            <Text>As Boolean: {readResult.asBoolean?.toString() || 'null'}</Text>
          </View>
        )}
      </View>

      {/* Clear All */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonDanger]} 
          onPress={handleClearAll}
        >
          <Text style={styles.buttonText}>Clear All Variables</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonTrue: {
    backgroundColor: '#34C759',
    flex: 0.48,
  },
  buttonFalse: {
    backgroundColor: '#FF3B30',
    flex: 0.48,
  },
  buttonDanger: {
    backgroundColor: '#FF3B30',
  },
  resultContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  resultTitle: {
    fontWeight: '600',
    marginBottom: 5,
  },
});

export default VariableModuleDemo;
