import { ComponentType } from 'react';
import * as EchoesIcons from '@sonarsource/echoes-react';
import * as MuiIcons from '@mui/icons-material';

/**
 * Icon utility that tries Echoes icons first, then falls back to Material UI icons.
 *
 * This enables using the comprehensive MUI icon library when an icon doesn't exist
 * in Echoes, while maintaining visual consistency with Echoes design system.
 *
 * @example
 * // Try Echoes IconHome first, use that if it exists
 * const HomeIcon = getIcon('Home');
 * <Layout.SidebarNavigation.Item Icon={HomeIcon} to="/">Home</Layout.SidebarNavigation.Item>
 *
 * @example
 * // If Echoes doesn't have IconDashboard, fall back to MUI Dashboard
 * const DashboardIcon = getIcon('Dashboard');
 * <Layout.SidebarNavigation.Item Icon={DashboardIcon} to="/dashboard">Dashboard</Layout.SidebarNavigation.Item>
 */
export function getIcon(name: string): ComponentType<any> {
  // Try Echoes first with "Icon" prefix (e.g., "Home" -> "IconHome")
  const echoesIconName = `Icon${name}` as keyof typeof EchoesIcons;
  const echoesIcon = EchoesIcons[echoesIconName];

  if (echoesIcon && typeof echoesIcon !== 'string') {
    return echoesIcon as ComponentType<any>;
  }

  // Fall back to MUI icon (exact name, e.g., "Home")
  const muiIconName = name as keyof typeof MuiIcons;
  const muiIcon = MuiIcons[muiIconName];

  if (muiIcon && typeof muiIcon !== 'string') {
    return muiIcon as ComponentType<any>;
  }

  // If neither found, return a fallback that logs a warning
  return (() => {
    console.warn(`Icon "${name}" not found in Echoes or Material UI icons`);
    return null;
  }) as ComponentType<any>;
}

/**
 * Get multiple icons at once for convenience.
 *
 * @example
 * const { Home, Settings, Dashboard } = getIcons('Home', 'Settings', 'Dashboard');
 */
export function getIcons(...names: string[]): Record<string, ComponentType<any>> {
  return names.reduce((acc, name) => {
    acc[name] = getIcon(name);
    return acc;
  }, {} as Record<string, ComponentType<any>>);
}
