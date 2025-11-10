'use client';

import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import { ReactNode } from 'react';

const config = {
  initialColorMode: 'dark' as const,
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
      '*::placeholder': {
        color: 'gray.500',
      },
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '*::-webkit-scrollbar-track': {
        bg: 'gray.800',
      },
      '*::-webkit-scrollbar-thumb': {
        bg: 'gray.600',
        borderRadius: '4px',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        bg: 'gray.500',
      },
    },
  },
  colors: {
    brand: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
    gray: {
      750: '#1f2937',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  shadows: {
    outline: '0 0 0 3px rgba(66, 165, 245, 0.6)',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        gradient: {
          bgGradient: 'linear(to-r, brand.400, brand.600)',
          color: 'white',
          _hover: {
            bgGradient: 'linear(to-r, brand.500, brand.700)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(66, 165, 245, 0.3)',
          },
          _active: {
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        solid: {
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'gray.800',
          borderRadius: 'xl',
          borderWidth: '1px',
          borderColor: 'gray.700',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: 'gray.700',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            fontSize: 'xs',
            fontWeight: 'semibold',
            color: 'gray.400',
          },
          td: {
            borderColor: 'gray.700',
          },
        },
      },
    },
  },
});

export function ChakraUIProvider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      {children}
    </ChakraProvider>
  );
}

