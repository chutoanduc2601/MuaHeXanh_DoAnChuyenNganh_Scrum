import axios from "axios";
import type { Application } from "../types/application";

const API_BASE_URL = "http://localhost:8080/api";

export const getApplicationsByProject = async (projectId: string | number): Promise<Application[]> => {
    const response = await axios.get(`${API_BASE_URL}/applications/project/${projectId}`);
    return response.data;
};

export const updateApplicationStatus = async (
    applicationId: number,
    status: string
): Promise<Application> => {
    const response = await axios.put(`${API_BASE_URL}/applications/${applicationId}/status`, {
        status,
    });
    return response.data;
};

export const applyToProject = async (userId: number, projectId: number): Promise<Application> => {
    const response = await axios.post(`${API_BASE_URL}/applications`, {
        userId,
        projectId,
    });
    return response.data;
};

export const getProjectById = async (projectId: string | number) => {
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`);
    return response.data;
};