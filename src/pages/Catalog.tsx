import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import { getProducts, Product } from '@/lib/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { addToCart } from '@/lib/user';
import { useToast } from '@/components/ToastContainer';
import ProductModal from '@/components/ProductModal';
import Navbar from '@/components/Navbar';
import { useLocation } from 'react-router-dom';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    color: '',
    sortBy: 'newest',
    stockStatus: ''
  });
  const { user, refreshCart, addToLocalCart } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Bold vibe Oversize Tshirt',
      description: 'Luxury cotton t-shirt with premium finish and exceptional comfort. Made from 100% organic cotton.',
      price: 696.00,
      imageURL: 'Raritone Collection/Bold vibe Oversize Tshirt.jpg',
      category: 'Tops',
      stock: 10,
      tags: ['Cotton', 'Premium', 'Casual'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Raritone Hoodie',
      description: 'Raritone Hoodie from Theraritone. Crafted from premium materials, this hoodie ensures warmth and durability while offering a modern, minimalist design perfect for any wardrobe.',
      price: 1043.13,
      imageURL: 'Raritone Collection/Hoddie1(F).jpg',
      backImageURL: 'Raritone Collection/Hoddie1(B).jpg',
      category: 'Outerwear',
      stock: 5,
      tags: ['Hoddie', 'designer', 'Cozy'],
      sizes: ['28', '30', '32', '34', '36'],
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'Kiss me again Oversize Tshirt',
      description: 'Its soft, premium fabric ensures lasting wear, while the chic, modern design adds a touch of effortless cool.',
      price: 399.20,
      imageURL: 'Raritone Collection/Kiss me again.jpeg',
      category: 'Tops',
      stock: 8,
      tags: ['Tshirt', 'luxury', 'comfort'],
      sizes: ['S', 'M', 'L', 'XL'],
      createdAt: new Date()
    },
    {
      id: '4',
      name: 'Pop Art tshirt',
      description: 'This wearable masterpiece showcases bold, colorful graphics that pay homage to the iconic Pop Art movement, making it a statement piece in any wardrobe. Designed for art enthusiasts and style-savvy individuals, it embodies the values of creativity and individuality we cherish at Theraritone. ',
      price: 434.13,
      imageURL: 'https://static.wixstatic.com/media/3903b5_4fde7750734f4f188841c462d77d27bb~mv2.jpg/v1/fill/w_500,h_667,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3903b5_4fde7750734f4f188841c462d77d27bb~mv2.jpg',
      category: 'Tops',
      stock: 0,
      tags: ['Tshirt', 'luxury', 'comfort'],
      sizes: ['XS', 'S', 'M', 'L'],
      createdAt: new Date()
    },
    {
      id: '5',
      name: 'Raritone David Bowie Hooodie',
      description: `Celebrate the legacy of a music legend with the Raritone David Bowie Hoodie, designed exclusively for the discerning fan at Theraritone. Crafted from premium materials, this hoodie showcases Bowie's iconic style while ensuring unparalleled comfort and durability.`,
      price: 7999,
      imageURL: 'https://static.wixstatic.com/media/3903b5_9e76791087d8471da8745d15ce88f383~mv2.jpg/v1/fill/w_346,h_490,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3903b5_9e76791087d8471da8745d15ce88f383~mv2.jpg',
      backImageURL: 'https://static.wixstatic.com/media/3903b5_d1930f8ee63542d0a3d165512779be61~mv2.jpg/v1/fill/w_348,h_490,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3903b5_d1930f8ee63542d0a3d165512779be61~mv2.jpg',
      category: 'Outerwear',
      stock: 4,
      tags: ['leather', 'jacket', 'premium'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Brown'],
      createdAt: new Date()
    },
  ];

  useEffect(() => {
    loadProducts();
    loadWishlist();

    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [products, filters, searchQuery]);

  const loadProducts = async () => {
    setProducts(mockProducts);
  };

  const loadWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.stockStatus === 'inStock') {
      filtered = filtered.filter(product => product.stock > 0);
    } else if (filters.stockStatus === 'outOfStock') {
      filtered = filtered.filter(product => product.stock === 0);
    }

    if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sortBy === 'priceLow') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'priceHigh') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'popular') {
      filtered.sort((a, b) => b.stock - a.stock);
    }

    setFilteredProducts(filtered);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = async (product: Product, quantity: number, size?: string, color?: string) => {
    const cartItem = {
      id: product.id!,
      name: product.name,
      price: product.price,
      quantity,
      size,
      imageURL: product.imageURL
    };

    if (user) {
      try {
        await addToCart(user.uid, cartItem);
        await refreshCart();
        showToast({
          type: 'success',
          title: 'Added to Cart',
          message: `${product.name} has been added to your cart!`
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to add item to cart. Please try again.'
        });
      }
    } else {
      addToLocalCart(cartItem);
      showToast({
        type: 'success',
        title: 'Added to Cart',
        message: `${product.name} has been added to your cart!`
      });
    }
  };

  const addToWishlist = (productId: string) => {
    const currentWishlist = [...wishlist];
    if (!currentWishlist.includes(productId)) {
      currentWishlist.push(productId);
      setWishlist(currentWishlist);
      localStorage.setItem('wishlist', JSON.stringify(currentWishlist));

      window.dispatchEvent(new Event('wishlistUpdated'));

      showToast({
        type: 'success',
        title: 'Added to Wishlist',
        message: 'Item has been saved to your wishlist!'
      });
    } else {
      const updatedWishlist = currentWishlist.filter(id => id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

      window.dispatchEvent(new Event('wishlistUpdated'));

      showToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: 'Item has been removed from your wishlist.'
      });
    }
  };

  const quickAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();

    if (product.stock === 0) {
      showToast({
        type: 'warning',
        title: 'Out of Stock',
        message: 'This item is currently out of stock.'
      });
      return;
    }

    if ((product.sizes && product.sizes.length > 0) || (product.colors && product.colors.length > 0)) {
      handleProductClick(product);
      return;
    }

    handleAddToCart(product, 1);
  };

  return (
    <div className="light-page">
      <Navbar
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Fashion Catalog"
        showBackButton={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="light-page-header">Fashion Catalog</h1>
          <p className="light-page-text">Discover our curated collection of premium fashion pieces</p>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="light-card mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--page-text-muted)' }} size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="light-input w-full pl-10"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="light-input"
            >
              <option value="">All Categories</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Dresses">Dresses</option>
              <option value="Footwear">Footwear</option>
            </select>

            {/* Stock Status Filter */}
            <select
              value={filters.stockStatus}
              onChange={(e) => setFilters({ ...filters, stockStatus: e.target.value })}
              className="light-input"
            >
              <option value="">All Stock</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>

            {/* Size Filter */}
            <select
              value={filters.size}
              onChange={(e) => setFilters({ ...filters, size: e.target.value })}
              className="light-input"
            >
              <option value="">All Sizes</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="light-input"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="light-page-text">
            Showing <span className="font-semibold" style={{ color: 'var(--page-text-primary)' }}>{filteredProducts.length}</span> of <span className="font-semibold" style={{ color: 'var(--page-text-primary)' }}>{products.length}</span> products
            {filters.category && (
              <span className="ml-2 font-medium" style={{ color: 'var(--page-text-secondary)' }}>
                in {filters.category}
              </span>
            )}
          </p>
        </div>

        {/* Product Grid with Proper Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="light-card-ivory overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
              onClick={() => handleProductClick(product)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ padding: '0' }}
            >
              {/* Image Container with Fixed Aspect Ratio */}
              <div className="w-full aspect-[3/4] overflow-hidden relative">
                <motion.img
                  src={hoveredProduct === product.id && product.backImageURL ? product.backImageURL : product.imageURL}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Out of Stock Overlay */}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="badge-error text-sm font-semibold px-4 py-2">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Wishlist Heart */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product.id!);
                    }}
                    className={`w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center ${wishlist.includes(product.id!)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/90 text-gray-700 hover:bg-white'
                      }`}
                    style={{
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Heart
                      size={18}
                      className={wishlist.includes(product.id!) ? 'fill-current' : ''}
                    />
                  </motion.button>

                  {/* Quick Add to Cart */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => quickAddToCart(e, product)}
                    disabled={product.stock === 0}
                    className="w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed btn-primary"
                    style={{
                      padding: '0',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    <ShoppingBag size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold mb-1 text-base truncate" style={{ color: 'var(--page-text-primary)' }}>
                  {product.name}
                </h3>
                <p className="text-sm light-page-text mb-3">{product.category}</p>

                <div className="flex items-center justify-between mb-3">
                  <p className="text-lg font-bold" style={{ color: 'var(--page-text-primary)' }}>
                    ₹{product.price.toFixed(2)}
                  </p>
                  {product.stock > 0 ? (
                    <span className="badge-success text-xs">
                      In Stock
                    </span>
                  ) : (
                    <span className="badge-error text-xs">
                      Out of Stock
                    </span>
                  )}
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          background: 'var(--page-bg)',
                          color: 'var(--page-text-muted)',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="light-page-text text-lg mb-4">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  category: '',
                  size: '',
                  color: '',
                  sortBy: 'newest',
                  stockStatus: ''
                });
              }}
              className="btn-primary px-6 py-3"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToWishlist={addToWishlist}
      />
    </div>
  );
};

export default Catalog;
