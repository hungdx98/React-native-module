import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {Double, UnsafeMixed} from 'react-native/Libraries/Types/CodegenTypes';

interface Props extends ViewProps {
    source: UnsafeMixed; // Accept JSON objects from require() and other structured sources
    loop?: boolean;
    autoplay?: boolean;
    speed?: Double;
    progress?: Double;
}

const LottieAnimationModule = codegenNativeComponent<Props>('LottieAnimationModule') as HostComponent<Props>;
console.log('LottieAnimationModule:', LottieAnimationModule);
export default LottieAnimationModule;
