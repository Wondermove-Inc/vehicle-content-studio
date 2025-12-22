/// <reference types="react" />
import { InputProps as MuiInputProps } from '@mui/material/Input';
export interface InputProps extends Omit<MuiInputProps, 'ref'> {
}
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
export default Input;
