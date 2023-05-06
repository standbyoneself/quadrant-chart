import { useEffect } from 'react';
import QuadrantChartService from '../../services/QuadrantChartService';
import './style.css';

const quadrantChartService = new QuadrantChartService(
  800,
  600,
  'quadrant-chart'
);

export const QuadrantChart = () => {
  useEffect(() => {
    quadrantChartService.renderSVG('#quadrant-chart-container');

    quadrantChartService.drawXAxis();

    quadrantChartService.drawYAxis();

    quadrantChartService.drawBottomLeftRect();

    quadrantChartService.drawBottomRightRect();

    quadrantChartService.drawTopLeftRect();

    quadrantChartService.drawTopRightRect();

    quadrantChartService.drawNodesContainer();

    quadrantChartService.drawNodes();
  }, []);

  return (
    <div className="quadrant-chart" id="quadrant-chart-container">
      <p id="tooltip" className="tooltip"></p>
    </div>
  );
};
