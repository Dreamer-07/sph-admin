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
  })
}
