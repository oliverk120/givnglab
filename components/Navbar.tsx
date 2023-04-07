// components/Navbar.tsx
import { Box, Flex, Link, Image, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

const Navbar = ({ showLogo = true, transparentBg = false }) => {
  return (
    <Box bg={transparentBg ? 'transparent' : 'gray.100'} py={4}>
      <Flex justifyContent="center" alignItems="center">
        {/* Logo and project name */}

        {showLogo && (
          <NextLink href="/" passHref>
            <Link mx={4} display="flex" alignItems="center">
              <Image src="/logo-bg.png" alt="Logo" boxSize="40px" />
              <Text ml={2} fontFamily="'Poppins', sans-serif" fontWeight="bold">
                GivngLab
              </Text>
            </Link>
          </NextLink>
        )}
        {/* Other links */}
        <NextLink href="/" passHref>
          <Link mx={4}>Home</Link>
        </NextLink>
        <NextLink href="/gifts" passHref>
          <Link mx={4}>Gifts</Link>
        </NextLink>
        <NextLink href="/dashboard" passHref>
          <Link mx={4}>Dashboard</Link>
        </NextLink>
        {/* Add more links for additional pages here */}
      </Flex>
    </Box>
  );
};

export default Navbar;
