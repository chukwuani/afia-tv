import { MainNavItem } from "@/types"
import { Icons } from "@/components/icons"

type BaseTierFeatures = {
  title: string
  headline: string
  href: string
  buttonText: string
  popular: boolean
  inverse: boolean
  free: boolean
  price: {
    nigeria: number
    international: number
    hourly: {
      nigeria: number
      international: number
    }
  }
  features: string[]
}

type ProductCategory = {
  id: string
  name: string
}

// For categories with direct pricing tiers
type DirectPricingCategory = {
  type: "direct"
  category: ProductCategory
  description?: string
  tiers: BaseTierFeatures[]
}

// For grouped pricing tiers
type PricingGroup = {
  name: string
  description?: string
  tiers: BaseTierFeatures[]
}

// For categories with grouped pricing tiers
type GroupedPricingCategory = {
  type: "grouped"
  category: ProductCategory
  description: string
  groups: PricingGroup[]
}

// Union type for a single category
type PricingCategory = DirectPricingCategory | GroupedPricingCategory

// Array type for all pricing categories
type PricingCategories = PricingCategory[]

export enum PRODUCT_CATEGORIES {
  CLOUD = "cloud compute",
  WORDPRESS = "wordpress",
  BARE = "bare metal",
  KUBERNETES = "kubernetes",
  CLOUDGPU = "cloud GPU",
  DATABASES = "databases",
  WEBHOSTING = "web hosting",
}

export const PRODUCTS = [
  {
    title: "Web Hosting",
    description:
      "Get your website online with Sinphox's web hosting services. Our web hosting plans are fast, secure, and reliable.",
    icon: Icons.webHosting,
    href: "/products/web-hosting",
    category: PRODUCT_CATEGORIES.WEBHOSTING,
  },
  {
    title: "Virtual machines",
    description:
      "Sinphox VMs are simple, scalable virtual machines for all your web hosting and VPS hosting needs.",
    icon: Icons.cloud,
    href: "/products/cloud-compute",
    category: PRODUCT_CATEGORIES.CLOUD,
  },
  {
    title: "Bare metal",
    description:
      "Fully-managed dedicated server to get your app to market fast that's super simple to set up and cost-effective.",
    icon: Icons.bareMetal,
    href: "/products/bare-metal",
    category: PRODUCT_CATEGORIES.BARE,
  },
]

