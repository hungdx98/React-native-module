import React from 'react';
import { codegenNativeComponent, ViewProps } from 'react-native';

type NativeProps = ViewProps & {
    title?: string;
    onPress?: () => void;
};

const NativeCustomButton = codegenNativeComponent<NativeProps>('CustomButton');

export default function CustomButton(props: NativeProps) {
    const { onPress, ...rest } = props;
    console.log('Rendering CustomButton with props:', NativeCustomButton, props);
    // requireNativeComponent expects RN event prop name; we pass onPress as a prop that maps to onPress in native
    return <NativeCustomButton {...rest} onPress={onPress} />;
}
