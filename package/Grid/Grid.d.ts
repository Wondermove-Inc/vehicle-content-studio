import { GridTypeMap, GridProps as MuiGridProps } from '@mui/material/Grid';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface GridProps extends Omit<MuiGridProps, 'ref'> {
}
export declare const Grid: OverridableComponent<GridTypeMap<GridProps, "div">> & {
    displayName: string;
};
export default Grid;
