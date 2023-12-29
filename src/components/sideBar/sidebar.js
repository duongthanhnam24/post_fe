"use client";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

function SideBar() {
    const user = useSelector((state) => state.auth.user);

    return (
        <section className="px-4 h-[1200px] w-1/4 bg-[#049945] text-white">
            <div className="">
                <h1 className="flex items-center p-5 text-2xl">
                    <User /> {user?.name}
                </h1>
            </div>
            <div className=" border-solid border-b mb-4"></div>
            <div className="p-4">
                <Link href={"/"} className="p-4">
                    Tới trang chính
                </Link>
            </div>
            {user &&
                (user.role === "admin" ||
                user.role === "leaderGatheringPoint" ||
                user.role === "tellersGatheringPoint" ? (
                    <div className="p-4">
                        <Link href={"/admin/manager"} className="p-4">
                            Quản lý địa điểm Tập kết
                        </Link>
                    </div>
                ) : (
                    <></>
                ))}
            {user &&
                (user.role === "admin" ||
                user.role === "leaderTransactionPoint" ||
                user.role === "tellersTransactionPoint" ? (
                    <div className="p-4">
                        <Link href={"/admin/manager/transaction"} className="p-4">
                            Quản lý địa điểm Giao dịch
                        </Link>
                    </div>
                ) : (
                    <></>
                ))}

            {user?.role === "admin" && (
                <div className="p-4">
                    <Link href={"/admin/manager/manager-account"} className="p-4">
                        Quản lý tài khoản
                    </Link>
                </div>
            )}
            <div className="p-4">
                <Link href={"/"}>
                    <Button
                        variant=""
                        className="w-full flex justify-between"
                        onClick={() => {
                            localStorage.clear();
                        }}
                    >
                        Đăng Xuất
                        <LogOut />
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export default SideBar;
