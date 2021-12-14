import instance, { setAuthHeader } from './axios';
const baseUrl = process.env.REACT_APP_URL;

const api = {
  getPages: async () => {
    const result = await instance.get(`${baseUrl}/cms/pages`)
    if (result.data.data && result.data.data.success) {
      return result.data.data;
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  addPage: async (data: any) => {
    const result = await instance.post(`${baseUrl}/cms/page`, {...data})
    if (result.data.data === 'added') {
      return {
        success: true,
        message: ''
      };
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  addItem: async (data: FormData) => {
    const headers = {
      "Content-Type": "form-data"
    };
    const result = await instance.post(`${baseUrl}/cms/item`, data, headers);
    if (result.data.data === 'added') {
      return {
        success: true,
        message: ''
      };
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  addSection: async (data: FormData) => {
    const headers = {
      "Content-Type": "form-data"
    };
    const result = await instance.post(`${baseUrl}/cms/section`, data, headers);
    if (result.data.data === 'added') {
      return {
        success: true,
        message: ''
      };
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  loginUser: async (user_data: any) => {
    const result = await instance.post(`${baseUrl}/auth/admin/login`, {
      email: user_data.email,
      password: user_data.password
    })
    const data = result.data.data;
    if (data && data.token.access_token !== undefined) {
      setAuthHeader(`Bearer ${data.token.access_token}`)
    } else {
    }
    return result;
  },
  registerUser: async (user_data: any) => {
    const result = await instance.post(`${baseUrl}/auth/admin/register`, {
      firstName: user_data.firstName,
      lastName: user_data.lastName,
      email: user_data.email,
      password: user_data.password
    })
    const data = result.data.data;
    if (data && data.token.access_token !== undefined) {
      setAuthHeader(`Bearer ${data.token.access_token}`)
    }
    return result;
  },
}

export default api;
