import { useParams, Link } from 'react-router-dom';
import './page.css';

function SinglePage({ sneakers }) {
  const { id } = useParams();
  const product = sneakers?.find(sneaker => sneaker.id === Number(id));

  // Agar mahsulot topilmasa
  if (!product) {
    return (
      <div className="not-found">
        <h2>😔 Mahsulot topilmadi</h2>
        <Link to="/" className="back-link">← Bosh sahifaga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="singleProduct">
      
      {/* Chap tomon: Rasmlar */}
      <div className="product-gallery">
        <div className="main-image">
          <img src={product.images[0]} alt={product.name} />
        </div>
        {product.images.length > 1 && (
          <div className="thumbnails">
            {product.images.slice(1).map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${product.name} - ${idx + 1}`}
                className="thumb"
              />
            ))}
          </div>
        )}
      </div>

      {/* O'ng tomon: Ma'lumotlar */}
      <div className="product-details">
        
        {/* Brend va Nom */}
        <div className="product-header">
          <span className="brand-badge">{product.brand}</span>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-meta">
            <span className="meta-item">📦 {product.category}</span>
            <span className="meta-item">👤 {product.gender}</span>
          </div>
        </div>

        {/* Narx */}
        <div className="product-price">
          {product.discount_price > 0 ? (
            <>
              <span className="old-price">{product.price} {product.currency}</span>
              <span className="new-price">{product.discount_price} {product.currency}</span>
              <span className="discount-percent">
                -{Math.round((1 - product.discount_price / product.price) * 100)}%
              </span>
            </>
          ) : (
            <span className="current-price">{product.price} {product.currency}</span>
          )}
        </div>

        {/* Tavsif */}
        <p className="product-description">{product.description}</p>

        {/* O'lchamlar */}
        <div className="product-section">
          <h3>O'lcham (CM)</h3>
          <div className="sizes-grid">
            {product.sizes.map((size, idx) => (
              <button 
                key={idx} 
                className={`size-btn ${size.stock === 0 ? '' : ''}`}
                disabled={size.stock === 0}
              >
                {size.cm} cm
                {/* {size.stock === 0 && <span className="out-stock">✕</span>} */}
              </button>
            ))}
          </div>
        </div>

        {/* Ranglar */}
        <div className="product-section">
          <h3>Ranglar</h3>
          <div className="colors-list">
            {product.colors.map((color, idx) => (
              <span key={idx} className="color-chip">{color}</span>
            ))}
          </div>
        </div>

        {/* Qo'shimcha ma'lumot */}
        <div className="product-extra">
          <p><strong>Material:</strong> {product.materials}</p>
          <p><strong>Og'irligi:</strong> {product.weight} kg</p>
          <p><strong>SKU:</strong> {product.sku}</p>
        </div>

        {/* Xarid tugmasi */}
        <button className="buy-btn">
          🛒 Savatga qo'shish
        </button>

      </div>
    </div>
  );
}

export default SinglePage;