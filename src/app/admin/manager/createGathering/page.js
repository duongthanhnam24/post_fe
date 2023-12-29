"use client";
import AllTransaction from "@/components/alltransaction/all";
import AllUser from "@/components/alluser/all";
import Input from "@/components/input/input";
import { Button } from "@/components/ui/button";
import { Gathering } from "@/service/gathering";
import { useState } from "react";
import { toast } from "react-toastify";

function CreateGathering() {
    const [gathering, setGathering] = useState({
        pointName: null,
        transactions: [],
        leaderGatheringPoint: null,
        name: null,
        teller: [],
        note: [],
    });
    const handleValue = (e) => {
        if (e.value.length > 40) {
            const parser = JSON.parse(e.value);
            const { pointName, idTransaction, leaderGatheringPoint, name } = parser;
            if (pointName && idTransaction) {
                setGathering((preState) => ({
                    ...preState,
                    transactions: [
                        ...preState.transactions,
                        {
                            idTransaction,
                            pointName,
                        },
                    ],
                }));
            } else if (leaderGatheringPoint && name) {
                setGathering((preState) => ({
                    ...preState,
                    leaderGatheringPoint: leaderGatheringPoint,
                    name: name,
                }));
            }
        } else {
            setGathering((preState) => ({
                ...preState,
                [e.name]: e.value,
            }));
        }
    };
    console.log(gathering);
    const handleSubmit = async () => {
        const data = await Gathering(gathering);
        if (data.message == "tạo điểm tập kết thành công") {
            toast.success(data.message, { theme: "dark", position: "top-center" });
            window.location.reload();
        } else {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    };
    return (
        <section className="w-full">
            <h1 className="text-3xl font-bold p-5">Tạo điểm tập kết</h1>
            <section className="w-[500px]">
                <label>Tạo Tên địa điểm</label>
                <Input name={"pointName"} placeholder={"tên địa điểm"} handleChange={handleValue} />
                {/* <AllTransaction handle={handleValue} /> */}
            </section>
            <AllUser role={"leaderGatheringPoint"} handle={handleValue} />

            <Button onClick={() => handleSubmit()}>Tạo điểm tập kết</Button>
        </section>
    );
}

export default CreateGathering;
