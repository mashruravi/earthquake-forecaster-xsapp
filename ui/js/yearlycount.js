function drawGraph(data, xVar, yVar) {

    // Get the domain of the data
    let minYear = data[0][xVar.dataName];
    let maxYear = data[data.length - 1][xVar.dataName];

    let minCount = data[0][yVar.dataName];
    let maxCount = data[data.length - 1][yVar.dataName];

    let margins = {
        top: 50,
        right: 10,
        bottom: 50,
        left: 70
    };

    // Set this as the width of the div that contains the svg as well
    // Required to centre align the graph on the page
    let svgWidth = 800 - margins.left - margins.right,
        svgHeight = 600 - margins.top - margins.bottom;

    let chartSelector = "#chartArea";

    // div to show the tooltip
    let div = d3.select(chartSelector).append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    let chart = d3.select(chartSelector)
        .append('svg')
        .attr('width', svgWidth + margins.left + margins.right)
        .attr('height', svgHeight + margins.top + margins.bottom)
        .append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

    let xScale = d3.scaleLinear()
        .domain(
        [minYear, maxYear]
        ).range(
        [0, svgWidth]
        );

    let yScale = d3.scaleLinear()
        .domain(
        [minCount, maxCount]
        ).range(
        [svgHeight, 0]
        );

    let line = d3.line()
        .x(d => xScale(d[xVar.dataName]))
        .y(d => yScale(d[yVar.dataName]));

    chart.append('path')
        .attr('class', 'line')
        .attr('d', line(data));

    // Add circles at all data points in the line graph
    chart.selectAll('dot')
        .data(data)
        .enter().append('circle')
        .attr('r', 3.5)
        .attr('cx', d => xScale(d[xVar.dataName]))
        .attr('cy', d => yScale(d[yVar.dataName]))
        .on('mouseover', d => {
            div.transition()
                .duration(200)
                .style('opacity', 0.9);
            div.html(xVar.displayName + ': ' + d[xVar.dataName] + '<br/>' + yVar.displayName + ': ' + d3.format(',')(d[yVar.dataName]))
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY + 20) + 'px');
        })
        .on('mouseout', d => {
            div.transition()
                .duration(200)
                .style('opacity', 0);
        });

    chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + svgHeight + ')')
        .call(
        d3.axisBottom(xScale)
            .tickFormat(d3.format('d'))
        );

    // Text for the x-axis
    chart.append('text')
        .attr('transform', 'translate(' + svgWidth / 2 + ', ' + (svgHeight + margins.top) + ')')
        .style('text-anchor', 'middle')
        .text('Year');

    chart.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yScale));

    // Text for the y-axis
    chart.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margins.left)
        .attr('x', 0 - (svgHeight / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('No. of Earthquakes');

    // Chart title
    chart.append('text')
        .attr('x', (svgWidth / 2))
        .attr('y', 0 - (margins.top / 2))
        .attr('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('text-decoration', 'underline')
        .text('Number of Earthquakes over the years');
}

// Get the data
jQuery.ajax({
    url: "/earthquake-forecaster/data/services/get-yearly-count.xsjs"
}).done(function (data) {
    drawGraph(data,
        {
            dataName: 'YEAR',
            displayName: 'Year'
        }, {
            dataName: 'COUNT',
            displayName: 'Count'
        });
});

