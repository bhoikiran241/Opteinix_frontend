import img1 from "../images/img1.webp";
import optenix_4k_AI_ptz from "../images/optenix_4k_ptz_camera.jpeg";
import hollyland_lark_m2s from "../images/hollyland_lark_m2s.jpg";
import Senheiser_XSW1_ME3_A from "../images/Sennheiser_XSW 1_ME3_A.jpg";
import Digitek_DWM_108 from "../images/Digitek_DWM_108.jpg";
import Interactive_flat_panel from "../images/interactive_flat_panel.png";
import Iphone from "../images/iphone_17_pro_max.webp";

export type Product = { 
  id: string;
  name: string;
  image: string;
  images: string[]; // 🔥 multiple similar images
  price: number;
  originalPrice?: number; // base price (without GST) linethrough
  rating: number;
  discount?: string;
  description: string;
  specifications: string[]; // 🔥 product specifications
};

export const products: Product[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
    name: "Hollyland Lark M2S Wireless Microphone",
    image: hollyland_lark_m2s,
    images: [hollyland_lark_m2s],
    price: 27990,
    originalPrice: 13159,
    rating: 4.3,
    discount: "18% off",
    description:
      "Hollyland Lark M2S Ultimate Combo Wireless Lavalier Mic for iPhone/Camera/Android/PC, 7g Titanium Clip Mic with 3-Lv Noise Cancel, 300m Range for YouTube Podcast Vlog(Camera RX+USB-C RX+Lightning RX)",
    specifications: [
      "Brand: HollyView",
      "Model Name:	LARK M2S Ultimate Combo",
      "Connectivity Technology:	2.4GHz Wireless",
      "Connector Type: 	3.5 mm Jack, USB Type-C, Lightning",
    ],
  },

  {
    id: "4",
    name: "Sennheiser XSW 1‑ME3‑A Wireless Headset Microphone System",
    image: Senheiser_XSW1_ME3_A,
    images: [Senheiser_XSW1_ME3_A],
    price: 34900,
    originalPrice: 27500,
    rating: 4.3,
    discount: "18% off",
    description:
      "Sennheiser XSW 1‑ME3‑A Wireless Headset Microphone System | ME 3 Cardioid Headset | True Diversity Receiver | 10 Compatible Channels | Ideal for Fitness Instructors, Stage Performers & Presentations",
    specifications: [
      "Brand:	Sennheiser",
      "Connectivity Technology:	UHF",
      "Connector Type:	XLR",
      "Special Feature:	Wireless",
    ],
  },

  {
    id: "5",
    name: "Digitek® DWM-108 2-in-1 Wireless Microphone System",
    image: Digitek_DWM_108,
    images: [Digitek_DWM_108],
    price: 2999,
    originalPrice: 3499,
    rating: 4.2,
    discount: "18% off",
    description:
      "Digitek® DWM-108 2-in-1 Wireless Microphone System 2402-2480 MHz, 360° Sound Capture, 50m Range, 10Hr Battery, Noise Cancellation, for DSLR, Android, iOS, Laptops",
    specifications: [
      "Brand:	Digitek",
      "Model Name:	DWM 108",
      "Connectivity Technology:	Bluetooth",
      "Connector Type:	USB Type-C",
    ],
  },

  {
    id: "6",
    name: "75 Inch Optenix Interactive Flat Panel S65 (65 inch)",
    image: Interactive_flat_panel,
    images: [Interactive_flat_panel],
    price: 109999,
    originalPrice: 98000,
    rating: 4.4,
    discount: "18% off",
    description: "75 Inch Optenix Interactive Flat Panel S65 (65 inch)",
    specifications: [
      "Diagonal Size: 65 inch",
      "Backlight Life (typ.): ≥ 50,000 Hours",
      "Resolution: 3840 × 2160 (4K UHD)",
      "Contrast Ratio (Typ.): 1,200 : 1",
      "Contrast Ratio (Dynamic): 50,000 : 1",
      "Color Depth: 1.07B (10-bit)",
      "Color Gamut (typ.): 72% NTSC",
      "Color Accuracy: Delta E ≤ 2",
      "Eye Care: TÜV Low Blue Light, TÜV Flicker Free",
      "Panel Brightness: 400 nits",
      "Operating System: Android 13.0",
      "RAM: 8 GB",
      "ROM (Storage): 128 GB",
      "CPU: 2.0 GHz Quad-Core ARM A55",
      "GPU: Mali-G52 MP2",
      "Sound Channel: 2.0",
      "Power Output: 2 × 20W",
    ],
  },

  {
    id: "7",
    name: "75 Inch Optenix Interactive Flat Panel S75 (75 inch)",
    image: Interactive_flat_panel,
    images: [Interactive_flat_panel],
    price: 109999,
    originalPrice: 98000,
    rating: 4.4,
    discount: "18% off",
    description: "75 Inch Optenix Interactive Flat Panel S75 (75 inch)",
    specifications: [
      "Diagonal Size: 65 inch",
      "Backlight Life (typ.): ≥ 50,000 Hours",
      "Resolution: 3840 × 2160 (4K UHD)",
      "Contrast Ratio (Typ.): 1,200 : 1",
      "Contrast Ratio (Dynamic): 50,000 : 1",
      "Color Depth: 1.07B (10-bit)",
      "Color Gamut (typ.): 72% NTSC",
      "Color Accuracy: Delta E ≤ 2",
      "Eye Care: TÜV Low Blue Light, TÜV Flicker Free",
      "Panel Brightness: 400 nits",
      "Operating System: Android 13.0",
      "RAM: 8 GB",
      "ROM (Storage): 128 GB",
      "CPU: 2.0 GHz Quad-Core ARM A55",
      "GPU: Mali-G52 MP2",
      "Sound Channel: 2.0",
      "Power Output: 2 × 20W",
    ],
  },

  {
    id: "8",
    name: "75 Inch Optenix Interactive Flat Panel S86 (86 inch)",
    image: Interactive_flat_panel,
    images: [Interactive_flat_panel],
    price: 109999,
    originalPrice: 98000,
    rating: 4.4,
    discount: "18% off",
    description: "75 Inch Optenix Interactive Flat Panel S86 (86 inch)",
    specifications: [
      "Diagonal Size: 75 inch",
      "Backlight Life (typ.): ≥ 50,000 Hours",
      "Resolution: 3840 × 2160 (4K UHD)",
      "Contrast Ratio (Typ.): 1,200 : 1",
      "Contrast Ratio (Dynamic): 50,000 : 1",
      "Color Depth: 1.07B (10-bit)",
      "Color Gamut (typ.): 72% NTSC",
      "Color Accuracy: Delta E ≤ 2",
      "Eye Care: TÜV Low Blue Light, TÜV Flicker Free",
      "Panel Brightness: 400 nits",
      "Operating System: Android 13.0",
      "RAM: 8 GB",
      "ROM (Storage): 128 GB",
      "CPU: 2.0 GHz Quad-Core ARM A55",
      "GPU: Mali-G52 MP2",
      "Sound Channel: 2.0",
      "Power Output: 2 × 20W",
    ],
  },
  {
    id: "9",
    name: "iphone 16",
    image: Iphone,
    images: [Iphone],
    price: 1,
    originalPrice: 98000,
    rating: 4.4,
    discount: "18% off",
    description: "75 Inch Optenix Interactive Flat Panel S86 (86 inch)",
    specifications: [
      "Diagonal Size: 75 inch",
      "Backlight Life (typ.): ≥ 50,000 Hours",
      "Resolution: 3840 × 2160 (4K UHD)",
      "Contrast Ratio (Typ.): 1,200 : 1",
      "Contrast Ratio (Dynamic): 50,000 : 1",
      "Color Depth: 1.07B (10-bit)",
      "Color Gamut (typ.): 72% NTSC",
      "Color Accuracy: Delta E ≤ 2",
      "Eye Care: TÜV Low Blue Light, TÜV Flicker Free",
      "Panel Brightness: 400 nits",
      "Operating System: Android 13.0",
      "RAM: 8 GB",
      "ROM (Storage): 128 GB",
      "CPU: 2.0 GHz Quad-Core ARM A55",
      "GPU: Mali-G52 MP2",
      "Sound Channel: 2.0",
      "Power Output: 2 × 20W",
    ],
  },
];
