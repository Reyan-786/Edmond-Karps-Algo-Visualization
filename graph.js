const svg = d3.select("#graph-svg");

    
const graph = {
    "nodes": [
        {id: 0, name: 's', fixed: true, x: 147, y: 243},
        {id: 1, name: 't', fixed: true, x: 764, y: 254}, 
        {id: 2, name: 'v1',fixed: true, x: 346, y: 118},
        {id: 3, name: 'v2',fixed: true, x: 380, y: 300},
        {id: 4, name: 'v3',fixed: true, x: 545, y: 136},
        {id: 5, name: 'v4',fixed: true, x: 599, y: 309}
    ],
     "links": [
        {source: 0, target: 2, capacity: 16,flow: 0, residualCapacity:16},
        {source: 2, target: 4, capacity: 12,flow: 0, residualCapacity:12},
        {source: 4, target: 1, capacity: 20,flow: 0, residualCapacity:20},
        {source: 0, target: 3, capacity: 13,flow: 0, residualCapacity:13},
        {source: 3, target: 5, capacity: 14,flow: 0, residualCapacity:14},
        {source: 5, target: 1, capacity: 4,flow: 0, residualCapacity:4},
        {source: 3, target: 2, capacity: 4,flow: 0, residualCapacity:4},
        {source: 4, target: 3, capacity: 9,flow: 0, residualCapacity:9},
        {source: 5, target: 4, capacity: 7,flow: 0, residualCapacity:7}
      ]
}
const totalNodeDiv = document.getElementById("displayTotalNodes");


totalNodeDiv.innerHTML = `Total Nodes : ${graph.nodes.length}`;
totalNodeDiv.style.display = 'block';
totalNodeDiv.style.fontSize = "30px";
totalNodeDiv.style.textAlign = 'center';

const simulation = d3.forceSimulation(graph.nodes)
    .force("charge",d3.forceManyBody().strength(-200))
    .force("link",d3.forceLink(graph.links).distance(250))
    .force("center", d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2));

const links = svg.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke", "red")
    .attr("stroke-width", 2);

const linkFlowbyCapacity = svg.selectAll(".link-label")
        .data(graph.links)
        .enter()
        .append("text")
        .attr("class", "link-label")
        .attr("dy", -15) 
        .attr("font-size",'20px')
        .style("fill", "black")
        .text(d => `${d.flow}/${d.capacity}`);

const nodes = svg.selectAll(".node")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 20)
    .attr("fill", "#0073e6")
    .call(drag(simulation));

const labels = svg.selectAll(".label")
    .data(graph.nodes)
    .enter().append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-size", "20px")
    .each(function(d) {
        d3.select(this).append("tspan")
            .attr("dy", 5) 
            .text(d.name);
    });

    let moveEnabled = false;
    let dragBehavior = null;

    const toggleMoveButton = d3.select("#toggle-move");

    toggleMoveButton.on('click', function() {
        moveEnabled = !moveEnabled;
    
        if (moveEnabled) {
            dragBehavior = drag(simulation);
            nodes.call(dragBehavior);
        } else {
            nodes.on(".drag", null);
            dragBehavior = null;
        }
    
        toggleMoveButton.text(moveEnabled ? "Move Enabled" : "Move Disabled");
    });

simulation.on("tick", () => {
    
    links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x) 
        .attr("y2", d => d.target.y);

    nodes
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);

    linkFlowbyCapacity
        .attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2);
});

function drag(simulation) {
    function dragStarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }
    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }
    function dragEnded(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    return d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded);
}
let PrimaryGraph = {
    "nodes": [
        {id: 0, name: 's', fixed: true, x: 147, y: 243},
        {id: 1, name: 't', fixed: true, x: 764, y: 254}, 
        {id: 2, name: 'v1',fixed: true, x: 346, y: 118},
        {id: 3, name: 'v2',fixed: true, x: 380, y: 300},
        {id: 4, name: 'v3',fixed: true, x: 545, y: 136},
        {id: 5, name: 'v4',fixed: true, x: 599, y: 309}
    ],
     "links": [
        {source: 0, target: 2, capacity: 16,flow: 0, residualCapacity:16},
        {source: 2, target: 4, capacity: 12,flow: 0, residualCapacity:12},
        {source: 4, target: 1, capacity: 20,flow: 0, residualCapacity:20},
        {source: 0, target: 3, capacity: 13,flow: 0, residualCapacity:13},
        {source: 3, target: 5, capacity: 14,flow: 0, residualCapacity:14},
        {source: 5, target: 1, capacity: 4,flow: 0, residualCapacity:4},
        {source: 3, target: 2, capacity: 4,flow: 0, residualCapacity:4},
        {source: 4, target: 3, capacity: 9,flow: 0, residualCapacity:9},
        {source: 5, target: 4, capacity: 7,flow: 0, residualCapacity:7}
      ]
}