export const PRICING_TIERS = [
  {
    title: "Regular Compute",
    href: "/products/cloud-compute",
    headline: "Easy-to-use, affordable VMs for many common workloads",
    category: PRODUCT_CATEGORIES.CLOUD,
    description:
      "These virtual machines run atop shared vCPUs, and are suitable for many business and personal applications: low traffic websites, blogs, CMS, dev/test environments, small databases, and much more.",
    buttonText: "Get Started",
    popular: true,
    inverse: false,
    free: true,
    price: 0,
    features: ["1 vCPU", "512MiB Memory", "500GiB Bandwidth", "10GB Storage"],
  },
  {
    title: "Optimized Compute",
    href: "/products/cloud-compute",
    headline:
      "No noisy neighbors on these powerful VMs with built-in NVMe SSD.",
    category: PRODUCT_CATEGORIES.CLOUD,
    description:
      "These virtual machines run atop fully dedicated, new generation AMD EPYC vCPUs. Dedicated vCPUs ensure that these machines deliver the fast, consistent performance that many business applications require.",
    price: 18,
    buttonText: "Get Started",
    popular: false,
    inverse: true,
    free: false,
    features: ["2 vCPUs", "2GiB Memory", "3000GiB Bandwidth", "60GB Storage"],
  },
  {
    title: "High Performance Compute",
    href: "/products/cloud-compute",
    headline: "Level up with more power and enhanced features.",
    category: PRODUCT_CATEGORIES.CLOUD,
    description:
      "For compute bound applications, these VMs provide proportionally more CPU, more RAM and more NVMe SSD.",
    price: 48,
    buttonText: "Get Started",
    popular: false,
    inverse: true,
    free: false,
    features: ["4 vCPUs", "8GiB Memory", "5000GiB Bandwidth", "160GiB Storage"],
  },

  {
    title: "Starter GPU",
    href: "/products/cloud-gpu",
    headline: "Accelerated Computing for Development and Testing",
    category: PRODUCT_CATEGORIES.CLOUDGPU,
    description:
      "Our Performance GPU package delivers reliable GPU computing power for development teams and small-scale AI/ML workloads, offering a perfect balance of performance and cost-effectiveness. Ideal for: AI/ML development, model training, rendering projects, and computational workloads.",
    buttonText: "Get Started",
    popular: false,
    inverse: false,
    free: false,
    price: 700,
    features: [
      "Single NVIDIA RTX 4090 with 24GB GDDR6X",
      "AMD Ryzen 9 7950X (16 cores/32 threads)",
      "64GB DDR5 RAM",
      "2 x 2TB NVMe SSD in RAID 1",
      "1Gbps Dedicated Network Port",
      "10TB Monthly Bandwidth",
      "Basic DDoS Protection",
      "Basic monitoring and alerts",
      "Daily backups",
      "99.9% Uptime guarantee",
      "Standard support",
      "Basic server management",
      "CUDA and PyTorch pre-installed",
      "Docker support",
    ],
  },
  {
    title: "Professional GPU",
    href: "/products/cloud-gpu",
    headline: "High-Performance Computing for Production Workloads",
    category: PRODUCT_CATEGORIES.CLOUDGPU,
    description:
      "Our Professional GPU solution delivers substantial computing power for organizations requiring reliable GPU performance for production environments and intensive computational tasks. Ideal for: Production AI/ML workloads, large-scale data processing, high-performance computing, and professional rendering.",
    buttonText: "Get Started",
    popular: false,
    inverse: false,
    free: false,
    price: 1200,
    features: [
      "2 x NVIDIA RTX 4090 with 24GB GDDR6X each",
      "AMD EPYC 7763 (64 cores/128 threads)",
      "256GB DDR4 ECC RAM",
      "2 x 3.84TB NVMe SSD in RAID 1",
      "2 x 4TB SATA SSD in RAID 1",
      "Dual 5Gbps Network Ports",
      "25TB Monthly Bandwidth",
      "DDoS Protection up to 10Gbps",
      "Advanced monitoring with custom alerts",
      "Hourly backups with 30-day retention",
      "99.95% Uptime guarantee",
      "Priority support",
      "Comprehensive server management",
      "GPU clustering support",
      "AI development framework suite",
      "Load balancing included",
    ],
  },
  {
    title: "Enterprise GPU",
    href: "/products/cloud-gpu",
    headline: "Ultimate GPU Computing for Mission-Critical Operations",
    category: PRODUCT_CATEGORIES.CLOUDGPU,
    description:
      "Our Enterprise GPU package represents the pinnacle of GPU computing, designed for organizations requiring exceptional performance, redundancy, and support for critical AI/ML operations. Ideal for: Enterprise AI/ML operations, large-scale model training, high-performance computing clusters, and mission-critical AI applications",
    buttonText: "Get Started",
    popular: false,
    inverse: false,
    free: false,
    price: 1500,
    features: [
      "4 x NVIDIA A100 with 80GB HBM2e each",
      "2 x AMD EPYC 7763 (128 cores/256 threads total)",
      "512GB DDR4 ECC RAM",
      "4 x 3.84TB NVMe SSD in RAID 10",
      "4 x 8TB SATA SSD in RAID 10",
      "Dual 10Gbps Network Ports with LACP",
      "100TB Monthly Bandwidth",
      "DDoS Protection up to 40Gbps",
      "Enterprise monitoring with AI-powered alerts",
      "Continuous backup with point-in-time recovery",
      "99.99% Uptime guarantee",
      "Dedicated account manager",
      "24/7 premium support",
      "Comprehensive server management",
      "GPU virtualization support",
      "Multi-zone failover capability",
    ],
  },

  {
    title: "Wordpress Premium",
    href: "/products/wordpress",
    headline: "Everything you need to create your website.",
    category: PRODUCT_CATEGORIES.WORDPRESS,
    description: "",
    price: 8,
    buttonText: "Get Started",
    popular: false,
    inverse: true,
    free: false,
    features: [
      "100 websites",
      "Managed Hosting for WordPress",
      "~25 000 visits monthly",
      "100 GB SSD storage",
      "400 000 files and directories (inodes)",
      "Free domain",
      "Free pre-built templates",
      "Free automatic website migration",
      "Unlimited free SSL",
      "Free email",
      "Weekly backups",
      "WordPress vulnerabilities scanner",
      "Smart WordPress auto updates",
      "Standard WordPress acceleration",
      "Unlimited bandwidth",
    ],
  },
  {
    title: "Wordpress Business",
    href: "/products/wordpress",
    headline: "Level up with more power and enhanced features.",
    category: PRODUCT_CATEGORIES.WORDPRESS,
    description: "",
    price: 14,
    buttonText: "Get Started",
    popular: true,
    inverse: true,
    free: false,
    features: [
      "100 websites",
      "Managed Hosting for WordPress",
      "~100 000 visits monthly",
      "200 GB SSD storage",
      "600 000 files and directories (inodes)",
      "Free domain",
      "Free pre-built templates",
      "Free automatic website migration",
      "Unlimited free SSL",
      "Free email",
      "Weekly backups",
      "WordPress vulnerabilities scanner",
      "Smart WordPress auto updates",
      "Standard WordPress acceleration",
      "Unlimited bandwidth",
    ],
  },
  {
    title: "Wordpress Professional",
    href: "/products/wordpress",
    headline:
      "Hosting for WordPress for high-traffic sites and large-scale projects.",
    category: PRODUCT_CATEGORIES.WORDPRESS,
    description: "",
    price: 40,
    buttonText: "Get Started",
    popular: false,
    inverse: true,
    free: false,
    features: [
      "300 websites",
      "Managed Hosting for WordPress",
      "~300 000 visits monthly",
      "250 GB SSD storage",
      "3 000 000 files and directories (inodes)",
      "Free domain",
      "Free pre-built templates",
      "Free automatic website migration",
      "Unlimited free SSL",
      "Free email",
      "Weekly backups",
      "WordPress vulnerabilities scanner",
      "Smart WordPress auto updates",
      "Standard WordPress acceleration",
      "Unlimited bandwidth",
    ],
  },

  {
    title: "Essential Server",
    href: "/products/bare-metal",
    headline: "Perfect for Growing Businesses and Development Teams",
    category: PRODUCT_CATEGORIES.BARE,
    description:
      "Our Essential Server package provides a robust foundation for businesses taking their first steps into dedicated hosting. Ideal for: Web hosting, development environments, small databases, and testing servers.",
    price: 120,
    buttonText: "Get Started",
    popular: false,
    inverse: true,
    free: false,
    features: [
      "12 x 240 GB SSD",
      "4 cores / 8 threads @ 3.8GHz",
      "32 GB RAM",
      "NVIDIA Grace CPU",
      "5 TB Bandwidth",
      "10 Gbps Network",
    ],
  },
  {
    title: "Professional Server",
    href: "/products/bare-metal",
    headline: "Engineered for High-Performance Applications",
    category: PRODUCT_CATEGORIES.BARE,
    description:
      "The Professional Server package delivers enhanced computing power and storage capabilities for businesses requiring superior performance and reliability. Ideal for: E-commerce platforms, busy websites, game servers, medium-sized databases, and containerized applications.",
    price: 185,
    buttonText: "Get Started",
    popular: false,
    inverse: true,
    free: false,
    features: [
      "2 x 960 GB SSD",
      "6 cores / 12 threads @ 4GHz",
      "32 GB RAM",
      "10 TB Bandwidth",
      "10 Gbps Network",
    ],
  },
  {
    title: "Enterprise Server",
    href: "/products/bare-metal",
    headline: "Ultimate Performance for Mission-Critical Operations",
    category: PRODUCT_CATEGORIES.BARE,
    description:
      "Our Enterprise Server package represents the pinnacle of dedicated hosting, designed for organizations requiring exceptional performance, redundancy, and support. Ideal for: Large-scale applications, high-traffic websites, enterprise databases, big data processing, and mission-critical workloads",
    price: 350,
    buttonText: "Get Started",
    popular: true,
    inverse: true,
    free: false,
    features: [
      "2 x 1.92 TB NVMe",
      "8 cores / 16 threads @ 3.2GHz",
      "128 GB RAM",
      "10 TB Bandwidth",
      "10 Gbps Network",
    ],
  },

  {
    title: "Standard Database",
    href: "/products/databases",
    headline: "Reliable Database Hosting for Growing Applications",
    category: PRODUCT_CATEGORIES.DATABASES,
    description:
      "Our Standard Database package provides a solid foundation for businesses requiring reliable database performance with essential management features. Ideal for: Small to medium-sized applications, development environments, and growing web platforms",
    price: 20,
    buttonText: "Get Started",
    popular: false,
    inverse: true,
    free: false,
    features: [
      "AMD EPYC 7313 (16 cores/32 threads)",
      "64GB DDR4 ECC RAM",
      "2 x 1.92TB NVMe SSD in RAID 1",
      "2 x 2TB SATA SSD in RAID 1",
      "1Gbps Dedicated Network Port",
      "5TB Monthly Bandwidth",
      "Basic DDoS Protection",
    ],
  },
  {
    title: "Professional Database",
    href: "/products/databases",
    headline: "Advanced Database Solutions for Business-Critical Applications",
    category: PRODUCT_CATEGORIES.DATABASES,
    description:
      "Our Professional Database solution delivers robust performance and advanced features for organizations requiring reliable database operations in demanding environments. Ideal for: Business-critical applications, high-traffic websites, and production environments requiring reliable performance.",
    price: 20,
    buttonText: "Get Started",
    popular: false,
    inverse: true,
    free: false,
    features: [
      "AMD EPYC 7543 (32 cores/64 threads)",
      "256GB DDR4 ECC RAM",
      "4 x 1.92TB NVMe SSD in RAID 10",
      "4 x 4TB SATA SSD in RAID 10",
      "Dual 5Gbps Network Ports",
      "20TB Monthly Bandwidth",
      "DDoS Protection up to 10Gbps",
    ],
  },
  {
    title: "Enterprise Database",
    href: "/products/databases",
    headline:
      "Business-critical applications, high-traffic websites, and production environments requiring reliable performance",
    category: PRODUCT_CATEGORIES.DATABASES,
    description:
      "Our Enterprise Database package delivers unmatched performance and reliability for organizations requiring the highest level of database capabilities and support. Ideal for: Enterprise applications, global operations, high-performance databases, and mission-critical data platforms",
    price: 20,
    buttonText: "Get Started",
    popular: false,
    inverse: true,
    free: false,
    features: [
      "2 x AMD EPYC 7763 (128 cores/256 threads total)",
      "512GB DDR4 ECC RAM",
      "8 x 3.84TB NVMe SSD in RAID 10",
      "8 x 8TB SATA SSD in RAID 10",
      "Dual 10Gbps Network Ports with LACP",
      "100TB Monthly Bandwidth",
      "DDoS Protection up to 40Gbps",
    ],
  },
]

