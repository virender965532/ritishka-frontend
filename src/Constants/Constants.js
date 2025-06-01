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

export const HERO_PRODUCT = {
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
};