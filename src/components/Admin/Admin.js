// src/components/Admin/Admin.js
import React, { useState, useEffect } from "react";
import { database, storage } from "../../firebase";
import { ref as dbRef, push, onValue, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Admin.css";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageURL: "",   // <-- store image URL instead of file
    category: "Watches", // Default category
    imageFile: null // For file upload
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState("url"); // "url" or "file"

  // Fetch existing products
  useEffect(() => {
    const productsRef = dbRef(database, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        setProducts(list);
      } else {
        setProducts([]);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile" && files) {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileUpload = async (file) => {
    const fileRef = storageRef(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price || !form.category) {
      alert("Name, description, price, and category are required!");
      return;
    }

    if (uploadMethod === "url" && !form.imageURL) {
      alert("Image URL is required!");
      return;
    }

    if (uploadMethod === "file" && !form.imageFile) {
      alert("Please select an image file!");
      return;
    }

    setLoading(true);
    try {
      let imageURL = form.imageURL;

      if (uploadMethod === "file" && form.imageFile) {
        imageURL = await handleFileUpload(form.imageFile);
      }

      if (editingProduct) {
        // Update existing product
        await update(dbRef(database, `products/${editingProduct.id}`), {
          name: form.name,
          description: form.description,
          price: form.price,
          image: imageURL,
          category: form.category
        });
        setEditingProduct(null);
        alert("Product updated successfully!");
      } else {
        // Add new product
        await push(dbRef(database, "products"), {
          name: form.name,
          description: form.description,
          price: form.price,
          image: imageURL,
          category: form.category
        });
        alert("Product added successfully!");
      }
      setForm({ name: "", description: "", price: "", imageURL: "", category: "Watches", imageFile: null });
      setUploadMethod("url");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Check console.");
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imageURL: product.image,
      category: product.category || "Watches"
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", imageURL: "", category: "Watches" });
  };

  const handleDelete = async (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // No need to delete from Firebase Storage (since we only save URLs)
        await remove(dbRef(database, `products/${product.id}`));
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3>{editingProduct ? "Edit Product" : "Add New Jewelry"}</h3>
          {editingProduct && (
            <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
          required
        />
        <div className="upload-method-selector">
          <label>
            <input
              type="radio"
              name="uploadMethod"
              value="url"
              checked={uploadMethod === "url"}
              onChange={(e) => setUploadMethod(e.target.value)}
            />
            Image URL
          </label>
          <label>
            <input
              type="radio"
              name="uploadMethod"
              value="file"
              checked={uploadMethod === "file"}
              onChange={(e) => setUploadMethod(e.target.value)}
            />
            Upload File
          </label>
        </div>

        {uploadMethod === "url" ? (
          <input
            type="text"
            name="imageURL"
            placeholder="Image URL"
            value={form.imageURL}
            onChange={handleChange}
            required
          />
        ) : (
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            required
          />
        )}

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="Watches">🕰 Watches</option>
          <option value="jewellery">⚜ Jewelry</option>
          <option value="Accessories">👜 Accessories</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h3>Existing Products</h3>
      <div className="product-grid-admin">
        {products.map((product) => (
          <div className="product-card-admin" key={product.id}>
            <img src={product.image || "/images/placeholder.png"} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <div className="product-category">{product.category || "Uncategorized"}</div>
            <div className="product-price">₹{product.price}</div>
            <div className="product-actions">
              <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(product)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
