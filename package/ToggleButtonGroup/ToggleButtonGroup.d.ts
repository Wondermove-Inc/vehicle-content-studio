/// <reference types="react" />
import { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
export interface ToggleButtonGroupProps extends Omit<MuiToggleButtonGroupProps, 'ref'> {
}
export declare const ToggleButtonGroup: import("react").ForwardRefExoticComponent<ToggleButtonGroupProps & import("react").RefAttributes<HTMLElement>>;
export default ToggleButtonGroup;
