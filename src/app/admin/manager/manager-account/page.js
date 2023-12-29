"use client";
import Table from "@/components/table/table";
import Tb from "@/components/tb/tb";
import Td from "@/components/td/td";
import Th from "@/components/th/th";
import Thead from "@/components/thead/thead";
import Tr from "@/components/tr/tr";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllUser } from "@/service/user";
function ManagerAccount() {
    const [user, setUser] = useState();
    useEffect(() => {
        const data = async () => {
            const res = await getAllUser();
            return setUser(res);
        };
        data();
    }, []);
    console.log(user);
    return (
        <section className="w-full">
            <h1 className="p-5 text-3xl font-bold">Quản lý tài khoản</h1>
            <div className="p-5 hover:underline">
                <Link href={"/admin/manager/sign-up"} className="flex space-x-3">
                    <UserPlus />
                    <span>Thêm người dùng </span>
                </Link>
            </div>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Number</Th>
                        <Th>Tên người dùng</Th>
                        <Th>Tên tài khoản</Th>
                        <Th>Quyền</Th>
                        {/* <Th>Phân khu</Th> */}
                        {/* <Th>Action</Th> */}
                    </Tr>
                </Thead>
                <Tb>
                    {user &&
                        user.map((item, i) => {
                            return (
                                <Tr>
                                    <Td>{i + 1}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>{item.userName}</Td>
                                    <Td>{item.role}</Td>
                                    {/* <Td>
                                        <Button className="bg-blue-600">Xem</Button>
                                    </Td>
                                    <Td>
                                        <Button>Edit</Button>
                                        <Button variant="destructive">Delete</Button>
                                    </Td> */}
                                </Tr>
                            );
                        })}
                </Tb>
            </Table>
        </section>
    );
}

export default ManagerAccount;
