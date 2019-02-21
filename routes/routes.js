const BASE_URL = '/node';

const TASKS_BASE_URL = '/tasks';
const TASKS_SEARCH_URL = TASKS_BASE_URL + '/search';
const TASKS_ADD_URL = TASKS_BASE_URL + '/add';
const TASKS_DELETE_URL = TASKS_BASE_URL + '/delete';

const AUTH_BASE_URL = '/auth';
const AUTH_LOGIN_URL = AUTH_BASE_URL + '/login';
const AUTH_IS_AUTHORIZED_URL = AUTH_BASE_URL + '/is-authorized';

export {
    BASE_URL,
    TASKS_BASE_URL,
    TASKS_SEARCH_URL,
    AUTH_LOGIN_URL,
    AUTH_IS_AUTHORIZED_URL,
    TASKS_ADD_URL,
    TASKS_DELETE_URL
}
