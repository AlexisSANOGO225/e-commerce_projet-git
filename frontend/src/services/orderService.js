import axios from 'axios';

const API_URL = '/api/orders';

export const getOrders = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createOrder = async (order) => {
  const res = await axios.post(API_URL, order);
  return res.data;
};

export const updateOrder = async (id, order) => {
  const res = await axios.put(`${API_URL}/${id}`, order);
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const getOrderHistoryByUser = async (userId) => {
  const res = await axios.get(`${API_URL}/history/${userId}`);
  return res.data;
};
