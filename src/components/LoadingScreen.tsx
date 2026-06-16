import GridScan from './GridScan';
import './LoadingScreen.css';

interface LoadingScreenProps {
  isExiting?: boolean;
}

export const LoadingScreen = ({ isExiting = false }: LoadingScreenProps) => {
  return (
    <div className={`loading-screen${isExiting ? ' is-exiting' : ''}`} aria-label="Loading">
      <GridScan
        className="loading-screen__grid"
        lineThickness={2.2}
        linesColor="#213234"
        gridScale={0.075}
        scanColor="#9DE8D7"
        scanOpacity={0.56}
        lineJitter={0.5}
        scanGlow={1.2}
        scanSoftness={2.6}
      />
      <div className="loading-screen__veil" />
      <div className="loading-screen__content">
        <span className="loading-screen__kicker">Initializing</span>
        <span className="loading-screen__title">Sagnik Portfolio</span>
      </div>
    </div>
  );
};
