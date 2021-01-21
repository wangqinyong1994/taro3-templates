import request from './request';

export const login = (data) => request('/api/gridcloud-usercenter/login', data);

export const viewUserInfo = () =>
  request('/api/gridcloud-usercenter/userManage/viewUserInfo');

// 根据父级菜单id及用户token获取mobile菜单树
export const viewUserMobileMenuTree = (data) =>
  request('/api/gridcloud-usercenter/menuManage/viewUserMobileMenuTree', data);
