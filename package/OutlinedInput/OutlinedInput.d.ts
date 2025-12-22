/// <reference types="react" />
import { OutlinedInputProps as MuiOutlinedInputProps } from '@mui/material/OutlinedInput';
export interface OutlinedInputProps extends Omit<MuiOutlinedInputProps, 'ref'> {
}
export declare const OutlinedInput: import("react").ForwardRefExoticComponent<OutlinedInputProps & import("react").RefAttributes<HTMLElement>>;
export default OutlinedInput;
