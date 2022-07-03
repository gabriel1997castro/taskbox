import React, { ReactNode } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TaskList from './TaskList';
import * as TaskStories from './Task.stories';
import { TaskType } from '../assets/types/Task';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import { TaskStoreType, togglePinReducer, toggleArchiveReducer } from '../lib/store';

const defaultProps = {
  task: {
    ...TaskStories.Default.args?.task as TaskType
  }
}

export const MockedState: TaskStoreType = {
  tasks: [
    { ...defaultProps.task, id: '1', title: 'Task 1' },
    { ...defaultProps.task, id: '2', title: 'Task 2' },
    { ...defaultProps.task, id: '3', title: 'Task 3' },
    { ...defaultProps.task, id: '4', title: 'Task 4' },
    { ...defaultProps.task, id: '5', title: 'Task 5' },
    { ...defaultProps.task, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null
}

interface MockStoreProps {
  children: ReactNode,
  taskboxState: {
    tasks: TaskType[]
    status: string,
    error: string | null
  },
}

const MockStore = ({ taskboxState, children }: MockStoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            togglePin: togglePinReducer,
            toggleArchive: toggleArchiveReducer
          }
        }).reducer,
      }
    })}
  >
    {children}
  </Provider>
)

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  excludeStories: /.*MockedState$/
} as ComponentMeta<typeof TaskList>

const Template: ComponentStory<typeof TaskList> = () => <TaskList />;


export const Default = Template.bind({});
Default.decorators = [
  (story) => <MockStore taskboxState={MockedState}>{story()}</MockStore>
]

export const WithPinnedTasks = Template.bind({})
WithPinnedTasks.decorators = [
  (story) => {
    const pinnedTasks = [
      ...MockedState.tasks.slice(1, 5),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ]

    return (
      <MockStore
        taskboxState={{
          ...MockedState,
          tasks: pinnedTasks
        }}
      >
        {story()}
      </MockStore>
    )
  }
]


export const Loading = Template.bind({});
Loading.decorators = [
  (story) => (
    <MockStore
      taskboxState={{
        ...MockedState,
        status: 'loading',
      }}
    >
      {story()}
    </MockStore>
  )
]


export const Empty = Template.bind({});
Empty.decorators = [
  (story) => (
    <MockStore
      taskboxState={{
        tasks: [],
        status: 'empty',
        error: null,
      }}
    >
      {story()}
    </MockStore>
  )
]
