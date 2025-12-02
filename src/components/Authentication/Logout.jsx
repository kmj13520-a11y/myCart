//토큰만 제거하면 자동 로그아웃됨
const Logout = () => {
  localStorage.removeItem("token");
  window.location = "/";

  return null;
};

export default Logout;
