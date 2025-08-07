import { get,patch,post } from "../utils/request";

export const login = async (email,password) => {
    const result = await get(`company?email=${email}&password=${password}`)
    return result;
}

export const createCompany = async (options) => {
    const result = await post(`company`,options)
    return result;
}

export const checkExits = async (type,value) => {
    const result = await get(`company?${type}=${value}`)
    return result;
}

export const getAllCompany = async () => {
    const result = await get(`company`)
    return result;
}

export const editCompany = async (id,options) => {
    const result = await patch(`company/${id}`,options)
    return result;
}

export const getDetailCompany = async (id) =>{
    const result = await get(`company/${id}`)
    return result;
}