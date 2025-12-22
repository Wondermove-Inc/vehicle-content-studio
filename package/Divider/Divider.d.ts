import { DividerTypeMap, DividerProps as MuiDividerProps } from '@mui/material/Divider';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsDividerProps {
    style?: 'default' | 'lowest' | 'low';
    orientation?: 'horizontal' | 'vertical';
    isCard?: boolean;
    isList?: boolean;
    isAccordion?: boolean;
}
export interface DividerProps extends Omit<MuiDividerProps, 'ref'> {
    hdsProps?: hdsDividerProps | boolean;
}
export declare const Divider: OverridableComponent<DividerTypeMap<DividerProps, "hr">> & {
    displayName: string;
};
export default Divider;
