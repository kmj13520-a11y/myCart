import apiClient from "../utils/api-client";

//서버로 카트 업데이트
export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

//백엔드 서버에서 카트를 가져오기
export async function getCartAPI() {
  return await apiClient.get("/cart");
}

//백엔드에서 제품id 카트 삭제
export function removeFromCartAPI(id) {
  return apiClient.patch(`/cart/remove/${id}`);
  //백엔드 에서는 카트 전체에서 부분적 업데이트
}

//카트안의 id제품의 수량을 +1
export function increaseProductAPI(id) {
  return apiClient.patch(`/cart/increase/${id}`);
}

//카트안의 id제품의 수량을 -1
export function decreaseProductAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}
