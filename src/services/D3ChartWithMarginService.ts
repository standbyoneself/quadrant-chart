import * as d3 from 'd3';
import D3ChartService from './D3ChartService';
import { ChartMargin, ID3ChartService } from '../types/chart';

export default class D3ChartWithMarginService
  extends D3ChartService
  implements ID3ChartService
{
  private _margin: ChartMargin;

  constructor(width: number, height: number, id: string, margin: ChartMargin) {
    super(width, height, id);
    this._margin = margin;
  }

  protected get selector() {
    return `#${this._id} > #container`;
  }

  private get marginHorizontal() {
    return this._margin.left + this._margin.right;
  }

  private get marginVertical() {
    return this._margin.top + this._margin.bottom;
  }

  public renderSVG(selector: string) {
    d3.select(selector)
      .append('svg')
      .attr('id', this._id)
      .attr('width', this.width + this.marginHorizontal)
      .attr('height', this.height + this.marginVertical)
      .append('g')
      .attr('id', 'container')
      .attr(
        'transform',
        `translate(${this._margin.left}, ${this._margin.top})`
      );

    return this;
  }

  public rerenderSVG(width: number, height: number) {
    this._width = width;
    this._height = height;

    d3.select(`#${this._id}`)
      .attr('width', width + this.marginHorizontal)
      .attr('height', height + this.marginVertical);

    return this;
  }
}
