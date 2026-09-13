'use client';

import FuzzyText from './FuzzyText';
import TextType from './TextType';
import ScrollButton from './ScrollButton';

export default function Hero() {
  const hoverIntensity = 0.3;
  const enableHover = true;

  return (
    <div className="w-full overflow-x-hidden">
      <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-6">
          <div className="space-y-6">
            <FuzzyText
              baseIntensity={0.01}
              hoverIntensity={hoverIntensity}
              enableHover={enableHover}
            >
              IKMALION ARDYANSYAH
            </FuzzyText>

            <TextType
              text={["WEB DEVELOPER", "GAME DEVELOPER"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>
          <ScrollButton/>
        </div>
      </section>
    </div>
  );
}
