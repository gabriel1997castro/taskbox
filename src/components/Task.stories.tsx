import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Task, { TaskProps } from './Task';
import { TaskType } from '../assets/types/Task';

export default {
  component: Task,
  title: 'Task'
} as ComponentMeta<typeof Task>


const Template: ComponentStory<typeof Task> = (args: TaskProps) => <Task {...args} />;

export const Default = Template.bind({})

const defaultProps = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX'
  } as TaskType
}

Default.args = {
  ...defaultProps,
}

export const Pinned = Template.bind({})
Pinned.args = {
  task: {
    ...defaultProps.task,
    state: 'TASK_PINNED',
  }
}

export const Archived = Template.bind({})
Archived.args = {
  task: {
    ...defaultProps.task,
    state: 'TASK_ARCHIVED',
  }
}