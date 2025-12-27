/**
 * Color utility functions to ensure proper contrast and visibility
 * This helps maintain consistent, accessible colors across light and dark modes
 */

export const colorClasses = {
  // Text colors - always visible
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
    accent: 'text-primary-600 dark:text-primary-400',
    inverse: 'text-white dark:text-gray-900', // For dark backgrounds
  },
  
  // Background colors
  bg: {
    default: 'bg-white dark:bg-gray-900',
    card: 'bg-white dark:bg-gray-800',
    muted: 'bg-gray-50 dark:bg-gray-800',
    accent: 'bg-primary-50 dark:bg-primary-900',
    gradient: {
      light: 'bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300',
      dark: 'dark:from-primary-500 dark:via-primary-600 dark:to-primary-700',
    },
  },
  
  // Border colors
  border: {
    default: 'border-gray-200 dark:border-gray-700',
    accent: 'border-primary-200 dark:border-primary-700',
  },
};

/**
 * Get text color class based on background
 * Ensures proper contrast
 */
export function getTextColorForBackground(bgType: 'light' | 'dark' | 'gradient' = 'light') {
  switch (bgType) {
    case 'dark':
    case 'gradient':
      return 'text-white dark:text-white';
    case 'light':
    default:
      return 'text-gray-900 dark:text-white';
  }
}

/**
 * Get gradient classes with proper text contrast
 */
export function getGradientClasses(variant: 'light' | 'dark' = 'light') {
  if (variant === 'light') {
    return {
      bg: 'bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 dark:from-primary-500 dark:via-primary-600 dark:to-primary-700',
      text: 'text-primary-800 dark:text-white',
      textMuted: 'text-primary-900 dark:text-primary-100',
    };
  } else {
    return {
      bg: 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-900 dark:via-primary-800 dark:to-primary-950',
      text: 'text-white dark:text-white',
      textMuted: 'text-primary-100 dark:text-primary-200',
    };
  }
}

/**
 * Get outline button classes with proper hover states
 * Ensures text is always visible on hover
 */
export function getOutlineButtonClasses() {
  return {
    base: 'px-8 py-4 bg-transparent border-2 font-semibold rounded-lg transition-all duration-300',
    light: 'border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
    dark: 'dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900',
    combined: 'px-8 py-4 bg-transparent border-2 border-primary-600 dark:border-white text-primary-600 dark:text-white font-semibold rounded-lg hover:bg-primary-600 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300',
  };
}

