import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://ec2-3-145-207-93.us-east-2.compute.amazonaws.com/api',
})
