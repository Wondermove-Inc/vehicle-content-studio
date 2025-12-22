import { TableContainerProps as MuiTableContainerProps, TableContainerTypeMap } from '@mui/material/TableContainer';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsTableContainerProps {
}
export interface TableContainerProps extends Omit<MuiTableContainerProps, 'ref'> {
    hdsProps?: hdsTableContainerProps | boolean;
}
export declare const TableContainer: OverridableComponent<TableContainerTypeMap<TableContainerProps, "div">> & {
    displayName: string;
};
export default TableContainer;
