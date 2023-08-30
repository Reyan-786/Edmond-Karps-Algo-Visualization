export function AnimatePath(path) {
    svg.selectAll('.highlight').remove();

    for (let i = 0; i < path.length - 1; i++) {
        const source = path[i];
        const target = path[i + 1];

        svg.append("line")
            .attr("class", "highlight")
            .attr("x1", graph.nodes[source].x)
            .attr("y1", graph.nodes[source].y)
            .attr("x2", graph.nodes[target].x)
            .attr("y2", graph.nodes[target].y);

        svg.selectAll(".node")
            .filter(d => d.id === source || d.id === target)
            .attr("class", "node highlight");
    }
}

