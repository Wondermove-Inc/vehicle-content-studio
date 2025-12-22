import React, { HTMLAttributes } from 'react';
export interface hdsLnbTitleProps {
}
export interface LnbTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    hdsProps?: hdsLnbTitleProps | boolean;
}
export declare const LnbTitle: React.ForwardRefExoticComponent<LnbTitleProps & React.RefAttributes<HTMLHeadingElement>>;
export default LnbTitle;
