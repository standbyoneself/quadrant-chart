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
  const { ref, width = 0 } = useResizeObserver();

  useEffect(() => {
    quadrantChartService
      .renderSVG('#quadrant-chart-container')
      .drawXAxis()
      .drawYAxis()
      .drawBottomLeftRect()
      .drawBottomRightRect()
      .drawTopLeftRect()
      .drawTopRightRect()
      .drawNodesContainer()
      .drawNodes();
  }, []);

  useEffect(() => {
    if (width > 0) {
      quadrantChartService.rerenderSVG(width).redrawXAxis();
    }
  }, [width]);

  return (
    <div className="quadrant-chart" id="quadrant-chart-container" ref={ref}>
      <p id="tooltip" className="tooltip"></p>
    </div>
  );
};
