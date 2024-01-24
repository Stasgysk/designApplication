import gsAxios from "./gsAxios";

export const getProjects = (project) => gsAxios.post('/projects/get',project);

export const postProject = (project) => gsAxios.post('/projects/',project);