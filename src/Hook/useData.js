import { useEffect, useState } from "react";
import apiClient from "../utils/api-client";

const useData = (url, customConfig, deps) => {
  const [data, setData] = useState([]); //성공시 데이터
  const [error, setError] = useState(""); //에러시 에러메세지
  const [isLoading, setIsLoding] = useState(false); //로딩상태 true 일때 로딩중

  //url 주소로 백엔드 서버에 요청해서 데이터를 받음, 에러 발생시 에러 메세지 받음
  useEffect(
    () => {
      setIsLoding(true); //로딩중(시작);
      apiClient
        .get(url, customConfig)
        .then((res) => {
          setData(res.data);
          setIsLoding(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoding(false);
        });
    },
    deps ? deps : []
  ); //deps가 변경될때마다 재실행

  return { data, error, isLoading };
};

export default useData; //함수 사용시 결과는 데이터와 에러, 로딩상태 리턴
