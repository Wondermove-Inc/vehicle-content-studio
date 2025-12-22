/// <reference types="react" />
import { TabScrollButtonProps as MuiTabScrollButtonProps } from '@mui/material/TabScrollButton';
export interface TabScrollButtonProps extends Omit<MuiTabScrollButtonProps, 'ref'> {
}
export declare const TabScrollButton: import("react").ForwardRefExoticComponent<TabScrollButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export default TabScrollButton;
