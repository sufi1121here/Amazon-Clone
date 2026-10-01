import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
