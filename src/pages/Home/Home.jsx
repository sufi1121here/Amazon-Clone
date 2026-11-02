import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../styles/global.css';

function Home() {
  const { searchTerm, category } = useSelector((state) => state.search);
  const productsData = useSelector((state) => state.products.items);

  const [sortBy, setSortBy] = useState('featured');
  const [primeOnly, setPrimeOnly] = useState(false);

  // Filter and sort products
  const displayedProducts = useMemo(() => {
    // 1. Filtering
    let list = productsData.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrime = primeOnly ? Boolean(product.isPrime) : true;
      return matchesCategory && matchesSearch && matchesPrime;
    });

    // 2. Sorting
    switch (sortBy) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return [...list].sort((a, b) => b.rating - a.rating);
      case 'discount-desc':
        return [...list].sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case 'newest':
        return [...list].reverse();
      case 'featured':
      default:
        return list;
    }
  }, [productsData, category, searchTerm, primeOnly, sortBy]);

  return (
    <div className="home">
      <div className="home-hero">
        <Carousel 
          autoPlay 
          infiniteLoop 
          showStatus={false} 
          showIndicators={false} 
          showThumbs={false} 
          interval={5000}
        >
          <div><img src="/images/ap1.jpg" alt="hero 1" /></div>
          <div><img src="/images/ap2.jpg" alt="hero 2" /></div>
          <div><img src="/images/ap3.jpg" alt="hero 3" /></div>
          <div><img src="/images/ap4.jpg" alt="hero 4" /></div>
          <div><img src="/images/ap5.jpg" alt="hero 5" /></div>
          <div><img src="/images/ap6.jpg" alt="hero 6" /></div>
        </Carousel>
      </div>

      {/* Product Filter & Sort Bar */}
      <div className="home-filter-bar">
        <div className="filter-summary">
          <span className="results-count">
            Showing <strong>{displayedProducts.length}</strong> of <strong>{productsData.length}</strong> products
          </span>
          {category !== 'All' && (
            <span className="active-filter-pill">
              Category: <strong>{category}</strong>
            </span>
          )}
          {searchTerm && (
            <span className="active-filter-pill">
              Search: <strong>"{searchTerm}"</strong>
            </span>
          )}
          {primeOnly && (
            <span className="active-filter-pill prime-pill">
              ✓prime only
            </span>
          )}
        </div>

        <div className="filter-actions">
          <label className="prime-toggle-label">
            <input 
              type="checkbox"
              checked={primeOnly}
              onChange={(e) => setPrimeOnly(e.target.checked)}
            />
            <span className="prime-text">✓prime</span>
          </label>

          <div className="sort-box">
            <label htmlFor="home-sort">Sort by:</label>
            <select
              id="home-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="home-sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Avg. Customer Review</option>
              <option value="discount-desc">Highest Discount</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="shop">
        {displayedProducts.length === 0 ? (
          <div style={{ padding: '60px 20px', width: '100%', textAlign: 'center', fontSize: '1.2rem', color: '#565959' }}>
            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '2rem', marginBottom: '15px', color: '#aaa', display: 'block' }}></i>
            No products found matching your current filters.
          </div>
        ) : (
          displayedProducts.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              rating={product.rating}
              discount={product.discount}
              isPrime={product.isPrime}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
