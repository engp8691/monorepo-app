import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bg="gray.400" px={4} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={6}>
          <Menu>
            <MenuButton
              as={ChakraLink}
              color="white"
              fontWeight="bold"
              _hover={{ textDecoration: 'underline' }}
              display="flex"
              alignItems="center"
            >
              Home <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/">
                Introduction
              </MenuItem>
              <MenuItem as={RouterLink} to="/form1">
                Form 1
              </MenuItem>
              <MenuItem as={RouterLink} to="/form2">
                Form 2
              </MenuItem>
              <MenuItem as={RouterLink} to="/form3">
                Form 3
              </MenuItem>
              <MenuItem as={RouterLink} to="/form4">
                Cancel Post
              </MenuItem>
            </MenuList>
          </Menu>

          <ChakraLink as={RouterLink} to="/todo" color="white" fontWeight="bold">
            Todo List
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
          {/* <ChakraLink as={RouterLink} to="/aggrid" color="white" fontWeight="bold">
            AG Grid
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/aggridpaging" color="white" fontWeight="bold">
            AG Grid Paging
          </ChakraLink> */}
          <ChakraLink as={RouterLink} to="/aggridfiltering" color="white" fontWeight="bold">
            AG Grid
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar
