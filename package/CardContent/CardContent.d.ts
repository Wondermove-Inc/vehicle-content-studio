import { CardContentTypeMap, CardContentProps as MuiCardContentProps } from '@mui/material/CardContent';
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsCardContentProps {
    image?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
}
export interface CardContentProps extends Omit<MuiCardContentProps, 'ref'> {
    hdsProps?: hdsCardContentProps | boolean;
}
export declare const CardContent: OverridableComponent<CardContentTypeMap<CardContentProps, "div">> & {
    displayName: string;
};
export default CardContent;
