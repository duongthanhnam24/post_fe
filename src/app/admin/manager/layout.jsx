'use client'
import SideBar from "@/components/sideBar/sideBar";
import { getToken, getUser } from "@/redux/features/counter/counterSlice";
import { rf,axiosJWT, GetDetailUser } from "@/service/user";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManagerLayout({ children }) {
  const dispatch = useDispatch();
  const getDecode = () => {
      let tokkenStorage = localStorage.getItem("access_token");
      if (tokkenStorage) {
          let decoded = {};
          decoded = jwtDecode(tokkenStorage);
          return { decoded, tokkenStorage };
      } else return {};
  };

  const handleGetUser = async (id, token) => {
      const res = await GetDetailUser(id, token);
      dispatch(getUser({ res }));
  };
  axiosJWT.interceptors.request.use(
      async function (config) {
          let refresh_token = localStorage.getItem("refresh_token");
          const date = new Date();
          const { decoded } = getDecode();
          if (decoded?.exp < date.getTime() / 1000) {
              // const data = await refreshToken(refresh_token);
              const test = await rf(refresh_token);
              dispatch(getToken(test.acces_token));
              config.headers["token"] = `${test.acces_token}`;
          }
          return config;
      },
      function (error) {
          // Do something with request error
          return Promise.reject(error);
      }
  );
  useEffect(() => {
      const { tokkenStorage, decoded } = getDecode();
      if (decoded?.id) {
          handleGetUser(decoded?.id, tokkenStorage);
      }
  }, [handleGetUser]);
    return (
      <html lang="en">
            <body className="flex">
                <SideBar/>
                    {children}
                    <ToastContainer />
            </body>
      </html>
    )
  }