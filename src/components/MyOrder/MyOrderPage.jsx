import useData from "../../Hook/useData";
import Table from "../Common/Table";
import "./MyOrderPage.css";

export default function MyOrderPage() {
  const { data: orders, error, isLoading } = useData("/order");
  //상품명(수량) 가져오기
  const getProductString = (order) => {
    const productStringArr = order.products.map(
      (p) => `${p.product.title}(${p.quantity})`
    );
    return productStringArr.join(", ");
  };
  return (
    <section className="align_center myorder_page">
      <Table headings={["내주문", "상품들", "결재금액", "배송상태"]}>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{getProductString(order)}</td>
              <td>{order.total.toLocaleString("ko-KR")} 원</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
