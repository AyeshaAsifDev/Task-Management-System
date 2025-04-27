import React, { useEffect, useState } from "react";
import axios from "axios";

const EditTask = ({ setEditTaskDiv, EditTaskId }) => {

    const [Values, setValues] = useState({
        title: "",
        description: "",
        priority: "low",
        status: "yetToStart"
    });
    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...Value, [name]: value });
    };

    //console.log(EditTaskId);
    useEffect(() => {

        const fetch = async () => {


            try {

             const res =  await axios.get(`http://localhost:3000/api/v1/getTask/${EditTaskId}`, {withCredentials:true,});

             setValues(res.data.taskDetails);
            } catch (error) {}
        };
        fetch();
    }, []);


    const editTask = async (e,id) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3000/api/v1/editTask/${id}`,
               
                { withCredendials: true }
            );
            alert(res.data.success);
            window.sessionStorage.clear("editTaskId");
            setEditTaskDiv("hidden");
  window.location.reload();
        } catch (error) {
            alert(error.response.data.error);

        }
    };




    const deleteTask = async (e,id) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/deleteTask/${id}`,
                Values,
                { withCredendials: true }
            );
            alert(res.data.success);
            window.sessionStorage.clear("editTaskId");
            setEditTaskDiv("hidden");
  window.location.reload();
        } catch (error) {
            alert(error.response.data.error);

        }
    };
    return (

        <div className="bg-white rounded px-4 py-4 w-[40%]">
            <h1 className="text-center font-semibold text-xl">Edit Task</h1>
            <hr className="mb-4 mt-2" />
            <form className="flex flex-col gap-4">

                <input
                    type="text"
                    className="border px-2 py-1 rounded borde-zinc-300 outline-none"
                    placeholder="Title"
                    name="title"
                    value={Values.title} />

                <div className="flex-justify-center justify-between gap-4">
                    <div className="w-full">
                        <h3 className="mb-2">Select Priority</h3>
                        <select name="priority" id="" className="border px-2 py-1 rounded borde-zinc-300 outline-none w-full">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <h3 className="mb-2">Select Status</h3>
                        <select name="status" id="" className="border px-2 py-1 rounded borde-zinc-300 outline-none w-full">
                            <option value="YetToStart">Yet To Start</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Complated">Complated</option>
                        </select>
                    </div>

                </div>
                <textarea name="description" id=""
                    placeholder="Discription"
                    className="border px-2 py-1 rounded borde-zinc-300 outline-none h-[24vh]"
                    value={Values.description}
                    onChange={Change}
                ></textarea>

                <div className="flex-justify-center justify-between gap-4">
                    <button className="w-full bg-green-800 py-2  text-white hover:bg-green-700 transition-all duration-300  rounded"
                        onClick={(e) => editTask(e,Values._id)}
                        
                        >
                        Edit Task{""};
                    </button>

                    <button className="w-full border border-red-600 text-red-600 py-2 hover:bg-red-100 transition-all duration-300  rounded"
                        onClick={(e) => deleteTask(e,Values._id)}>
                        Delete Task</button>

                    <button className="w-full border border-black py-2 hover:bg-zinc-100 transition-all duration-300  rounded"
                        onClick={(event) => {
                            event.preventDefault();
                            window.sessionStorage.clear("editTaskId");
                            setEditTaskDiv("hidden");
                        }}>
                        Cancel Task</button>
                </div>
            </form>
        </div>
    )
};

export default EditTask;