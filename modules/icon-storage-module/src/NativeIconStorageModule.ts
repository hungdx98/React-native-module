import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  // Lưu props object (ví dụ name, color, size)
  setIconProps(props: Object): void;

  // Lấy props object (optional)
  getIconProps(): Promise<Object>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('IconStorageModule');