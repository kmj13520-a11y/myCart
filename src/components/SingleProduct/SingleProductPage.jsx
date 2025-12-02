import { useContext, useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../../Hook/useData";
import Loader from "../Common/Loader";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import config from "../../config.json";

export default function SingleProductPage() {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams(); //주소로 넘어온 id값을 입력
  const { data: product, error, isLoading } = useData(`/products/${id}`);
  const [quantity, setQuantity] = useState(1);
  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product._id && (
        <>
          <div className="align_center">
            {/* 왼쪽의 일자로 4개의 썸네일 이미지 */}
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.backendURL}/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  //   썸네일 클릭시 선택된 이미지 인덱스 번호 변경
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            {/* 선택된 이미지 크게 표시 */}
            <img
              src={`${config.backendURL}/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>

          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">
              ￦ {product.price.toLocaleString("ko-KR")} 원
            </p>

            {user && (
              <>
                <h2 className="quantity_title">구매개수:</h2>
                <div className="align_center quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>

                <button
                  className="search_button add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  장바구니 추가
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}
