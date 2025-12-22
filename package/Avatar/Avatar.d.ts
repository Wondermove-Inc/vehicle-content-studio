import { AvatarTypeMap, AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsAvatarProps {
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    type?: 'circle' | 'square';
    style?: 'primary' | 'secondary' | 'high' | 'low' | 'icon' | 'logo';
    badge?: 'approved' | 'declined' | 'away' | 'offline';
}
export interface AvatarProps extends Omit<MuiAvatarProps, 'ref'> {
    hdsProps?: hdsAvatarProps | boolean;
}
export declare const Avatar: OverridableComponent<AvatarTypeMap<AvatarProps, "div">> & {
    displayName: string;
};
export default Avatar;
