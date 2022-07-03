import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TaskList from './TaskList';
import * as TaskStories from './Task.stories';
import { TaskType } from '../assets/types/Task';

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
} as ComponentMeta<typeof TaskList>

const Template: ComponentStory<typeof TaskList> = args => <TaskList {...args} />;

const defaultProps = {
  task: {
    ...TaskStories.Default.args?.task as TaskType
  }
}

export const Default = Template.bind({});
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in Task.stories.js.
  tasks: [
    { ...defaultProps.task, id: '1', title: 'Task 1' },
    { ...defaultProps.task, id: '2', title: 'Task 2' },
    { ...defaultProps.task, id: '3', title: 'Task 3' },
    { ...defaultProps.task, id: '4', title: 'Task 4' },
    { ...defaultProps.task, id: '5', title: 'Task 5' },
    { ...defaultProps.task, id: '6', title: 'Task 6' },
  ],
};

const defaultTasks = Default.args.tasks as TaskType[]
export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [
    ...defaultTasks.slice(0, 5) as TaskType[],
    { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};