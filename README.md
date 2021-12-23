# sph-admin

## 项目介绍

简介：基于 [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) 二次开发的后台管理系统

后端 Swagger 在线接口文档：

- http://39.98.123.211:8170/swagger-ui.html
- http://39.98.123.211:8216/swagger-ui.html

## 基础知识补充 

### 深拷贝与浅拷贝

TODO：https://segmentfault.com/a/1190000018874254

### 动态添加响应式属性

前提：目标对象也是响应式的

使用：通过 **Vue.set(target, index/propName, value)** 

作用：向 target 响应式对象中添加一个 prop，并确保这个 prop 同样是响应式的，会触发视图更新