"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FilePlus2 } from "lucide-react";
import Table from "@/components/table/table";
import Thead from "@/components/thead/thead";
import Tr from "@/components/tr/tr";
import Th from "@/components/th/th";
import Tb from "@/components/tb/tb";
import Td from "@/components/td/td";
import { useEffect, useState } from "react";
import {
    AllGathering,
    GetOneGathering,
    sendNote,
    sendToGatherings,
    update,
} from "@/service/gathering";
import AllUser from "@/components/alluser/all";
import { toast } from "react-toastify";
import Input from "@/components/input/input";
import { updateNote } from "@/service/NOTE";
import qr from "@/../../public/img/qr.png";
import Image from "next/image";

function Gathering({ params }) {
    const [gathering, setGathering] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [modalOpens, setModalOpens] = useState(false);
    const openModals = () => setModalOpens(true);
    const closeModals = () => setModalOpens(false);

    const [modalEdit, setModalEdit] = useState(false);
    const openEdit = () => setModalEdit(true);
    const closeEdit = () => setModalEdit(false);

    const [modalView, setModalView] = useState(false);
    const openView = () => setModalView(true);
    const closeView = () => setModalView(false);
    const [submitValue, setSubmitValue] = useState();
    const [user, setUser] = useState({
        teller: [],
    });

    const [typeNoteFilter, setTypeNoteFilter] = useState("Tất cả");
    const [gatherings, setGatherings] = useState();
    useEffect(() => {
        const data = async () => {
            const res = await GetOneGathering(params.id);
            return setGathering(res);
        };
        data();
        const dataGathering = async () => {
            const res = await AllGathering();
            return setGatherings(res);
        };
        dataGathering();
    }, []);
    function addTeller(e) {
        if (e.checked !== true) {
            setUser((prevState) => ({
                teller: [],
            }));
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
        const data = await update(params.id, user);
        if (data.message == "Thêm thành công") {
            toast.success(data.message, { theme: "dark", position: "top-center" });
            window.location.reload();
        } else {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    }
    async function setValueSendNote(e) {
        setSubmitValue((prevState) => ({
            ...prevState,
            [e.name]: e.value,
        }));
    }
    async function send(idNote) {
        const { Status, address, name, phone, station, type, typeNote } = submitValue;
        const data = await sendNote(submitValue.gatheringId, params.id, {
            _id: idNote,
            Status,
            address,
            name,
            phone,
            station,
            type,
            typeNote,
        });
        if (data.message == "Gửi thành công") {
            toast.success(data.message, { theme: "dark", position: "top-center" });
            window.location.reload();
        } else {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    }
    async function sendToGathering(id) {
        const { Status, address, name, phone, station, type, typeNote } = submitValue;

        const data = await sendToGatherings(submitValue.gatheringId, params.id, {
            _id: id,
            Status,
            address,
            name,
            phone,
            station,
            type,
            typeNote,
        });
        if (data.message == "Gửi thành công") {
            toast.success(data.message, { theme: "dark", position: "top-center" });
            window.location.reload();
        } else {
            toast.error(data.message, { theme: "dark", position: "top-center" });
        }
    }
    async function editNote(id) {
        const { Status, address, name, phone, station, type, typeNote } = submitValue;

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
    console.log(typeNoteFilter);
    return (
        <section className="w-full">
            <h1 className="p-5 text-3xl font-bold">
                Quản lý Điểm Tập kết : {gathering?.pointName}
            </h1>

            <div className="p-5 flex space-x-20 items-center">
                <h2 className="text-xl">Thông tin người quản lý khu : {gathering?.name}</h2>
                <Link href={`/admin/manager/gathering/create-note/${params.id}`}>
                    <Button variant="outline">
                        <FilePlus2 />
                    </Button>
                </Link>
                <select>
                    <option>--Điểm giao dịch quản lý--</option>
                    {gathering?.transactions?.map((item) => {
                        return <option>{item.pointName}</option>;
                    })}
                </select>
                {gathering?.teller?.length > 0 && (
                    <select>
                        <option>--Người ở điểm tập kết --</option>
                        {gathering?.teller?.map((item) => {
                            return <option>{item.name}</option>;
                        })}
                    </select>
                )}
            </div>
            <div className="p-4">
                {" "}
                <AllUser role={"tellersGatheringPoint"} type={true} handle={addTeller} />
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
                        {gathering?.note?.map((item, i) => {
                            if (typeNoteFilter === item.typeNote) {
                                return (
                                    <Tr>
                                        <Td>{i + 1}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.address}</Td>
                                        <Td>{item.phone}</Td>
                                        <Td>{item.type}</Td>

                                        <Td>{item.Status}</Td>
                                        <Th>{item.station}</Th>
                                        <Th>{item.typeNote}</Th>
                                        <Td>
                                            <div className="relative">
                                                <Button onClick={openModal}>
                                                    Gửi tới điểm Giao dịch
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Địa chỉ</label>
                                                                    <Input
                                                                        name={"address"}
                                                                        type={"text"}
                                                                        placeholder={"địa chỉ"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Hàng hóa</label>
                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"hàng hóa"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                    <label>Đồ ăn</label>

                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"Đồ ăn"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạng thái</label>
                                                                    <Input
                                                                        name={"Status"}
                                                                        type={"text"}
                                                                        placeholder={"Trạng thái"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạm</label>
                                                                    <Input
                                                                        name={"station"}
                                                                        placeholder={"Trạm"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>{" "}
                                                                <div>
                                                                    <label>loại phiếu</label>
                                                                    {/* <Input
                                                                name={"typeNote"}
                                                                placeholder={"Loại phiếu"}
                                                                handleChange={setValueSendNote}
                                                            /> */}
                                                                    <select
                                                                        name="typeNote"
                                                                        onChange={(e) =>
                                                                            setValueSendNote(
                                                                                e.target
                                                                            )
                                                                        }
                                                                    >
                                                                        <option>
                                                                            -- Chọn Tình Trạng --
                                                                        </option>
                                                                        <option
                                                                            value={"Đã xác nhận"}
                                                                        >
                                                                            Đã xác nhận
                                                                        </option>
                                                                        <option
                                                                            value={"Chưa xác nhận"}
                                                                        >
                                                                            Chưa xác nhận
                                                                        </option>
                                                                        <option value={"Trả hàng"}>
                                                                            Trả hàng
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <select
                                                                    name="gatheringId"
                                                                    onChange={(e) =>
                                                                        setValueSendNote(e.target)
                                                                    }
                                                                >
                                                                    <option>
                                                                        --Điểm giao dịch quản lý--
                                                                    </option>
                                                                    {gathering?.transactions?.map(
                                                                        (item) => {
                                                                            return (
                                                                                <option
                                                                                    value={
                                                                                        item.idTransaction
                                                                                    }
                                                                                >
                                                                                    {item.pointName}
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                                </select>
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Địa chỉ</label>
                                                                    <Input
                                                                        name={"address"}
                                                                        type={"text"}
                                                                        placeholder={"địa chỉ"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Hàng hóa</label>
                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"hàng hóa"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                    <label>Đồ ăn</label>

                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"Đồ ăn"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạng thái</label>
                                                                    <Input
                                                                        name={"Status"}
                                                                        type={"text"}
                                                                        placeholder={"Trạng thái"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạm</label>
                                                                    <Input
                                                                        name={"station"}
                                                                        placeholder={"Trạm"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>{" "}
                                                                <div>
                                                                    <label>loại phiếu</label>
                                                                    {/* <Input
                                                                name={"typeNote"}
                                                                placeholder={"Loại phiếu"}
                                                                handleChange={setValueSendNote}
                                                            /> */}
                                                                    <select
                                                                        name="typeNote"
                                                                        onChange={(e) =>
                                                                            setValueSendNote(
                                                                                e.target
                                                                            )
                                                                        }
                                                                    >
                                                                        <option>
                                                                            -- Chọn Tình Trạng --
                                                                        </option>
                                                                        <option
                                                                            value={"Đã xác nhận"}
                                                                        >
                                                                            Đã xác nhận
                                                                        </option>
                                                                        <option
                                                                            value={"Chưa xác nhận"}
                                                                        >
                                                                            Chưa xác nhận
                                                                        </option>
                                                                        <option value={"Trả hàng"}>
                                                                            Trả hàng
                                                                        </option>
                                                                    </select>
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
                                                <Button onClick={openModals}>
                                                    Gửi tới điểm Tập kết
                                                </Button>
                                                {modalOpens && (
                                                    <div
                                                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                                                        onClick={closeModals}
                                                    >
                                                        <div
                                                            className="bg-white p-6 rounded-md"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span
                                                                className="absolute top-0 right-0 p-4 cursor-pointer text-xl"
                                                                onClick={closeModals}
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Địa chỉ</label>
                                                                    <Input
                                                                        name={"address"}
                                                                        type={"text"}
                                                                        placeholder={"địa chỉ"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Hàng hóa</label>
                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"hàng hóa"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                    <label>Đồ ăn</label>

                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"Đồ ăn"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạng thái</label>
                                                                    <Input
                                                                        name={"Status"}
                                                                        type={"text"}
                                                                        placeholder={"Trạng thái"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạm</label>
                                                                    <Input
                                                                        name={"station"}
                                                                        placeholder={"Trạm"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>{" "}
                                                                <div>
                                                                    <label>loại phiếu</label>
                                                                    {/* <Input
                                                                name={"typeNote"}
                                                                placeholder={"Loại phiếu"}
                                                                handleChange={setValueSendNote}
                                                            /> */}
                                                                    <select
                                                                        name="typeNote"
                                                                        onChange={(e) =>
                                                                            setValueSendNote(
                                                                                e.target
                                                                            )
                                                                        }
                                                                    >
                                                                        <option>
                                                                            -- Chọn Tình Trạng --
                                                                        </option>
                                                                        <option
                                                                            value={"Đã xác nhận"}
                                                                        >
                                                                            Đã xác nhận
                                                                        </option>
                                                                        <option
                                                                            value={"Chưa xác nhận"}
                                                                        >
                                                                            Chưa xác nhận
                                                                        </option>
                                                                        <option value={"Trả hàng"}>
                                                                            Trả hàng
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <select
                                                                    name="gatheringId"
                                                                    onChange={(e) =>
                                                                        setValueSendNote(e.target)
                                                                    }
                                                                >
                                                                    <option>
                                                                        --Điểm giao dịch Tập kết--
                                                                    </option>
                                                                    {gatherings?.map((item) => {
                                                                        return (
                                                                            <option
                                                                                value={item._id}
                                                                            >
                                                                                {item.pointName}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                                <Button
                                                                    className="p-4"
                                                                    onClick={() =>
                                                                        sendToGathering(item?._id)
                                                                    }
                                                                >
                                                                    Gửi
                                                                </Button>
                                                            </section>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Td>
                                    </Tr>
                                );
                            } else if (typeNoteFilter === "Tất cả") {
                                return (
                                    <Tr>
                                        <Td>{i + 1}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.address}</Td>
                                        <Td>{item.phone}</Td>
                                        <Td>{item.type}</Td>

                                        <Td>{item.Status}</Td>
                                        <Th>{item.station}</Th>
                                        <Th>{item.typeNote}</Th>
                                        <Td>
                                            <div className="relative">
                                                <Button
                                                    onClick={openModal}
                                                    className="p-1 bg-green-500 my-2"
                                                >
                                                    Gửi Giao dịch
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Địa chỉ</label>
                                                                    <Input
                                                                        name={"address"}
                                                                        type={"text"}
                                                                        placeholder={"địa chỉ"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Hàng hóa</label>
                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"hàng hóa"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                    <label>Đồ ăn</label>

                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"Đồ ăn"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạng thái</label>
                                                                    <Input
                                                                        name={"Status"}
                                                                        type={"text"}
                                                                        placeholder={"Trạng thái"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạm</label>
                                                                    <Input
                                                                        name={"station"}
                                                                        placeholder={"Trạm"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>{" "}
                                                                <div>
                                                                    <label>loại phiếu</label>
                                                                    <select
                                                                        name="typeNote"
                                                                        onChange={(e) =>
                                                                            setValueSendNote(
                                                                                e.target
                                                                            )
                                                                        }
                                                                    >
                                                                        <option>
                                                                            -- Chọn Tình Trạng --
                                                                        </option>
                                                                        <option
                                                                            value={"Đã xác nhận"}
                                                                        >
                                                                            Đã xác nhận
                                                                        </option>
                                                                        <option
                                                                            value={"Chưa xác nhận"}
                                                                        >
                                                                            Chưa xác nhận
                                                                        </option>
                                                                        <option value={"Trả hàng"}>
                                                                            Trả hàng
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <select
                                                                    name="gatheringId"
                                                                    onChange={(e) =>
                                                                        setValueSendNote(e.target)
                                                                    }
                                                                >
                                                                    <option>
                                                                        --Điểm giao dịch quản lý--
                                                                    </option>
                                                                    {gathering?.transactions?.map(
                                                                        (item) => {
                                                                            return (
                                                                                <option
                                                                                    value={
                                                                                        item.idTransaction
                                                                                    }
                                                                                >
                                                                                    {item.pointName}
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                                </select>
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Địa chỉ</label>
                                                                    <Input
                                                                        name={"address"}
                                                                        type={"text"}
                                                                        placeholder={"địa chỉ"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Hàng hóa</label>
                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"hàng hóa"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                    <label>Đồ ăn</label>

                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"Đồ ăn"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạng thái</label>
                                                                    <Input
                                                                        name={"Status"}
                                                                        type={"text"}
                                                                        placeholder={"Trạng thái"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạm</label>
                                                                    <Input
                                                                        name={"station"}
                                                                        placeholder={"Trạm"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>{" "}
                                                                <div>
                                                                    <label>loại phiếu</label>
                                                                    {/* <Input
                                                                name={"typeNote"}
                                                                placeholder={"Loại phiếu"}
                                                                handleChange={setValueSendNote}
                                                            /> */}
                                                                    <select
                                                                        name="typeNote"
                                                                        onChange={(e) =>
                                                                            setValueSendNote(
                                                                                e.target
                                                                            )
                                                                        }
                                                                    >
                                                                        <option>
                                                                            -- Chọn Tình Trạng --
                                                                        </option>
                                                                        <option
                                                                            value={"Đã xác nhận"}
                                                                        >
                                                                            Đã xác nhận
                                                                        </option>
                                                                        <option
                                                                            value={"Chưa xác nhận"}
                                                                        >
                                                                            Chưa xác nhận
                                                                        </option>
                                                                        <option value={"Trả hàng"}>
                                                                            Trả hàng
                                                                        </option>
                                                                    </select>
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
                                                <Button
                                                    onClick={openModals}
                                                    className="p-1 bg-pink-500 my-2"
                                                >
                                                    Gửi Tập kết
                                                </Button>
                                                {modalOpens && (
                                                    <div
                                                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                                                        onClick={closeModals}
                                                    >
                                                        <div
                                                            className="bg-white p-6 rounded-md"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span
                                                                className="absolute top-0 right-0 p-4 cursor-pointer text-xl"
                                                                onClick={closeModals}
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Địa chỉ</label>
                                                                    <Input
                                                                        name={"address"}
                                                                        type={"text"}
                                                                        placeholder={"địa chỉ"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
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
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Hàng hóa</label>
                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"hàng hóa"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                    <label>Đồ ăn</label>

                                                                    <Input
                                                                        type={"radio"}
                                                                        name={"type"}
                                                                        value={"Đồ ăn"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạng thái</label>
                                                                    <Input
                                                                        name={"Status"}
                                                                        type={"text"}
                                                                        placeholder={"Trạng thái"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label>Trạm</label>
                                                                    <Input
                                                                        name={"station"}
                                                                        placeholder={"Trạm"}
                                                                        handleChange={
                                                                            setValueSendNote
                                                                        }
                                                                    />
                                                                </div>{" "}
                                                                <div>
                                                                    <label>loại phiếu</label>
                                                                    {/* <Input
                                                                name={"typeNote"}
                                                                placeholder={"Loại phiếu"}
                                                                handleChange={setValueSendNote}
                                                            /> */}
                                                                    <select
                                                                        name="typeNote"
                                                                        onChange={(e) =>
                                                                            setValueSendNote(
                                                                                e.target
                                                                            )
                                                                        }
                                                                    >
                                                                        <option>
                                                                            -- Chọn Tình Trạng --
                                                                        </option>
                                                                        <option
                                                                            value={"Đã xác nhận"}
                                                                        >
                                                                            Đã xác nhận
                                                                        </option>
                                                                        <option
                                                                            value={"Chưa xác nhận"}
                                                                        >
                                                                            Chưa xác nhận
                                                                        </option>
                                                                        <option value={"Trả hàng"}>
                                                                            Trả hàng
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <select
                                                                    name="gatheringId"
                                                                    onChange={(e) =>
                                                                        setValueSendNote(e.target)
                                                                    }
                                                                >
                                                                    <option>
                                                                        --Điểm giao dịch Tập kết--
                                                                    </option>
                                                                    {gatherings?.map((item) => {
                                                                        return (
                                                                            <option
                                                                                value={item._id}
                                                                            >
                                                                                {item.pointName}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                                <Button
                                                                    className="p-4"
                                                                    onClick={() =>
                                                                        sendToGathering(item?._id)
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
                                        </Td>
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

export default Gathering;
