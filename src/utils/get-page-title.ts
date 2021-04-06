import defaultSettings from '../settings'

const title = defaultSettings.title || 'Vue3 Element-plus Admin'

export default function getPageTitle(pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
