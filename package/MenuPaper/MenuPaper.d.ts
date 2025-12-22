/// <reference types="react" />
import { PaperProps as MuiPaperProps } from '@mui/material/Paper';
export interface hdsMenuPaperProps {
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    section?: boolean;
}
export interface MenuPaperProps extends Omit<MuiPaperProps, 'ref'> {
    hdsProps?: hdsMenuPaperProps | boolean;
}
export declare const MenuPaper: import("react").ForwardRefExoticComponent<MenuPaperProps & import("react").RefAttributes<HTMLDivElement>>;
export default MenuPaper;
