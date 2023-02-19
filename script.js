const gridContainer = document.querySelector('#container')
const colCount = 45
const rowCount = 18

const containerHeight = gridContainer.offsetHeight
const containerWidth = gridContainer.offsetWidth
console.log(containerHeight, containerWidth)

gridContainer.style.gridTemplateColumns = `repeat(auto, ${size}px)`
gridContainer.style.gridTemplateRows = `repeat(auto, ${size}px)`

let count = 0
for (let i = 0; i < rowCount; i++){
    for (let j = 0; j < colCount; j++){
      let div = document.createElement('div')
      div.classList.add('grid-item')
      div.dataset.index = count
      gridContainer.append(div)
      count++
    }
  }
  