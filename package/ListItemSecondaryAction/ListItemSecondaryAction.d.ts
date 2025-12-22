import { ListItemSecondaryActionProps as MuiListItemSecondaryActionProps } from '@mui/material/ListItemSecondaryAction';
import React from 'react';
export interface hdsListItemSecondaryActionProps {
}
export interface ListItemSecondaryActionProps extends Omit<MuiListItemSecondaryActionProps, 'ref'> {
    hdsProps?: hdsListItemSecondaryActionProps | boolean;
}
export declare const ListItemSecondaryAction: React.ForwardRefExoticComponent<ListItemSecondaryActionProps & React.RefAttributes<HTMLElement>>;
export default ListItemSecondaryAction;
