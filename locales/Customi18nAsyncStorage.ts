import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'i18next_cache_';

const CustomAsyncStorageBackend = {
  type: 'backend',

  init: (_services: any, _options: any, _i18nextOptions: any) => {},

  read: async (language: string, namespace: string, callback: any) => {
    try {
      const key = `${CACHE_PREFIX}${language}:${namespace}`;
      const cachedData = await AsyncStorage.getItem(key);

      if (cachedData) {
        const { data, expirationTime } = JSON.parse(cachedData);
        if (expirationTime > Date.now()) {
          // Cache is still valid
          callback(null, data);
        } else {
          // Cache expired, remove it
          await AsyncStorage.removeItem(key);
          callback(null, null); // Return null to trigger a remote fetch
        }
      } else {
        callback(null, null); // No cache found, trigger a remote fetch
      }
    } catch (error) {
      console.warn('Error reading from cache:', error);
      callback(error, null);
    }
  },

  save: async (language: string, namespace: string, data: any) => {
    try {
      const key = `${CACHE_PREFIX}${language}:${namespace}`;
      const expirationTime = Date.now() + (1000 * 60 * 60 * 24 * 7); // Cache for 7 days
      const cacheData = { data, expirationTime };
      await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Error saving to cache:', error);
    }
  },
};

export default CustomAsyncStorageBackend;
