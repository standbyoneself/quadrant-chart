import * as d3 from 'd3';
import D3ChartService from './D3ChartService';
import { ID3ChartService } from '../types/chart';

export default class D3ChartWithMarginService
  extends D3ChartService
  implements ID3ChartService
{
  private _marginHorizontal: number;
  private _marginVertical: number;

  constructor(
    width: number,
    height: number,
    id: string,
    marginHorizontal: number,
    marginVertical: number
  ) {
    super(width, height, id);
    this._marginHorizontal = marginHorizontal;
    this._marginVertical = marginVertical;
  }

  protected get selector() {
    return `#${this._id} > #container`;
  }

  public renderSVG(selector: string) {
    d3.select(selector)
      .append('svg')
      .attr('id', this._id)
      .attr('width', this.width + this._marginHorizontal * 2)
      .attr('height', this.height + this._marginVertical * 2)
      .append('g')
      .attr('id', 'container')
      .attr(
        'transform',
        `translate(${this._marginHorizontal}, ${this._marginVertical})`
      );

    return this;
  }

  public rerenderSVG(width: number, height: number) {
    this._width = width;
    this._height = height;

    d3.select(`#${this._id}`)
      .attr('width', width + this._marginHorizontal * 2)
      .attr('height', height + this._marginVertical * 2);

    return this;
  }
}
