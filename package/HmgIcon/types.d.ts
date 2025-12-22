/// <reference types="react" />
export type HmgIconSizeType = '4px' | '6px' | '12px' | '14px' | '16px' | '18px' | '20px' | '24px' | '32px' | '40px' | '48px' | '96px';
export interface HmgIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'color'> {
    size: HmgIconSizeType;
    color?: React.CSSProperties['color'];
}
export type HmgIconType = {
    [key in HmgIconSizeType]?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};
