// theme.ts
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        size: 'lg',
        variant: 'filled',
        focusBorderColor: 'blue.400',
      },
    },
    Select: {
      defaultProps: {
        size: 'lg',
        variant: 'filled',
        focusBorderColor: 'blue.400',
      },
    },
    Radio: {
      defaultProps: {
        colorScheme: 'blue',
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme: 'blue',
      },
    },
  },
})
