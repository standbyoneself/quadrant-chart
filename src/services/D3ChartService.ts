import * as d3 from 'd3';

export default class D3ChartService {
  private _width: number;
  private _height: number;
  private _marginHorizontal: number;
  private _marginVertical: number;
  private _id: string;

  constructor(
    width: number,
    height: number,
    marginHorizontal: number,
    marginVertical: number,
    id: string
  ) {
    this._width = width;
    this._height = height;
    this._marginHorizontal = marginHorizontal;
    this._marginVertical = marginVertical;
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
