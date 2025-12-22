/// <reference types="react" />
import { TextFieldProps as MuiTextFieldProps, TextFieldVariants as MuiTextFieldVariants } from '@mui/material/TextField';
export type TextFieldVariants = MuiTextFieldVariants;
export type TextFieldType<Variant extends TextFieldVariants = TextFieldVariants> = MuiTextFieldProps<Variant>;
export interface hdsTextFieldProps {
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    timer?: React.ReactNode;
    isFocused?: boolean;
    isMultiline?: boolean;
    multilineHeight?: string | number;
    isUnderline?: boolean;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isClear?: boolean;
    onClickClear?: () => void;
    /**
     * @deprecated
     */
    isError?: boolean;
    isInvalid?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
}
export interface TextFieldProps extends Omit<TextFieldType, 'variant' | 'ref'> {
    hdsProps?: hdsTextFieldProps | boolean;
    variant?: TextFieldVariants;
}
export declare const TextField: import("react").ForwardRefExoticComponent<TextFieldProps & import("react").RefAttributes<HTMLDivElement>>;
export default TextField;
