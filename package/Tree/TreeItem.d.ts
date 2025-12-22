import { TreeItemProps as MuiTreeItemProps } from '@mui/x-tree-view/TreeItem';
import React from 'react';
export interface hdsTreeItemProps {
    size?: 'small' | 'medium';
    type?: 'default' | 'plus';
}
export interface TreeItemProps extends Omit<MuiTreeItemProps, 'ref'> {
    hdsProps?: hdsTreeItemProps | boolean;
    depth?: number;
}
export declare const TreeItemClasses: import("@mui/x-tree-view/TreeItem").TreeItemClasses;
export declare const TreeItem: React.ForwardRefExoticComponent<TreeItemProps & React.RefAttributes<HTMLLIElement>>;
