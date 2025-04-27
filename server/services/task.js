const task = require("../models/task");

const addTask = async (req, res) => {
    try {
        const { tittle, description, priority, status } = req.body;
        const { user } = req;
        if (!tittle || !description) {
            return res.status(404).json({ error: "all fields are required!" })
        };

        if (tittle.length < 6) {
            return res.status(404).json({ error: "Tittle Must have 6 Character!" })
        };

        if (discription.length < 6) {
            return res.status(404).json({ error: "Discription Must have 6 Character!" })
        };
        const newTask = new task({ tittle, description, priority, status });

        await newTask.save();
        user.tasks.push(newTask._Id);
        await user.save();
        return res.status(200).json({ success: "Task Addedd" })

    } catch (error) {
        return res.status(404).json({ error: "Internal server error" });


    }
};

//edit task

const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { tittle, description, priority, status } = req.body;
        if (!tittle || !description) {
            return res.status(404).json({ error: "all fields are required!" })
        };

        if (tittle.length < 6) {
            return res.status(404).json({ error: "Tittle Must have 6 Character!" })
        };

        if (discription.length < 6) {
            return res.status(404).json({ error: "Discription Must have 6 Character!" })
        };
        await task.findByIdAndUpdate(id, { tittle, description, priority, status });
        return res.status(200).json({ success: "Task Updated" })

    } catch (error) {
        return res.status(404).json({ error: "Internal server error" });


    }
};

//getTask
const getTask = async (req, res) => {
    try {
        const { id } = req.params;
      const taskDetails = await task.findById(id);
        return res.status(200).json({taskDetails});
    } catch (error) {
        return res.status(404).json({ error: "Internal server error" });

    }
};

//delete task

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
     await task.findByIdAndDelete(id);
        return res.status(200).json({success: "Task Deleted"});
    } catch (error) {
        return res.status(404).json({ error: "Internal server error" });

    }
};

module.exports ={addTask,editTask,getTask,deleteTask,};