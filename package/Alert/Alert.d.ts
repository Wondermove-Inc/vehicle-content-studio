import { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import React from 'react';
export interface hdsAlertProps {
    close?: boolean | React.ReactNode;
    onClose?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    buttons?: React.ReactNode;
    description?: React.ReactNode;
    checkbox?: React.ReactNode;
    type?: 'default' | 'low' | 'hight' | 'info' | 'success' | 'warning' | 'error';
    display?: 'section' | 'top';
}
export interface AlertProps extends Omit<MuiAlertProps, 'ref'> {
    hdsProps?: hdsAlertProps | boolean;
}
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
export default Alert;
