function createBarrier(graph, node, tileJelly){
    document.querySelector(`div[data-index='${node}']`).classList.add(tileJelly)
    graph[node]['state'] = 'barrier'
          
    // UPDATE NEIGHBORS STATE/UNDEFINED
    for (let n in graph[node]['neighbors']){
        let neighbors = graph[node]['neighbors'][n]
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

let mazeId;
function generateMazeFunction(graph, gridItemsArray){
    let src = gridItemsArray[0][0]
    let array = []
    for (let node in graph){
        array.push(node)
    }
    array.push(src)
    let visited = [src]
    let arrayTestExport = []

    mazeId = setInterval(() => {

        if (array.length > 0){
            
            let current = array.pop()
            visited.push(current)

            let arr = []
            for (let n in graph[current]['neighbors']){
                let node;
                let cell2x; 
                if (graph[current]['neighbors'][n]){
                    node = graph[current]['neighbors'][n]
                }
                if (graph[node]['neighbors'][n]){
                    cell2x = graph[node]['neighbors'][n];
                }

                // http://www.migapro.com/depth-first-search/
                // https://en.wikipedia.org/wiki/Maze_generation_algorithm#Iterative_implementation
                // TRY WIKI DFS ITERATIVE NOT RECURSIVE
                // ODD NUMBERS ONLY

                // NODE + CELL MOVE 2x
                if (!document.querySelector(`div[data-index='${cell2x}']`).classList.contains('black')){
                    if (!visited.includes(cell2x) && !visited.includes(node) && cell2x && node){
                        arr.push(node)
                        arr.push(cell2x)
                    }
                }

                // ONLY NODE
                // if (!visited.includes(cell2x) && !visited.includes(node)){
                //     arr.push(node)
                //     arr.push(cell2x)
                // }
            }
            
            let next = arr[Math.floor(Math.random() * arr.length)]
            array.push(next)
            visited.push(next)
            arrayTestExport.push(next)

            createBarrier(graph, next, 'black')
                
        } else {
            console.log('done')
            clearInterval(mazeId)
            return;
        }

    }, 2) 
    return arrayTestExport;
}

export {createBarrier, generateMazeFunction, mazeId}