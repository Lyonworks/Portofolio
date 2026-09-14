'use client';

import FuzzyText from './FuzzyText';
import TextType from './TextType';
import ScrollButton from './ScrollButton';
import { useLanguage } from '../LanguageContext';

export default function Hero() {
  const { language } = useLanguage();
  const hoverIntensity = 0.3;
  const enableHover = true;

  return (
    <div className="w-full overflow-x-hidden">
      <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4">
        
        <div className="w-full max-w-full space-y-6">

          {/* Fuzzy Text */}
          <div className="w-full flex justify-center overflow-visible">
            <div className="scale-[0.82] sm:scale-100 origin-center whitespace-nowrap">
              <FuzzyText
                baseIntensity={0.01}
                hoverIntensity={hoverIntensity}
                enableHover={enableHover}
              >
                IKMALION ARDYANSYAH
              </FuzzyText>
            </div>
          </div>

          {/* Text Type */}
          <div className="w-full flex justify-center">
            <TextType
              text={language === 'id' ? ["PENGEMBANG WEB", "PENGEMBANG GAME"] : ["WEB DEVELOPER", "GAME DEVELOPER"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>

          <ScrollButton />

        </div>
      </section>
    </div>
  );
}