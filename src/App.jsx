import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";

//Axio 설정에 토큰을 추가
setAuthToken(localStorage.getItem("token"));

function App() {
  const [user, setUser] = useState(null); //유저정보
  const [cart, setCart] = useState([]); //카트정보
  //상품을 타입에 따라서 증가 감소시키는 함수
  const updateCart = (type, id) => {
    const updatedCart = [...cart]; //전체카트복사
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id //같은 아이디의 제품 인덱스 찾기
    );

    if (type === "increase") {
      updatedCart[productIndex].quantity += 1; //해당 인덱스 제품 수량  +1
      setCart(updatedCart);
      increaseProductAPI(id).catch((err) => {
        toast.error("상품 증가 에러");
      });
    }
    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1; //해당 인덱스 제품 수량  -1
      setCart(updatedCart);
      decreaseProductAPI(id).catch((err) => {
        toast.error("상품 감소 에러");
      });
    }
  };

  //장바구니 제품을 삭제(제품id입력)
  const removeFromCart = (id) => {
    const oldCart = [...cart]; //전체 카트 복사
    const newCart = oldCart.filter((item) => item.product._id !== id); //id가 같은 제품 삭제
    setCart(newCart);
    removeFromCartAPI(id).catch((err) => {
      toast.error("장바구니 상품 삭제 에러");
    });
  };
  //제품과 추가하는 수량을 입력
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    //같은 아이디가 있으면 찾아서 인덱스 번호를 저장
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    // 인덱스번호가 -1일때 같은 아이디 없음(새로 추가한다.)
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);

    //서버로 카트를 업데이트
    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("상품 추가 성공!");
      })
      .catch((err) => {
        toast.error("상품 추가에 실패했습니다.");
      });
  };
  //백엔드에서 카트데이터 가져오기
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("카트 가져오기 실패!");
      });
  };
  //유저가 바뀔때마다 장바구니를 가져옴
  useEffect(() => {
    if (user) getCart();
  }, [user]);
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload(); //재시작
      } else {
        setUser(jwtUser);
      }
    } catch (error) {} // 에러가 아니고 아직 로그인 안함
  }, []); //시작시 jst토큰을 가져옴s
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar cartCount={cart.length} />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing user={user} />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
