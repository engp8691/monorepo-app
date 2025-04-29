import { extendTheme } from '@chakra-ui/react'
import { theme as HDS_THEME } from '@crl/hds-theme'

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '1280px',
  xl: '1920px',
}

const overrides = {
  ...HDS_THEME,
  components: {
    ...HDS_THEME.components,
  },
  breakpoints,
}

export const theme = extendTheme(overrides)
