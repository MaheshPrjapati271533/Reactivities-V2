import axios from "axios";
import { store } from '../stores/Store';
import { toast } from "react-toastify";
import { router } from "../../app/Router/Routes";
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
agent.interceptors.response.use(
  async response => {
    await sleep(1000);
    store.uiStore.isIdle();
    return response;
  },
  async error => {
    await sleep(1000);
    store.uiStore.isIdle();
    const { status, data } = error.response;

    switch (status) {
      case 400:
        if (data.error) {
          console.log(data.error)
          const modalStatementErrors = [];
          for (const key in data.error) {
            if (data.error[key]) {
              modalStatementErrors.push(data.error[key]);
            }
          }
          throw modalStatementErrors.flat();
        }
        else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error('Unauthorised');
        break;
      case 404:
        router.navigate('/not-found');
        break;
      case 500:
        router.navigate('/server-error', { state: { error: data } });
        break;

      default:
        break;
    }

    return Promise.reject(error)
  }

)

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
