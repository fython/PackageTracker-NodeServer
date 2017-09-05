# Package Tracker Server

> [水表助手](https://github.com/fython/PackageTracker) 服务端，用于提供快递查询 API 以及设备订阅通知推送。

目前已经实现了基本功能，但仍有些不足，欢迎提交 Issue 和 Pull request。

更多详情查看 Wiki：[https://github.com/fython/PackageTracker-NodeServer/wiki](https://github.com/fython/PackageTracker-NodeServer/wiki)

## 准备环境

首先确保你的运行环境、操作系统已经安装了 [Node.js](https://nodejs.org) 8+ （原生 ES6 await/async 支持需要）。

除此以外，还需要安装 MongoDB 作为推送服务使用的默认数据库。安装方法：[Windows](http://www.runoob.com/mongodb/mongodb-window-install.html) [Linux](http://www.runoob.com/mongodb/mongodb-linux-install.html)

然后 `git clone https://github.com/fython/PackageTracker-NodeServer` 将项目代码克隆到本地。

打开项目文件夹，运行 `npm install` 安装依赖。

## 设置参数

复制一份 `config.sample.js` 并改名为 `config.js`，根据需求编辑内容，示例：

```javascript
config = {
  mongodb_server_url: 'mongodb://127.0.0.1:27017/ptpush', // MongoDB 数据库地址
  server_http_port: 3000, // HTTP 端口
  server_https_port: 3001, // HTTPS 端口 (可选)
  enable_https: true, // 是否启用 HTTPS，true 为启用，false 为禁用
  private_key_path: './cert/private.pem', // 证书私钥目录 (可选)
  certificate_path: './cert/file.crt' // 证书目录 (可选)
}

module.exports = config; // 其它请不要随意改动
```

## 运行

准备完毕后，运行 `npm start` 启动服务（本程序不自带守护进程，请自行准备）。

## 开源协议

```
MIT License

Copyright (c) 2017 Fung Go (fython)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
