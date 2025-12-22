import { HTMLAttributes } from 'react';
import { ThemeType } from '../';
export interface hdsThumbnailProps {
    src?: string | React.ReactNode;
    ratio?: '1:1' | '5:4' | '4:3' | '3:2' | '16:9' | '21:9';
    themeName?: ThemeType;
}
export interface ThumbnailProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsThumbnailProps | boolean;
}
export interface ThumbnailProps {
}
export declare const Thumbnail: import("react").ForwardRefExoticComponent<ThumbnailProps & import("react").RefAttributes<HTMLDivElement>>;
export default Thumbnail;