export const PRICING: PricingCategories = [
  {
    type: "grouped",
    description:
      "These virtual machines run atop shared vCPUs, and are suitable for many business and personal applications: low traffic websites, blogs, CMS, dev/test environments, small databases, and much more.",
    category: {
      id: PRODUCT_CATEGORIES.CLOUD,
      name: PRODUCT_CATEGORIES.CLOUD,
    },
    groups: [
      {
        name: "Regular Perfomance",
        description: "Standard computing options for everyday workloads",
        tiers: [
          {
            title: "1",
            href: "/products/cloud-compute",
            headline: "Easy-to-use, affordable VMs for many common workloads",
            buttonText: "Get Started",
            popular: false,
            inverse: true,
            free: true,
            price: {
              nigeria: 6000,
              international: 4,
              hourly: {
                nigeria: 8,
                international: 0.00595,
              },
            },
            features: ["512 MiB", "1 vCPU", "500 GiB", "10 GiB"],
          },
          {
            title: "2",
            href: "/products/cloud-compute",
            headline:
              "No noisy neighbors on these powerful VMs with built-in NVMe SSD.",
            price: {
              nigeria: 9000,
              international: 6,
              hourly: {
                nigeria: 12,
                international: 0.00893,
              },
            },
            buttonText: "Get Started",
            popular: true,
            inverse: false,
            free: false,
            features: ["1 GiB", "1 vCPU", "1000 GiB", "25 GiB"],
          },
          {
            title: "3",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 18000,
              international: 12,
              hourly: {
                nigeria: 25,
                international: 0.01786,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["2 GiB", "1 vCPU", "2000 GiB", "50 GiB"],
          },
          {
            title: "4",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 27000,
              international: 18,
              hourly: {
                nigeria: 37,
                international: 0.02679,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["2 GiB", "2 vCPUs", "3000 GiB", "60 GiB"],
          },
          {
            title: "5",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 36000,
              international: 24,
              hourly: {
                nigeria: 49,
                international: 0.03571,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["4 GiB", "2 vCPUs", "4000 GiB", "80 GiB"],
          },
          {
            title: "6",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 72000,
              international: 48,
              hourly: {
                nigeria: 99,
                international: 0.07143,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["8 GiB", "4 vCPUs", "5000 GiB", "160 GiB"],
          },
          {
            title: "7",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 144000,
              international: 96,
              hourly: {
                nigeria: 197,
                international: 0.14286,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["16 GiB", "8 vCPUs", "6000 GiB", "320 GiB"],
          },
        ],
      },
      {
        name: "High Perfomance",
        description: "Standard computing options for everyday workloads",
        tiers: [
          {
            title: "1",
            href: "/products/cloud-compute",
            headline: "Easy-to-use, affordable VMs for many common workloads",
            buttonText: "Get Started",
            popular: false,
            inverse: true,
            free: false,
            price: {
              nigeria: 12000,
              international: 8,
              hourly: {
                nigeria: 16,
                international: 0.0119,
              },
            },
            features: ["1 GiB", "1 vCPU", "1000 GiB", "35 GiB"],
          },
          {
            title: "2",
            href: "/products/cloud-compute",
            headline:
              "No noisy neighbors on these powerful VMs with built-in NVMe SSD.",
            price: {
              nigeria: 24000,
              international: 16,
              hourly: {
                nigeria: 33,
                international: 0.02381,
              },
            },
            buttonText: "Get Started",
            popular: true,
            inverse: false,
            free: false,
            features: ["2 GiB", "1 vCPU", "2000 GiB", "70 GiB"],
          },
          {
            title: "3",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 36000,
              international: 24,
              hourly: {
                nigeria: 49,
                international: 0.03571,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["2 GiB", "2 vCPUs", "3000 GiB", "90 GiB"],
          },
          {
            title: "4",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 48000,
              international: 32,
              hourly: {
                nigeria: 66,
                international: 0.04762,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["4 GiB", "2 vCPUs", "4000 GiB", "120 GiB"],
          },
          {
            title: "5",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 72000,
              international: 48,
              hourly: {
                nigeria: 99,
                international: 0.07143,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["8 GiB", "2 vCPUs", "5000 GiB", "160 GiB"],
          },
          {
            title: "6",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 96000,
              international: 64,
              hourly: {
                nigeria: 132,
                international: 0.09524,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["8 GiB", "4 vCPUs", "6000 GiB", "240 GiB"],
          },
          {
            title: "7",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 144000,
              international: 96,
              hourly: {
                nigeria: 197,
                international: 0.14286,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["16 GiB", "4 vCPUs", "8000 GiB", "320 GiB"],
          },
          {
            title: "8",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 192000,
              international: 128,
              hourly: {
                nigeria: 263,
                international: 0.19048,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["16 GiB", "8 vCPUs", "9000 GiB", "480 GiB"],
          },
          {
            title: "9",
            href: "/products/cloud-compute",
            headline: "Level up with more power and enhanced features.",
            price: {
              nigeria: 288000,
              international: 192,
              hourly: {
                nigeria: 395,
                international: 0.28571,
              },
            },
            buttonText: "Get Started",
            popular: false,
            inverse: false,
            free: false,
            features: ["32 GiB", "8 vCPUs", "10,000 GiB", "640 GiB"],
          },
        ],
      },
    ],
  },
  {
    type: "direct",
    description:
      "Our Server package represents the pinnacle of dedicated hosting, designed for organizations requiring exceptional performance, redundancy, and support. Ideal for: Large-scale applications, high-traffic websites, enterprise databases, big data processing, and mission-critical workloads",
    category: {
      id: PRODUCT_CATEGORIES.BARE,
      name: PRODUCT_CATEGORIES.BARE,
    },
    tiers: [
      {
        title: "Essential",
        href: "/products/bare-metal",
        headline: "Perfect for Growing Businesses and Development Teams",
        price: {
          nigeria: 180000,
          international: 120,
          hourly: {
            nigeria: 246.58,
            international: 0.16438,
          },
        },
        buttonText: "Get Started",
        popular: false,
        inverse: true,
        free: false,
        features: [
          "12 x 240 GB SSD",
          "4 cores / 8 threads @ 3.8GHz",
          "32 GB RAM",
          "5 TB Bandwidth",
          "10 Gbps Network",
        ],
      },
      {
        title: "Professional",
        href: "/products/bare-metal",
        headline: "Engineered for High-Performance Applications",
        price: {
          nigeria: 277500,
          international: 185,
          hourly: {
            nigeria: 380.14,
            international: 0.25342,
          },
        },
        buttonText: "Get Started",
        popular: false,
        inverse: false,
        free: false,
        features: [
          "2 x 960 GB SSD",
          "6 cores / 12 threads @ 4GHz",
          "32 GB RAM",
          "10 TB Bandwidth",
          "10 Gbps Network",
        ],
      },
      {
        title: "Enterprise",
        href: "/products/bare-metal",
        headline: "Ultimate Performance for Mission-Critical Operations",
        price: {
          nigeria: 525000,
          international: 350,
          hourly: {
            nigeria: 719.18,
            international: 0.47945,
          },
        },
        buttonText: "Get Started",
        popular: true,
        inverse: false,
        free: false,
        features: [
          "2 x 1.92 TB NVMe",
          "8 cores / 16 threads @ 3.2GHz",
          "128 GB RAM",
          "10 TB Bandwidth",
          "10 Gbps Network",
        ],
      },
    ],
  },
  {
    type: "direct",
    description:
      "From beginner to enterprise scale, we've got you covered. Start your journey at just $1/month with the basics you need, level up with enhanced features for growing businesses. Ideal for everything from personal blogs and portfolios to high-traffic enterprise applications.",
    category: {
      id: PRODUCT_CATEGORIES.WEBHOSTING,
      name: PRODUCT_CATEGORIES.WEBHOSTING,
    },
    tiers: [
      {
        title: "Regular",
        href: "/products/web-hosting",
        headline: "Everything you need to create your website.",
        price: {
          nigeria: 1500,
          international: 1,
          hourly: {
            nigeria: 2.05,
            international: 0.00137,
          },
        },
        buttonText: "Get Started",
        popular: false,
        inverse: true,
        free: false,
        features: [
          "100 GB SSD storage",
          "Control panel",
          "Unlimited free SSL",
          "Unlimited bandwidth",
          "99.9% uptime guarantee",
          "24/7 support",
        ],
      },
      {
        title: "Premium",
        href: "/products/web-hosting",
        headline: "Level up with more power and enhanced features.",
        price: {
          nigeria: 6000,
          international: 4,
          hourly: {
            nigeria: 8.22,
            international: 0.00548,
          },
        },
        buttonText: "Get Started",
        popular: false,
        inverse: false,
        free: false,
        features: [
          "100 GB SSD storage",
          "Control panel",
          "Unlimited free SSL",
          "Unlimited bandwidth",
          "99.9% uptime guarantee",
          "24/7 support",
        ],
      },
      {
        title: "Enterprise",
        href: "/products/web-hosting",
        headline: "Enjoy the ultimate in web hosting performance.",
        price: {
          nigeria: 12000,
          international: 8,
          hourly: {
            nigeria: 16.44,
            international: 0.01096,
          },
        },
        buttonText: "Get Started",
        popular: true,
        inverse: false,
        free: false,
        features: [
          "100 GB SSD storage",
          "Control panel",
          "Unlimited free SSL",
          "Unlimited bandwidth",
          "99.9% uptime guarantee",
          "24/7 support",
        ],
      },
    ],
  },
]

const SOCIAL_LINKS = {
  instagram: "",
  x: "",
  facebook: "",
  youtube: "",
}

export type SiteConfig = typeof siteConfig
export type MainNav = typeof siteConfig.mainNav

export const siteConfig = {
  title: "Afia TV",
  description:
    "Celebrating the Heart of the East. Experience our vibrant traditions, stories, and entertainment.",
  url: "https://afiatv.net",
  ogImage: "https://afiatv.net/opengraph-image.png",
  links: SOCIAL_LINKS,
  mainNav: [

    {
      title: "News",
      href: "/",
      external: false,
      disabled: false,
    },
    {
      title: "South East",
      href: "/",
      external: false,
      disabled: false,
    },
    {
      title: "Politics",
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
          href: "/",
          external: false,
        },
        {
          title: "South East",
          href: "/",
          external: false,
        },
        {
          title: "Politics",
          href: "/",
          external: false,
        },
        {
          title: "Entertainment",
          href: "/",
          external: false,
        },
        {
          title: "Sports",
          href: "/",
          external: false,
        },
        {
          title: "Audio",
          href: "/",
          external: false,
        },
      ],
    },
    {
      title: "Brands",
      items: [
        {
          title: "Afia Radio",
          href: "/",
          external: false,
        },
        {
          title: "Afia Cinema",
          href: "/",
          external: false,
        },
        {
          title: "Obuzo",
          href: "/",
          external: false,
        },
        {
          title: "MSS",
          href: "/",
          external: false,
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          title: "Our History",
          href: "/",
          external: false,
        },
        {
          title: "Careers",
          href: "/",
          external: false,
        },
        {
          title: "Team",
          href: "/",
          external: false,
        },
      ],
    },
    {
      title: "Contact",
      items: [
        {
          title: "Help center",
          href: "/",
          external: false,
        },
        {
          title: "Contact us",
          href: "/",
          external: false,
        },
        {
          title: "Advertise with us",
          href: "/",
          external: false,
        },
      ],
    },
  ],
}
