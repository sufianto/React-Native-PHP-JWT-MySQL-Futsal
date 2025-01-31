import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.56.1/backendreactnative/React_native_futsal/api.php'; // Ganti dengan URL backend Anda
const BASE_URL = 'http://192.168.56.1/backendreactnative/React_native_futsal';


export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addUser = async (username, email, password) => {
  await axios.post(API_URL, { username, email, password });
};

// export const updateUser = async (id, username, email) => {
//   await axios.put(API_URL, { id, username, email });
// };

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}?id=${id}`);
};

export const loginUser = async (username, password, captcha) => {
  try {
    const response = await fetch('http://192.168.56.1/backendreactnative/React_native_futsal/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, captcha }),
      credentials: 'include',
    });
    
    const data = await response.json();
    
    if (data.token) {
      // Simpan token ke AsyncStorage
      await AsyncStorage.setItem('userToken', data.token);
      console.log('Token tersimpan:', data.token); // Debug log
    }

    return data;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
};



export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${BASE_URL}/register.php`, { username, email, password });
  return response.data;
};


export const fetchProfile = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/profile.php`,
      {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const resetPassword = async (oldPassword, newPassword) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Token yang akan dikirim:', token); // Debug log
    
    if (!token) {
      throw new Error('Token tidak ditemukan. Silakan login kembali.');
    }

    const response = await axios.post(
      `${BASE_URL}/reset_password.php`,
      { oldPassword, newPassword },
      {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('Response reset password:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error reset password:', error.response?.data || error.message);
    throw error;
  }
};




// export const updateUser = async (id, username, email, photoUri) => {
//   const formData = new FormData();
//   formData.append('username', username);
//   formData.append('email', email);

//   if (photoUri) {
//     formData.append('foto', {
//       uri: photoUri,
//       type: 'image/jpeg',
//       name: `profile_${id}.jpg`,
//     });
//   }

//   const response = await axios.post(`http://192.168.56.1/backendreactnative/React_native_futsal/update-profile/${id}`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });

//   return response.data;
// };





// // **Set Token Otomatis**
// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }
// };

// export default api;
