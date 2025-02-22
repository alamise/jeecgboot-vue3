import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { useMessage } from '/@/hooks/web/useMessage';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { setAuthCache } from '/@/utils/auth';
import { TOKEN_KEY } from '/@/enums/cacheEnum';
import { router } from '/@/router';
import { PageEnum } from '/@/enums/pageEnum';

const { createErrorModal } = useMessage();
enum Api {
  Login = '/sys/login',
  phoneLogin = '/sys/phoneLogin',
  Logout = '/sys/logout',
  GetUserInfo = '/sys/user/getUserInfo',
  // 获取系统权限
  // 1、查询用户拥有的按钮/表单访问权限
  // 2、所有权限
  // 3、系统安全模式
  GetPermCode = '/sys/permission/getPermCode',
  //新加的获取图形验证码的接口
  getInputCode = '/sys/randomImage',
  //获取短信验证码的接口
  getCaptcha = '/sys/sms',
  //注册接口
  registerApi = '/sys/user/register',
  //校验用户接口
  checkOnlyUser = '/sys/user/checkOnlyUser',
  //SSO登录校验
  validateCasLogin = '/sys/cas/client/validateLogin',
  //校验手机号
  phoneVerify = '/sys/user/phoneVerification',
  //修改密码
  passwordChange = '/sys/user/passwordChange',
  //第三方登录
  thirdLogin = '/sys/thirdLogin/getLoginUser',
  //第三方登录
  getThirdCaptcha = '/sys/thirdSms',
  //获取二维码信息
  getLoginQrcode = '/sys/getLoginQrcode',
  //监控二维码扫描状态
  getQrcodeToken = '/sys/getQrcodeToken',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: user phoneLogin api
 */
export function phoneLoginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.phoneLogin,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' }).catch((e) => {
    // update-begin--author:zyf---date:20220425---for:【VUEN-76】捕获接口超时异常,跳转到登录界面
    if (e && (e.message.includes('timeout') || e.message.includes('401'))) {
      //接口不通时跳转到登录界面
      const userStore = useUserStoreWithOut();
      userStore.setToken('');
      setAuthCache(TOKEN_KEY, null);
      router.push(PageEnum.BASE_LOGIN);
    }
    // update-end--author:zyf---date:20220425---for:【VUEN-76】捕获接口超时异常,跳转到登录界面
  });
}

export function getPermCode() {
  return defHttp.get({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function getCodeInfo(currdatetime) {
  let url = Api.getInputCode + `/${currdatetime}`;
  console.log('debug getCodeInfo', url);
  return defHttp.get({ url: url });
}
/**
 * @description: 获取短信验证码
 */
export function getCaptcha(params) {
  return new Promise((resolve, reject) => {
    defHttp.post({ url: Api.getCaptcha, params }, { isTransformResponse: false }).then((res) => {
      console.log(res);
      if (res.success) {
        resolve(true);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}

/**
 * @description: 注册接口
 */
export function register(params) {
  return defHttp.post({ url: Api.registerApi, params }, { isReturnNativeResponse: true });
}

/**
 *校验用户是否存在
 * @param params
 */
export const checkOnlyUser = (params) => defHttp.get({ url: Api.checkOnlyUser, params }, { isTransformResponse: false });
/**
 *校验手机号码
 * @param params
 */
export const phoneVerify = (params) => defHttp.post({ url: Api.phoneVerify, params }, { isTransformResponse: false });
/**
 *密码修改
 * @param params
 */
export const passwordChange = (params) => defHttp.get({ url: Api.passwordChange, params }, { isTransformResponse: false });
/**
 * @description: 第三方登录
 */
export function thirdLogin(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<LoginResultModel>(
    {
      url: `${Api.thirdLogin}/${params.token}/${params.thirdType}`,
    },
    {
      errorMessageMode: mode,
    }
  );
}
/**
 * @description: 获取第三方短信验证码
 */
export function setThirdCaptcha(params) {
  return new Promise((resolve, reject) => {
    defHttp.post({ url: Api.getThirdCaptcha, params }, { isTransformResponse: false }).then((res) => {
      console.log(res);
      if (res.success) {
        resolve(true);
      } else {
        createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
        reject();
      }
    });
  });
}

/**
 * 获取登录二维码信息
 */
export function getLoginQrcode() {
  let url = Api.getLoginQrcode;
  return defHttp.get({ url: url });
}

/**
 * 监控扫码状态
 */
export function getQrcodeToken(params) {
  let url = Api.getQrcodeToken;
  return defHttp.get({ url: url, params });
}

/**
 * SSO登录校验
 */
export async function validateCasLogin(params) {
  let url = Api.validateCasLogin;
  return defHttp.get({ url: url, params });
}
