// theme.js
import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { components } from "./components/Index";
import foundations from "./foundations";
import styles from "./styles";

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
}

const theme = extendTheme({
  ...foundations,
  components,
  styles,
  config,
})

export default theme;