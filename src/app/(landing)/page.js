"use client";
import Image from "next/image";
import slider from "../../../public/img/slider.jpg";
import Input from "@/components/input/input";
import Link from "next/link";
import BtnControllerLanding from "@/components/buttonControllerLanding/button";
import Search from "@/components/inputHeader/search";
function Landing() {
    return (
        <section className="text-3xl ">
            <section className=" relative">
                <Image src={slider} className="  w-full object-cover" />

                <section className=" absolute  top-[30%]  ml-[50%] translate-x-[-50%] ">
                    <section className="flex space-x-11 justify-center my-10">
                        {/* <BtnControllerLanding icon={true}>Tạo vận đơn</BtnControllerLanding> */}
                        <Link href={"/tracuu"}>
                            <BtnControllerLanding icon={false}>
                                Tra cứu vận đơn
                            </BtnControllerLanding>
                        </Link>
                    </section>

                    {/* <Search /> */}
                </section>
            </section>
        </section>
    );
}

export default Landing;
