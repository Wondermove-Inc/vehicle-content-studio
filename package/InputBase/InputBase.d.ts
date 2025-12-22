/// <reference types="react" />
import { InputBaseProps as MuiInputBaseProps } from '@mui/material/InputBase';
import { InputBaseComponentProps as MuiInputBaseComponentProps } from '@mui/material';
export interface InputBaseProps extends Omit<MuiInputBaseProps, 'ref'> {
}
export interface InputBaseComponentProps extends MuiInputBaseComponentProps {
}
export declare const InputBase: import("react").ForwardRefExoticComponent<InputBaseProps & import("react").RefAttributes<HTMLElement>>;
export default InputBase;
