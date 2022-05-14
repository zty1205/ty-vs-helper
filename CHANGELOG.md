# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.2.0 (2022-05-14)

### Features

- 对解析后生成的 url 对象进行格式化 ([91e5479](https://github.com/zty1205/ty-vs-helper/commit/91e5479ab55de1e468ace8bf33b43903395f5063))

### 0.1.7 (2022-05-14)

### Features

- 对解析后生成的 url 对象进行格式化 ([91e5479](https://github.com/zty1205/ty-vs-helper/commit/91e5479ab55de1e468ace8bf33b43903395f5063))
- 解析 url 为对象 ([ba5f65a](https://github.com/zty1205/ty-vs-helper/commit/ba5f65aec2cfebf1314731850711bd83cc0951e0))
- 添加 git 一键 push 功能 ([7b59047](https://github.com/zty1205/ty-vs-helper/commit/7b590470830dc18d25bd51a331ead34c3cadb3bc))
- 新增代码片段 ([ce57430](https://github.com/zty1205/ty-vs-helper/commit/ce574300487737553cd165e12829e4ee1fdc8373))
- 转换功能 ([b992491](https://github.com/zty1205/ty-vs-helper/commit/b992491b7eccf212d1145a4b3fffb3eda6fda390))
- init ([2b54130](https://github.com/zty1205/ty-vs-helper/commit/2b54130dc652741222c2b1b3fa8b26973f0c3ca1))
- one-push 新增 changelog ([5060c2d](https://github.com/zty1205/ty-vs-helper/commit/5060c2ded3761b0100a256b5fc5eef3120b062a8))

### Bug Fixes

- 修改 OnePush 的配置项命名问题 ([f2f92f0](https://github.com/zty1205/ty-vs-helper/commit/f2f92f04a5a5ce673be45fefb29677b39ad2c192))
- push 的 commit-msg 问题 ([eb56a00](https://github.com/zty1205/ty-vs-helper/commit/eb56a0042ebef158858aeb5404a1ff13b6953c9f))
- push 前先进行 pull 操作 ([b6ac2c5](https://github.com/zty1205/ty-vs-helper/commit/b6ac2c59e5fbb99f7946ba6e5ae444ffd2b3a3be))
- push 命令 ([184febb](https://github.com/zty1205/ty-vs-helper/commit/184febb74cfc50b70cb4fc7589435e58ce0884ab))

# 0.0.1

## Features

- 支持 package.json 依赖跳转
- 支持删除本地分支

# 0.0.2

## Features

- 支持 git 一键 push

# 0.0.3

## Features

- 优化 push 失败提示

## Fix

- fix push 命令

# 0.0.4

## Features

- 添加转换功能
  - URL 解码
  - URL 编码
  - 蛇形大写命名
  - 蛇形命名
  - 帕斯卡命名
  - 驼峰命名

# 0.1.0

## Refactor

- 项目架构调整

# 0.1.1

## Features

- 添加解析 url 为对象

## Fix

- 修改 OnePush 的配置项命名问题

# 0.1.2

## Features

- 新增代码片段
  - vue store
  - arr reduce

## Fix

- push 前先进行 pull 操作

# 0.1.3

## Fix

- push 的 commit-msg 问题

# 0.1.4

## Refactor

- one-push 重构，使用 task 处理命令，解决 child_process 执行命令停滞的问题

# 0.1.5 (2022-04-22)

## Feat

- one-push 新增 changelog 功能(可配置)
- one-push 新增配置 是否立即 push

# 0.1.6 (2022-04-28)

## Feat

- feat: 对解析后生成的 url 对象进行格式化
