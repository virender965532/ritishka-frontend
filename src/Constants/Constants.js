export const NAVBAR_LINKS = [
  {
    label: "Shop Now",
    to: "/shop"
  },
  {
    label: "Categories",
    isDropdown: true, // children will be set dynamically in Navbar
    children: [] // leave empty, will be filled in Navbar
  },
  {
    label: "Blog",
    to: "/blog"
  },
  {
    label: "About",
    to: "/about"
  },
  {
    label: "Contact",
    to: "/contact"
  }
];

export const HERO_PRODUCTS = [
  {
    name: "T-Shirt",
    title: "Summer Sale Stylish",
    subtitle: "Limited Time Offer - Up to 60% off & Free Shipping",
    modelPath: "/shirt_baked_2.glb",
    defaultColor: "#353933",
    colors: [
      "#353933",
      "#EFBD4E",
      "#726DE7",
      "red",
      "#2a9d8f",
      "#e76f51"
    ],
    link: "/shop"
  },
  {
    name: "Sweatshirt",
    title: "Winter Collection",
    subtitle: "Stay Warm - Up to 40% off",
    modelPath: "/shirt_baked_2.glb",
    defaultColor: "#726DE7",
    colors: [
      "#726DE7",
      "#353933",
      "#EFBD4E",
      "#e76f51"
    ],
    link: "/shop"
  },
  // Add more products as needed
];

export const DYNAMIC_CARDS_DATA = [
  {
    alt: "Twenty One Jewels",
    link: "/jewelry/brand-twenty%20one%20jewels",
    img: "https://cdn.eternz.com/banner/Artboard6(17)1747029747327.jpg",
    type: "main"
  },
  {
    alt: "Rare Ever",
    link: "/jewelry/brand-rare%20ever",
    img: "https://cdn.eternz.com/banner/Artboard4(20)1747028608967.jpg",
    type: "side"
  },
  {
    alt: "Tora",
    link: "/jewelry/brand-tora",
    img: "https://cdn.eternz.com/banner/Artboard3(20)1747028629763.jpg",
    type: "side"
  },
  {
    alt: "Upakarna",
    link: "/jewelry/brand-upakarna",
    img: "https://cdn.eternz.com/banner/Artboard2(25)1747028653101.jpg",
    type: "side"
  },
  {
    alt: "Tuvisha",
    link: "/jewelry/brand-tuvisha",
    img: "https://cdn.eternz.com/banner/Artboard1(38)1747028702815.jpg",
    type: "side"
  }
];

export const BANNER_DATA = [
  {
    price: "Starting At $19",
    title: "Women's T-shirts",
    link: "/shop",
  },
  {
    price: "Starting At $39",
    title: "Men's Sportswear",
    link: "/shop",
  }
];