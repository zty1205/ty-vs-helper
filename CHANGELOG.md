# Change Log

All notable changes to the "ty-helper" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

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
