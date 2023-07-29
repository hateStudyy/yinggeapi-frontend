declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

/**
 * 全局状态类型
 */
interface InitialState {
  loginUser: API.UserVO
}
createTime	string(date-time)
description	string
id	integer(int64)
isDelete	integer(int32)
method	string
name	string
requestHeader	string
responseHeader	string
status	integer(int32)
updateTime	string(date-time)
url	string
userId	integer(int64)
