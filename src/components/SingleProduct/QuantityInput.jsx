import "./QuantityInput.css";

export default function QuantityInput({
  quantity,
  setQuantity,
  stock,
  cartPage,
  productId,
}) {
  return (
    <>
      <button
        onClick={() =>
          cartPage
            ? setQuantity("decrease", productId)
            : setQuantity((n) => n - 1)
        }
        className="quantity_input_button"
        disabled={quantity <= 1}
      >
        -
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        onClick={() =>
          cartPage
            ? setQuantity("increase", productId)
            : setQuantity((n) => n + 1)
        }
        className="quantity_input_button"
        disabled={quantity >= stock}
      >
        +
      </button>
    </>
  );
}
