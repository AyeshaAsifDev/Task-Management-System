import React, { useEffect } from "react";
import Header from "../../components/Dashboard/Header";
import AddTask from "../../components/Dashboard/AddTask";
import StackTitle from "../components/Dashboard/StackTitle";
import YetToStart from "../components/YetToStart";
import Complated from "../components/Complated";
import EditTask from "../components/Dashboard/EditTask";
import axios from "axios";
import EditTask from "../components/Dashboard/EditTask";

const Dashboard = () => {
    const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
    const [Tasks, setTasks] = useState();
    const [EditTaskDiv, setEditTaskDiv] = useState("hidden");
    const [EditTaskId, setEditTaskId] = useState(second);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res =
                    await axios.get("http://localhost:3000/api/v1/getUserDetails", {
                        withCredentials: true,

                    });
                setTasks(res.data.tasks);
            } catch (error) {

            }
        };
        fetchUserDetails();
if(window.sessionStorage.getItem("editTaskId"))
{
    setEditTaskDiv("block");
    setEditTaskid(window.sessionStorage.getItem("editTaskId"));
}
    }, [AddTaskDiv]);
    // console.log(Tasks);
    return (
        <div className="w-full relative">
            <div className="bg-white">
                <Header setAddTaskDiv={setAddTaskDiv} />
            </div >
            <div className="px-12 py-4 gap-12 bg0zinc-100 min-h[89vh] max-h-auto">
                <div className="w-1/3">
                    <StackTitle title={"Yet To Start"} />
                    <div className="pt-2 ">
                        [Tasks && <YetToStart task={Tasks[0].yetToStart} />]
                    </div>


                </div>
                <div className="w-1/3">
                    <StackTitle title={" In Progress"} />
                    <div className="pt-2 ">
                        [Tasks && <inProgress task={Tasks[1].inProgress} />]

                    </div>
                </div>
                <div className="w-1/3">
                    <StackTitle title={"Complated"} />
                    <div className="pt-2 ">
                        [Tasks && < Complated task={Tasks[2].complated} />]

                    </div>
                </div>
            </div>

            <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity 85`}>
            </div>

            <div
                className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
                <AddTask setAddTaskDiv={setAddTaskDiv} />
            </div>


            <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity 85`}>
            </div>

            <div
                className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
                <EditTask setEditTaskId={setEditTaskId} setEditTaskDiv={setEditTaskDiv} />
            </div>



        </div >
    )
}
export default Dashboard;