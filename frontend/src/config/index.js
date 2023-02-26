const CONFIG = {
  PROD: {
    API: import.meta.env.VITE_PROD_API,
  },
  DEV: {
    API: import.meta.env.VITE_DEV_API,
  },
};

export default CONFIG;