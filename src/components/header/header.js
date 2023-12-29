import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import logo from "../../../public/img/logo.png";
function Header() {
    return (
        <section className="flex items-center h-[80px] bg-[#049945] justify-around text-white font-bold">
            {/* <Image src={logo} width={100} height={60} /> */}
            <h1 className="text-5xl">Magic Post</h1>
            <Link href={"/"} className=" no-underline">
                Trang chủ
            </Link>
            <Link href={"/"}>Giới thiệu</Link>
            <Link href={"/"}>Dịch vụ</Link>
            <Link href={"/"}>Tin tức</Link>
            <Link href={"/"}>Liên hệ</Link>
            <Link href={"/admin/signin"}>
                <User />
            </Link>
        </section>
    );
}

export default Header;
