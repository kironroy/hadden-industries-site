import React, { useEffect } from "react";
import "./Products.css";

const productsData = [
  {
    category: "Algae",
    anchor: "algae",
    products: [
      {
        name: "Product 1",
        model: "Model A1",
        number: "A123",
        dimensions: "10x10x5 cm",
        weight: "500g",
      },
      {
        name: "Product 2",
        model: "Model A2",
        number: "A456",
        dimensions: "12x12x6 cm",
        weight: "600g",
      },
    ],
  },
  {
    category: "Batteries",
    anchor: "batteries",
    products: [
      {
        name: "Product 1",
        model: "Model B1",
        number: "B789",
        dimensions: "15x10x3 cm",
        weight: "800g",
      },
      {
        name: "Product 2",
        model: "Model B2",
        number: "B101",
        dimensions: "18x12x4 cm",
        weight: "900g",
      },
    ],
  },
  {
    category: "Fusion",
    anchor: "fusion",
    products: [
      {
        name: "Product 1",
        model: "Model F1",
        number: "F112",
        dimensions: "25x20x10 cm",
        weight: "1.5kg",
      },
      {
        name: "Product 2",
        model: "Model F2",
        number: "F113",
        dimensions: "30x25x12 cm",
        weight: "1.8kg",
      },
    ],
  },
  {
    category: "Hydrogen",
    anchor: "hydrogen",
    products: [
      {
        name: "Product 1",
        model: "Model H1",
        number: "H114",
        dimensions: "22x18x9 cm",
        weight: "1.2kg",
      },
      {
        name: "Product 2",
        model: "Model H2",
        number: "H115",
        dimensions: "28x20x10 cm",
        weight: "1.6kg",
      },
    ],
  },
  {
    category: "Materials Design",
    anchor: "materials-design",
    products: [
      {
        name: "Product 1",
        model: "Model MD1",
        number: "MD114",
        dimensions: "22x18x9 cm",
        weight: "1.2kg",
      },
      {
        name: "Product 2",
        model: "Model MD2",
        number: "MD115",
        dimensions: "28x20x10 cm",
        weight: "1.6kg",
      },
    ],
  },
];

const Products = () => {
  useEffect(() => {
    document.title = "Hadden Industries - Products";
  }, []);

  return (
    <div className="products-container">
      <h1>Products</h1>

      {/* Navigation Links */}
      <nav className="product-nav">
        {productsData.map((category) => (
          <a key={category.anchor} href={`#${category.anchor}`}>
            {category.category}
          </a>
        ))}
      </nav>

      {productsData.map((category, index) => (
        <div key={index} id={category.anchor}>
          <h2 id={category.anchor}>{category.category}</h2>
          {category.products.map((product, idx) => (
            <div key={idx} className="product">
              <h3>{product.name}</h3>
              <p>
                <strong>Model Name:</strong> {product.model}
              </p>
              <p>
                <strong>Model Number:</strong> {product.number}
              </p>
              <p>
                <strong>Dimensions:</strong> {product.dimensions}
              </p>
              <p>
                <strong>Weight:</strong> {product.weight}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Products;
