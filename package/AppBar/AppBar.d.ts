import { AppBarTypeMap, AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsAppBarProps {
    isCenter?: boolean;
    isFixed?: boolean;
    isSurface?: boolean;
    isRound?: boolean;
    isSearchOnly?: boolean;
    right?: React.ReactNode;
    avatar?: React.ReactNode;
    search?: React.ReactNode;
}
export interface AppBarProps extends Omit<MuiAppBarProps, 'ref'> {
    hdsProps?: hdsAppBarProps | boolean;
}
export declare const AppBar: OverridableComponent<AppBarTypeMap<AppBarProps>> & {
    displayName: string;
};
export default AppBar;
