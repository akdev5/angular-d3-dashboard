d3.custom = {};

d3.custom.barChart = function module(options) {

  options = options || {};

  var marginDefault = { top: 0, right: 40, bottom: 25, left: 70, padding: 10 };
  var margin = options.margin || marginDefault,
      width  = options.width || 960,
      height = options.height || 500,
      gap    = options.gap || 0,
      ease   = options.ease || 'cubic-in-out',
      textPadding = 13,
      format = d3.format('.0f'),
      number = d3.format('.2f');

  var svg, duration = 500;
  var dispatch      = d3.dispatch('customHover');

  function exports(selection) {
    selection.each(function(data) {

      var chartW = width - margin.left - margin.right,
          chartH = height - margin.top - margin.bottom;

      var x1 = d3.scale.ordinal()
        .domain(data.map(function(d, i) { return d.x; }))
        .rangeRoundBands([0, chartW], .1);

      var y1 = d3.scale.linear()
        .domain([0, d3.max(data, function(d, i) { return d.y; })])
        .range([chartH, 0]);

      var xAxis = d3.svg.axis()
        .scale(x1)
        .orient('bottom');

      var yAxis = d3.svg.axis()
        .scale(y1)
        .tickFormat(function(d) { return '£' + format(d); })
        .tickSize(-chartW)
        .orient('left');

      var barW = chartW / data.length;

      if (!svg) {
        svg = d3.select(this)
          .append('svg')
          .classed('chart', 1);
        var container  = svg.append('g').classed('container-group', 1);
        var chartGroup = container.append('g').classed('chart-group', 1);
        container.append('g').classed('chart-title', 1);
        chartGroup.append('g').classed('x-axis-group axis', 1);
        chartGroup.append('g').classed('y-axis-group axis', 1);
      }

      svg.transition().duration(duration).attr({width: width, height: height});
      svg.select('.container-group')
        .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

      svg.select('.chart-title')
        .attr('x', width / 2)
        .attr('y', 0 - (margin.top / 2))
        .attr('text-anchor', 'middle')
        .style('font-size', '22px')
        .text(options.title);

      var gapSize = x1.rangeBand() / 100 * gap;
      var barW    = x1.rangeBand() - gapSize;
      var bars    = svg.select('.chart-group')
        .selectAll('.bar-group')
        .data(data);

      var barsEnter = bars.enter()
        .append('g')
        .classed('bar-group', 1);

      barsEnter.append('rect')
        .classed('bar', 1)
        .attr({
          x: chartW,
          width: barW,
          y: chartH,
          height: 0
        })
        .on('mouseover', dispatch.customHover);

      barsEnter.append('text')
        .classed('bar-label', 1)
        .attr({
          x: function(d) { return x1(d.x) + barW / 2 - .5; },// chartW,
          y: function(d) { return y1(d.y) - .5; }, //chartH
          dx: '.35em',
          dy: 15,
          'text-anchor': 'middle'
        })
        .style('color', '#bdc3c7')
        .text(function(d) {
          if (chartH - y1(d.y) > 25) return '£' + number(d.y);
        });

      bars.selectAll('.bar').transition()
        .duration(duration)
        .ease(ease)
        .attr({
          width: barW,
          x: function(d, i) { return x1(d.x) + gapSize / 2 - .5; },
          y: function(d, i) { return y1(d.y) + .5; },
          height: function(d, i) { return chartH - y1(d.y); }
        });

      bars.selectAll('.bar-label').transition()
        .duration(duration)
        .ease(ease)
        .attr({
          x: function(d) { return x1(d.x) + barW / 2 - .5; },
          y: function(d) { return y1(d.y) - .5; },
          dx: '-0.05em',
          dy: function(d) { return barW / 5.1; }
        })
        .style('font-size', (barW / 6) + 'px');

      bars.exit().transition().style({opacity: 0}).remove();
      duration = 500;

      svg.select('.chart-group').select('.x-axis-group.axis')
        .transition()
        .duration(duration)
        .ease(ease)
        .attr({transform: 'translate(0,' + (chartH) + ')'})
        .call(xAxis);

      svg.select('.chart-group').select('.y-axis-group.axis')
        .transition()
        .duration(duration)
        .ease(ease)
        .call(yAxis);
    });
  }

  exports.width = function(x) {
    if (!arguments.length) return width;
    width = parseInt(x);
    return this;
  };

  exports.height = function(x) {
    if (!arguments.length) return height;
    height = parseInt(x);
    duration = 0;
    return this;
  };

  exports.gap = function(x) {
    if (!arguments.length) return gap;
    gap = x;
    return this;
  };

  exports.ease = function(x) {
    if (!arguments.length) return ease;
    ease = x;
    return this;
  };

  d3.rebind(exports, dispatch, 'on');
  return exports;
};