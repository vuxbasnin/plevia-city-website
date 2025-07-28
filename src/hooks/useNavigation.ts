import { usePathname } from 'next/navigation';

export interface NavigationItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
    {
        href: '/project',
        label: 'Về dự án',
        hasDropdown: false,
    },
    {
        href: '/location',
        label: 'Kết nối & Tiện ích',
        hasDropdown: false,
    },
    {
        href: '',
        label: 'Phong cách sống',
        hasDropdown: false,
    },
    {
        href: '/news',
        label: 'Tin tức',
        hasDropdown: false,
    },
];

export function useNavigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href;
  };

  const getCurrentPage = () => {
    return navigationItems.find(item => isActive(item.href)) || navigationItems[0];
  };

  return {
    pathname,
    navigationItems,
    isActive,
    getCurrentPage
  };
} 