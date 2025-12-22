/// <reference types="react" />
import { SlideProps as MuiSlideProps } from '@mui/material/Slide';
export interface SlideProps extends Omit<MuiSlideProps, 'ref'> {
}
export declare const Slide: import("react").ForwardRefExoticComponent<SlideProps & import("react").RefAttributes<HTMLElement>>;
export default Slide;
