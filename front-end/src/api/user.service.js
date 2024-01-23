import gsAxios from "./gsAxios";

export const getUsers = () => gsAxios.get('/users/');

export const postUser = (user) => gsAxios.post('/users/',user);