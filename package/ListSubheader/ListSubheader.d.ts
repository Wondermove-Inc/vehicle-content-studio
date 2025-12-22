import { ListSubheaderTypeMap, ListSubheaderProps as MuiListSubheaderProps } from '@mui/material/ListSubheader';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsListSubheaderProps {
}
export interface ListSubheaderProps extends Omit<MuiListSubheaderProps, 'ref'> {
    hdsProps?: hdsListSubheaderProps | boolean;
}
export declare const ListSubheader: OverridableComponent<ListSubheaderTypeMap<ListSubheaderProps, "li">> & {
    displayName: string;
};
export default ListSubheader;
