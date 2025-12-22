/// <reference types="react" />
import { RatingProps as MuiRatingProps } from '@mui/material/Rating';
export interface hdsRatingProps {
    size?: 'small' | 'medium';
}
export interface RatingProps extends Omit<MuiRatingProps, 'ref'> {
    hdsProps?: hdsRatingProps | boolean;
}
export declare const Rating: import("react").ForwardRefExoticComponent<RatingProps & import("react").RefAttributes<HTMLElement>>;
export default Rating;
