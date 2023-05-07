import * as d3 from 'd3';

const MARGIN_HORIZONTAL = 25;
const MARGIN_VERTICAL = 25;

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

  public get width() {
    return this._width;
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

    return this;
  }

  public rerenderSVG(width: number) {
    this._width = width;

    d3.select(`#${this._id}`).attr('width', width + MARGIN_HORIZONTAL * 2);

    return this;
  }

  private createXScale() {
    return d3
      .scaleLinear()
      .domain(X_DOMAIN)
      .range(
        d3
          .range(0, this._width, this._width / (X_DOMAIN.length - 1))
          .concat(this._width)
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
      .attr('transform', `translate(0, ${this._height})`)
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
          .range(0, this._height, this._height / (Y_DOMAIN.length - 1))
          .concat(this._height)
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
      .attr('width', this._width / 2)
      .attr('height', this._height / 2)
      .attr('fill', color);

    return this;
  }

  public redrawRect(id: string, x: number) {
    d3.select(this.selector)
      .select(`#${id}`)
      .attr('x', x)
      .attr('width', this._width / 2);

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
  }
}
