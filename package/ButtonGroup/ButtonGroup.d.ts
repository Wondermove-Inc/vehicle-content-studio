import { ButtonGroupTypeMap, ButtonGroupProps as MuiButtonGroupProps } from '@mui/material/ButtonGroup';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsButtonGroupProps {
    isAttached?: boolean;
}
export interface ButtonGroupProps extends Omit<MuiButtonGroupProps, 'ref'> {
    hdsProps?: hdsButtonGroupProps | boolean;
}
export declare const ButtonGroup: OverridableComponent<ButtonGroupTypeMap<ButtonGroupProps, "div">> & {
    displayName: string;
};
export default ButtonGroup;