function bfs(source, target, graph) {
    const queue = [source];
    const visited = new Set();
    const path = {};

    while (queue.length > 0) {
        const currentNode = queue.shift();

        // console.log("Current Node:", currentNode); // Debug print

        if (currentNode === target) {
            const result = reconstructPath(path, source, target);
            // console.log("Path Found:", result); // Debug print
            return result;
        }

        visited.add(currentNode);

        for (const link of graph.links) {
            if (link.source === currentNode && !visited.has(link.target) && link.residualCapacity > 0) {
                queue.push(link.target);
                path[link.target] = currentNode;
            }
            if (link.target === currentNode && !visited.has(link.source) && link.flow > 0) {
                queue.push(link.source);
                path[link.source] = currentNode;
            }
        }
    }

    return null;
}

function reconstructPath(path, source, target) {
    const result = [];
    let current = target;
    while (current !== source) {
        result.unshift(current);
        current = path[current];
    }
    result.unshift(source);
    return result;
}
function updateEdgeCapacity(sourceNode, targetNode, newCapacity) {
    const edgeLabel = svg.select(`.link-label[data-source="${sourceNode}"][data-target="${targetNode}"]`);
    edgeLabel.text(newCapacity);
}
// function updateCapacities(graph, path, minCapacity) {
//     for (let i = 1; i < path.length; i++) {
//         const currentNode = path[i - 1];
//         const nextNode = path[i];

//         const edgesOfCurrentNode = graph.nodes[currentNode].edges; // Change this line

//         for (const edge of edgesOfCurrentNode) { // Use the correct edges array
//             if (edge.target === nextNode) {
//                 edge.residualCapacity -= minCapacity;

//                 // If there's a corresponding reverse edge, update it
//                 const reverseEdge = graph.nodes[nextNode].edges.find(e => e.target === currentNode); // Change this line
//                 if (reverseEdge) {
//                     reverseEdge.residualCapacity += minCapacity;
//                 }

//                 // Update the edge visualization
//                 updateEdgeCapacity(currentNode, nextNode, edge.residualCapacity);
//                 break;
//             }
//         }
//     }
// }

function edmondkarp(source, target, graph) {

    const residualGraph = JSON.parse(JSON.stringify(graph));
    let maxflow = 0;
    let minCapacity = Infinity;
    while (true) {
        const augmentedPath = bfs(source, target, residualGraph);
        console.log(augmentedPath);
        if (!augmentedPath) {
            break;
        }
        
        
        for (let i = 0; i < augmentedPath.length - 1; i++) {
            const link = findLink(augmentedPath[i], augmentedPath[i + 1], residualGraph);
            minCapacity = Math.min(minCapacity, link.residualCapacity);
        }
        console.log("min capacity : " , minCapacity);

        maxflow += minCapacity;

        // updateCapacities(graph,augmentedPath,minCapacity);
        for (let i = 0; i < augmentedPath.length - 1; i++) {
            updateFlow(augmentedPath[i], augmentedPath[i + 1], minCapacity, graph);
            updateFlow(augmentedPath[i], augmentedPath[i + 1], minCapacity, residualGraph);

        }
    }
    return maxflow;

}
function findLink(source,target,graph ) {
    return graph.links.find(link => link.source === source && link.target === target );
}

function updateFlow(source, target, amount, graph) {
    const link = findLink(source, target, graph);
    const reverseLink = findLink(target, source, graph);
    
    link.flow += amount;
    link.residualCapacity -= amount;

    if (reverseLink) {
        reverseLink.residualCapacity += amount;
    }

    // Update the SVG elements
    const edgeLabel = svg.select(`.link-label[source="${source}"][target="${target}"]`);
    edgeLabel.text(`${link.flow}/${link.capacity}`);
}


const animationDelay = 1000;
function animatePath(path) {
    let index = 0;

    function highlightStep() {
        if (index < path.length) {
            const currentNode = path[index];
            highlightNode(currentNode);

            if (index > 0) {
                const prevNode = path[index - 1];
                highlightLink(prevNode, currentNode);
            }

            index++;
            setTimeout(highlightStep, animationDelay);
        } else {
            setTimeout(() => {
                unhighlightPath(path);
            }, animationDelay);
        }
    }

    highlightStep();
}

function highlightNode(nodeId) {
    nodes.filter(d => d.id === nodeId)
        .transition()
        .duration(animationDelay)
        .attr("r", 20)
        .style("fill", "orange");
}

function highlightLink(sourceId, targetId) {
    links.filter(d => d.source.id === sourceId && d.target.id === targetId)
        .transition()
        .duration(animationDelay)
        .style("stroke", "green");
}

function unhighlightPath(path) {
    nodes.transition()
        .duration(animationDelay)
        .attr("r", 20)
        .style("fill", "#0073e6");

    links.transition()
        .duration(animationDelay)
        .style("stroke", "red"); 
}

const runButton = document.getElementById("Run-Algo");
runButton.addEventListener('click', function() {
    const sourceNode = parseInt(prompt("Enter the Source Node : "));
    const TargetNode = parseInt(prompt("Enter the Target Node : "));

    const path = bfs(sourceNode,TargetNode,PrimaryGraph);
    if(path) {
        const maxFlow = edmondkarp(sourceNode,TargetNode,PrimaryGraph);
        animatePath(path);
        alert("Maximum Flow : "+maxFlow);
    }
    else {
        alert("No path found!");
    }
});
