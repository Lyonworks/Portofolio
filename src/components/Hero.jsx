import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Konten utama */}
      <div className="relative z-20 flex items-center justify-center h-full w-full">
        <div className="text-center w-full px-4">
          <h1 className="text-5xl font-bold mb-4">Halo, saya Lyon</h1>
          <TypeAnimation
            sequence={[
              'Frontend Developer',
              2000,
              'React Enthusiast',
              2000,
              'Freelancer',
              2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="text-4xl font-semibold text-gray-800 dark:text-gray-200"
          />
          <p className="text-xl text-gray-500 dark:text-gray-400 mt-4">
            Saya seorang pengembang antarmuka yang berdedikasi dan antusias dengan pengalaman
            dalam membangun aplikasi web yang menarik dan fungsional.
          </p>
        </div>
      </div>
    </section>
  );
}
