// src/data/ProductsData.ts
import { Product } from "../types/Product";

import img1 from "../images/img1.webp";
import optenix_4k_AI_ptz from "../images/optenix_4k_ptz_camera.jpeg";
import hollyland_lark_m2s from "../images/hollyland_lark_m2s.jpg";
import Senheiser_XSW1_ME3_A from "../images/Sennheiser_XSW 1_ME3_A.jpg";
import Digitek_DWM_108 from "../images/Digitek_DWM_108.jpg";
import Interactive_flat_panel from "../images/interactive_flat_panel.png";
import Iphone from "../images/iphone_17_pro_max.webp";

/**
 * Base (read-only) products
 */
export const baseProducts: Product[] = [
  {
    id: "base-1",
    name: "Optenix Wireless Smart Device",
    image: img1,
    images: [img1],
    price: 4999,
    originalPrice: 7000,
    rating: 4.4,
    discount: "18% off",
    description: "Advanced wireless smart device for classrooms.",
    specifications: [
      "Wireless Connectivity",
      "AI Noise Cancellation",
      "Battery Life: 12 Hours",
      "Compatible with Android & Windows",
    ],
  },
  {
    id: "base-2",
    name: "Optenix 4k AI PTZ Camera",
    image: optenix_4k_AI_ptz,
    images: [optenix_4k_AI_ptz],
    price: 2999,
    originalPrice: 6000,
    rating: 4.3,
    discount: "18% off",
    description: "Advanced wireless smart device for classrooms.",
    specifications: [
      "Wireless Connectivity",
      "AI Noise Cancellation",
      "Battery Life: 12 Hours",
      "Compatible with Android & Windows",
    ],
  },

  {
    id: "base-3",
    name: "Hollyland Lark M2S Wireless Microphone",
    image: hollyland_lark_m2s,
    images: [hollyland_lark_m2s],
    price: 27990,
    originalPrice: 13159,
    rating: 4.3,
    discount: "18% off",
    description:
      "Hollyland Lark M2S Ultimate Combo Wireless Lavalier Mic for iPhone/Camera/Android/PC",
    specifications: [
      "Brand: HollyView",
      "Model: LARK M2S",
      "Connectivity: 2.4GHz Wireless",
      "Range: 300m",
    ],
  },

  {
    id: "base-4",
    name: "Sennheiser XSW 1-ME3-A Wireless Headset Microphone",
    image: Senheiser_XSW1_ME3_A,
    images: [Senheiser_XSW1_ME3_A],
    price: 34900,
    originalPrice: 27500,
    rating: 4.3,
    discount: "18% off",
    description:
      "Sennheiser wireless headset system for stage & fitness use.",
    specifications: [
      "Brand: Sennheiser",
      "Connectivity: UHF",
      "Connector: XLR",
      "Feature: Wireless",
    ],
  },

  {
    id: "base-5",
    name: "Digitek DWM-108 Wireless Microphone",
    image: Digitek_DWM_108,
    images: [Digitek_DWM_108],
    price: 2999,
    originalPrice: 3499,
    rating: 4.2,
    discount: "18% off",
    description:
      "Digitek 2-in-1 wireless mic system with noise cancellation.",
    specifications: [
      "Brand: Digitek",
      "Model: DWM 108",
      "Connectivity: Bluetooth",
      "Connector: USB-C",
    ],
  },

  {
    id: "base-6",
    name: "Optenix Interactive Flat Panel 65 Inch",
    image: Interactive_flat_panel,
    images: [Interactive_flat_panel],
    price: 109999,
    originalPrice: 98000,
    rating: 4.4,
    discount: "18% off",
    description: "Optenix 65 inch Interactive Flat Panel.",
    specifications: [
      "Resolution: 4K UHD",
      "OS: Android 13",
      "RAM: 8 GB",
      "Storage: 128 GB",
      "Brightness: 400 nits",
    ],
  },

  {
    id: "base-7",
    name: "iPhone 16",
    image: Iphone,
    images: [Iphone],
    price: 1,
    originalPrice: 98000,
    rating: 4.4,
    discount: "18% off",
    description: "Demo iPhone product.",
    specifications: ["Demo Product"],
  },
];
