import gsAxios from "./gsAxios";

export const getUsers = (user) => gsAxios.post('/users/get',user);

export const postUser = (user) => gsAxios.post('/users/',user);