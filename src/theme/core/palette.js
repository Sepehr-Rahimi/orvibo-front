import COLORS from './colors.json';
import { varAlpha, createPaletteChannel } from '../styles';

// ----------------------------------------------------------------------

// Grey
export const grey = createPaletteChannel(COLORS.grey);

// Primary
export const primary = createPaletteChannel(COLORS.primary);

// Secondary
export const secondary = createPaletteChannel(COLORS.secondary);

// Info
export const info = createPaletteChannel(COLORS.info);

// Success
export const success = createPaletteChannel(COLORS.success);

// Warning
export const warning = createPaletteChannel(COLORS.warning);

// Error
export const error = createPaletteChannel(COLORS.error);

// Common
export const common = createPaletteChannel(COLORS.common);

// Text
export const text = {
  light: createPaletteChannel({
    primary: '#000000',
    secondary: grey[800],
    disabled: grey[400],
  }),
  dark: createPaletteChannel({
    primary: '#ffffff',
    secondary: grey[100],
    disabled: grey[600],
  }),
};

// Background
export const background = {
  light: createPaletteChannel({
    paper: '#ffffff',
    default: '#f0f0f0',
    neutral: grey[50],
  }),
  dark: createPaletteChannel({
    paper: '#000000',
    default: '#1f1f1f',
    neutral: grey[900],
  }),
};

// Action
export const baseAction = {
  hover: varAlpha(grey['900Channel'], 0.08),
  selected: varAlpha(grey['900Channel'], 0.12),
  focus: varAlpha(grey['900Channel'], 0.3),
  disabled: varAlpha(grey['900Channel'], 0.1),
  disabledBackground: varAlpha(grey['900Channel'], 0.12),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

export const action = {
  dark: { ...baseAction, active: grey[500] },
  light: { ...baseAction, active: grey[500] },
};

/*
 * Base palette
 */
export const basePalette = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: varAlpha(grey['500Channel'], 0.2),
  action,
};

export const darkPalette = {
  ...basePalette,
  text: text.dark,
  background: background.dark,
  action: action.dark,
};

export const lightPalette = {
  ...basePalette,
  text: text.light,
  background: background.light,
  action: action.light,
};

// ----------------------------------------------------------------------

export const colorSchemes = {
  light: { palette: lightPalette },
  dark: { palette: darkPalette },
};
