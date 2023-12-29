"use client";
import Image from "next/image";
import post from "../../../../public/img/post.webp";
import Input from "@/components/input/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "@/service/user";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Signin() {
    const router = useRouter();
    const [user, setUser] = useState();
    const [data, setData] = useState();
    function setValue(e) {
        setUser((prevState) => ({
            ...prevState,
            [e.name]: e.value,
        }));
    }
    const Signin = async () => {
        const data = await signIn(user);
        setData(data);
        // if (data.role) {
        //     router.push("/admin/manager");
        //     localStorage.setItem("access_token", data.accToken);
        //     localStorage.setItem("refresh_token", data.refreshTok);
        // }
        switch (data?.role) {
            case "admin":
                router.push("/admin/manager");
                localStorage.setItem("access_token", data.accToken);
                localStorage.setItem("refresh_token", data.refreshTok);
                break;
            case "leaderTransactionPoint":
                router.push("/admin/manager/transaction");
                localStorage.setItem("access_token", data.accToken);
                localStorage.setItem("refresh_token", data.refreshTok);
                break;
            case "tellersTransactionPoint":
                router.push("/admin/manager/transaction");
                localStorage.setItem("access_token", data.accToken);
                localStorage.setItem("refresh_token", data.refreshTok);
                break;
            case "tellersGatheringPoint":
                router.push("/admin/manager");
                localStorage.setItem("access_token", data.accToken);
                localStorage.setItem("refresh_token", data.refreshTok);
                break;
            case "leaderGatheringPoint":
                router.push("/admin/manager");
                localStorage.setItem("access_token", data.accToken);
                localStorage.setItem("refresh_token", data.refreshTok);
                break;
            default:
                break;
        }
        if (data?.message) {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    };

    return (
        <section>
            <Image src={post} className="w-full h-sreen object-cover relative" />
            <section className=" absolute top-1/2 ml-[50%] translate-x-[-50%] flex flex-col">
                <h1 className="text-center text-5xl font-bold p-4">Đăng Nhập cho quản lý </h1>

                <Input
                    name={"userName"}
                    type={"text"}
                    placeholder={"Tên tài khoản"}
                    handleChange={setValue}
                />

                <Input
                    name={"password"}
                    type={"password"}
                    placeholder={"Nhập mật khẩu"}
                    handleChange={setValue}
                />
                <Button onClick={() => Signin()}>Đăng nhập</Button>

                <Link href={"/"} className="text-center text-blue-300 underline">
                    Quay lại
                </Link>
            </section>
            <ToastContainer />
        </section>
    );
}

export default Signin;
