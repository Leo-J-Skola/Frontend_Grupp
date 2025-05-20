import api from "./axios";

export const createBooking = async (bookingData) => {
    const request = await api.post('/booking/request', bookingData)
    return request.data;
};

export const confirmBooking = async (id) => {
    const request = await api.patch(`/booking/${id}`)
    return request.data;
}

export const getUserBookings = async (userId) => {
    const response = await api.get(`/booking/user-bookings${userId}`)
    return response.data;
}

