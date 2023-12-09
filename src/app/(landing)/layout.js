"use client";
import "@/styles/globals.css";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetDetailUser, refreshToken, axiosJWT, rf } from "@/service/user";
import jwtDecode from "jwt-decode";
import { getToken, getUser } from "@/redux/features/counter/counterSlice";

export default function RootLayout({ children }) {
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
            <body>
                <div className="mx-[300px]">
                    <Header />
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
