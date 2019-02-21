import { taskRepository as repository } from '../repositories/task-repository'
import { Task } from "../models/task";
import { getCurrentDate, getCurrentTime } from "./date-time-service";
import { fileService } from "./file-service";

class TaskService {

    async getAllTasks() {
        return await repository.getAllTasks();
    }

    async getAllTasksBySearch(search) {
        return await repository.getAllTasksBySearch(search);
    }

    async addTask(taskToCreate) {
        const fileExists = Boolean(taskToCreate.file);
        const filename = fileExists? taskToCreate.file.name : '';

        if (fileExists) {
            const fileBuffer = new Buffer(new Uint8Array(taskToCreate.file.data));
            fileService.uploadFile(filename, fileBuffer);
        }

        const taskToSave = new Task({
            name: taskToCreate.name,
            status: taskToCreate.status,
            date_created: getCurrentDate(),
            time_created: getCurrentTime(),
            file: filename
        });
        return await repository.addTask(taskToSave);
    }

    async deleteTasks(identifiers) {
        await repository.deleteTasks(identifiers)
    }
}

const taskService = new TaskService();

export {taskService}
