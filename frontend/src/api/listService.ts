import axios_instance from './axios.ts'; // Import your axios instance
import { ListCreate, ListUpdate, ListSchema } from '../models/ListSchema.ts'; // Update with correct imports for schemas

// Create List
export const createList = async (list: ListCreate): Promise<ListSchema> => {
    try {
        const response = await axios_instance.post<ListSchema>('/lists', list);
        return response.data; // Return created list data
    } catch (error) {
        console.error('Error creating list:', error); // Log the error for debugging purposes
        throw error; // Re-throw the error so the component can handle it
    }
};

// Get List by ID
export const getList = async (id: number): Promise<ListSchema> => {
    try {
        const response = await axios_instance.get<ListSchema>(`/lists/${id}`);
        return response.data; // Return the list data
    } catch (error) {
        console.error(`Error fetching list with ID ${id}:`, error); // Log the error
        throw error; // Re-throw the error so the component can handle it
    }
};

// Get All Lists
export const getAllLists = async (): Promise<ListSchema[]> => {
    try {
        const response = await axios_instance.get<ListSchema[]>('/lists');
        return response.data; // Return all lists
    } catch (error) {
        console.error('Error fetching all lists:', error); // Log the error
        throw error; // Re-throw the error for further handling by the component
    }
};

// Update List by ID
export const updateList = async (id: number, list: ListUpdate): Promise<ListSchema> => {
    try {
        const response = await axios_instance.put<ListSchema>(`/lists/${id}`, list);
        return response.data; // Return the updated list data
    } catch (error) {
        console.error(`Error updating list with ID ${id}:`, error); // Log the error
        throw error; // Re-throw the error so the component can handle it
    }
};

// Delete List by ID
export const deleteList = async (id: number): Promise<void> => {
    try {
        await axios_instance.delete(`/lists/${id}`); // No return data, so just perform the delete
    } catch (error) {
        console.error(`Error deleting list with ID ${id}:`, error); // Log the error
        throw error; // Re-throw the error for handling by the component
    }
};