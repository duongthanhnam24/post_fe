"use client";

import Table from "@/components/table/table";
import Thead from "@/components/thead/thead";
import Tr from "@/components/tr/tr";
import Th from "@/components/th/th";
import Tb from "@/components/tb/tb";
import Td from "@/components/td/td";
import AllUser from "@/components/alluser/all";
import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTransaction, sendNoteToGathering, sendUpdate } from "@/service/transaction";
import Input from "@/components/input/input";
import { sendNote } from "@/service/gathering";
import { toast } from "react-toastify";
import { updateNote } from "@/service/NOTE";

import qr from "@/../../public/img/qr.png";
import Image from "next/image";
function TransactionView({ params }) {
    const [transaction, setTransaction] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [modalEdit, setModalEdit] = useState(false);
    const openEdit = () => setModalEdit(true);
    const closeEdit = () => setModalEdit(false);
    const [sendNoteS, setSendNoteS] = useState();
    const [modalView, setModalView] = useState(false);
    const openView = () => setModalView(true);
    const closeView = () => setModalView(false);
    const [typeNoteFilter, setTypeNoteFilter] = useState("Tất cả");
    const [user, setUser] = useState({
        teller: [],
    });
    useEffect(() => {
        const data = async () => {
            const res = await getTransaction(params.id);
            return setTransaction(res);
        };
        data();
    }, []);
    function setValueNote(e) {
        setSendNoteS((prevState) => ({
            ...prevState,
            [e.name]: e.value,
        }));
    }
    async function send(id) {
        const { Status, address, name, phone, station, type, typeNote } = sendNoteS;
        const newNote = {
            Status,
            address,
            name,
            phone,
            station,
            type,
            typeNote,
            _id: id,
        };
        const data = await sendNoteToGathering(params.id, transaction.idGathering, newNote);
        if (data.message === "Gửi thành công") {
            toast.success(data.message, { theme: "dark", position: "top-center" });
            window.location.reload();
        } else {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    }
    function addTeller(e) {
        console.log(e.value);
        if (e.checked !== true) {
            setUser({
                teller: [],
            });
        }

        setUser((prevState) => ({
            teller: [
                ...prevState.teller,
                {
                    idTeller: e.value,
                    name: e.name,
                },
            ],
        }));
    }
    async function add() {
        console.log(user);
        const data = await sendUpdate(params.id, user);
        if (data.message == "Thêm thành công") {
            toast.success(data.message, { theme: "dark", position: "top-center" });
            window.location.reload();
        } else {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    }
    async function editNote(id) {
        const { Status, address, name, phone, station, type, typeNote } = sendNoteS;

        const data = await updateNote(id, params.id, {
            _id: id,
            Status,
            address,
            name,
            phone,
            station,
            type,
            typeNote,
        });
        if (data.message == "sửa thành công") {
            toast.success(data.message, { theme: "dark", position: "top-center" });
            window.location.reload();
        } else {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    }
    return (
        <section className="w-full">
            <h1 className="p-5 text-3xl font-bold">
                Quản lý Điểm giao dịch : {transaction?.pointName}
            </h1>

            <div className="p-5 flex space-x-20 items-center">
                <h2 className="text-xl">Thông tin người quản lý khu :{transaction?.name}</h2>
                <h2 className="text-xl">
                    Thông tin điểm tập kết liên kết : {transaction?.nameGathering}
                </h2>
                <Link href={`/admin/manager/gathering/create-note/${params.id}`}>
                    <Button variant="outline">
                        <FilePlus2 />
                    </Button>
                </Link>

                {transaction?.teller?.length > 0 && (
                    <select>
                        <option>--Người ở điểm tập kết --</option>
                        {transaction?.teller?.map((item) => {
                            return <option>{item.name}</option>;
                        })}
                    </select>
                )}
            </div>
            <div className="p-4">
                <AllUser role={"tellersTransactionPoint"} type={true} handle={addTeller} />
                <Button onClick={() => add()}>Thêm người</Button>
            </div>
            <div>
                <h2 className="text-xl p-5">- Quản lý đơn hàng</h2>
                <div className=" space-x-4 p-4">
                    <label>Chưa xác nhận</label>
                    <input
                        type="radio"
                        name="query"
                        value={"Chưa xác nhận"}
                        onChange={(e) => setTypeNoteFilter(e.target.value)}
                    />
                    <label>Đã xác nhận</label>
                    <input
                        type="radio"
                        name="query"
                        value={"Đã xác nhận"}
                        onChange={(e) => setTypeNoteFilter(e.target.value)}
                    />
                    <label>Trả hàng</label>
                    <input
                        type="radio"
                        name="query"
                        value={"Trả hàng"}
                        onChange={(e) => setTypeNoteFilter(e.target.value)}
                    />
                    <label>Tất cả</label>
                    <input
                        type="radio"
                        name="query"
                        value={"Tất cả"}
                        onChange={(e) => setTypeNoteFilter(e.target.value)}
                    />
                </div>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Number</Th>
                            <Th>Tên </Th>
                            <Th>Địa chỉ</Th>
                            <Th>Số điện thoại</Th>
                            <Th>Loại Hàng gửi</Th>
                            <Th>Trạng thái</Th>
                            <Th>Trạm</Th>
                            <Th>Loại phiếu</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tb>
                        {transaction?.note?.map((item, i) => {
                            if (typeNoteFilter === item.typeNote) {
                                return (
                                    <Tr keys={i}>
                                        <Td>{i + 1}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.address}</Td>
                                        <Td>{item.phone}</Td>
                                        <Td>{item.type}</Td>

                                        <Td>{item.Status}</Td>
                                        <Th>{item.station}</Th>
                                        <Th>{item.typeNote}</Th>
                                        <Th>
                                            <div className="relative">
                                                <Button
                                                    onClick={openModal}
                                                    className="bg-green-600"
                                                >
                                                    Gửi tập kết
                                                </Button>

                                                {modalOpen && (
                                                    <div
                                                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                                                        onClick={closeModal}
                                                    >
                                                        <div
                                                            className="bg-white p-6 rounded-md"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span
                                                                className="absolute top-0 right-0 p-4 cursor-pointer text-xl"
                                                                onClick={closeModal}
                                                            >
                                                                &times;
                                                            </span>
                                                            <section className="w-[500px] p-4">
                                                                <div>
                                                                    <label>
                                                                        Tên người Gửi/Nhận
                                                                    </label>
                                                                    <Input
                                                                        name={"name"}
                                                                        type={"text"}
                                                                        placeholder={
                                                                            "Tên người Gửi/Nhận"
                                                                        }
                                                                        handleChange={setValueNote}
                                                                        value={item.name}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Địa chỉ</label>
                                                                    <Input
                                                                        name={"address"}
                                                                        type={"text"}
                                                                        placeholder={"địa chỉ"}
                                                                        handleChange={setValueNote}
                                                                        value={item.address}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Số điện thoại</label>
                                                                    <Input
                                                                        name={"phone"}
                                                                        type={"text"}
                                                                        placeholder={
                                                                            "Số điện thoại"
                                                                        }
                                                                        handleChange={setValueNote}
                                                                        value={item.phone}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Hàng hóa</label>
                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"hàng hóa"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                    <label>Đồ ăn</label>

                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"Đồ ăn"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạng thái</label>
                                                                    <Input
                                                                        name={"Status"}
                                                                        type={"text"}
                                                                        placeholder={"Trạng thái"}
                                                                        handleChange={setValueNote}
                                                                        value={item.Status}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạm</label>
                                                                    <Input
                                                                        name={"station"}
                                                                        placeholder={"Trạm"}
                                                                        handleChange={setValueNote}
                                                                        value={item.station}
                                                                    />
                                                                </div>{" "}
                                                                <div>
                                                                    <label>loại phiếu</label>
                                                                    <Input
                                                                        name={"typeNote"}
                                                                        placeholder={"Loại phiếu"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                </div>
                                                                <Button
                                                                    className="p-4"
                                                                    onClick={() => send(item?._id)}
                                                                >
                                                                    Gửi
                                                                </Button>
                                                            </section>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <Button className="bg-blue-600" onClick={openEdit}>
                                                    Edit
                                                </Button>
                                                {modalEdit && (
                                                    <div
                                                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                                                        onClick={closeEdit}
                                                    >
                                                        <div
                                                            className="bg-white p-6 rounded-md"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span
                                                                className="absolute top-0 right-0 p-4 cursor-pointer text-xl"
                                                                onClick={closeEdit}
                                                            >
                                                                &times;
                                                            </span>
                                                            <section className="w-[500px] p-4">
                                                                <div>
                                                                    <label>
                                                                        Tên người Gửi/Nhận
                                                                    </label>
                                                                    <Input
                                                                        name={"name"}
                                                                        type={"text"}
                                                                        placeholder={
                                                                            "Tên người Gửi/Nhận"
                                                                        }
                                                                        handleChange={setValueNote}
                                                                        value={item.name}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Địa chỉ</label>
                                                                    <Input
                                                                        name={"address"}
                                                                        type={"text"}
                                                                        placeholder={"địa chỉ"}
                                                                        handleChange={setValueNote}
                                                                        value={item.address}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Số điện thoại</label>
                                                                    <Input
                                                                        name={"phone"}
                                                                        type={"text"}
                                                                        placeholder={
                                                                            "Số điện thoại"
                                                                        }
                                                                        handleChange={setValueNote}
                                                                        value={item.phone}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Hàng hóa</label>
                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"hàng hóa"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                    <label>Đồ ăn</label>

                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"Đồ ăn"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạng thái</label>
                                                                    <Input
                                                                        name={"Status"}
                                                                        type={"text"}
                                                                        placeholder={"Trạng thái"}
                                                                        handleChange={setValueNote}
                                                                        value={item.Status}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạm</label>
                                                                    <Input
                                                                        name={"station"}
                                                                        placeholder={"Trạm"}
                                                                        handleChange={setValueNote}
                                                                        value={item.station}
                                                                    />
                                                                </div>{" "}
                                                                <div>
                                                                    <label>loại phiếu</label>
                                                                    <Input
                                                                        name={"typeNote"}
                                                                        placeholder={"Loại phiếu"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                </div>
                                                                <Button
                                                                    className="p-4"
                                                                    onClick={() =>
                                                                        editNote(item._id)
                                                                    }
                                                                >
                                                                    Gửi
                                                                </Button>
                                                            </section>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <Button className="bg-blue-600" onClick={openView}>
                                                    In đơn hàng
                                                </Button>
                                                {modalView && (
                                                    <div
                                                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                                                        onClick={closeView}
                                                    >
                                                        <div
                                                            className="bg-white p-6 rounded-md"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span
                                                                className="absolute top-0 right-0 p-4 cursor-pointer text-xl"
                                                                onClick={closeView}
                                                            >
                                                                &times;
                                                            </span>
                                                            <section className="w-[1000px] p-4">
                                                                <h1 className="text-center font-bold text-5xl text-black">
                                                                    Magic Post
                                                                </h1>

                                                                <div className="border border-black flex mt-[10px]">
                                                                    <div className="">
                                                                        <div className="flex">
                                                                            <div className="p-4">
                                                                                <h2>
                                                                                    <span className="text-xl font-medium underline">
                                                                                        {" "}
                                                                                        Họ Tên/ địa
                                                                                        chỉ
                                                                                    </span>{" "}
                                                                                    : {item.name}
                                                                                </h2>
                                                                                <p>
                                                                                    {item.address}
                                                                                </p>
                                                                                <p>{item.phone}</p>
                                                                            </div>
                                                                            <div className="border border-l border-black"></div>
                                                                            <div className="p-4">
                                                                                <h2 className="text-xl font-medium underline">
                                                                                    Loại hàng gửi
                                                                                </h2>
                                                                                <p>{item.type}</p>
                                                                            </div>
                                                                            <div className="border border-l border-black"></div>
                                                                            <div className="p-4">
                                                                                <h2 className="text-xl font-medium underline">
                                                                                    Dịch vụ đặc biệt
                                                                                    cộng thêm :
                                                                                </h2>
                                                                                <p>
                                                                                    ......................................................................................
                                                                                </p>
                                                                                <p>
                                                                                    Mã hợp đồng
                                                                                    ............................
                                                                                </p>
                                                                            </div>
                                                                            <Image
                                                                                src={qr}
                                                                                width={300}
                                                                                height={300}
                                                                            />
                                                                        </div>
                                                                        <div className="border border-l border-black"></div>
                                                                        <div className="p-4">
                                                                            <h2 className="text-xl font-medium underline">
                                                                                Cam kết của người
                                                                                gửi
                                                                            </h2>
                                                                            <p>
                                                                                Tôi chấp nhận các
                                                                                điều khoản tại mặt
                                                                                sau phiếu gửi và cam
                                                                                đoan bưu gửi này
                                                                                không chứa những
                                                                                hàng nguy hiểm,
                                                                                những hàng
                                                                                cấm.Trường hợp không
                                                                                phát được tôi sẽ
                                                                                thanh toán tiền
                                                                            </p>
                                                                        </div>
                                                                        <div className="border border-l border-black"></div>
                                                                        <div className="p-4">
                                                                            <h2 className="text-xl font-medium underline">
                                                                                {" "}
                                                                                Ký tên
                                                                            </h2>
                                                                            <p>{item.name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="border border-l border-black"></div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Th>
                                    </Tr>
                                );
                            } else if (typeNoteFilter === "Tất cả") {
                                return (
                                    <Tr keys={i}>
                                        <Td>{i + 1}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.address}</Td>
                                        <Td>{item.phone}</Td>
                                        <Td>{item.type}</Td>

                                        <Td>{item.Status}</Td>
                                        <Th>{item.station}</Th>
                                        <Th>{item.typeNote}</Th>
                                        <Th>
                                            <div className="relative">
                                                <Button
                                                    onClick={openModal}
                                                    className="bg-green-600 my-4"
                                                >
                                                    Gửi tập kết
                                                </Button>

                                                {modalOpen && (
                                                    <div
                                                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                                                        onClick={closeModal}
                                                    >
                                                        <div
                                                            className="bg-white p-6 rounded-md"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span
                                                                className="absolute top-0 right-0 p-4 cursor-pointer text-xl"
                                                                onClick={closeModal}
                                                            >
                                                                &times;
                                                            </span>
                                                            <section className="w-[500px] p-4">
                                                                <div>
                                                                    <label>
                                                                        Tên người Gửi/Nhận
                                                                    </label>
                                                                    <Input
                                                                        name={"name"}
                                                                        type={"text"}
                                                                        placeholder={
                                                                            "Tên người Gửi/Nhận"
                                                                        }
                                                                        handleChange={setValueNote}
                                                                        value={item.name}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Địa chỉ</label>
                                                                    <Input
                                                                        name={"address"}
                                                                        type={"text"}
                                                                        placeholder={"địa chỉ"}
                                                                        handleChange={setValueNote}
                                                                        value={item.address}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Số điện thoại</label>
                                                                    <Input
                                                                        name={"phone"}
                                                                        type={"text"}
                                                                        placeholder={
                                                                            "Số điện thoại"
                                                                        }
                                                                        handleChange={setValueNote}
                                                                        value={item.phone}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Hàng hóa</label>
                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"hàng hóa"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                    <label>Đồ ăn</label>

                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"Đồ ăn"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạng thái</label>
                                                                    <Input
                                                                        name={"Status"}
                                                                        type={"text"}
                                                                        placeholder={"Trạng thái"}
                                                                        handleChange={setValueNote}
                                                                        value={item.Status}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạm</label>
                                                                    <Input
                                                                        name={"station"}
                                                                        placeholder={"Trạm"}
                                                                        handleChange={setValueNote}
                                                                        value={item.station}
                                                                    />
                                                                </div>{" "}
                                                                <div>
                                                                    <label>loại phiếu</label>
                                                                    <Input
                                                                        name={"typeNote"}
                                                                        placeholder={"Loại phiếu"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                </div>
                                                                <Button
                                                                    className="p-4"
                                                                    onClick={() => send(item?._id)}
                                                                >
                                                                    Gửi
                                                                </Button>
                                                            </section>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <Button
                                                    className="bg-blue-600 mb-4"
                                                    onClick={openEdit}
                                                >
                                                    Sửa
                                                </Button>
                                                {modalEdit && (
                                                    <div
                                                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                                                        onClick={closeEdit}
                                                    >
                                                        <div
                                                            className="bg-white p-6 rounded-md"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span
                                                                className="absolute top-0 right-0 p-4 cursor-pointer text-xl"
                                                                onClick={closeEdit}
                                                            >
                                                                &times;
                                                            </span>
                                                            <section className="w-[500px] p-4">
                                                                <div>
                                                                    <label>
                                                                        Tên người Gửi/Nhận
                                                                    </label>
                                                                    <Input
                                                                        name={"name"}
                                                                        type={"text"}
                                                                        placeholder={
                                                                            "Tên người Gửi/Nhận"
                                                                        }
                                                                        handleChange={setValueNote}
                                                                        value={item.name}
                                                                        value={item.name}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Địa chỉ</label>
                                                                    <Input
                                                                        name={"address"}
                                                                        type={"text"}
                                                                        placeholder={"địa chỉ"}
                                                                        handleChange={setValueNote}
                                                                        value={item.address}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Số điện thoại</label>
                                                                    <Input
                                                                        name={"phone"}
                                                                        type={"text"}
                                                                        placeholder={
                                                                            "Số điện thoại"
                                                                        }
                                                                        handleChange={setValueNote}
                                                                        value={item.phone}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Hàng hóa</label>
                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"hàng hóa"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                    <label>Đồ ăn</label>

                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"Đồ ăn"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạng thái</label>
                                                                    <Input
                                                                        name={"Status"}
                                                                        type={"text"}
                                                                        placeholder={"Trạng thái"}
                                                                        handleChange={setValueNote}
                                                                        value={item.Status}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạm</label>
                                                                    <Input
                                                                        name={"station"}
                                                                        placeholder={"Trạm"}
                                                                        handleChange={setValueNote}
                                                                        value={item.station}
                                                                    />
                                                                </div>{" "}
                                                                <div>
                                                                    <label>loại phiếu</label>
                                                                    <Input
                                                                        name={"typeNote"}
                                                                        placeholder={"Loại phiếu"}
                                                                        handleChange={setValueNote}
                                                                    />
                                                                </div>
                                                                <Button
                                                                    className="p-4"
                                                                    onClick={() =>
                                                                        editNote(item._id)
                                                                    }
                                                                >
                                                                    Gửi
                                                                </Button>
                                                            </section>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <Button className="bg-blue-600" onClick={openView}>
                                                    In đơn hàng
                                                </Button>
                                                {modalView && (
                                                    <div
                                                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                                                        onClick={closeView}
                                                    >
                                                        <div
                                                            className="bg-white p-6 rounded-md"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span
                                                                className="absolute top-0 right-0 p-4 cursor-pointer text-xl"
                                                                onClick={closeView}
                                                            >
                                                                &times;
                                                            </span>
                                                            <section className="w-[1000px] p-4">
                                                                <h1 className="text-center font-bold text-5xl text-black">
                                                                    Magic Post
                                                                </h1>

                                                                <div className="border border-black flex mt-[10px]">
                                                                    <div className="">
                                                                        <div className="flex">
                                                                            <div className="p-4">
                                                                                <h2>
                                                                                    <span className="text-xl font-medium underline">
                                                                                        {" "}
                                                                                        Họ Tên/ địa
                                                                                        chỉ
                                                                                    </span>{" "}
                                                                                    : {item.name}
                                                                                </h2>
                                                                                <p>
                                                                                    {item.address}
                                                                                </p>
                                                                                <p>{item.phone}</p>
                                                                            </div>
                                                                            <div className="border border-l border-black"></div>
                                                                            <div className="p-4">
                                                                                <h2 className="text-xl font-medium underline">
                                                                                    Loại hàng gửi
                                                                                </h2>
                                                                                <p>{item.type}</p>
                                                                            </div>
                                                                            <div className="border border-l border-black"></div>
                                                                            <div className="p-4">
                                                                                <h2 className="text-xl font-medium underline">
                                                                                    Dịch vụ đặc biệt
                                                                                    cộng thêm :
                                                                                </h2>
                                                                                <p>
                                                                                    ......................................................................................
                                                                                </p>
                                                                                <p>
                                                                                    Mã hợp đồng
                                                                                    ............................
                                                                                </p>
                                                                            </div>
                                                                            <Image
                                                                                src={qr}
                                                                                width={300}
                                                                                height={300}
                                                                            />
                                                                        </div>
                                                                        <div className="border border-l border-black"></div>
                                                                        <div className="p-4">
                                                                            <h2 className="text-xl font-medium underline">
                                                                                Cam kết của người
                                                                                gửi
                                                                            </h2>
                                                                            <p>
                                                                                Tôi chấp nhận các
                                                                                điều khoản tại mặt
                                                                                sau phiếu gửi và cam
                                                                                đoan bưu gửi này
                                                                                không chứa những
                                                                                hàng nguy hiểm,
                                                                                những hàng
                                                                                cấm.Trường hợp không
                                                                                phát được tôi sẽ
                                                                                thanh toán tiền
                                                                            </p>
                                                                        </div>
                                                                        <div className="border border-l border-black"></div>
                                                                        <div className="p-4">
                                                                            <h2 className="text-xl font-medium underline">
                                                                                {" "}
                                                                                Ký tên
                                                                            </h2>
                                                                            <p>{item.name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="border border-l border-black"></div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Th>
                                    </Tr>
                                );
                            }
                        })}
                    </Tb>
                </Table>
            </div>
        </section>
    );
}

export default TransactionView;
