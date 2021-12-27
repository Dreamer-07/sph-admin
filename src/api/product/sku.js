import request from '@/utils/request'

const apiName = '/admin/product'

export default {
  // 保存 SKU 信息
  saveSkuInfo: (skuInfo) => request({
    url: `${apiName}/saveSkuInfo`,
    method: 'post',
    data: skuInfo
  }),
  // 根据 spu 获取 sku 列表
  getSkuListBySpuId: (spuId) => request({
    url: `${apiName}/findBySpuId/${spuId}`,
    method: 'get'
  }),
  // 获取所有 sku 列表
  getAllSkuList: (pageNo, pageSize) => request({
    url: `${apiName}/list/${pageNo}/${pageSize}`,
    method: 'get'
  }),
  // 上架 sku 商品
  onSale: (skuId) => request({
    url: `${apiName}/onSale/${skuId}`,
    method: 'get'
  }),
  // 下架 sku 商品
  cancelSale: (skuId) => request({
    url: `${apiName}/cancelSale/${skuId}`,
    method: 'get'
  }),
  // 获取 sku 详情
  getSkuDetailInfo: (skuId) => request({
    url: `${apiName}/getSkuById/${skuId}`,
    method: 'get'
  })
}
