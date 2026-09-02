import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import productsData from '../../data/products.json';
import '../../styles/global.css';

function Home() {
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
        {productsData.map(product => (
          <ProductCard 
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
