/// <reference types="react" />
import { CardMediaOwnProps as MuiCardMediaOwnProps, CardMediaProps as MuiCardMediaProps } from '@mui/material/CardMedia';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
export interface hdsCardMediaProps {
}
export interface CardMediaTypeMap<AdditionalProps, RootComponent extends React.ElementType> extends Omit<MuiCardMediaProps, 'ref'> {
    props: AdditionalProps & MuiCardMediaOwnProps & {
        hdsProps?: hdsCardMediaProps | boolean;
    };
    defaultComponent: RootComponent;
}
export type CardMediaProps<RootComponent extends React.ElementType = 'div', AdditionalProps = {}> = OverrideProps<CardMediaTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
    component?: React.ElementType;
};
export declare const CardMedia: OverridableComponent<CardMediaTypeMap<{}, "div">>;
export default CardMedia;
