"use client";
import AllUser from "@/components/alluser/all";
import Input from "@/components/input/input";
import { Button } from "@/components/ui/button";
import { AllGathering } from "@/service/gathering";
import { createTransaction } from "@/service/transaction";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CreateTransaction() {
    const [gathering, setGathering] = useState();
    useEffect(() => {
        const data = async () => {
            const res = await AllGathering();
            return setGathering(res);
        };
        data();
    }, []);
    const [transaction, setTransaction] = useState({
        pointName: null,
        nameGathering: null,
        idGathering: null,
        leaderTransactionPoint: null,
        name: null,
        teller: [],
        note: [],
    });

    const handlegetValue = (e) => {
        console.log(e.value);
        if (e.value.length > 10) {
            const parsedObject = JSON.parse(e.value);
            const { leaderTransactionPoint, name, idGathering, nameGathering } = parsedObject;
            if (leaderTransactionPoint && name) {
                setTransaction((prevState) => ({
                    ...prevState,
                    leaderTransactionPoint: leaderTransactionPoint,
                    name: name,
                }));
            } else if (idGathering && nameGathering) {
                setTransaction((prevState) => ({
                    ...prevState,
                    nameGathering: nameGathering,
                    idGathering: idGathering,
                }));
            }
        } else {
            console.log("here");
            setTransaction((prevState) => ({
                ...prevState,
                [e.name]: e.value,
            }));
        }
    };
    const createBtn = async () => {
        const data = await createTransaction(transaction);
        if (data.message === "Tạo điểm giao dịch thành công") {
            toast.success(data.message, { theme: "dark", position: "top-center" });
            window.location.reload();
        } else {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    };
    console.log(transaction);
    return (
        <section className="w-full">
            <h1 className="text-3xl font-bold p-5">Tạo điểm giao dịch</h1>
            <Link href={"/admin/manager/transaction"} className="p-4 text-blue-600 underline">
                Quay lại
            </Link>
            <section className="w-[500px] p-4 flex-col">
                <label className="font-bold">Tên điểm giao dịch</label>
                <Input
                    name="pointName"
                    type="text"
                    placeholder="Tên điểm giao dịch"
                    handleChange={handlegetValue}
                />
                <div className="flex-col">
                    <div>
                        {" "}
                        <label className="font-bold">Chọn tổ trưởng điểm giao dịch</label>
                        <AllUser role={"leaderTransactionPoint"} handle={handlegetValue} />
                    </div>
                    <div className="flex-col">
                        <div>
                            <label className="font-bold">Chọn điểm tập kết liên kết</label>
                        </div>
                        <select onChange={(e) => handlegetValue(e.target)}>
                            <option>--Chọn điểm tập kết--</option>
                            {gathering?.map((item, i) => {
                                return (
                                    <option
                                        value={`{"idGathering":"${item._id}" ,"nameGathering":"${item.pointName}"}`}
                                    >
                                        {item.pointName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </section>
            <Button className="m-4" onClick={() => createBtn()}>
                Tạo điểm giao dịch
            </Button>
        </section>
    );
}

export default CreateTransaction;
