import "./Navbar.css";

// 이미지들을 미리 불러옵니다.
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import LinkWithIcon from "./LinkWithIcon";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";

export default function Navbar({ cartCount }) {
  const user = useContext(UserContext);
  const [search, setSearch] = useState(""); //검색어 상태 관리
  const navigate = useNavigate(); //네비게이트 객체(페이지 이동용)
  const handleSubmit = (e) => {
    e.preventDefault(); //폼 제출 기본 동작 방지
    // console.log("검색어:", search);
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
  };

  return (
    <nav className="align_center navbar">
      {/* 제목과 검색폼 */}
      <div className="align_center">
        <h1 className="navbar_heading">myCart</h1>
        <form onSubmit={handleSubmit} className="align_center navbar_form">
          <input
            type="text"
            className="navbar_search"
            placeholder="제품 찾기..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search_button align_center">
            검색하기
          </button>
        </form>
      </div>
      {/* 네브바 링크 */}
      <div className="align_center navbar_links">
        <LinkWithIcon title="홈페이지" link="/" emoji={rocket} />
        <LinkWithIcon title="상품들" link="/products" emoji={star} />
        {!user && (
          <>
            <LinkWithIcon title="로그인" link="/login" emoji={idButton} />
            <LinkWithIcon title="가입" link="/signup" emoji={memo} />
          </>
        )}

        {user && (
          <>
            <LinkWithIcon title="내주문" link="/myorders" emoji={order} />
            <LinkWithIcon title="로그아웃" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              장바구니 <p className="align_center cart_counts">{cartCount}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
