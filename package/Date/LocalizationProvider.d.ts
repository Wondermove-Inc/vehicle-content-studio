/// <reference types="react" />
import { LocalizationProviderProps as MuiLocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { Dayjs } from 'dayjs';
export type LocalizationProviderComponent = (<TDate extends Dayjs, TLocale>(props: MuiLocalizationProviderProps<TDate, TLocale>) => React.JSX.Element) & {
    propTypes?: any;
};
export declare const LocalizationProvider: LocalizationProviderComponent;
