/**
 * 基础微服务
 */
import request from '@/plugin/axios';
let basicServer = 'scp-basic';
export default {
  //获取七牛上传凭证 POST
  getQiniuToken(params) {
    return request({
      url: `/${basicServer}/qiniu/getQiniuToken`,
      method: 'post',
      data: params,
      isHideLoading: true
    });
  },
  // 获取所有区域数据
  areaFindAllForDynamic() {
    return request({
      url: `${basicServer}/area/findAllForDynamic`,
      method: 'get'
    });
  },
  // 获取个人信息
  getUserInfo(params) {
    return request.get(`${basicServer}/user/getUserInfo`, {
      params,
      isHideLoading: false
    });
  },
  /*获取应用权限*/
  permissionGetAppPermissionByAppTag(params) {
    return request({
      url: `${basicServer}/permission/getAppPermissionByAppTag`,
      method: 'get',
      params: params
    });
  }
};
