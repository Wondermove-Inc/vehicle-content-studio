/// <reference types="react" />
import { FilledInputProps as MuiFilledInputProps } from '@mui/material/FilledInput';
export interface FilledInputProps extends Omit<MuiFilledInputProps, 'ref'> {
}
export declare const FilledInput: import("react").ForwardRefExoticComponent<FilledInputProps & import("react").RefAttributes<HTMLDivElement>>;
export default FilledInput;
