import * as d3 from 'd3';
import D3ChartService from './D3ChartService';

const X_DOMAIN = [0, 5, 10, 50, 100];
const Y_DOMAIN = [0, 0.5, 1, 10, 15];

interface DataEntry {
  x: number;
  y: number;
  title: string;
}

const DATA: Array<DataEntry> = [
  {
    x: 5,
    y: 0.5,
    title: 'Декабрь 2022 г. согласия',
  },
  {
    x: 50,
    y: 10,
    title: 'Надежное и удобное мобильное приложение',
  },
];

export default class QuadrantChartService extends D3ChartService {
  private createXScale() {
    return d3
      .scaleLinear()
      .domain(X_DOMAIN)
      .range(
        d3
          .range(0, this.width, this.width / (X_DOMAIN.length - 1))
          .concat(this.width)
      );
  }

  private createXAxis() {
    const xScale = this.createXScale();

    const xAxis = d3.axisBottom(xScale).tickSize(0).tickValues(X_DOMAIN);

    return xAxis;
  }

  public drawXAxis() {
    const xAxis = this.createXAxis();

    d3.select(this.selector)
      .append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis);

    return this;
  }

  public redrawXAxis() {
    const xAxis = this.createXAxis();

    d3.select(this.selector).select<SVGGElement>('#x-axis').call(xAxis);

    return this;
  }

  private createYScale() {
    return d3
      .scaleLinear()
      .domain(Y_DOMAIN)
      .range(
        d3
          .range(0, this.height, this.height / (Y_DOMAIN.length - 1))
          .concat(this.height)
          .sort((a, b) => b - a)
      );
  }

  private createYAxis() {
    const yScale = this.createYScale();

    const yAxis = d3
      .axisLeft(yScale)
      .tickSize(0)
      .tickValues(Y_DOMAIN)
      .tickFormat((value) => String(value));

    return yAxis;
  }

  public drawYAxis() {
    const yAxis = this.createYAxis();

    d3.select(this.selector).append('g').attr('id', 'y-axis').call(yAxis);

    return this;
  }

  public drawRect(id: string, x: number, y: number, color: string) {
    d3.select(this.selector)
      .append('rect')
      .attr('id', id)
      .attr('x', x)
      .attr('y', y)
      .attr('width', this.width / 2)
      .attr('height', this.height / 2)
      .attr('fill', color);

    return this;
  }

  public redrawRect(id: string, x: number) {
    d3.select(this.selector)
      .select(`#${id}`)
      .attr('x', x)
      .attr('width', this.width / 2);

    return this;
  }

  public drawNodesContainer() {
    d3.select(this.selector).append('g').attr('id', 'nodes-container');

    return this;
  }

  public drawNodes() {
    const xScale = this.createXScale();
    const yScale = this.createYScale();

    d3.select('#nodes-container')
      .selectAll('circle')
      .data(DATA)
      .join((enter) => {
        const enterSelection = enter
          .append('circle')
          .attr('class', 'node')
          .attr('cx', (d) => xScale(d.x))
          .attr('cy', (d) => yScale(d.y))
          .attr('r', 5)
          .attr('fill', '#fff')
          .on('mouseover', (event: MouseEvent, d) => {
            d3.select('#tooltip')
              .text(d.title)
              .style('visibility', 'visible')
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY}px`);
          })
          .on('mouseout', () => {
            d3.select('#tooltip').style('visibility', 'hidden');
          });

        return enterSelection;
      });

    return this;
  }

  public redrawNodes() {
    const xScale = this.createXScale();

    d3.select(this.selector)
      .selectAll<SVGCircleElement, DataEntry>('circle.node')
      .attr('cx', (d) => xScale(d.x));

    return this;
  }
}
