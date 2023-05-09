import D3ChartService from '../services/D3ChartService';

export interface ID3ChartService {
  renderSVG(selector: string): D3ChartService;
  rerenderSVG(width: number, height: number): D3ChartService;
}

export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
