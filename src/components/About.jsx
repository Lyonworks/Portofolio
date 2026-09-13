'use client';

import ScrambledText from './ScrambledText';

export default function About() {
  return (
    <section id="about" className="min-h-screen w-full flex justify-center px-6 py-24">
        <div className=" text-center">
          <ScrambledText
            className="scrambled-text-demo px-2"
            radius={50}
            duration={1.2}
            speed={0.5}
            scrambleChars="xxx"
          >
            Hello, I’m Ikmalion, a tech enthusiast with a focus on Web Development and Game Development.  
            I specialize in building responsive, interactive, and visually engaging digital experiences.  
            With a strong eye for design and a passion for user-centric development, 
            I aim to create modern web solutions that are both functional and aesthetically refined.
          </ScrambledText>
        </div>
      </section>
  );
}
