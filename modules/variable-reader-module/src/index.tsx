import NativeVariableReaderModule, { Spec as VariableReaderInterface } from './NativeVariableReaderModule';

class VariableReaderModule {
  private static instance: VariableReaderModule;
  
  public static getInstance(): VariableReaderModule {
    if (!VariableReaderModule.instance) {
      VariableReaderModule.instance = new VariableReaderModule();
    }
    return VariableReaderModule.instance;
  }

  /**
   * Read a string variable from VariableStorageModule
   */
  async readSharedString(key: string): Promise<string | null> {
    if (!NativeVariableReaderModule) {
      throw new Error('VariableReaderModule is not available');
    }
    return await NativeVariableReaderModule.readSharedString(key);
  }

  /**
   * Read a number variable from VariableStorageModule
   */
  async readSharedNumber(key: string): Promise<number | null> {
    if (!NativeVariableReaderModule) {
      throw new Error('VariableReaderModule is not available');
    }
    return await NativeVariableReaderModule.readSharedNumber(key);
  }

  /**
   * Read a boolean variable from VariableStorageModule
   */
  async readSharedBoolean(key: string): Promise<boolean | null> {
    if (!NativeVariableReaderModule) {
      throw new Error('VariableReaderModule is not available');
    }
    return await NativeVariableReaderModule.readSharedBoolean(key);
  }

  /**
   * Get all available keys from storage
   */
  async getAvailableKeys(): Promise<string[]> {
    if (!NativeVariableReaderModule) {
      throw new Error('VariableReaderModule is not available');
    }
    return await NativeVariableReaderModule.getAvailableKeys();
  }

  /**
   * Check if a key exists in storage
   */
  async hasKey(key: string): Promise<boolean> {
    if (!NativeVariableReaderModule) {
      throw new Error('VariableReaderModule is not available');
    }
    return await NativeVariableReaderModule.hasKey(key);
  }

  /**
   * Get storage info
   */
  async getStorageInfo(): Promise<{totalKeys: number; keys: string[]}> {
    console.log('getStorageInfo called NativeVariableReaderModule', NativeVariableReaderModule);
    if (!NativeVariableReaderModule) {
      throw new Error('VariableReaderModule is not available');
    }
    return await NativeVariableReaderModule.getStorageInfo();
  }
}

export default VariableReaderModule.getInstance();
export type { VariableReaderInterface };
