import Footer from '@/components/Footer';
import {Question} from '@/components/RightContent';
import {LinkOutlined} from '@ant-design/icons';
import {PageLoading, SettingDrawer} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from '@umijs/max';
import {history, Link} from '@umijs/max';
import {AvatarDropdown, AvatarName} from './components/RightContent/AvatarDropdown';
import {requestConfig} from './requestConfig';
import {getLoginUserUsingGET} from "@/services/yinggeapi-backend/userController";
import defaultSettings from "../config/defaultSettings";
import {useEffect} from "react";


const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  // 当页面首次加载时，获取要全局保存的数据，比如用户登录信息
  const state: InitialState = {
    loginUser: {} as API.UserVO
  };
  try {
    const res = await getLoginUserUsingGET();
    // alert("getLoginUserUsingGET")
    if (res.data) {
      state.loginUser = res.data;
    }
  } catch (error) {
    const currentPath = window.location.pathname + window.location.search;
    // alert('Failed to get login user:')
    history.push(loginPath+`?redirect=${currentPath}`);
  }
  return state;
}


// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {

  return {
    actionsRender: () => [<Question key="doc"/>],
    avatarProps: {
      src: initialState?.loginUser?.userAvatar,
      title: <AvatarName/>,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.loginUser?.userName
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme

            settings={defaultSettings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
