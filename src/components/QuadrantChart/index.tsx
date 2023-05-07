import { useEffect } from 'react';
import QuadrantChartService from '../../services/QuadrantChartService';
import './style.css';
import useResizeObserver from 'use-resize-observer';

const HEIGHT = 600;

const quadrantChartService = new QuadrantChartService(
  800,
  HEIGHT,
  'quadrant-chart'
);

export const QuadrantChart = () => {
  const { ref, width = 0 } = useResizeObserver();

  useEffect(() => {
    quadrantChartService
      .renderSVG('#quadrant-chart-container')
      .drawXAxis()
      .drawYAxis()
      .drawRect('bottom-left-rect', 0, HEIGHT / 2, '#E5A5BC')
      .drawRect(
        'bottom-right-rect',
        quadrantChartService.width / 2,
        HEIGHT / 2,
        '#FFEFBB'
      )
      .drawRect('top-left-rect', 0, 0, '#FFCBAE')
      .drawRect('top-right-rect', quadrantChartService.width / 2, 0, '#9AE3B8')
      .drawNodesContainer()
      .drawNodes();
  }, []);

  useEffect(() => {
    if (width > 0) {
      quadrantChartService
        .rerenderSVG(width)
        .redrawXAxis()
        .redrawRect('bottom-left-rect', 0)
        .redrawRect('bottom-right-rect', quadrantChartService.width / 2)
        .redrawRect('top-left-rect', 0)
        .redrawRect('top-right-rect', quadrantChartService.width / 2);
    }
  }, [width]);

  return (
    <div className="quadrant-chart" id="quadrant-chart-container" ref={ref}>
      <p id="tooltip" className="tooltip"></p>
    </div>
  );
};
