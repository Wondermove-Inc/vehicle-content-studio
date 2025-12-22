import { HTMLAttributes } from 'react';
export interface hdsLnbProps {
    title?: React.ReactNode;
    isDivider?: boolean;
}
export interface LnbProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsLnbProps | boolean;
}
export declare const Lnb: import("react").ForwardRefExoticComponent<LnbProps & import("react").RefAttributes<HTMLDivElement>>;
export default Lnb;
