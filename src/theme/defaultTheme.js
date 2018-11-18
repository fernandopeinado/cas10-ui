import Color from './color';

const theme = {
    primaryColor: 'steelblue',
    backgroundLight: 'white',
    backgroundDark: Color('white').darken(0.2).hex(),
    textDark: '#333',
    textLight: 'white',    
}

theme.textOnPrimaryColor = Color(theme.primaryColor)
                        .bestContrast(theme.textLight, theme.textDark)
                        .hex();

theme.textOnBackgroundLight = Color(theme.backgroundLight)
                        .bestContrast(theme.textLight, theme.textDark)
                        .hex();

theme.textOnBackgroundDark = Color(theme.backgroundDark)
                        .bestContrast(theme.textLight, theme.textDark)
                        .hex();

theme.primaryColorDark = Color(theme.primaryColor)
                        .darken(0.33)
                        .hex();


export default theme;