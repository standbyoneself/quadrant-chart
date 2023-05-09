import { useEffect } from 'react';
import QuadrantChartService from '../../services/QuadrantChartService';
import './style.css';
import useResizeObserver from 'use-resize-observer';

const quadrantChartService = new QuadrantChartService(
  800,
  600,
  'quadrant-chart'
);

export const QuadrantChart = () => {
  const { ref, width = 0, height = 0 } = useResizeObserver();

  useEffect(() => {
    quadrantChartService
      .renderSVG('#quadrant-chart-container')
      .drawXAxis()
      .drawYAxis()
      .drawRect(
        'bottom-left-rect',
        0,
        quadrantChartService.height / 2,
        '#E5A5BC'
      )
      .drawRect(
        'bottom-right-rect',
        quadrantChartService.width / 2,
        quadrantChartService.height / 2,
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
        .rerenderSVG(width, height - 50)
        .redrawXAxis()
        .redrawYAxis()
        .redrawRect('bottom-left-rect', 0, quadrantChartService.height / 2)
        .redrawRect(
          'bottom-right-rect',
          quadrantChartService.width / 2,
          quadrantChartService.height / 2
        )
        .redrawRect('top-left-rect', 0, 0)
        .redrawRect('top-right-rect', quadrantChartService.width / 2, 0)
        .redrawNodes();
    }
  }, [width, height]);

  return (
    <div className="quadrant-chart" id="quadrant-chart-container" ref={ref}>
      <p id="tooltip" className="tooltip"></p>
    </div>
  );
};
