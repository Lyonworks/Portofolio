'use client';

import ScrollReveal from './ScrollReveal';

export default function About() {
  return (
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
  );
}
