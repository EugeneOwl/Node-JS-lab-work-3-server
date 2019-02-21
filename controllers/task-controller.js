import {taskService as service} from '../services/task-service'
import { TASKS_BASE_URL, TASKS_SEARCH_URL } from "../routes/routes";

class TaskController {

    async showAllTasks(socket) {
        const tasks = await service.getAllTasks();
        socket.emit(TASKS_BASE_URL, tasks);
    }

    async searchTasks(socket, data) {
        const tasks = await service.getAllTasksBySearch(data);
        socket.emit(TASKS_SEARCH_URL, tasks);
    }

    async addTask(data) {
        await service.addTask(data);
    }

    async deleteTasks(data) {
        await service.deleteTasks(data);
    }
}

const taskController = new TaskController();

export {taskController}
