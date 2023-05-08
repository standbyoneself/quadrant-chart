import * as d3 from 'd3';

const MARGIN_HORIZONTAL = 25;
const MARGIN_VERTICAL = 25;

export default class D3ChartService {
  private _width: number;
  private _height: number;
  private _id: string;

  constructor(width: number, height: number, id: string) {
    this._width = width;
    this._height = height;
    this._id = id;
  }

  protected get selector() {
    return `#${this._id} > #container`;
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public renderSVG(selector: string) {
    d3.select(selector)
      .append('svg')
      .attr('id', this._id)
      .attr('width', this.width + MARGIN_HORIZONTAL * 2)
      .attr('height', this.height + MARGIN_VERTICAL * 2)
      .append('g')
      .attr('id', 'container')
      .attr('transform', `translate(${MARGIN_HORIZONTAL}, ${MARGIN_VERTICAL})`);

    return this;
  }

  public rerenderSVG(width: number, height: number) {
    this._width = width;
    this._height = height;

    d3.select(`#${this._id}`)
      .attr('width', width + MARGIN_HORIZONTAL * 2)
      .attr('height', height + MARGIN_VERTICAL * 2);

    return this;
  }
}
