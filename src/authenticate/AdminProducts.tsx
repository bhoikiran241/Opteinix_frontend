import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { Product } from "../types/Product";
import { useAuth } from "../context/AuthContext";

export default function AdminProducts() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Product>({
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

  // 🔐 Admin protection
  useEffect(() => {
    if (!loading) {
      if (!user) {
        alert("Login required");
        navigate("/login");
      } else if (user.role !== "admin") {
        alert("Admin access only");
        navigate("/");
      }
    }
  }, [user, loading, navigate]);

  // 🔄 Load products
  useEffect(() => {
    if (user?.role === "admin") {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "specifications") {
      setFormData({ ...formData, specifications: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await API.put(`/products/${editingId}`, formData);
        setProducts(products.map((p) => (p._id === editingId ? res.data : p)));
        setEditingId(null);
      } else {
        const res = await API.post("/products", formData);
        setProducts([...products, res.data]);
      }
      resetForm();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Admin permission required");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product._id!);
    setFormData({
      name: product.name,
      image: product.image,
      images: product.images,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      discount: product.discount,
      description: product.description,
      specifications: product.specifications,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch {
      alert("Admin permission required");
    }
  };

  const resetForm = () => {
    setFormData({
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

  // 🔄 Loading state while auth restores
  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white p-4 shadow rounded mb-6"
      >
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2" required />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Main Image URL" className="border p-2" />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2" />
        <input name="originalPrice" type="number" value={formData.originalPrice} onChange={handleChange} placeholder="Original Price" className="border p-2" />
        <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} placeholder="Rating" className="border p-2" />
        <input name="discount" value={formData.discount} onChange={handleChange} placeholder="Discount" className="border p-2" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 col-span-2" />
        <textarea name="specifications" value={formData.specifications.join(",")} onChange={handleChange} placeholder="Specs (comma separated)" className="border p-2 col-span-2" />
        <button className="bg-blue-600 text-white py-2 col-span-2 rounded">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* TABLE */}
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
            <tr key={p._id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">₹{p.price}</td>
              <td className="border p-2">{p.rating}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(p._id!)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
