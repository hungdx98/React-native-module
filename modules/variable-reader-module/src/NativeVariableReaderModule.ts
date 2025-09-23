import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Read variables from VariableStorageModule
  readSharedString(key: string): Promise<string | null>;
  readSharedNumber(key: string): Promise<number | null>;
  readSharedBoolean(key: string): Promise<boolean | null>;
  
  // Get all available keys from storage
  getAvailableKeys(): Promise<string[]>;
  
  // Check if a key exists in storage
  hasKey(key: string): Promise<boolean>;
  
  // Get storage info
  getStorageInfo(): Promise<{
    totalKeys: number;
    keys: string[];
  }>;
}

export default TurboModuleRegistry.get<Spec>('VariableReaderModule');
