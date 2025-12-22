/// <reference types="react" />
import { MenuProps as MuiMenuProps } from '@mui/material/Menu';
export interface hdsMenuProps {
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    section?: boolean;
}
export interface MenuProps extends Omit<MuiMenuProps, 'ref'> {
    hdsProps?: hdsMenuProps | boolean;
}
export declare const Menu: import("@emotion/styled").StyledComponent<MenuProps & import("react").RefAttributes<HTMLDivElement> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export default Menu;
