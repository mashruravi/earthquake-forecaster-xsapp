function drawGraph(data) {

    // Get the domain of the data
    let minYear = data[0].YEAR;
    let maxYear = data[data.length - 1].YEAR;

    let minCount = data[0].COUNT;
    let maxCount = data[data.length - 1].COUNT;

    let margins = {
        top: 50,
        right: 10,
        bottom: 50,
        left: 70
    };

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
                .x(d => xScale(d.YEAR))
                .y(d => yScale(d.COUNT));

    chart.append('path')
            .attr('class', 'line')
            .attr('d', line(data));

    // Add circles at all data points in the line graph
    chart.selectAll('dot')
            .data(data)
            .enter().append('circle')
            .attr('r', 3.5)
            .attr('cx', d => xScale(d.YEAR))
            .attr('cy', d => yScale(d.COUNT))
            .on('mouseover', d => {
                div.transition()
                    .duration(200)
                    .style('opacity', 0.9);
                div.html('Year: ' + d.YEAR + '<br/>' + 'Count: ' + d3.format(',')(d.COUNT))
                    .style('left', (d3.event.pageX) + 'px')
                    .style('top', (d3.event.pageY + 20) + 'px');
            })
            .on('mouseout', d=> {
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

    chart.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(yScale));
}

// Get the data
jQuery.ajax({
    url: "/earthquake-forecaster/data/services/get-yearly-count.xsjs"
}).done(function (data) {
    drawGraph(data);
});

