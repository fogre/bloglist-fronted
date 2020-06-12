import { createMuiTheme }  from '@material-ui/core/styles'

const customTheme = createMuiTheme({
  "palette": {
    "common": {
      "black": "rgba(0, 0, 0, 1)",
      "white": "rgba(255, 255, 255, 1)"
    },
    "background": {
      "paper": "transparent",
      "default": "#2F2FA2"
    },
    "primary": {
      "light": "rgba(161, 41, 250, 1)",
      "main": "rgba(161, 41, 250, 1)",
      "dark": "rgba(189, 189, 189, 1)",
      "contrastText": "rgba(243, 243, 243, 1)"
    },
    "secondary": {
      "light": "rgba(225, 99, 142, 1)",
      "main": "rgba(143, 178, 255, 1)",
      "dark": "rgba(198, 104, 147, 1)",
      "contrastText": "#fff"
    },
    "error": {
      "light": "#e57373",
      "main": "rgba(172, 41, 43, 1)",
      "dark": "#d32f2f",
      "contrastText": "rgba(255, 255, 255, 1)"
    },
    "text": {
      "primary": "rgba(255, 255, 255)",
      "secondary": "rgba(255, 255, 255, 0.54)",
      "disabled": "rgba(241, 241, 241, 0.38)",
      "hint": "rgba(173, 169, 169, 0.38)"
    },
    type: "dark"
  }
})

export default customTheme