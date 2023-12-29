"use client";
import Table from "@/components/table/table";
import Tb from "@/components/tb/tb";
import Td from "@/components/td/td";
import Th from "@/components/th/th";
import Thead from "@/components/thead/thead";
import Tr from "@/components/tr/tr";
import { Button } from "@/components/ui/button";
import { getAllTransaction } from "@/service/transaction";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Transaction() {
    const user = useSelector((state) => state.auth.user);
    const [transaction, setTransaction] = useState();
    useEffect(() => {
        const data = async () => {
            const res = await getAllTransaction();
            return setTransaction(res);
        };
        data();
    }, []);
    return (
        <section className="w-full">
            <h1 className="p-5 text-3xl font-bold">Quản lý điểm giao dịch</h1>
            {user?.role === "admin" && (
                <Link
                    href={`/admin/manager/transaction-create`}
                    className="font-bold text-xl p-4 underline text-blue-600"
                >
                    Tạo điểm giao dịch
                </Link>
            )}
            <section>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Number</Th>
                            <Th>Tên địa điểm</Th>
                            <Th>Đội trưởng</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tb>
                        {transaction?.map((item, i) => {
                            const idEm = item.teller.some((itemTeller) => {
                                if (user?._id === itemTeller.idTeller) {
                                    return itemTeller.idTeller;
                                }
                            });

                            if (user && user.role === "admin") {
                                return (
                                    <Tr key={i}>
                                        <Td>{i + 1}</Td>
                                        <Td>{item.pointName}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>
                                            <Button className="bg-blue-600">
                                                <Link
                                                    href={`/admin/manager/transaction/${item._id}`}
                                                >
                                                    View
                                                </Link>
                                            </Button>
                                        </Td>
                                    </Tr>
                                );
                            } else if ((user && user._id === item.leaderTransactionPoint) || idEm) {
                                return (
                                    <Tr key={i}>
                                        <Td>{i + 1}</Td>
                                        <Td>{item.pointName}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>
                                            <Button className="bg-blue-600">
                                                <Link
                                                    href={`/admin/manager/transaction/${item._id}`}
                                                >
                                                    View
                                                </Link>
                                            </Button>
                                        </Td>
                                    </Tr>
                                );
                            }
                        })}
                    </Tb>
                </Table>
            </section>
        </section>
    );
}

export default Transaction;
