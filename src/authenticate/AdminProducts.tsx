import { useEffect, useState } from "react";
import { products as initialProducts, Product } from "../data/ProductsData";
import { useNavigate } from "react-router-dom";

// 🔐 SIMPLE ADMIN AUTH CHECK (you can replace with real login later)
const isAdminLoggedIn = () => {
  return localStorage.getItem("isAdmin") === "true";
};

export default function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    image: "",
    images: [],
    price: 0,
    originalPrice: 0,
    rating: 0,
    discount: "",
    description: "",
    specifications: [],
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  // 🔐 Protect Admin Page
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      alert("Access denied! Admin only.");
      navigate("/login");
    }
  }, [navigate]);

  // Load products from localStorage or default
  useEffect(() => {
    const saved = localStorage.getItem("adminProducts");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(initialProducts);
      localStorage.setItem("adminProducts", JSON.stringify(initialProducts));
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("adminProducts", JSON.stringify(newProducts));
  };

  // Handle input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "specifications") {
      setFormData({ ...formData, specifications: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add or Update Product
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (editingId) {
      // Update
      const updated = products.map((p) =>
        p.id === editingId ? { ...formData, id: editingId } : p
      );
      saveProducts(updated);
      setEditingId(null);
    } else {
      // Add new
      const newProduct = { ...formData, id: Date.now().toString() };
      const updated = [...products, newProduct];
      saveProducts(updated);
    }

    // Reset form
    setFormData({
      id: "",
      name: "",
      image: "",
      images: [],
      price: 0,
      originalPrice: 0,
      rating: 0,
      discount: "",
      description: "",
      specifications: [],
    });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this product?")) return;

    const filtered = products.filter((p) => p.id !== id);
    saveProducts(filtered);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Product Panel</h1>

      {/* 🔹 ADD / EDIT FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="border p-2" required />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Main Image URL" className="border p-2" />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2" />
        <input name="originalPrice" type="number" value={formData.originalPrice} onChange={handleChange} placeholder="Original Price" className="border p-2" />
        <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} placeholder="Rating" className="border p-2" />
        <input name="discount" value={formData.discount} onChange={handleChange} placeholder="Discount" className="border p-2" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 col-span-2" />
        <textarea name="specifications" value={formData.specifications.join(",")} onChange={handleChange} placeholder="Specifications (comma separated)" className="border p-2 col-span-2" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* 🔹 PRODUCT LIST */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">₹{p.price}</td>
              <td className="border p-2">{p.rating}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
