import gsAxios from "./gsAxios";

export const getProjects = (project) => gsAxios.post('/projects/get',project);

export const postProject = (project) => gsAxios.post('/projects/',project);

export const getProjectById = (body) => gsAxios.post('/projects/id',body);
export const saveProject = (body) => gsAxios.post('/projects/id/save',body);