"use client";
import Input from "@/components/input/input";
import { Button } from "@/components/ui/button";
import { createAccount } from "@/service/user";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

function Signup() {
    const [user, setUser] = useState({
        name: null,
        userName: null,
        password: null,
        role: null,
    });
    const handlerUser = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.name]: e.value,
        }));
    };
    const createBtn = async () => {
        const data = await createAccount(user);
        if (data.message === "Tạo tài khoản thành công") {
            toast.success(data.message, { theme: "dark", position: "top-center" });
            window.location.reload();
        } else {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    };
    return (
        <section>
            <h1 className="p-5 text-3xl font-bold"> Tạo tài khoản</h1>
            <div className="p-5">
                <Link href={"/admin/manager/manager-account"} className=" underline text-blue-600">
                    Quay lại
                </Link>
            </div>
            <section className="p-4">
                <div>
                    <label className="text-2xl my-3 ">Tên người dùng</label>
                    <Input
                        name={"name"}
                        type={"text"}
                        placeholder={"Tên người dùng"}
                        handleChange={handlerUser}
                    />
                </div>
                <div>
                    <label className="text-2xl my-3 ">Tên tài khoản</label>
                    <Input
                        name={"userName"}
                        type={"text"}
                        placeholder={"Tên tài khoản"}
                        handleChange={handlerUser}
                    />
                </div>{" "}
                <div>
                    <label className="text-2xl my-3 ">Password</label>
                    <Input
                        name={"password"}
                        type={"password"}
                        placeholder={"Password"}
                        handleChange={handlerUser}
                    />
                </div>{" "}
                <div className=" space-x-4">
                    <label className="text-2xl my-3 ">Quyền người dùng</label>
                    <select name="role" onChange={(e) => handlerUser(e.target)}>
                        <option>---Chọn quyền---</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"leaderTransactionPoint"}>leaderTransactionPoint</option>
                        <option value={"tellersTransactionPoint"}>tellersTransactionPoint</option>
                        <option value={"leaderGatheringPoint"}>leaderGatheringPoint</option>
                        <option value={"tellersGatheringPoint"}>tellersGatheringPoint</option>
                    </select>
                </div>
                <Button className="my-10" onClick={() => createBtn()}>
                    Tạo
                </Button>
            </section>
        </section>
    );
}

export default Signup;
