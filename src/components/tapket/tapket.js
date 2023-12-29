import Link from "next/link";
import { Button } from "../ui/button";

function Tapket({ item }) {
    return (
        <div className="group  relative w-[300px] h-[200px] bg-[#f5e4e400] shadow-md overflow-hidden cursor-pointer rounded-3xl text-center">
            <p className="text-lg font-semibold p-4">Điểm tập kết : {item.pointName}</p>

            <p className="text-xs p-4">Người quản lý : {item.name}</p>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Button>
                    <Link href={`/admin/manager/gathering/${item._id}`}>Xem chi tiết</Link>
                </Button>
            </div>
        </div>
    );
}

export default Tapket;
