import { ListItemIconProps as MuiListItemIconProps } from '@mui/material/ListItemIcon';
import React from 'react';
export interface hdsListItemIconProps {
}
export interface ListItemIconProps extends Omit<MuiListItemIconProps, 'ref'> {
    hdsProps?: hdsListItemIconProps | boolean;
}
export declare const ListItemIcon: React.ForwardRefExoticComponent<ListItemIconProps & React.RefAttributes<HTMLElement>>;
export default ListItemIcon;
