'use client';

import FuzzyText from './FuzzyText';
import TextType from './TextType';
import ScrollButton from './ScrollButton';
import ScrollReveal from './ScrollReveal';

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
              IKMALION
            </FuzzyText>

            <TextType
              text={["FRONTEND DEVELOPER", "GAME DEVELOPER"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>
          <ScrollButton/>
        </div>
      </section>

      <section id="about" className="min-h-screen w-full flex justify-center px-6 py-24">
        <div className="max-w-3xl text-center">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
          >
            Hello, I’m Ikmalion, a tech enthusiast with a focus on Web Development and Game Development.  
            I specialize in building responsive, interactive, and visually engaging digital experiences.  
            With a strong eye for design and a passion for user-centric development, I aim to create modern web solutions that are both functional and aesthetically refined.
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
