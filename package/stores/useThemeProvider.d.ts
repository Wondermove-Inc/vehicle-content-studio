export declare function useThemeProvider(): {
    isScope: boolean | undefined;
    isSystemFont: boolean | undefined;
    isApp: boolean | undefined;
    themeName: import("./HdsThemeProvider").ThemeType;
    curClassName: string;
    setThemeName: (theme: import("./HdsThemeProvider").ThemeType) => void;
};
export default useThemeProvider;
