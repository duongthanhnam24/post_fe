'use client'
import Image from "next/image";
import shipping from "../../../../public/img/shipping.png"
import Input from "@/components/input/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { find } from "@/service/NOTE";
function Tracuu() {
    const [note,setNote] = useState({})
    const [search,setSearch] = useState()
    // useEffect(() => {
    //     const data = async ()  => {
    //         const res = await find(search)
    //         return setNote(res)
    //     }
    //     data()
    // },[search])
    function handleSearch(e) {
        setSearch(e.value)
    }
   async function getSearch() {
    const res = await find(search)
    return setNote(res)
    }
    console.log(note);
    return ( 
        <section className="">
            <Image src={shipping} className="w-full object-cover bg-opacity-10  bg-slate-700 opacity-[0.5] relative"/>
            <section className=" absolute top-1/2  ml-[50%] translate-x-[-50%] ">
                <h1 className="text-center text-3xl text-red-600 font-bold">Tra cứu vận đơn</h1>
                <section className="bg-[#049945] w-[1000px] p-10">
                        
                            <div className="w-1/2 flex space-x-4 items-center">
                                <Input placeholder={'tìm kiếm đơn'} handleChange={handleSearch}/>
                                <Button variant="destructive" onClick={() => getSearch(search)}>Tìm kiếm</Button>
                            </div>

                            <div>
                                <p className="text-white text-xl">Mã vận đơn : {note?._id}</p>
                                <p className="text-white text-xl">Người gửi: {note?.name}</p>
                                <p className="text-white text-xl">Địa chỉ: {note?.address}</p>
                                <p className="text-white text-xl">Số điện thoại: {note?.phone}</p>
                                <p className="text-white text-xl">Trạng thái: {note?.Status}</p>
                                <p className="text-white text-xl">Vị trí : {note?.station}</p>
                                
                            </div>
                </section>
            </section>
        </section>
     );
}

export default Tracuu;