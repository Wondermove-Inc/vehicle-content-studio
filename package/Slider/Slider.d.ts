/// <reference types="react" />
import { SliderProps as MuiSliderProps } from '@mui/material/Slider';
export interface hdsSliderProps {
    size?: 'small' | 'medium';
    isTooltip?: boolean;
}
export interface SliderProps extends Omit<MuiSliderProps, 'ref'> {
    hdsProps?: hdsSliderProps | boolean;
}
export declare const Slider: import("react").ForwardRefExoticComponent<SliderProps & import("react").RefAttributes<HTMLElement>>;
export default Slider;
