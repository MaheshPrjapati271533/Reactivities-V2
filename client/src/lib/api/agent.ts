import axios from "axios";
import { store } from '../stores/Store';
const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  })
}
const agent = axios.create({
  baseURL: 'https://localhost:5001/api' //import.meta.env.VITE_API_URL
});
agent.interceptors.request.use((config) => {
  store.uiStore.isBusy();
  return config;
});
agent.interceptors.response.use(async response => {

  try {
    await sleep(1000);

    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error)

  } finally {
    store.uiStore.isIdle();
  }
})

export default agent;

// src/api/axiosInstance.ts
// import axios from 'axios';
// import { store } from '../stores/Store';

// let setLoadingGlobal: ((state: boolean) => void) | null = null;

// export const setLoaderSetter = (fn: (state: boolean) => void) => {
//   setLoadingGlobal = fn;
// };

// const agent = axios.create({
//   baseURL: 'https://localhost:5001/api' //import.meta.env.VITE_API_URL
// });

// agent.interceptors.request.use((config) => {
//   if (setLoadingGlobal) setLoadingGlobal(true);
//   return config;
// });




// agent.interceptors.response.use(
//   (response) => {
//     if (setLoadingGlobal) setLoadingGlobal(false);
//     store.uiStore.isIdle();
//     return response;
//   },
//   (error) => {
//     if (setLoadingGlobal) setLoadingGlobal(false);
//     return Promise.reject(error);
//   }
// );

// export default agent;
