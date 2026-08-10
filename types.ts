export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: any
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
	disabled?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export interface TypedObject {
  [key: string]: unknown
  _type: string
}

export interface AuthorTypes {
	_id: string;
	_createdAt: string;
	name: string;
	slug: string;
	imageUrl: string;
	altText: string;
	bio: TypedObject[];
}

export interface NewsTypes {
	_id: string;
	_createdAt: string;
	_updatedAt: string;
	title: string;
	description: string;
	slug: string;
	mainImage: string;
	altText: string;
	publishedAt: Date;
	readingTime: number;
	body: TypedObject[];
	author: AuthorTypes;
	tags: string;
}

export interface VideoTypes {
	_id: string;
	_createdAt: string;
	publishedAt: string;
	title: string;
	description: string;
	slug: string;
	thumbnail: string;
	altText: string;
	duration: string;
	embedUrl: string;
}