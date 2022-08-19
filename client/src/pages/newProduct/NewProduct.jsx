import "./newProduct.scss";
import { useContext, useState } from "react";
import { addProduct } from "../../context/productContext/productApiCalls";
import { ProductsContext } from "../../context/productContext/productContext";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [netProfit, setNetProfit] = useState(0);

  const { dispatch, products } = useContext(ProductsContext);

  const handelSubmit = (e) => {
    e.preventDefault();
    addProduct(dispatch, {
      name,
      price,
      quantity,
      netProfit,
      number: products.length + 1,
    });

    setName("");
    setPrice(0);
    setQuantity(0);
    setNetProfit(0);
  };

  return (
    <div className="newProduct">
      <h2>New Product</h2>
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
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
