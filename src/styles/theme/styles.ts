import { mode, Styles } from "@chakra-ui/theme-tools"

const styles: Styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("white", "gray.900")(props),
    },
  }),
}

export default styles
