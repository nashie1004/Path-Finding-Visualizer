import {dfs} from './dfs.js'
import {bfs} from './bfs.js'
import {dijkstra} from './dijkstra.js'
import {aStar} from './aStar.js'

const gridContainer = document.querySelector('#container')
const colCount = 47
const rowCount = 21

const containerHeight = gridContainer.offsetHeight
const containerWidth = gridContainer.offsetWidth
console.log(containerHeight, containerWidth)

let size = 30

gridContainer.style.gridTemplateColumns = `repeat(${colCount}, ${size}px)`
gridContainer.style.gridTemplateRows = `repeat(${rowCount}, ${size}px)`

let graph = {}
let gridItemsArray = []

function createDivs(){

  let count = 0
  for (let i = 0; i < rowCount; i++){
    gridItemsArray[i] = []
    for (let j = 0; j < colCount; j++){
      let div = document.createElement('div')
      div.classList.add('grid-item')
      div.dataset.index = count
      gridContainer.append(div)
      div.innerHTML = count
  
      gridItemsArray[i][j] = count
      count++
    }
  }

}
createDivs()

function neighbors(){
  
  for (let i = 0; i < gridItemsArray.length; i++){
    for (let j = 0; j < gridItemsArray[i].length; j++){
      
      let top = gridItemsArray[i-1][j]
      let bot = gridItemsArray[i+1][j]
      let left = gridItemsArray[i][j-1]
      let right = gridItemsArray[i][j+1]

      graph[gridItemsArray[i][j]] = {neighbors: {top: top, bot: bot, left: left, right: right}, coordinate: {x: j, y: i}, state: 'empty' }
      
      
    }
  }

}
neighbors()
console.log(gridItemsArray)
console.log(graph)

dfs()
bfs()
dijkstra()
aStar()




  