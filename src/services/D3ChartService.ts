import * as d3 from 'd3';
import { ID3ChartService } from '../types/chart';

export default class D3ChartService implements ID3ChartService {
  protected _width: number;
  protected _height: number;
  protected _id: string;

  constructor(width: number, height: number, id: string) {
    this._width = width;
    this._height = height;
    this._id = id;
  }

  protected get selector() {
    return `#${this._id}`;
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
      .attr('width', this.width)
      .attr('height', this.height);

    return this;
  }

  public rerenderSVG(width: number, height: number) {
    this._width = width;
    this._height = height;

    d3.select(this.selector).attr('width', width).attr('height', height);

    return this;
  }
}
