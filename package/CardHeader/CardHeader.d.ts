/// <reference types="react" />
import { CardHeaderProps as MuiCardHeaderProps } from '@mui/material/CardHeader';
export interface hdsCardHeaderProps {
}
export interface CardHeaderProps extends Omit<MuiCardHeaderProps, 'ref'> {
    hdsProps?: hdsCardHeaderProps | boolean;
}
export declare const CardHeader: import("react").ForwardRefExoticComponent<CardHeaderProps & import("react").RefAttributes<HTMLElement>>;
export default CardHeader;
