import { useEffect, useState } from "react";
import { getAllProducts, saveAdminProducts } from "../utils/productStore";
import { Product } from "../types/Product";

const emptyProduct: Product = {
  name: "",
  image: "",
  images: [],
  price: 0,
  originalPrice: 0,
  rating: 0,
  discount: "",
  description: "",
  specifications: [],
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ---------------- LOAD PRODUCTS ---------------- */
  useEffect(() => {
    setProducts(getAllProducts());
  }, []);

  /* ---------------- IMAGE → BASE64 ---------------- */
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleMainImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return;
    const base64 = await fileToBase64(e.target.files[0]);
    setForm(prev => ({ ...prev, image: base64 }));
  };

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const base64Images = await Promise.all(
      Array.from(e.target.files).map(fileToBase64)
    );
    setForm(prev => ({ ...prev, images: base64Images }));
  };

  /* ---------------- FORM HANDLING ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "specifications") {
      setForm(prev => ({ ...prev, specifications: value.split(",") }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  /* ---------------- CRUD ---------------- */
  const addProduct = () => {
    const newProduct: Product = {
      ...form,
      id: "admin-" + Date.now(),
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    saveAdminProducts(updated.filter(p => !p.id?.startsWith("base-")));
    resetForm();
  };

  const updateProduct = () => {
    if (!editingId) return;

    const updated = products.map(p =>
      p.id === editingId ? { ...form, id: editingId } : p
    );

    setProducts(updated);
    saveAdminProducts(updated.filter(p => !p.id?.startsWith("base-")));
    resetForm();
  };

  const deleteProduct = (id?: string) => {
    if (!id) return;
    if (id.startsWith("base-")) return;

    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveAdminProducts(updated.filter(p => !p.id?.startsWith("base-")));
  };

  const startEdit = (product: Product) => {
    if (!product.id) return;
    if (product.id.startsWith("base-")) return;

    setEditingId(product.id);
    setForm(product);
  };

  const resetForm = () => {
    setForm(emptyProduct);
    setEditingId(null);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product name"
          className="border p-2"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="number"
          name="originalPrice"
          value={form.originalPrice}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="discount"
          value={form.discount}
          onChange={handleChange}
          className="border p-2"
        />

        {/* IMAGE INPUTS */}
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
          className="border p-2 col-span-2"
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
          className="border p-2 col-span-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 col-span-2"
          placeholder="Description"
        />

        <textarea
          name="specifications"
          value={form.specifications.join(",")}
          onChange={handleChange}
          className="border p-2 col-span-2"
          placeholder="Specifications (comma separated)"
        />

        <button
          onClick={editingId ? updateProduct : addProduct}
          className="bg-blue-600 text-white py-2 col-span-2 rounded"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* LIST */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id ?? p.name}>
              <td className="border p-2">
                {p.image && <img src={p.image} className="h-12" />}
              </td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">₹{p.price}</td>
              <td className="border p-2 space-x-2">
                {!p.id?.startsWith("base-") && (
                  <>
                    <button
                      onClick={() => startEdit(p)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
