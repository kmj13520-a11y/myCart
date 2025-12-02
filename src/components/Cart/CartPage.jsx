import "./CartPage.css";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";
import config from "../../config.json";

export default function CartPage() {
  const [subTotal, setSubTotal] = useState(0); //제품 * 가격*갯수 합계
  const userObj = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);
  //체크아웃함수
  const checkout = () => {
    const oldCart = [...cart]; //전체카트 복사 (에러시 복구)
    setCart([]); //카트 비우기
    checkoutAPI()
      .then(() => {
        toast.success("주문 성공!");
      })
      .catch(() => {
        toast.error("checkout 중 에러발생.");
        setCart(oldCart); //카트복구
      });
  };

  console.log(userObj);
  //카트가 바뀔때마다 합계를 계산
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total); //각각의 아이템의 총합을 더함
  }, [cart]);
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${userObj?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">{userObj?.name}</p>
          <p className="user_email">{userObj?.email}</p>
        </div>
      </div>

      <Table headings={["상품", "가격", "구매수량", "총 금액", "상품삭제"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.price.toLocaleString("ko-KR")} 원</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>{(quantity * product.price).toLocaleString("ko-KR")} 원</td>
              <td>
                <img
                  onClick={() => removeFromCart(product._id)}
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* 단순 테이블 */}
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>총 금액</td>
            <td>{subTotal.toLocaleString("ko-KR")} 원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>5,000 원</td>
          </tr>
          <tr className="cart_bill_final">
            <td>결재금액</td>
            <td>{(subTotal + 5000).toLocaleString("ko-KR")} 원</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button" onClick={checkout}>
        결재하기
      </button>
    </section>
  );
}
