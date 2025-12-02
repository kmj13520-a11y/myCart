import ProductsList from "./ProductsList";
import "./ProductsPage.css";
import ProductsSidebar from "./ProductsSidebar";

export default function ProductsPage() {
  return (
    <section className="products_page">
      {/* 왼쪽 카테고리 */}
      <ProductsSidebar />
      {/* 상품목록 */}
      <ProductsList />
    </section>
  );
}
