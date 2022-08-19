import "./product.scss";

import { useLocation } from "react-router-dom";
// import Chart from "../../components/chart/Chart";
// import { productData } from "../../data";
import { useContext, useState } from "react";
import { ProductsContext } from "../../context/productContext/productContext";
import { updateProduct } from "../../context/productContext/productApiCalls";

export default function Product() {
  const product = useLocation().product;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [netProfit, setNetProfit] = useState(product.netProfit);

  const { dispatch } = useContext(ProductsContext);

  const handelSubmit = (e) => {
    e.preventDefault();

    updateProduct(dispatch, {
      name,
      price,
      quantity,
      netProfit,
      _id: product._id,
    });
  };

  return (
    <div className="product">
      <div className="titleContainer">
        <h1 className="title"> Modifier le produit</h1>
      </div>
      <div className="productContainer">
        {/* <div className="top">
          <div className="left">
            <Chart
              title="Sales Performance"
              data={productData}
              dataKey="Sales"
            />
          </div>
        </div> */}
        <div className="bottom">
          <div className="left">
            <form className="form" onSubmit={handelSubmit}>
              <div className="group">
                <label htmlFor="name">Nom du produit</label>
                <input
                  type="text"
                  placeholder="Entrez le nom du produit"
                  className="input"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="group">
                <label htmlFor="price">Prix ​​du produit</label>
                <input
                  type="number"
                  id="price"
                  className="input"
                  placeholder="Entrez le prix du produit"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="group">
                <label htmlFor="quantity">La quantité de produit</label>
                <input
                  type="number"
                  id="quantity"
                  className="input"
                  placeholder="Entrez la quantité de produit"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="group">
                <label htmlFor="quantity">Le Bénéfice Net</label>
                <input
                  type="number"
                  id="netProfit"
                  className="input"
                  placeholder="Entrez le bénéfice net"
                  value={netProfit}
                  onChange={(e) => setNetProfit(e.target.value)}
                />
              </div>

              <div className="group">
                <button className="add" type="submit">
                  Mise à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
