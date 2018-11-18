import React from 'react';
import { createTheming } from 'react-jss';
import defaultTheme from './defaultTheme';

export const theming = createTheming('estoque');

const { ThemeProvider } = theming

const Theme = (props) => {
    var selectedTheme = props.theme || defaultTheme
    return <ThemeProvider theme={selectedTheme}>{props.children}</ThemeProvider>
}

export default Theme;
