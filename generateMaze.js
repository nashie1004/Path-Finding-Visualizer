function createBarrier(graph, node){
    let tileColor = 'black'
    document.querySelector(`div[data-index='${node}']`).classList.add(tileColor)
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

function generateMazeFunction(graph, gridItemsArray){
    let array = []
    for (let node in graph){
        array.push(node)
    }
    let visited = [gridItemsArray[0][0]]

    let id = setInterval(() => {

        // http://www.migapro.com/depth-first-search/
        // ODD NUMBERS ONLY
        if (array.length > 0){
            
            let current = array.pop()
            visited.push(current)

            let arr = []
            for (let n in graph[current]['neighbors']){
                let node = graph[current]['neighbors'][n]
                // node - value, n - direction
                let a = graph[node]['neighbors'][n]
                if (!visited.includes(a) && a && node){
                    arr.push(a)
                    arr.push(node)
                }
            }
            
            let next = arr[Math.floor(Math.random() * arr.length)]
            
            createBarrier(graph, next)

            array.push(next)

        } else {
            console.log('done')
            clearInterval(id)
        }

    }, 2) 
}

export {createBarrier, generateMazeFunction}