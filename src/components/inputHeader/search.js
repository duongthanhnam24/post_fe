import Input from "../input/input";
import Tr from "../tr/tr";
import Th from "../th/th";
import Thead from "../thead/thead";
import Table from "../table/table";

function Search() {
    return (
        <section>
            <Input name={"mã đơn"} type={"text"} placeholder={"Nhập mã vận đơn"} />
            <div className="bg-white w-[500px]">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Tên </Th>
                            <Th>Địa chỉ</Th>
                            <Th>Số điện thoại</Th>
                            <Th>Loại Hàng gửi</Th>
                            <Th>Trạng thái</Th>
                            <Th>Trạm</Th>
                        </Tr>
                    </Thead>
                </Table>
            </div>
        </section>
    );
}

export default Search;
