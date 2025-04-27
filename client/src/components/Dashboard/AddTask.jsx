import React, { useState } from "react";
import axios from "axios";

const AddTask = ({setAddTaskDiv}) =>{
    const [Values, setValues] = useState({
        title:"",
         description:"",
          priority:"low",
          status:"yetToStart"
         });
const change =  (e) => {
      const {name, value} = e.target;
      setValues({...Value, [name]:value});
};


const addTask = async(e) => {
e.preventDefault();
try {
    const res = await axios.post("http://localhost:3000/api/v1/addTask", 
        Values,
         {withCredendials:true}
        );
        alert(res.data.success);
        setValues({
            title:"",
         description:"",
          priority:"low",
          status:"yetToStart"
        });
        setAddTaskDiv("hidden");

} catch (error) {
    alert(error.response.data.error);

}
}
    return (
    <div className="bg-white rounded px-4 py-4 w-[40%]">
        <h1 className="text-center font-semibold text-xl">Add Task</h1>
        <hr  className="mb-4 mt-2"/>
        <form className="flex flex-col gap-4">

            <input 
            type="text" 
            className="border px-2 py-1 rounded borde-zinc-300 outline-none"
            placeholder="Title" 
            name="title"
            value ={Values.title}/>

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
                 value ={Values.description}
                 onChange={Change}
                ></textarea>
                <div className="flex-justify-center justify-between gap-4">
                    <button className="w-full bg-green-800 py-2  text-white hover:bg-green-700 transition-all duration-300  rounded" 
                    onClick={addTask}> 
                        Add Task{""};
                        </button>
                    <button className="w-full border border-black py-2 hover:bg-zinc-100 transition-all duration-300  rounded" 
                    onClick={() => setAddTaskDiv("hidden")}>
                        Cancel Task</button>
                </div>
        </form>
    </div>
)};
export default AddTask;