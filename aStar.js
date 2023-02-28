function heuristicManhattan(node, goal){
    let dx = Math.abs(node.x - goal.x)
    let dy = Math.abs(node.y - goal.y)

    let D = 1;

    return D * (dx + dy)
}

function heuristicDiagonal(node, goal){
    //http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#:~:text=If%20your%20heuristic%20is%20exactly,(n)%20at%20every%20node.
    
    let dx = Math.abs(node.x - goal.x)
    let dy = Math.abs(node.y - goal.y)

    let D = 1;
    let D2 = 1;

    let result = D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy)
    return (result)
}

function heuristicEuclidean(node, goal){
    let dx = Math.abs(node.x - goal.x)
    let dy = Math.abs(node.y - goal.y)

    let D = 1
    return D * Math.sqrt(dx * dx + dy * dy)
}

let idAStar, idAStar0;
function aStar(src, goal, graph, H){
    document.querySelector(`div[data-index='${src}']`).classList.add('start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('end')

    let openSet = [src]
    let closedSet = []

    let g = {}
    let f = {}
    let parent = {}

    g[src] = 0
    if (H == 'M'){
        f[src] = heuristicManhattan(graph[src]['actualCoordinates'], graph[goal]['actualCoordinates'])
    } else if (H == 'D'){
        f[src] = heuristicDiagonal(graph[src]['actualCoordinates'], graph[goal]['actualCoordinates'])
    } else if (H == 'E'){
        f[src] = heuristicEuclidean(graph[src]['actualCoordinates'], graph[goal]['actualCoordinates'])
    }
    // https://www.growingwiththeweb.com/2012/06/a-pathfinding-algorithm.html#:~:text=Diagonal%20distance%20(uniform%20cost),m%20a%20x%20(%20%E2%88%A3%20n%20.
    idAStar = setInterval(() => {
        if (openSet.length > 0){
            // LOWEST FSCORE
            let current = openSet[0]
            // let i = 1;
            for (let i = 0; i < openSet.length; i++){
                if (f[openSet[i]] <= f[current]){ //BARRIER CHECK  && graph[openSet[i]]['state'] == 'empty'
                    current = openSet[i]
                }
            }
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')
            graph[current]['state'] = 'solved'

            if (current == goal){
                clearInterval(idAStar)

                // https://chat.openai.com/chat/839c9ac3-435e-4c2f-ae3d-5431038165d4
                let path = [goal];
                let currentNode = goal;     

                idAStar0 = setInterval(() => {

                    if (currentNode !== src){
                        currentNode = parent[currentNode]
                        
                        if (currentNode != src && goal != currentNode){
                            document.querySelector(`div[data-index='${currentNode}']`).classList.remove('solved')
                            document.querySelector(`div[data-index='${currentNode}']`).classList.add('solution')
                        }
                        
                        path.unshift(currentNode)
                    } else {
                        clearInterval(idAStar0)
                    }

                }, 20)

            }

            openSet.splice(openSet.indexOf(current), 1);
            closedSet.push(current);

            // NEIGHBORS
            for (let n in graph[current]['neighbors']){
                let neighbor = graph[current]['neighbors'][n]
                if (closedSet.includes(neighbor) || !neighbor){
                    continue;
                }

                let tentativeGScore = g[current] + 1

                if (!openSet.includes(neighbor)){ //BARRIER CHECK && graph[neighbor]['state'] != 'empty'
                    openSet.push(neighbor)
                } else if (tentativeGScore >= g[neighbor]) { //BARRIER CHECK && graph[neighbor]['state'] == 'empty'
                    continue;
                }

                parent[neighbor] = current
                g[neighbor] = tentativeGScore

                if (H == 'M'){
                    f[neighbor] = tentativeGScore + heuristicManhattan(graph[neighbor]['actualCoordinates'], graph[goal]['actualCoordinates'])
                } else if (H == 'D'){
                    f[neighbor] = tentativeGScore + heuristicDiagonal(graph[neighbor]['actualCoordinates'], graph[goal]['actualCoordinates'])
                } else if (H == 'E') {
                    f[neighbor] = tentativeGScore + heuristicEuclidean(graph[neighbor]['actualCoordinates'], graph[goal]['actualCoordinates'])
                }

            }
        }
    }, 15)
    return null
}

export { aStar, idAStar, idAStar0 }