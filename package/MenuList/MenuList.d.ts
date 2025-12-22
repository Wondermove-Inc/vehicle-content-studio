import { MenuListTypeMap, MenuListProps as MuiMenuListProps } from '@mui/material/MenuList';
import { ExtendList } from '@mui/material';
export interface hdsMenuListProps {
}
export interface MenuListProps extends Omit<MuiMenuListProps, 'ref'> {
    hdsProps?: hdsMenuListProps | boolean;
}
export declare const MenuList: ExtendList<MenuListTypeMap<MenuListProps>> & {
    displayName: string;
};
export default MenuList;
