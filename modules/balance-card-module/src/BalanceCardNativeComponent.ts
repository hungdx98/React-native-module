import type { ViewProps } from 'react-native';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type ButtonPressEvent = {
    action: string; // "send" | "receive" | "buy"
};

export interface NativeProps extends ViewProps {
    balance: string;
    backgroundImage?: string; // tên file trong iOS Assets.xcassets
    onButtonPress?: DirectEventHandler<ButtonPressEvent>;
}

export default codegenNativeComponent<NativeProps>(
    'BalanceCardView'
);
