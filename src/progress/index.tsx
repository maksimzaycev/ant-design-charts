import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { Progress as G2plotProgress, ProgressConfig as G2plotProps } from '@antv/g2plot';
import useChart from '../hooks/useChart';
import { ErrorBoundary } from '../base';

export interface ProgressConfig extends G2plotProps {
  chartRef?: React.MutableRefObject<G2plotProgress | undefined>;
  style?: React.CSSProperties;
  className?: string;
}

const ProgressChart = forwardRef((props: ProgressConfig, ref) => {
  const { chartRef, style = {}, className, ...rest } = props;

  const { chart, container } = useChart<G2plotProgress, ProgressConfig>(G2plotProgress, rest);

  useEffect(() => {
    if (chartRef) {
      chartRef.current = chart.current;
    }
  }, [chart.current]);
  useImperativeHandle(ref, () => ({
    getChart: () => chart.current,
  }));
  return (
    <ErrorBoundary>
      <div className={className} style={style} ref={container} />
    </ErrorBoundary>
  );
});

ProgressChart.defaultProps = G2plotProgress.getDefaultOptions();

export default ProgressChart;
