/// <reference types="react" />
import { LinkTypeMap, LinkProps as MuiLinkProps } from '@mui/material/Link';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsLinkProps {
    size?: 'small' | 'medium' | 'large';
    icon?: React.ReactNode;
    isDisabled?: boolean;
    isEllipsis?: boolean;
}
export interface LinkProps extends Omit<MuiLinkProps, 'ref'> {
    hdsProps?: hdsLinkProps | boolean;
}
export declare const Link: OverridableComponent<LinkTypeMap<LinkProps, "a">> & {
    displayName: string;
};
export default Link;
