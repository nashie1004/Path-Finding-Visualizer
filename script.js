import {dfs, idDfs, idDfs0, dfs_FAST} from './algorithms/dfs.js'
import {bfs, idBfs, idBfs0, bfs_FAST} from './algorithms/bfs.js'
import {dijkstra, idDijsktra, idDijsktra0, dijkstra_FAST} from './algorithms/dijkstra.js'
import {aStar, idAStar, idAStar0, aStar_FAST} from './algorithms/aStar.js'
import {createBarrier, generateMazeFunction, mazeId} from './algorithms/generateMaze.js'

const gridContainer = document.querySelector('#container')
const colCount = 50
const rowCount = 25

let dfsBtn = document.getElementById('dfs')
let bfsBtn = document.getElementById('bfs')
let dijkstraBtn = document.getElementById('dijkstra')
let aStarBtnM = document.getElementById('aStarM')
let aStarBtnD = document.getElementById('aStarD')
let aStarBtnE = document.getElementById('aStarE')
let generateMaze = document.getElementById('generate-maze')

let canvas = document.getElementById('container')

let barrierTile = document.getElementById('barrier')
let startingTile = document.getElementById('start')
let endTile = document.getElementById('end')
let enablePreview = document.getElementById('float-container')
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

let arrayForBarrier = []
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
          // restoreBarriers(tileColor)
          arrayForBarrier.push(node)
          createBarrier(graph, node, tileColor)
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
// FOR ENABLE PREVIEW
function listenMove(e){
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
    if ((nodeY <= mouseX && mouseX <= nodeY + size) && (nodeX <= mouseY && mouseY <= nodeX + size))
    {
      let col = inputChangeSize.value
      let row = col / 2

      clearAll()
      createDivs(col, row) //CHANGE THIS
      neighbors()
      getGridItemCoordinates()
      canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', canvasCoordinate))
      
      //NOTE: EXPORT ONLY ONCE, CANT EXPORT MAZE BARRIERS FROM GENERATOR
      for (let idx of arrayForBarrier){ // arrayForBarrier
        createBarrier(graph, idx, 'preview-black')
      }

      // dfs_FAST(setStart, node, graph)
      bfs_FAST(setStart, node, graph)
      // aStar_FAST(setStart, node, graph, 'M')
      // aStar_FAST(setStart, node, graph, 'D')
      // dijkstra_FAST(setStart, node, graph)
    }
  }
}

// --------------------------------------------------------------------------------------
enablePreview.onmouseover = () => {
  // TODO
  let dfsBtn_FAST = false;
  document.getElementById('dfsBtn_FAST').onclick = () => {
    dfsBtn_FAST = dfsBtn_FAST ? false : true;
  }
  let bfsBtn_FAST = false;
  document.getElementById('bfsBtn_FAST').onclick = () => {
    bfsBtn_FAST = dfsBtn_FAST ? false : true;
  }
  let dijkstraBtn_FAST = false;
  document.getElementById('dijkstraBtn_FAST').onclick = () => {
    dijkstraBtn_FAST = dijkstraBtn_FAST ? false : true;
  }
  let AMBtn_FAST = false;
  document.getElementById('AMBtn_FAST').onclick = () => {
    AMBtn_FAST = AMBtn_FAST ? false : true;
  }
  let ADBtn_FAST = false;
  document.getElementById('ADBtn_FAST').onclick = () => {
    ADBtn_FAST = ADBtn_FAST ? false : true;
  }
  let AEBtn_FAST = false;
  document.getElementById('AEBtn_FAST').onclick = () => {
    AEBtn_FAST = AEBtn_FAST ? false : true;
  }

  if (enablePreview.classList.contains('gray-color')){
    
    init(colCount, rowCount)
    enablePreview.classList.remove('gray-color')
    canvas.removeEventListener('mousemove', listenMove)
    document.querySelectorAll('.hover-span h4').forEach(h4 => h4.classList.remove('gray-color'))
  } else {
    enablePreview.classList.add('gray-color')
    canvas.addEventListener('mousemove', listenMove)
  }
    
}

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
  // enable solve
  clearInterval(idDfs)
  clearInterval(idDfs0)

  clearInterval(idBfs)
  clearInterval(idBfs0)

  clearInterval(idDijsktra)
  clearInterval(idDijsktra0)

  clearInterval(idAStar)
  clearInterval(idAStar0)

  // generate maze
  clearInterval(mazeId)
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

aStarBtnE.onclick = () => {
  clearAll()
  aStar(setStart, setEnd, graph, 'E')
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

  arrayForBarrier = []
  canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', canvasCoordinate))
}
init(colCount, rowCount)
