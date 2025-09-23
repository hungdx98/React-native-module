import NativeVariableStorageModule, { Spec as VariableStorageInterface } from './NativeVariableStorageModule';

class VariableStorageModule {
  private static instance: VariableStorageModule;
  
  public static getInstance(): VariableStorageModule {
    if (!VariableStorageModule.instance) {
      VariableStorageModule.instance = new VariableStorageModule();
    }
    return VariableStorageModule.instance;
  }

  /**
   * Store a string variable
   */
  async setString(key: string, value: string): Promise<boolean> {
    if (!NativeVariableStorageModule) {
      throw new Error('VariableStorageModule is not available');
    }
    return await NativeVariableStorageModule.setString(key, value);
  }

  /**
   * Get a string variable
   */
  async getString(key: string): Promise<string | null> {
    if (!NativeVariableStorageModule) {
      throw new Error('VariableStorageModule is not available');
    }
    return await NativeVariableStorageModule.getString(key);
  }

  /**
   * Store a number variable
   */
  async setNumber(key: string, value: number): Promise<boolean> {
    if (!NativeVariableStorageModule) {
      throw new Error('VariableStorageModule is not available');
    }
    return await NativeVariableStorageModule.setNumber(key, value);
  }

  /**
   * Get a number variable
   */
  async getNumber(key: string): Promise<number | null> {
    if (!NativeVariableStorageModule) {
      throw new Error('VariableStorageModule is not available');
    }
    return await NativeVariableStorageModule.getNumber(key);
  }

  /**
   * Store a boolean variable
   */
  async setBoolean(key: string, value: boolean): Promise<boolean> {
    if (!NativeVariableStorageModule) {
      throw new Error('VariableStorageModule is not available');
    }
    return await NativeVariableStorageModule.setBoolean(key, value);
  }

  /**
   * Get a boolean variable
   */
  async getBoolean(key: string): Promise<boolean | null> {
    if (!NativeVariableStorageModule) {
      throw new Error('VariableStorageModule is not available');
    }
    return await NativeVariableStorageModule.getBoolean(key);
  }

  /**
   * Remove a variable
   */
  async removeVariable(key: string): Promise<boolean> {
    if (!NativeVariableStorageModule) {
      throw new Error('VariableStorageModule is not available');
    }
    return await NativeVariableStorageModule.removeVariable(key);
  }

  /**
   * Get all stored keys
   */
  async getAllKeys(): Promise<string[]> {
    if (!NativeVariableStorageModule) {
      throw new Error('VariableStorageModule is not available');
    }
    return await NativeVariableStorageModule.getAllKeys();
  }

  /**
   * Clear all variables
   */
  async clearAll(): Promise<boolean> {
    if (!NativeVariableStorageModule) {
      throw new Error('VariableStorageModule is not available');
    }
    return await NativeVariableStorageModule.clearAll();
  }
}

export default VariableStorageModule.getInstance();
export type { VariableStorageInterface };
