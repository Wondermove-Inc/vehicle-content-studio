type Config = {
    usePrefix: boolean;
    useDefaultHdsProps: boolean;
};
export declare let hdsConfig: Config;
export declare function setConfig(newConfig: Partial<Config>): void;
export declare const isMuiComponent: <T>(hdsProps: T) => hdsProps is T;
export declare const isSimpleHdsProp: <T>(hdsProps: T) => hdsProps is T;
export {};
