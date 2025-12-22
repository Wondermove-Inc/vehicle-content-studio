import { ExtendList, ListTypeMap, ListProps as MuiListProps } from '@mui/material/List';
export interface hdsListProps {
    size?: 'small' | 'medium' | 'large';
    isWithIcon?: boolean;
    isDisabled?: boolean;
    dialogType?: 'form' | 'checkbox' | 'radio';
}
export interface ListProps extends Omit<MuiListProps, 'ref'> {
    hdsProps?: hdsListProps | boolean;
}
export declare const List: ExtendList<ListTypeMap<ListProps, "ul">> & {
    displayName: string;
};
export default List;
