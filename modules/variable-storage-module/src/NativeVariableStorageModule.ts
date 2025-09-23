import { TurboModule, TurboModuleRegistry,  } from 'react-native';

export interface Spec extends TurboModule {
  // Store a string variable
  setString(key: string, value: string): Promise<boolean>;
  
  // Get a string variable
  getString(key: string): Promise<string | null>;
  
  // Store a number variable
  setNumber(key: string, value: number): Promise<boolean>;
  
  // Get a number variable
  getNumber(key: string): Promise<number | null>;
  
  // Store a boolean variable
  setBoolean(key: string, value: boolean): Promise<boolean>;
  
  // Get a boolean variable
  getBoolean(key: string): Promise<boolean | null>;
  
  // Remove a variable
  removeVariable(key: string): Promise<boolean>;
  
  // Get all stored keys
  getAllKeys(): Promise<string[]>;
  
  // Clear all variables
  clearAll(): Promise<boolean>;
}
export default TurboModuleRegistry.get<Spec>('VariableStorageModule');
