export default function generateMazeFunction(graph, gridItemsArray){
    let array = [gridItemsArray[0][0]]
    let visited = [gridItemsArray[0][0]]

    while (array.length > 0){
        document.querySelector(`div[data-index='${current}']`).classList.add('black')
    
        let randomNum = Math.floor(Math.random() * 4)
    }
}