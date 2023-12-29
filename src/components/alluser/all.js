"use client";
import { getAllUser } from "@/service/user";
import { useEffect, useState } from "react";
import Input from "../input/input";

function AllUser({ handle, role, type }) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const data = async () => {
            const res = await getAllUser();
            return setUser(res);
        };
        data();
    }, []);
    if (!user) {
        return <h1>...loading</h1>;
    }
    return !type ? (
        <select onChange={(e) => handle(e.target)} name={role}>
            <option value={null}>-- Chọn Người --</option>
            {user.map((item) => {
                if (item.role === role) {
                    return (
                        <option
                            key={item._id}
                            value={`{"${role}": "${item._id}", "name": "${item.name}"}`}
                        >
                            <div>
                                <p>{item.name}</p>
                                {"   "}---{"   "}
                                <p>{item.role}</p>
                            </div>
                        </option>
                    );
                }
            })}
        </select>
    ) : (
        user.map((item) => {
            if (item.role === role) {
                return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ margin: " 0 8px" }}>{item.name}</span>
                        <input
                            name={item.name}
                            type="checkbox"
                            value={item._id}
                            onChange={(e) => handle(e.target)}
                        />
                    </div>
                );
            }
        })
    );
}

export default AllUser;
