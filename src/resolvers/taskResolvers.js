import { tasks } from '../models/task.js';

const taskResolvers={
    Query: {
        tasks: async (_, __, { user, permit }) => {
            await permit.check(user, 'read', 'task');
            return tasks;
        },
        task: async (_, { id }, { user, permit }) => {
            await permit.check(user, 'read', 'task');
            return tasks.find(task => task.id===id);
        },
    },
    Mutation: {
        createTask: async (_, { title, description }, { user, permit }) => {
            await permit.check(user, 'create', 'task');
            const newTask={ id: String(tasks.length+1), title, description };
            tasks.push(newTask);
            return newTask;
        },
        updateTask: async (_, { id, title, description }, { user, permit }) => {
            await permit.check(user, 'update', 'task');
            const task=tasks.find(task => task.id===id);
            if (!task) throw new Error('Task not found');
            if (title!==undefined) task.title=title;
            if (description!==undefined) task.description=description;
            return task;
        },
        deleteTask: async (_, { id }, { user, permit }) => {
            await permit.check(user, 'delete', 'task');
            const index=tasks.findIndex(task => task.id===id);
            if (index===-1) throw new Error('Task not found');
            tasks.splice(index, 1);
            return true;
        },
    },
};

export default taskResolvers;
