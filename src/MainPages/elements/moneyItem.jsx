import DeleteItem from "./forms/deleteItem";
import EditItem from "./forms/editItem";
import { useState } from "react";
import propTypes from 'prop-types';

export default function MoneyItem({data, fetch}) {
    const [deleteItem, setDeleteItem] = useState(false);
    const [editItem, setEditItem] = useState(false);
    return (
        <div className="rounded-lg text-white text-start border-2 gap-6 w-full mx-auto flex borderOuter p-4 bg-slate-800">
            {deleteItem && <DeleteItem setOpen={setDeleteItem} data={data} fetch={fetch}/>}
            {editItem && <EditItem setOpen={setEditItem} fetch={fetch} data={data}/>}
            <p className="text-md flex-initial w-[19%] content-center font-semibold">{data.title}</p>
            <p className={`text-md flex-initial w-[18%] content-center font-bold text-shadow-glow`} style={{'--color': (data.amount < 0 ? "rgb(255,0,0)" : "rgb(0,255,0)")}}>{data.amount}</p>
            <p className="text-md flex-initial w-[19%] content-center font-semibold">{data.date}</p>
            <p className="text-md flex-initial w-[20%] content-center font-semibold">{data.pack === "" ? "none" : data.pack}</p>
            <div className="flex justify-end w-[17%] gap-2">
                <button onClick={() => setEditItem(true)} className="w-1/2 bodyButtonBlue py-1 font-semibold duration-100 ease-linear transition-all text-white rounded-full hover:bg-white hover:text-teal-500">Edit</button>
                <button onClick={() => setDeleteItem(true)} className="w-1/2 bg-red-500 font-semibold duration-100 ease-linear transition-all text-white rounded-full hover:bg-white hover:text-red-500">Delete</button>
            </div>
        </div>
    );
}

MoneyItem.propTypes ={
    data: propTypes.object.isRequired,
    fetch: propTypes.func.isRequired
}