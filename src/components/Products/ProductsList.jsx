import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../Hook/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagenation";
import { useEffect, useState } from "react";

export default function ProductsList() {
  const [sortBy, setSortBy] = useState(""); // 제품 정렬방법
  const [sortedProducts, setSortedProducts] = useState([]); //제품 정렬된 제품
  //제품배열과 에러 상태관리
  const [search, setSearch] = useSearchParams(); // ?뒤의 파라미터를 받음
  const category = search.get("category");
  const page = search.get("page");
  const searchQuery = search.get("search");
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        page,
      },
    },
    [searchQuery, category, page]
  );

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: page });
  };

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8]; //8개의 스켈레톤 배열

  //정렬 기능
  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products]; //data.products 가져옴
      //정렬 조건에 따라 정렬 수행
      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]); // sorrBy 또는 data가 변경될 때마다 실행

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          name="sort"
          id="sort"
          className="products_sorting"
        >
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {sortedProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {/* 페이지네이션 넣기 */}
      {data && (
        <Pagination
          total={data.totalProducts}
          perPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )}
    </section>
  );
}
