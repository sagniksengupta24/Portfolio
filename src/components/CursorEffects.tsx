import ClickSpark from './ClickSpark';
import SplashCursor from './SplashCursor';

export const CursorEffects = () => {
  return (
    <>
      <SplashCursor color="#9DE8D7" splatRadius={30} maxSplats={78} dissipation={0.024} />
      <ClickSpark sparkColor="#9DE8D7" sparkSize={12} sparkRadius={24} sparkCount={8} duration={420} />
    </>
  );
};
