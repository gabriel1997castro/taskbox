import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
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

type TaskApiType = {
  id: number;
  title: string;
  completed: boolean;
};

/*
 * Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data = await response.json();
  const result = data.map((task: TaskApiType) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
  }));
  return result;
});

export const togglePinReducer = (state: TaskStoreType, action: ActionType) => {
  console.log("pin");
  const { id } = action.payload;
  const task = state.tasks.findIndex((task) => task.id === id);
  if (task >= 0) {
    if (state.tasks[task].state !== "TASK_PINNED")
      state.tasks[task].state = "TASK_PINNED";
    else state.tasks[task].state = "TASK_INBOX";
  }
};

export const toggleArchiveReducer = (
  state: TaskStoreType,
  action: ActionType
) => {
  console.log("archive");
  const { id } = action.payload;
  const task = state.tasks.findIndex((task) => task.id === id);
  if (task >= 0) {
    if (state.tasks[task].state !== "TASK_ARCHIVED")
      state.tasks[task].state = "TASK_ARCHIVED";
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
    togglePin: togglePinReducer,
    toggleArchive: toggleArchiveReducer,
  },
  /*
   * Extends the reducer for the async actions
   * You can read more about it at https://redux-toolkit.js.org/api/createAsyncThunk
   */
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        // Add any fetched tasks to the array
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
        state.tasks = [];
      });
  },
});

// The actions contained in the slice are exported for usage in our components
export const { togglePin, toggleArchive } = TasksSlice.actions;

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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
