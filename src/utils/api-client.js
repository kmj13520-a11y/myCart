import axios from "axios";
import config from "../config.json";

//Axios 객체 생성과 기본 설정
export default axios.create({
  baseURL: `${config.backendURL}/api`,
});
