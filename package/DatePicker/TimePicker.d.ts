import { DatePickerProps } from './DatePicker';
export type TimePickerProps<WithRange extends boolean | undefined = undefined, WithMultiple extends boolean | undefined = undefined> = DatePickerProps<WithRange, WithMultiple> & {
    isStandalone?: boolean;
};
declare const TimePicker: {
    <WithRange extends boolean | undefined = undefined, WithMultiple extends boolean | undefined = undefined>(props: TimePickerProps<WithRange, WithMultiple>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default TimePicker;
