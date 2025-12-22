/// <reference types="react" />
import { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
export interface hdsSwitchProps {
    size?: 'small' | 'medium' | 'large';
    icon?: boolean;
    label?: React.ReactNode;
    labelPosition?: 'left' | 'right';
}
export interface SwitchProps extends Omit<MuiSwitchProps, 'ref'> {
    hdsProps?: hdsSwitchProps | boolean;
}
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLButtonElement>>;
export default Switch;
