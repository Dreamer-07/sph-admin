import request from '@/utils/request'

const apiName = '/admin/product/baseTrademark'
export default {
  // 获取品牌列表
  getBrandList: (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  }),
  // 保存品牌信息
  saveBrandInfo: ({ tmName, logoUrl }) => request({
    url: `${apiName}/save`,
    method: 'post',
    data: { tmName, logoUrl }
  }),
  // 修改品牌信息
  updateBrandInfo: (brandInfo) => request({
    url: `${apiName}/update`,
    method: 'put',
    data: brandInfo
  }),
  // 根据 id 删除品牌信息
  deleteBrandInfoById: (id) => request({
    url: `${apiName}/remove/${id}`,
    method: 'delete'
  })
}
