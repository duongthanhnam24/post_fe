'use client'
import Tapket from "@/components/tapket/tapket";
import { AllGathering } from "@/service/gathering";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MainManager() {
    const user = useSelector((state) => state.auth.user);
    const [gathering, setGathering] = useState()
    useEffect(() => {
        const data = async () => {
            const res = await AllGathering();
            return setGathering(res);
        }
        data()
    },[])
    return ( <section>
                <h1 className="p-4 text-3xl font-bold">Quản lý địa điểm</h1>
                <section className="p-4">
                    <h2 className="p-4 text-xl">Điểm tập kết</h2>
                    {user?.role === "admin" && <Link href={"/admin/manager/createGathering"} className="p-4 underline text-xl text-blue-600">Tạo địa điểm Tập kết</Link>}
                    <section className="grid gird-row-3 grid-cols-3 gap-10 p-4">  
                   { gathering?.map((item) => {
                      const idEm =  item.teller.some(itemTeller => {
                        if(user?._id === itemTeller.idTeller) {
                            return itemTeller.idTeller
                        }
                    });
                  
                   if(user && user.role === "admin") {
                    return (
                        <Tapket item={item} />
                    )   
                } else if(user && user._id === item.leaderGatheringPoint ||  idEm) {
                    return (
                        <Tapket item={item} />
                    )
               }
                   }
                   )}

                            
                           
                    </section>
                </section>
        </section> 
    );
}

export default MainManager;