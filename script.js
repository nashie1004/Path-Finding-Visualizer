import {dfs, idDfs, idDfs0} from './dfs.js'
import {bfs, idBfs, idBfs0} from './bfs.js'
import {dijkstra, idDijsktra, idDijsktra0} from './dijkstra.js'
import {aStar, idAStar, idAStar0} from './aStar.js'
import generateMazeFunction from './generateMaze.js'

const gridContainer = document.querySelector('#container')
const colCount = 50
const rowCount = 25

let dfsBtn = document.getElementById('dfs')
let bfsBtn = document.getElementById('bfs')
let dijkstraBtn = document.getElementById('dijkstra')
let aStarBtnM = document.getElementById('aStarM')
let aStarBtnD = document.getElementById('aStarD')
let generateMaze = document.getElementById('generate-maze')

let canvas = document.getElementById('container')

let barrierTile = document.getElementById('barrier')
let startingTile = document.getElementById('start')
let endTile = document.getElementById('end')
let resetTile = document.getElementById('reset')
let inputChangeSize = document.getElementById('size')

let size = 1

let graph = {}
let gridItemsArray = []

function createDivs(colCount, rowCount){
  gridItemsArray = []
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
      div.draggable = false;
      gridContainer.append(div)
      // div.innerHTML = count
  
      gridItemsArray[i][j] = count
      count++
    }
  }

}

function neighbors(){
  graph = {}
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
// --------------------------------------------------------------------------------------
let tileColor = ''

let lockStart = false;
let lockEnd = false;

let setStart = 0;
let setEnd = 0;

function setInitPoints(){
  let lastItem = Object.keys(graph).length - 1

  setStart = 0
  setEnd = lastItem

  lockStart = false;
  lockEnd = false;
}

function canvasCoordinate(e){
  canvas.addEventListener('mousemove', canvasCoordinate)

  let canva = canvas.getBoundingClientRect()

  let mouseX = e.x - canva.left
  let mouseY = e.y - canva.top

  for (let node in graph){
    let nodeX, nodeY, size;
    if (graph[node] != undefined){
      nodeX = graph[node]['actualCoordinates'].x
      nodeY = graph[node]['actualCoordinates'].y
      size = graph[node]['actualCoordinates'].size
    }

    if (
        (nodeY <= mouseX && 
        mouseX <= nodeY + size)
        &&
        (nodeX <= mouseY &&
        mouseY <= nodeX + size)
        ){

        if (!lockStart && tileColor == 'start'){
          document.querySelector(`div[data-index='${node}']`).classList.add(tileColor)
          lockStart = true;
          setStart = node;
        }
        
        if (!lockEnd && tileColor == 'end'){
          document.querySelector(`div[data-index='${node}']`).classList.add(tileColor)
          lockEnd = true;
          setEnd = node;
          
        }
        

        if (tileColor == 'black'){
          document.querySelector(`div[data-index='${node}']`).classList.add(tileColor)
          graph[node]['state'] = 'barrier'
          
          // UPDATE NEIGHBORS STATE/UNDEFINED
          for (let n in graph[node]['neighbors']){
            let neighbors  = graph[node]['neighbors'][n]
            if (neighbors){

              for (let a in graph[neighbors]['neighbors']){
                let child = graph[neighbors]['neighbors'][a]

                if (child == node){
                  graph[neighbors]['neighbors'][a] = null;
                }
              }

            }

          }
        }

    }
  }
}

barrierTile.onclick = (e) => {
  
  if (barrierTile.classList.contains('gray-color')){
    barrierTile.classList.remove('gray-color')
    canvas.removeEventListener('mousedown', canvasCoordinate) 
    tileColor = 'black'
    
  } else {
    document.querySelectorAll('.hover-span h4').forEach(h4 => h4.classList.remove('gray-color'))

    barrierTile.classList.add('gray-color')
    canvas.addEventListener('mousedown', canvasCoordinate)  
    tileColor = 'black'
  }

}

startingTile.onclick = (e) => {
  
  if (startingTile.classList.contains('gray-color')){
    startingTile.classList.remove('gray-color')
    canvas.removeEventListener('mousedown', canvasCoordinate) 
    tileColor = 'start' 
    
  } else {
    document.querySelectorAll('.hover-span h4').forEach(h4 => h4.classList.remove('gray-color'))

    startingTile.classList.add('gray-color')
    canvas.addEventListener('mousedown', canvasCoordinate) 
    tileColor = 'start' 
  }
}

endTile.onclick = (e) => {
  
  if (endTile.classList.contains('gray-color')){
    endTile.classList.remove('gray-color')
    canvas.removeEventListener('mousedown', canvasCoordinate)  
    tileColor = 'end' 
    
  } else {
    document.querySelectorAll('.hover-span h4').forEach(h4 => h4.classList.remove('gray-color'))
    
    endTile.classList.add('gray-color')
    canvas.addEventListener('mousedown', canvasCoordinate) 
    tileColor = 'end' 
  }
}

// --------------------------------------------------------------------------------------

resetTile.onclick = () => {
  init(colCount, rowCount)
  inputChangeSize.value = 50

  lockStart = false;
  lockEnd = false;

  setInitPoints()
  canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', canvasCoordinate))
}

inputChangeSize.onchange = () => {
  let col = inputChangeSize.value
  let row = col / 2

  init(col, row)
}

function clearAll(){
  clearInterval(idDfs)
  clearInterval(idDfs0)
  clearInterval(idBfs)
  clearInterval(idBfs0)
  clearInterval(idDijsktra)
  clearInterval(idDijsktra0)
  clearInterval(idAStar)
  clearInterval(idAStar0)
}

dfsBtn.onclick = () => {
  clearAll()
  dfs(setStart, setEnd, graph)
}

bfsBtn.onclick = () => {
  clearAll()
  bfs(setStart, setEnd, graph)
}

dijkstraBtn.onclick = () => {
  clearAll()
  dijkstra(setStart, setEnd, graph)
}

aStarBtnM.onclick = () => {
  clearAll()
  aStar(setStart, setEnd, graph, 'M')
}

aStarBtnD.onclick = () => {
  clearAll()
  aStar(setStart, setEnd, graph, 'D')
}

generateMaze.onclick = () => {
  generateMazeFunction(graph, gridItemsArray)
}

function init(col, row){
  clearAll()
  createDivs(col, row)
  neighbors()
  getGridItemCoordinates()
  setInitPoints()

  canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', canvasCoordinate))
}
init(colCount, rowCount)
