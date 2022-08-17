export default {
  mounted(el: any, binding: any) {
    if (binding.value) {
      const { text, fontSize, color } = binding.value
      addWaterMarker(el, text, fontSize, color)
    } else {
      addWaterMarker(el)
    }
  }
}

/**
 *
 * @param {*} ele 元素
 * @param {*} text 水印文字
 * @param {*} fontSize 字体大小
 * @param {*} color 文字颜色
 */
function addWaterMarker(ele: HTMLElement, text?: string, fontSize?: string, color?: string) {
  const can = document.createElement('canvas')
  ele.appendChild(can)
  can.width = 200
  can.height = 100
  can.style.display = 'none'
  var cans: any = can.getContext('2d')
  cans.rotate((-20 * Math.PI) / 180)
  cans.fontSize = fontSize || '16px Microsoft JhengHei'
  cans.fillStyle = color || 'rgba(180, 180, 180, 0.6)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  text = text || '雪月水印'
  cans.fillText(text, can.width / 10, can.height / 2)
  ele.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}
