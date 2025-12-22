import { ListItemProps as MuiListItemProps } from '@mui/material/ListItem';
import React from 'react';
export interface hdsListItemProps {
    isDivider?: boolean;
    isDisabled?: boolean;
    dialogType?: 'form' | 'checkbox' | 'radio';
}
export interface ListItemProps extends Omit<MuiListItemProps, 'ref'> {
    hdsProps?: hdsListItemProps | boolean;
}
export declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLLIElement>>;
export default ListItem;
