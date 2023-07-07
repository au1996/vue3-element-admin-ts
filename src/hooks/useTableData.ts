import { ref, reactive, nextTick } from 'vue'

interface Params {
  getTableParams: Function
  setTableData: Function
  request: Function
  autoRequest?: boolean
  page?: number
  pageSize?: number
  pageName?: string
  pageSizeName?: string
}

function useTableData({
  getTableParams,
  setTableData,
  request,
  autoRequest = true,
  page = 1,
  pageSize = 10,
  pageName = 'page',
  pageSizeName = 'page_size'
}: Params) {
  const tableLoading = ref(false)
  const tableData = ref([] as any[])
  const tableParams = getTableParams()

  const pagination = reactive({
    total: 0,
    page,
    pageSize,
    pageChange: async (page: number) => {
      await getTableData(page)
    },
    sizeChange(pageSize: number) {
      pagination.page = 1
      pagination.pageSize = pageSize
      getTableData()
    }
  })

  const getTableData = async (page?: number, addParams?: any) => {
    const params = {
      ...tableParams,
      ...getTableParams(),
      ...addParams
    }
    pagination.page = page || pagination.page
    params[pageName] = pagination.page
    params[pageSizeName] = pagination.pageSize

    tableLoading.value = true
    await request(params)
      .then((res: any) => {
        setTableData(res, tableData)
      })
      .finally(() => {
        tableLoading.value = false
      })
  }

  // 是否自动请求
  if (autoRequest) {
    getTableData()
  }

  return { tableLoading, tableData, pagination, getTableData }
}

export default useTableData
