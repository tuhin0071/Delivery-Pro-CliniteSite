import React from 'react';
import axios from 'axios';

const axiosSecure = axios.create({
  baseURL:`http://localhost:5000`
})

const useAxiosSecqure = () => {
      return axiosSecure
};

export default useAxiosSecqure;