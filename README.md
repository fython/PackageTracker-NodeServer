# Package Tracker Server

> [水表助手](https://github.com/fython/PackageTracker) 服务端，用于提供快递查询 API 以及设备订阅通知推送。

目前已经实现了基本功能，但仍有些不足，欢迎提交 Issue 和 Pull request。

更多详情查看 Wiki：[https://github.com/fython/PackageTracker-NodeServer/wiki](https://github.com/fython/PackageTracker-NodeServer/wiki)

## 运行

首先确保你的运行环境、操作系统已经安装了 [Node.js](https://nodejs.org) 8+ （原生 ES6 await/async 支持需要）。

然后 `git clone https://github.com/fython/PackageTracker-NodeServer` 将项目代码克隆到本地。

打开项目文件夹，运行 `npm install` 安装依赖。

安装完毕后，运行 `npm start` 启动服务（本程序不自带守护进程，请自行准备）。

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
