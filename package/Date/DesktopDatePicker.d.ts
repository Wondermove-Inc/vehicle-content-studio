import { DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker/DesktopDatePicker.types';
import { Dayjs } from 'dayjs';
import * as React from 'react';
export type DesktopDatePickerComponent = <TDate extends Dayjs>(props: DesktopDatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element;
export declare const DesktopDatePicker: (<TDate extends Dayjs, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: DesktopDatePickerProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
