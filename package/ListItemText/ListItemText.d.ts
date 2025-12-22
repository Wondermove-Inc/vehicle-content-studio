import { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';
import React from 'react';
export interface hdsListItemTextProps {
    icon?: React.ReactNode;
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
}
export interface ListItemTextProps extends Omit<MuiListItemTextProps, 'ref'> {
    hdsProps?: hdsListItemTextProps | boolean;
}
export declare const ListItemText: React.ForwardRefExoticComponent<ListItemTextProps & React.RefAttributes<HTMLElement>>;
export default ListItemText;
