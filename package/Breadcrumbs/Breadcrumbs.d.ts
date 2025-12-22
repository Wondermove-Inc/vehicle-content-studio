import { BreadcrumbsTypeMap, BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs';
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsBreadcrumbsProps {
}
export interface BreadcrumbsProps extends Omit<MuiBreadcrumbsProps, 'ref'> {
    hdsProps?: hdsBreadcrumbsProps | boolean;
}
export declare const BreadcrumbsBase: React.ForwardRefExoticComponent<BreadcrumbsProps & React.RefAttributes<HTMLElement>>;
export declare const Breadcrumbs: OverridableComponent<BreadcrumbsTypeMap<BreadcrumbsProps, "nav">> & {
    displayName: string;
};
export default Breadcrumbs;
