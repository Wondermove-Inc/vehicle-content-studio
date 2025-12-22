import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconProps as MuiSvgIconProps, SvgIconTypeMap } from '@mui/material/SvgIcon';
export interface SvgIconProps extends Omit<MuiSvgIconProps, 'ref'> {
}
export declare const SvgIcon: OverridableComponent<SvgIconTypeMap<SvgIconProps, "svg">> & {
    displayName: string;
};
export default SvgIcon;
