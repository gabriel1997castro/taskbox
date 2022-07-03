/* A simple redux store/actions/reducer implementation.
 * A true app would be more complex and separated into different files.
 */
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ActionType } from "../assets/types/Redux";
import { TaskType } from "../assets/types/Task";

export type TaskStoreType = {
  tasks: TaskType[];
  status: string;
  error: string | null;
};
const defaultTasks: TaskType[] = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

const TaskBoxData: TaskStoreType = {
  tasks: defaultTasks,
  status: "idle",
  error: null,
};

export const updateTaskStateReducer = (
  state: TaskStoreType,
  action: ActionType
) => {
  const { id } = action.payload;
  const task = state.tasks.findIndex((task) => task.id === id);
  if (task >= 0) {
    console.log(state.tasks[task].state);
    if (state.tasks[task].state !== "TASK_PINNED")
      state.tasks[task].state = "TASK_PINNED";
    else state.tasks[task].state = "TASK_INBOX";
  }
};

/*
 * The store is created here.
 * You can read more about Redux Toolkit's slices in the docs:
 * https://redux-toolkit.js.org/api/createSlice
 */
const TasksSlice = createSlice({
  name: "taskbox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: updateTaskStateReducer,
  },
});

// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

/*
 * Our app's store configuration goes here.
 * Read more about Redux's configureStore in the docs:
 * https://redux-toolkit.js.org/api/configureStore
 */
const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
