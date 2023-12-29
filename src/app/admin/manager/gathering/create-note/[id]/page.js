"use client";
import Input from "@/components/input/input";
import { Button } from "@/components/ui/button";
import { addNote } from "@/service/gathering";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

function CreateNote({ params }) {
    const [note, setNote] = useState();

    function handleGetValue(e) {
        setNote((prevState) => ({
            ...prevState,
            [e.name]: e.value,
        }));
    }
    async function handleCreate() {
        const data = await addNote(params.id, note);
        if (data.message == "Thêm thành công") {
            toast.success(data.message, { theme: "dark", position: "top-center" });
            window.location.reload();
        } else {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    }
    console.log(note);
    return (
        <section className="w-full">
            <h1 className="p-5 text-3xl font-bold">Tạo phiếu</h1>

            <section className="w-1/2 p-4">
                <div>
                    <label>Tên người Gửi/Nhận</label>
                    <Input
                        name={"name"}
                        type={"text"}
                        placeholder={"Tên người Gửi/Nhận"}
                        handleChange={handleGetValue}
                    />
                </div>
                <div>
                    <label>Địa chỉ</label>
                    <Input
                        name={"address"}
                        type={"text"}
                        placeholder={"địa chỉ"}
                        handleChange={handleGetValue}
                    />
                </div>
                <div>
                    <label>Số điện thoại</label>
                    <Input
                        name={"phone"}
                        type={"text"}
                        placeholder={"Số điện thoại"}
                        handleChange={handleGetValue}
                    />
                </div>
                <div>
                    <label>Hàng hóa</label>
                    <Input
                        type={"radio"}
                        name={"type"}
                        value={"hàng hóa"}
                        handleChange={handleGetValue}
                    />
                    <label>Đồ ăn</label>

                    <Input
                        type={"radio"}
                        name={"type"}
                        value={"Đồ ăn"}
                        handleChange={handleGetValue}
                    />
                </div>
                <div>
                    <label>Trạng thái</label>
                    <Input
                        name={"Status"}
                        type={"text"}
                        placeholder={"Trạng thái"}
                        handleChange={handleGetValue}
                    />
                </div>
                <div>
                    <label>Trạm</label>
                    <Input name={"station"} placeholder={"Trạm"} handleChange={handleGetValue} />
                </div>{" "}
                <div>
                    <label>loại phiếu</label>
                    {/* <Input
                        name={"typeNote"}
                        placeholder={"Loại phiếu"}
                        handleChange={handleGetValue}
                    /> */}
                    <select name="typeNote" onChange={(e) => handleGetValue(e.target)}>
                        <option>-- Chọn Tình Trạng --</option>
                        <option value={"Đã xác nhận"}>Đã xác nhận</option>
                        <option value={"Chưa xác nhận"}>Chưa xác nhận</option>
                        <option value={"Trả hàng"}>Trả hàng</option>
                    </select>
                </div>
            </section>
            <Button onClick={() => handleCreate()}>Tạo</Button>
        </section>
    );
}

export default CreateNote;
