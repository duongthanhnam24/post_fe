import { PlusCircle } from "lucide-react";
import { Search } from "lucide-react";
function BtnControllerLanding({ children, icon }) {
    return (
        <section className="group w-[150px] h-[150px] bg-white rounded-lg flex items-center justify-center hover:bg-[#049945] cursor-pointer">
            <p className="text-sm text-center group-hover:text-white flex items-center justify-center  space-x-2">
                {"          "}
                <span> {icon ? <PlusCircle /> : <Search />}</span>
                <span className=" group-hover:underline ">{children}</span>
            </p>
        </section>
    );
}

export default BtnControllerLanding;
