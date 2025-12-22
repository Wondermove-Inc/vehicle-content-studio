/// <reference types="react" />
import { experimental_sx as Mui_experimental_sx, css as Mui_css, keyframes as Mui_keyframes } from '@mui/material/styles';
export declare const experimental_sx: typeof Mui_experimental_sx;
export declare const css: typeof Mui_css;
export declare const keyframes: typeof Mui_keyframes;
import Mui_adaptV4Theme from '@mui/material/styles/adaptV4Theme';
import Mui_createStyles from '@mui/material/styles/createStyles';
import Mui_responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import Mui_useTheme from '@mui/material/styles/useTheme';
import Mui_useThemeProps from '@mui/material/styles/useThemeProps';
import Mui_StyledEngineProvider from '@mui/styled-engine/StyledEngineProvider';
import Mui_makeStyles from '@mui/material/styles/makeStyles';
import Mui_withStyles from '@mui/material/styles/withStyles';
import Mui_withTheme from '@mui/material/styles/withTheme';
import Mui_experimental_extendTheme from '@mui/material/styles/experimental_extendTheme';
import Mui_shouldSkipGeneratingVar from '@mui/material/styles/shouldSkipGeneratingVar';
import Mui_private_createTypography from '@mui/material/styles/createTypography';
import Mui_private_createMixins from '@mui/material/styles/createMixins';
import Mui_createTheme, { createMuiTheme as Mui_createMuiTheme } from '@mui/material/styles/createTheme';
import Mui_ThemeProvider from '@mui/material/styles/ThemeProvider';
export declare const adaptV4Theme: typeof Mui_adaptV4Theme;
export declare const createStyles: typeof Mui_createStyles;
export declare const responsiveFontSizes: typeof Mui_responsiveFontSizes;
export declare const useTheme: typeof Mui_useTheme;
export declare const useThemeProps: typeof Mui_useThemeProps;
export declare const StyledEngineProvider: typeof Mui_StyledEngineProvider;
export declare const makeStyles: typeof Mui_makeStyles;
export declare const withStyles: typeof Mui_withStyles;
export declare const withTheme: typeof Mui_withTheme;
export declare const experimental_extendTheme: typeof Mui_experimental_extendTheme;
export declare const shouldSkipGeneratingVar: typeof Mui_shouldSkipGeneratingVar;
export declare const private_createTypography: typeof Mui_private_createTypography;
export declare const private_createMixins: typeof Mui_private_createMixins;
export declare const createTheme: typeof Mui_createTheme;
export declare const createMuiTheme: typeof Mui_createMuiTheme;
export declare const THEME_ID: "$$material";
export declare const getOverlayAlpha: (elevation: number) => string;
export declare const experimentalStyled: import("@mui/system/createStyled").CreateMUIStyled<import("@mui/material/styles").Theme>;
export declare const styled: import("@mui/system/createStyled").CreateMUIStyled<import("@mui/material/styles").Theme>;
export declare const private_excludeVariablesFromRoot: (cssVarPrefix: string) => string[];
export declare const ThemeProvider: typeof Mui_ThemeProvider;
import { alpha as Mui_alpha, darken as Mui_darken, decomposeColor as Mui_decomposeColor, emphasize as Mui_emphasize, getContrastRatio as Mui_getContrastRatio, getLuminance as Mui_getLuminance, hexToRgb as Mui_hexToRgb, hslToRgb as Mui_hslToRgb, lighten as Mui_lighten, recomposeColor as Mui_recomposeColor, rgbToHex as Mui_rgbToHex } from '@mui/system/colorManipulator';
export declare const alpha: typeof Mui_alpha;
export declare const darken: typeof Mui_darken;
export declare const decomposeColor: typeof Mui_decomposeColor;
export declare const emphasize: typeof Mui_emphasize;
export declare const getContrastRatio: typeof Mui_getContrastRatio;
export declare const getLuminance: typeof Mui_getLuminance;
export declare const hexToRgb: typeof Mui_hexToRgb;
export declare const hslToRgb: typeof Mui_hslToRgb;
export declare const lighten: typeof Mui_lighten;
export declare const recomposeColor: typeof Mui_recomposeColor;
export declare const rgbToHex: typeof Mui_rgbToHex;
import { getUnit as Mui_unstable_getUnit, toUnitless as Mui_unstable_toUnitless } from '@mui/material/styles/cssUtils';
export declare const duration: import("@mui/material/styles").Duration;
export declare const easing: import("@mui/material/styles").Easing;
export declare const unstable_getUnit: typeof Mui_unstable_getUnit;
export declare const unstable_toUnitless: typeof Mui_unstable_toUnitless;
export declare const Experimental_CssVarsProvider: (props: import("react").PropsWithChildren<Partial<import("@mui/system").CssVarsProviderConfig<import("@mui/material/styles").SupportedColorScheme>> & {
    theme?: {
        cssVarPrefix?: string | undefined;
        colorSchemes: Record<import("@mui/material/styles").SupportedColorScheme, Record<string, any>>;
    } | {
        $$material: {
            cssVarPrefix?: string | undefined;
            colorSchemes: Record<import("@mui/material/styles").SupportedColorScheme, Record<string, any>>;
        };
    } | undefined;
    documentNode?: Document | null | undefined;
    colorSchemeNode?: Element | null | undefined;
    colorSchemeSelector?: string | undefined;
    storageWindow?: Window | null | undefined;
    disableNestedContext?: boolean | undefined;
    disableStyleSheetGeneration?: boolean | undefined;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export declare const getInitColorSchemeScript: typeof import("@mui/system").getInitColorSchemeScript;
export declare const useColorScheme: () => import("@mui/system").ColorSchemeContextValue<import("@mui/material/styles").SupportedColorScheme>;
/**
 * @description Types
 */
export type { DeprecatedThemeOptions, Shadows, ZIndex, ThemeOptions, Theme, CommonColors, Palette, PaletteColor, PaletteColorOptions, PaletteOptions, SimplePaletteColorOptions, TypeText, TypeAction, TypeBackground, TypographyVariants, TypographyVariantsOptions, TypographyStyle, TypographyVariant, Duration, Easing, Transitions, TransitionsOptions, Mixins, Direction, Breakpoint, BreakpointOverrides, Breakpoints, BreakpointsOptions, CreateMUIStyled, Interpolation, CSSInterpolation, CSSObject, ColorFormat, ColorObject, SxProps, ComponentsProps, ComponentsPropsList, ComponentsVariants, ComponentsOverrides, ComponentNameToClassKey, Components, ClassNameMap, StyledComponentProps, ColorSchemeOverrides, SupportedColorScheme, ColorSystem, CssVarsPalette, Opacity, Overlays, PaletteAlert, PaletteActionChannel, PaletteAppBar, PaletteAvatar, PaletteChip, PaletteColorChannel, PaletteCommonChannel, PaletteFilledInput, PaletteLinearProgress, PaletteSkeleton, PaletteSlider, PaletteSnackbarContent, PaletteSpeedDialAction, PaletteStepConnector, PaletteStepContent, PaletteSwitch, PaletteTableCell, PaletteTextChannel, PaletteTooltip, CssVarsThemeOptions, CssVarsTheme, ThemeVars, ThemeCssVar, ThemeCssVarOverrides, ColorSystemOptions, } from '@mui/material/styles';
