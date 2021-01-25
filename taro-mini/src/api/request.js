import Taro from '@tarojs/taro';
import storeInfo from '@/store';

const { store } = storeInfo;

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const request = (url, data, options = {}, method) => {
  const { token } = store.getState().user;
  const isGet = method === 'get';

  const unUseTokenList = ['/api/gridcloud-usercenter/login'];

  const useToken = !unUseTokenList.some(item => url.indexOf(item) > -1);

  const header =
    token && useToken
      ? {
          'Content-Type': isGet
            ? 'application/x-www-form-urlencoded'
            : 'application/json',
          Authorization: token,
        }
      : {
          'Content-Type': isGet
            ? 'application/x-www-form-urlencoded'
            : 'application/json',
        };

  const newOptions = {
    method,
    header,
    ...options,
  };

  const interceptor = function (chain) {
    const requestParams = chain.requestParams;
    return chain.proceed(requestParams).then(res => {
      return res;
    });
  };

  Taro.addInterceptor(interceptor);
  // 编译成h5需要对应修改
  const promise = new Promise((resolve, reject) => {
    Taro.request({
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://192.168.1.179:6080' + url
          : url,
      data,
      ...newOptions,
      success: async res => {
        if (res.statusCode !== 200) {
          Taro.showToast({
            title: codeMessage[res.statusCode],
            icon: 'none',
            duration: 2000,
          });
          reject(res.data);
        } else {
          if (res.data) {
            if (!res.data.success) {
              if (res.data.msg) {
                Taro.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000,
                });
              }
            }
          }
          resolve(res.data.data);
        }
      },
      fail: async res => {
        if (res.statusCode !== 200) {
          Taro.showToast({
            title: codeMessage[res.statusCode],
            icon: 'none',
            duration: 2000,
          });
        }
        reject(res.data);
      },
      complete(res) {
        resolve(res.data.data);
      },
    });
  });

  return promise;
};

export const post = (url, data, options) => {
  return request(url, data, options, 'post');
};

export const get = (url, data, options) => {
  return request(url, data, options, 'get');
};

export default request;
