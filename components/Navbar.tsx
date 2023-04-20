import {
  Box,
  Flex,
  Link,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';

const Navbar = ({ showLogo = true, transparentBg = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLinks = () => (
    <>
      <Link href="/" mx={4}>
        Home
      </Link>
      <Link href="/gifts" mx={4}>
        Gifts
      </Link>
      <Link href="/dashboard" mx={4}>
        Dashboard
      </Link>
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
    </>
  );

  return (
    <Box bg={transparentBg ? 'transparent' : 'gray.100'} py={4}>
      <Flex justifyContent="center" alignItems="center">
        {showLogo && (
          <Link href="/" mx={4} display="flex" alignItems="center">
            <Image src="/logo-bg.png" alt="Logo" boxSize="40px" />
            <Text ml={2} fontFamily="'Poppins', sans-serif" fontWeight="bold">
              GivngLab
            </Text>
          </Link>
        )}

        {/* Drawer for mobile view */}
        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="outline"
            aria-label="Navigation menu"
          />
          <Drawer isOpen={isOpen} onClose={onClose} placement="right">
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Navigation</DrawerHeader>
                <DrawerBody>
                  <NavLinks />
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>

        {/* Links for larger screens */}
        <Box display={{ base: 'none', md: 'flex' }}>
          <NavLinks />
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
