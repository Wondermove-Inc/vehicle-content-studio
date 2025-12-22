import { PaperProps as MuiPaperProps, PaperTypeMap } from '@mui/material/Paper';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsPaperProps {
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    section?: boolean;
}
export interface PaperProps extends Omit<MuiPaperProps, 'ref'> {
    hdsProps?: hdsPaperProps | boolean;
}
export declare const Paper: OverridableComponent<PaperTypeMap<PaperProps, "div">> & {
    displayName: string;
};
export default Paper;
