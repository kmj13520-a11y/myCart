import apiClient from "../utils/api-client";

export function checkoutAPI() {
  return apiClient.post("/order/checkout");
  //백엔드 서버는 현재유저의 카트를 주문하고 카트를 비움ㄴ
}
