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

function aStar(src, goal, graph){
    console.log(src, goal)
    document.querySelector(`div[data-index='${src}']`).classList.add('start')
    document.querySelector(`div[data-index='${goal}']`).classList.add('end')

    let openSet = [src]
    let closedSet = []

    let g = {}
    let f = {}
    let parent = {}

    g[src] = 0
    f[src] = heuristicDiagonal(graph[src]['actualCoordinates'], graph[goal]['actualCoordinates'])

    // https://www.growingwiththeweb.com/2012/06/a-pathfinding-algorithm.html#:~:text=Diagonal%20distance%20(uniform%20cost),m%20a%20x%20(%20%E2%88%A3%20n%20.
    let id = setInterval(() => {
        if (openSet.length > 0){
            // LOWEST FSCORE
            let current = openSet[0]

            for (let i = 1; i < openSet.length; i++){
                if (f[openSet[i]] < f[current]){ //BARRIER CHECK  && graph[openSet[i]]['state'] == 'empty'
                    current = openSet[i]
                }
            }
            document.querySelector(`div[data-index='${current}']`).classList.add('solved')
            graph[current]['state'] = 'solved'

            if (current == goal){
                console.log(current, goal)
                console.log(id)
                clearInterval(id)
            }

            openSet.splice(openSet.indexOf(current), 1);
            closedSet.push(current);

            // NEIGHBORS
            for (let n in graph[current]['neighbors']){
                let neighbor = graph[current]['neighbors'][n]
                if (closedSet.includes(neighbor)){
                    continue;
                }

                let tentativeGScore = g[current] + 1

                // if (graph[neighbor]['state'] != 'empty'){
                //     console.log(graph[neighbor])
                // }

                if (!openSet.includes(neighbor)){ //BARRIER CHECK && graph[neighbor]['state'] != 'empty'
                    openSet.push(neighbor)
                } else if (tentativeGScore >= g[neighbor]) { //BARRIER CHECK && graph[neighbor]['state'] == 'empty'
                    continue;
                }

                parent[neighbor] = current
                g[neighbor] = tentativeGScore
                f[neighbor] = tentativeGScore + heuristicDiagonal(graph[neighbor]['actualCoordinates'], graph[goal]['actualCoordinates'])

            }
        }
    }, 20)
    console.log(id)
    return null
}

export { aStar }