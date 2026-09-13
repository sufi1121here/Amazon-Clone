import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import productsData from '../../data/products.json';
import '../../styles/global.css';

function Home() {
  const { searchTerm, category } = useSelector((state) => state.search);

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-msg">
          <p>
            You are on amazon.com. You can also shop on Amazon Pakistan for millions of products with fast local delivery. <a href="#">Click here to go amazon.pk</a>
          </p>
        </div>
      </div>
      
      <div className="shop">
        {filteredProducts.length === 0 ? (
          <div style={{ padding: '40px', width: '100%', textAlign: 'center', fontSize: '1.2rem', color: '#565959' }}>
            No products found matching your search.
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
