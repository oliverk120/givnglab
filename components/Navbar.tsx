import { Box, Flex, Link, Image, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Navbar = ({ showLogo = true, transparentBg = false }) => {
  return (
    <Box bg={transparentBg ? 'transparent' : 'gray.100'} py={4}>
      <Flex justifyContent="center" alignItems="center">
        {/* Logo and project name */}
        {showLogo && (
          <Link href="/" mx={4} display="flex" alignItems="center">
            <Image src="/logo-bg.png" alt="Logo" boxSize="40px" />
            <Text ml={2} fontFamily="'Poppins', sans-serif" fontWeight="bold">
              GivngLab
            </Text>
          </Link>
        )}
        {/* Other links */}
        <Link href="/" mx={4}>
          Home
        </Link>
        <Link href="/gifts" mx={4}>
          Gifts
        </Link>
        <Link href="/dashboard" mx={4}>
          Dashboard
        </Link>
        {/* Data menu with Preprocess and Enrich submenu items */}
        <Menu>
          <MenuButton as={Link} mx={4}>
            Data <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} href="/preprocess">
              Preprocess
            </MenuItem>
            <MenuItem as={Link} href="/enrich">
              Enrich
            </MenuItem>
            <MenuItem as={Link} href="/test-API">
              Test API
            </MenuItem>
          </MenuList>
        </Menu>
        {/* Add more links for additional pages here */}
      </Flex>
    </Box>
  );
};

export default Navbar;
