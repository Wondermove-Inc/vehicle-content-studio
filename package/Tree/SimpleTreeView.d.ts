/// <reference types="react" />
import { SimpleTreeViewProps as MuiSimpleTreeViewProps } from '@mui/x-tree-view/SimpleTreeView';
export interface hdsSimpleTreeViewProps {
    size?: 'small' | 'medium';
    type?: 'default' | 'line';
}
export type SimpleTreeViewComponent = (<Multiple extends boolean | undefined = undefined>(props: MuiSimpleTreeViewProps<Multiple> & React.RefAttributes<HTMLUListElement> & {
    hdsProps?: hdsSimpleTreeViewProps | boolean;
}) => React.JSX.Element) & {
    propTypes?: any;
};
export declare const SimpleTreeView: SimpleTreeViewComponent;
