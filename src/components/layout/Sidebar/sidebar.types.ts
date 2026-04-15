export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}
