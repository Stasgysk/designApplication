import gsAxios from "./gsAxios";

export const getUsers = (user) => gsAxios.post('/users/get',user);

export const postUser = (user) => gsAxios.post('/users/',user);
export const postPassword = (password) => gsAxios.post('/users/password/',password);
export const getPassword = (password) => gsAxios.post('/users/password/get',password);