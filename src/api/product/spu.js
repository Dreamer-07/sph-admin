import request from '@/utils/request'

const apiName = '/admin/product'
export default {
  // 获取 spu 信息列表
  getSpuInfoList: ({ pageNo, pageSize, category3Id }) => request({
    url: `${apiName}/${pageNo}/${pageSize}`,
    method: 'get',
    params: { category3Id }
  }),
  // 获取 SPU 详细信息
  getSpuDetailInfo: (spuId) => request({
    url: `${apiName}/getSpuById/${spuId}`,
    method: 'get'
  }),
  // 获取 SPU 图片信息
  getSpuImageList: (spuId) => request({
    url: `${apiName}/spuImageList/${spuId}`,
    method: 'get'
  }),
  // 保存/修改 SPU 信息
  addOrUpdateSpuDetailInfo: (spuInfo) => request({
    url: `${apiName}/${spuInfo.id ? 'updateSpuInfo' : 'saveSpuInfo'}`,
    method: 'post',
    data: spuInfo
  }),
  // 删除 spu 信息
  deleteSpuInfoBySpuId: (spuId) => request({
    url: `${apiName}/deleteSpu/${spuId}`,
    method: 'delete'
  })
}
