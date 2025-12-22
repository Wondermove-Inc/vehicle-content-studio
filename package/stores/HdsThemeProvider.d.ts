import React, { ReactNode } from 'react';
export interface HdsThemeContextInterface {
    isScope?: boolean;
    isSystemFont?: boolean;
    isApp?: boolean;
    curClassName: string;
    themeName: ThemeType;
    setThemeName: (theme: ThemeType) => void;
}
export declare const HdsThemeContext: React.Context<HdsThemeContextInterface>;
export type ThemeType = 'hyundai' | 'hyundai_mo' | 'hyundai_app' | 'hyundai_app_brand' | 'kia' | 'kia_mo' | 'kia_app' | 'kia_app_brand' | 'genesis' | 'genesis_mo' | 'genesis_app' | 'genesis_app_brand' | 'hmg' | 'hmg_app_brand';
export interface HdsThemeProviderProps {
    children: ReactNode;
    theme: ThemeType;
    customClass?: string;
    isScope?: boolean;
    isSystemFont?: boolean;
    isApp?: boolean;
}
export declare const themeClasses: {
    [theme in ThemeType]: string[];
};
export declare function HdsThemeProvider({ children, theme, customClass, isScope }: HdsThemeProviderProps): import("react/jsx-runtime").JSX.Element;
