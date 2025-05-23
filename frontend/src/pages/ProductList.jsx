import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/productService';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      console.log('Produits reçus:', data); // DEBUG
      setProducts(data);
    } catch {
      setError('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch {
      setError('Erreur lors de la suppression');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg">🛒 Produits</h1>
          <Link to="/products/new" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg font-semibold text-lg transition-all">Ajouter</Link>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
              <tr>
                <th className="product-th">Nom</th>
                <th className="product-th">Catégorie</th>
                <th className="product-th">Prix</th>
                <th className="product-th">Stock</th>
                <th className="product-th">Description</th>
                <th className="product-th">Image</th>
                <th className="product-th text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-400 text-xl">Aucun produit trouvé.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-blue-50 transition-all group">
                    <td className="product-td font-semibold text-gray-900 text-lg group-hover:text-blue-700">{product.name || '—'}</td>
                    <td className="product-td">{product.category || '—'}</td>
                    <td className="product-td">{product.price !== undefined ? product.price + ' €' : '—'}</td>
                    <td className="product-td">{product.stock !== undefined ? product.stock : '—'}</td>
                    <td className="product-td max-w-xs truncate" title={product.description}>{product.description || '—'}</td>
                    <td className="product-td">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="h-16 w-16 object-cover rounded-xl shadow border border-gray-200" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="product-td flex gap-3 justify-center">
                      <Link to={`/products/${product._id}/edit`} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow font-semibold transition-all">Modifier</Link>
                      <button onClick={() => handleDelete(product._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow font-semibold transition-all">Supprimer</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
