import {dfs} from './dfs.js'
import {bfs} from './bfs.js'
import {dijkstra} from './dijkstra.js'
import {aStar} from './aStar.js'

const gridContainer = document.querySelector('#container')
const colCount = 50
const rowCount = 25

let dfsBtn = document.getElementById('dfs')
let bfsBtn = document.getElementById('bfs')
let dijkstraBtn = document.getElementById('dijkstra')
let aStarBtn = document.getElementById('aStar')

let canvas = document.getElementById('container')

let barrierTile = document.getElementById('barrier')
let startingTile = document.getElementById('start')
let endTile = document.getElementById('end')
let emptyTile = document.getElementById('empty')
let resetTile = document.getElementById('reset')
let inputChangeSize = document.getElementById('size')

let size = 1

let graph = {}
let gridItemsArray = []

function createDivs(colCount, rowCount){
  gridContainer.innerHTML = ''

  gridContainer.style.gridTemplateColumns = `repeat(${colCount}, ${size}fr)`
  gridContainer.style.gridTemplateRows = `repeat(${rowCount}, ${size}fr)`

  let count = 0
  for (let i = 0; i < rowCount; i++){
    gridItemsArray[i] = []
    for (let j = 0; j < colCount; j++){
      let div = document.createElement('div')
      div.classList.add('grid-item')
      div.dataset.index = count
      gridContainer.append(div)
      // div.innerHTML = count
  
      gridItemsArray[i][j] = count
      count++
    }
  }

}

function neighbors(){
  
  for (let i = 0; i < gridItemsArray.length; i++){
    for (let j = 0; j < gridItemsArray[i].length; j++){
      
      let top, bot, left, right;

      if (i > 0){
        top = gridItemsArray[i-1][j]
      }
      if (i < gridItemsArray.length - 1){
        bot = gridItemsArray[i+1][j]
      }
      if (j > 0){
        left = gridItemsArray[i][j-1]
      }
      if (j < gridItemsArray[i].length - 1){
        right = gridItemsArray[i][j+1]
      }

      graph[gridItemsArray[i][j]] = {neighbors: { top, bot, left, right }, coordinate: {x: j, y: i}, state: 'empty' }
      
    }
  }
}

function getGridItemCoordinates(){
  let gridContainerRect = document.querySelector('#container').getBoundingClientRect()

  document.querySelectorAll('.grid-item').forEach(grid => {
    let gridItemRect = grid.getBoundingClientRect()
    let size = gridItemRect.width

    const top = gridItemRect.top - gridContainerRect.top;
    const left = gridItemRect.left - gridContainerRect.left;

    graph[grid.dataset.index]['actualCoordinates'] = { x: top, y: left, size }

  })
}

function canvasCoordinate(e){
  canvas.addEventListener('mousemove', canvasCoordinate)

  let canva = canvas.getBoundingClientRect()

  let mouseX = e.x - canva.left
  let mouseY = e.y - canva.top

  for (let node in graph){
    let nodeX = graph[node]['actualCoordinates'].x
    let nodeY = graph[node]['actualCoordinates'].y
    let size = graph[node]['actualCoordinates'].size
    if (
        (nodeY <= mouseX && 
        mouseX <= nodeY + size)
        &&
        (nodeX <= mouseY &&
        mouseY <= nodeX + size)
        ){
        document.querySelector(`div[data-index='${node}']`).classList.add('black')
        graph[node]['state'] = 'barrier'
    }
  }
}

canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', canvasCoordinate))

barrierTile.onclick = (e) => {

    if (barrierTile.classList.contains('gray-color')){
        barrierTile.classList.remove('gray-color')
        canvas.removeEventListener('mousedown', canvasCoordinate)  
    } else {
        barrierTile.classList.add('gray-color')
        canvas.addEventListener('mousedown', canvasCoordinate)  
    }

}

startingTile.onclick = (e) => {
  
  if (startingTile.classList.contains('gray-color')){
    startingTile.classList.remove('gray-color')
    // canvas.removeEventListener('mousedown', canvasCoordinate)  
  } else {
    startingTile.classList.add('gray-color')
    // canvas.addEventListener('mousedown', canvasCoordinate)  
  }
}

endTile.onclick = (e) => {
  
  if (endTile.classList.contains('gray-color')){
    endTile.classList.remove('gray-color')
    // canvas.removeEventListener('mousedown', canvasCoordinate)  
  } else {
    endTile.classList.add('gray-color')
    // canvas.addEventListener('mousedown', canvasCoordinate)  
  }
}

emptyTile.onclick = (e) => {
  
  if (emptyTile.classList.contains('gray-color')){
    emptyTile.classList.remove('gray-color')
    // canvas.removeEventListener('mousedown', canvasCoordinate)  
  } else {
    emptyTile.classList.add('gray-color')
    // canvas.addEventListener('mousedown', canvasCoordinate)  
  }
}

resetTile.onclick = () => {
  init(colCount, rowCount)
  inputChangeSize.value = 50
}

inputChangeSize.onchange = () => {
  let col = inputChangeSize.value
  let row = col / 2

  init(col, row)
}

dfsBtn.onclick = () => {
  dfs(310, 1197, graph)
}

bfsBtn.onclick = () => {
  bfs(310, 1197, graph)
}

dijkstraBtn.onclick = () => {
  dijkstra(310, 1197, graph)
}

aStarBtn.onclick = () => {
  aStar(310, 1197, graph)
}

function init(col, row){
  createDivs(col, row)
  neighbors()
  getGridItemCoordinates()
}
init(colCount, rowCount)




  