import { deletee, get, patch, post } from "../utils/request";

export const createCV = async (optinons) => {
    const result = await post(`cv`,optinons)
    return result;
}
export const getListCV = async (id) =>{
    const result = await get(`cv?idCompany=${id}`)
    return result;
}

export const deleteCV = async (id) => {
    const result = await deletee(`cv/${id}`)
    return result;
}

export const updateCVStatusRead = async (id,options) => {
    const result = await patch(`cv/${id}`,options)
    return result;
}
export const getDetailCV = async (id) =>{
    const result = await get(`cv/${id}`)
    return result;
}
