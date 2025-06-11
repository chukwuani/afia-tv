import { FooterItem, MainNavItem } from "@/types"

export const PRODUCTS = [
  {
    title: "Cinema",
    description:
      "Get your website online with Sinphox's web hosting services. Our web hosting plans are fast, secure, and reliable.",
    href: "/products/web-hosting",
  },
  {
    title: "Radio",
    description:
      "Sinphox VMs are simple, scalable virtual machines for all your web hosting and VPS hosting needs.",
    href: "/products/cloud-compute",
  },
  {
    title: "Videos",
    description:
      "Fully-managed dedicated server to get your app to market fast that's super simple to set up and cost-effective.",
    href: "/products/bare-metal",
  },
]

const SOCIAL_LINKS = {
  instagram: "https://instagram.com/afiatvofficial",
  x: "https://x.com/afiatvofficial",
  facebook: "https://facebook.com/afiatvofficial",
  youtube: "https://youtube.com/@afiatvofficial",
  linkedin: "https://linkedin.com/company/afiaofficial",
}

export type SiteConfig = typeof siteConfig
export type MainNav = typeof siteConfig.mainNav

export const siteConfig = {
  title: "Afia TV",
  description:
    "Celebrating the Heart of the East. Experience our vibrant traditions, stories, and entertainment.",
  url: "https://afiatv.net",
  ogImage: "https://afiatv.net/opengraph-image.jpg",
  links: SOCIAL_LINKS,
  mainNav: [

    {
      title: "About",
      href: "/",
      external: false,
      disabled: false,
    },
    {
      title: "News",
      href: "/",
      external: false,
      disabled: false,
    },
    {
      title: "Contact",
      href: "/",
      external: false,
      disabled: false,
    },
        {
      title: "More",
      items: PRODUCTS.map((item) => ({ ...item, items: [] })),
    },
  ] satisfies MainNavItem[],
  footerNav: [
    {
      title: "Browse",
      items: [
        {
          title: "News",
          href: "/news",
          external: false,
        },
        {
          title: "South East",
          href: "/news/south-east",
          external: false,
        },
        {
          title: "Politics",
          href: "/news/politics",
          external: false,
        },
        {
          title: "Entertainment",
          href: "/news/entertainment",
          external: false,
        },
        {
          title: "Sports",
          href: "/news/sports",
          external: false,
        },
        {
          title: "Audio",
          href: "https://afia993.com",
          external: true,
        },
      ],
    },
    {
      title: "Brands",
      items: [
        {
          title: "Afia Radio",
          href: "https://afia993.com",
          external: true,
        },
        {
          title: "Afia Cinema",
          href: "https://www.youtube.com/@AfiaCinema",
          external: true,
        },
        {
          title: "Obuzo",
          href: "/obuzo",
          external: false,
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          title: "Our History",
          href: "/about",
          external: false,
        },
        {
          title: "Careers",
          href: "/careers",
          external: false,
        },
      ],
    },
    {
      title: "Contact",
      items: [
        {
          title: "Help center",
          href: "/help-center",
          external: false,
        },
        {
          title: "Advertise with us",
          href: "/advertise",
          external: false,
        },
      ],
    },
  ] satisfies FooterItem[],
}
