import { ListItemAvatarProps as MuiListItemAvatarProps } from '@mui/material/ListItemAvatar';
import React from 'react';
export interface hdsListItemAvatarProps {
}
export interface ListItemAvatarProps extends Omit<MuiListItemAvatarProps, 'ref'> {
    hdsProps?: hdsListItemAvatarProps | boolean;
}
export declare const ListItemAvatar: React.ForwardRefExoticComponent<ListItemAvatarProps & React.RefAttributes<HTMLElement>>;
export default ListItemAvatar;
