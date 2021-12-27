import request from '@/utils/request'

const apiName = '/admin/product'
export default {
  // 获取一组分类
  getCategory1List: () => request({
    url: `${apiName}/getCategory1`,
    method: 'get'
  }),
  // 获取二级分类
  getCategory2List: (category1Id) => request({
    url: `${apiName}/getCategory2/${category1Id}`,
    method: 'get'
  }),
  // 获取三级分类
  getCategory3List: (category2Id) => request({
    url: `${apiName}/getCategory3/${category2Id}`,
    method: 'get'
  }),
  // 根据分类获取对应的平台属性
  getAttrInfoList: ({ category1Id, category2Id, category3Id }) => request({
    url: `${apiName}/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  }),
  // 保存属性信息
  saveAttrInfo: (attrInfo) => request({
    url: `${apiName}/saveAttrInfo`,
    method: 'post',
    data: attrInfo
  }),
  // 获取所有销售属性
  getBaseSaleAttrList: () => request({
    url: `${apiName}/baseSaleAttrList`,
    method: 'get'
  }),
  // 获取 spu 的销售属性
  getSpuAttrList: (spuId) => request({
    url: `${apiName}/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}
