import * as d3 from 'd3';
import { QUADRANT_CHART_X_DOMAIN, QUADRANT_CHART_Y_DOMAIN } from '../constants';

const MARGIN_HORIZONTAL = 25;
const MARGIN_VERTICAL = 25;

const DATA = [
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

export default class QuadrantChartService {
  private _width: number;
  private _height: number;
  private _id: string;

  constructor(width: number, height: number, id: string) {
    this._width = width;
    this._height = height;
    this._id = id;
  }

  private get selector() {
    return `#${this._id} > #container`;
  }

  public renderSVG(selector: string) {
    d3.select(selector)
      .append('svg')
      .attr('id', this._id)
      .attr('width', this._width + MARGIN_HORIZONTAL * 2)
      .attr('height', this._height + MARGIN_VERTICAL * 2)
      .append('g')
      .attr('id', 'container')
      .attr('transform', `translate(${MARGIN_HORIZONTAL}, ${MARGIN_VERTICAL})`);
  }

  public createXScale() {
    return d3
      .scaleLinear()
      .domain(QUADRANT_CHART_X_DOMAIN)
      .range(
        d3
          .range(
            0,
            this._width,
            this._width / (QUADRANT_CHART_X_DOMAIN.length - 1)
          )
          .concat(this._width)
      );
  }

  private createXAxis() {
    const xScale = this.createXScale();

    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(0)
      .tickValues(QUADRANT_CHART_X_DOMAIN);

    return xAxis;
  }

  public drawXAxis() {
    const xAxis = this.createXAxis();

    d3.select(this.selector)
      .append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${this._height})`)
      .call(xAxis);
  }

  public createYScale() {
    return d3
      .scaleLinear()
      .domain(QUADRANT_CHART_Y_DOMAIN)
      .range(
        d3
          .range(
            0,
            this._height,
            this._height / (QUADRANT_CHART_Y_DOMAIN.length - 1)
          )
          .concat(this._height)
          .sort((a, b) => b - a)
      );
  }

  private createYAxis() {
    const yScale = this.createYScale();

    const yAxis = d3
      .axisLeft(yScale)
      .tickSize(0)
      .tickValues(QUADRANT_CHART_Y_DOMAIN)
      .tickFormat((value) => String(value));

    return yAxis;
  }

  public drawYAxis() {
    const yAxis = this.createYAxis();

    d3.select(this.selector).append('g').attr('id', 'y-axis').call(yAxis);
  }

  public drawBottomLeftRect() {
    d3.select(this.selector)
      .append('rect')
      .attr('x', 0)
      .attr('y', this._height / 2)
      .attr('width', this._width / 2)
      .attr('height', this._height / 2)
      .attr('fill', '#E5A5BC');
  }

  public drawBottomRightRect() {
    d3.select(this.selector)
      .append('rect')
      .attr('x', this._width / 2)
      .attr('y', this._height / 2)
      .attr('width', this._width / 2)
      .attr('height', this._height / 2)
      .attr('fill', '#FFEFBB');
  }

  public drawTopLeftRect() {
    d3.select(this.selector)
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this._width / 2)
      .attr('height', this._height / 2)
      .attr('fill', '#FFCBAE');
  }

  public drawTopRightRect() {
    d3.select(this.selector)
      .append('rect')
      .attr('x', this._width / 2)
      .attr('y', 0)
      .attr('width', this._width / 2)
      .attr('height', this._height / 2)
      .attr('fill', '#9AE3B8');
  }

  public drawNodesContainer() {
    d3.select(this.selector).append('g').attr('id', 'nodes-container');
  }

  public drawNodes() {
    d3.select('#nodes-container')
      .selectAll('circle')
      .data(DATA)
      .join((enter) => {
        const xScale = this.createXScale();
        const yScale = this.createYScale();

        const enterSelection = enter
          .append('circle')
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
  }
}
