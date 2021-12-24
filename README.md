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

## 业务逻辑扩展

### SPU & SKU

> SPU：标准化产品单元

类似于面向对象中的**类**，是一个 **标准化的信息集合**，这个信息集合可以理解为类的 **静态属性**

以 **华为P40 5G手机** 为例，它就是一个 SPU，它的静态属性就是 **[ 品牌：华为; CPU: 麒麟990 ...]** 而这些属性是可以标识它这个产品的

> SKU: 库存量单位

类似于面向对于中的 **对象**，在具有类的静态属性的同时，还有自己的一些特质的 **私有属性**

还是以 **华为P40 5G手机** 为例，我们将它的私有属性设置为 **[ 颜色: 零度白; 版本: 全网通(8G + 128G) ]** 就能确定一个具体的商品

![image-20211223141223208](README.assets/image-20211223141223208.png)