import { Box, Flex, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bg="gray.400" px={4} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={6}>
          <ChakraLink as={RouterLink} to="/" color="white" fontWeight="bold">
            Home
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/about" color="white" fontWeight="bold">
            About
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/tests" color="white" fontWeight="bold">
            Tests
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/forms" color="white" fontWeight="bold">
            Context Rerender
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/counter" color="white" fontWeight="bold">
            Counter
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/errorboundary" color="white" fontWeight="bold">
            Error Boundary
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/lazyimport" color="white" fontWeight="bold">
            Lazy Load
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/visuallist" color="white" fontWeight="bold">
            Visual List
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar
