/// <reference types="react" />
import { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
export interface DrawerProps extends Omit<MuiDrawerProps, 'ref'> {
}
export declare const Drawer: import("react").ForwardRefExoticComponent<DrawerProps & import("react").RefAttributes<HTMLDivElement>>;
export default Drawer;
