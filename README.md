# 个人简历介绍网站

## 项目概述
基于Windows Server IIS部署的个人简历网站，包含身份验证和简历展示功能。

## 功能特性
1. 身份验证页面 - 需要输入"田智宇"进行验证
2. 访问频率限制 - 防止恶意刷新和频繁访问
3. 简历展示页面 - 左侧文案，右侧PRD样例链接
4. 响应式设计 - 支持移动端和桌面端
5. 清新商务风格 - 蓝色主基调，参考Ant Design

## 技术栈
- 前端：HTML5 + CSS3 + JavaScript（增强版安全验证）
- 后端：无需后端，纯前端实现
- 部署：Windows Server IIS
- 存储：LocalStorage（设备验证记录 + 浏览器指纹）
- 安全：多重验证因子 + 反调试保护

## 目录结构
```
个人简历网站/
├── index.html              # 验证页面（增强版安全）
├── resume.html             # 简历展示页面
├── css/                    # 样式文件
├── js/                     # JavaScript文件
├── web.config              # IIS配置文件
├── start-local-server.bat  # 本地测试服务器
├── 部署指南.md             # 详细部署说明
└── 使用指南.md             # 快速使用指南
```
# 个人简历介绍网站

## 项目概述
基于Windows Server IIS部署的个人简历网站，包含身份验证和简历展示功能。

## 功能特性
1. 身份验证页面 - 需要输入"田智宇"进行验证
2. 访问频率限制 - 防止恶意刷新和频繁访问
3. 简历展示页面 - 左侧文案，右侧PRD样例链接
4. 响应式设计 - 支持移动端和桌面端
5. 清新商务风格 - 蓝色主基调，参考Ant Design

## 技术栈
- 前端：HTML5 + CSS3 + JavaScript（增强版安全验证）
- 后端：无需后端，纯前端实现
- 部署：Windows Server IIS
- 存储：LocalStorage（设备验证记录 + 浏览器指纹）
- 安全：多重验证因子 + 反调试保护


## 部署域名
- 主域名：ai.krisgeek.com
- 验证页面：ai.krisgeek.com/index.html
- 简历页面：ai.krisgeek.com/resume.html