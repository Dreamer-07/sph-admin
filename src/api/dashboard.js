import requestMock from '@/utils/request-mock'

export default {
  getDashboardDataList: () => requestMock({
    url: '/dashboard/list',
    type: 'get'
  })
}
