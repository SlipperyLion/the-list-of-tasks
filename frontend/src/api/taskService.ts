// .ts

import axios_instance from "./axios.ts"; //
import { TaskSchema, TaskCreate, TaskUpdate, TaskPatch } from "../models/TaskSchema.ts";

export const createTask = async (task: TaskCreate): Promise<TaskSchema> => {
    try {
        const response = await axios_instance.post<TaskSchema>("/tasks", task);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error; // Re-throw so the caller can handle the error
    }
};

export const getTask = async (id: number): Promise<TaskSchema> => {
    try {
        const response = await axios_instance.get<TaskSchema>(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching task:", error);
        throw error;
    }
};

export const getAllTasks = async (listId: number): Promise<TaskSchema[]> => {
    try {
        const response = await axios_instance.get<TaskSchema[]>(`/tasks/list/${listId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const updateTask = async (id: number, task: TaskUpdate): Promise<TaskSchema> => {
    try {
        const response = await axios_instance.put<TaskSchema>(`/tasks/${id}`, task);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const patchTask = async (id: number, task: TaskPatch): Promise<TaskSchema> => {
    try {
        const response = await axios_instance.patch<TaskSchema>(`/tasks/${id}`, task);
        return response.data;
    } catch (error) {
        console.error("Error patching task:", error);
        throw error;
    }
};

export const deleteTask = async (id: number): Promise<void> => {
    try {
        await axios_instance.delete(`/tasks/${id}`);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};