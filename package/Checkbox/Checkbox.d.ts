/// <reference types="react" />
import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
export interface hdsCheckboxProps {
    size?: 'small' | 'medium';
    label?: React.ReactNode;
    helpText?: React.ReactNode;
    icon?: 'heart' | 'bookmark';
    isInvalid?: boolean;
    isIndeterminate?: boolean;
    isLabelLeft?: boolean;
}
export interface CheckboxProps extends Omit<MuiCheckboxProps, 'ref'> {
    hdsProps?: hdsCheckboxProps | boolean;
}
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLButtonElement>>;
export default Checkbox;
