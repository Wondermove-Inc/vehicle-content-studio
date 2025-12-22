/// <reference types="react" />
import { RadioProps as MuiRadioProps } from '@mui/material/Radio';
export interface hdsRadioProps {
    size?: 'small' | 'medium';
    label?: React.ReactNode;
    helpText?: React.ReactNode;
    isInvalid?: boolean;
    labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
}
export interface RadioProps extends Omit<MuiRadioProps, 'ref'> {
    hdsProps?: hdsRadioProps | boolean;
}
export declare const Radio: import("react").ForwardRefExoticComponent<RadioProps & import("react").RefAttributes<HTMLButtonElement>>;
export default Radio;
