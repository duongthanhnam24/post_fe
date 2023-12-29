"use client";
import { getAllTransaction } from "@/service/transaction";
import { useEffect, useState } from "react";

function AllTransaction({ handle }) {
    const [transaction, setTransaction] = useState([]);
    useEffect(() => {
        const data = async () => {
            const res = await getAllTransaction();
            return setTransaction(res);
        };
        data();
    }, []);
    if (!transaction) {
        return <h1>...loading</h1>;
    }

    return (
        <>
            {transaction.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginLeft: "8px" }}>{item.pointName}</span>
                    <input
                        name={"transactions"}
                        type="checkbox"
                        value={`{"pointName" : "${item.pointName}", "idTransaction": "${item._id}"}`}
                        onChange={(e) => handle(e.target)}
                    />
                </div>
            ))}
        </>
    );
}

export default AllTransaction;
