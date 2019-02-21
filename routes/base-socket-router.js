import { taskController } from '../controllers/task-controller'
import {
    AUTH_IS_AUTHORIZED_URL,
    AUTH_LOGIN_URL,
    TASKS_ADD_URL,
    TASKS_BASE_URL,
    TASKS_DELETE_URL,
    TASKS_SEARCH_URL
} from "./routes";
import { authController } from "../controllers/auth-controller";


class BaseSocketRouter {

    setUpSocketRouting(socket) {
        socket.on(AUTH_LOGIN_URL, (data) => authController.login(socket, data));
        socket.on(AUTH_IS_AUTHORIZED_URL, (data) => authController.isAuthorized(socket, data));
        socket.on(TASKS_BASE_URL, () => taskController.showAllTasks(socket));
        socket.on(TASKS_SEARCH_URL, (data) => taskController.searchTasks(socket, data));
        socket.on(TASKS_ADD_URL, (data) => taskController.addTask(data));
        socket.on(TASKS_DELETE_URL, (data) => taskController.deleteTasks(data));
    }
}

const baseSocketRouter = new BaseSocketRouter();

export { baseSocketRouter }
