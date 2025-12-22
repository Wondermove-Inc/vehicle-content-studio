import { TypographyProps as MuiTypographyProps, TypographyTypeMap } from '@mui/material/Typography';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsTypographyProps {
    type?: 'headline' | 'title' | 'body' | 'label';
    size?: 'xlarge' | 'large' | 'large_underline' | 'medium' | 'medium_underline' | 'small' | 'small_underline' | 'small_strikethrough' | 'xsmall';
}
export interface TypographyProps extends Omit<MuiTypographyProps, 'ref'> {
    hdsProps?: hdsTypographyProps | boolean;
}
export declare const Typography: OverridableComponent<TypographyTypeMap<TypographyProps, "span">> & {
    displayName: string;
};
export default Typography;
