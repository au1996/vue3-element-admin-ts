type ISettings = {
  title: string
  showSettings: boolean
  tagsView: boolean
  fixedHeader: boolean
  sidebarLogo: boolean
  errorLog: string
}

const settings: ISettings = {
  title: 'Vue3 Element Admin Ts',
  showSettings: true,
  tagsView: true,
  fixedHeader: false,
  sidebarLogo: false,
  errorLog: 'production'
}

export default settings
