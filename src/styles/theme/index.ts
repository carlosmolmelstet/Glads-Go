// theme.js
import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import foundations from "./foundations";
import styles from "./styles";

const config: ThemeConfig = {
    useSystemColorMode: false,
    initialColorMode: "dark",
  }
  
 const theme = extendTheme({
    ...foundations,
    styles,
    config,

})

export default theme;