//  npm i axios
import axios from 'axios';

//  创建一个axios 实例
const $api = axios.create({
  // baseURL: 'http://localhost:3000/api/v1', // 设置一个请求的公共基础路径
  baseURL:'https://rainformula-2121739-1313151054.ap-shanghai.run.tcloudbase.com/api/v1'
});

export default $api;
