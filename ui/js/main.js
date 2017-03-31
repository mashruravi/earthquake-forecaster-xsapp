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
        left: 50
    };

    let svgWidth = 800 - margins.left - margins.right,
        svgHeight = 600 - margins.top - margins.bottom;

    let chart = d3.select("#chartArea")
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

