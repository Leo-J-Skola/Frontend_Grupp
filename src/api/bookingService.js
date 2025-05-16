import api from "./axios";

export const createBooking = async () => {
    const request = await api.post(`/booking/request`)
    return request.data;
}

export const confirmBooking = async (id) => {
    const request = await api.patch(`/booking/${id}`)
    return request.data;
}

