export default function Projects() {
  const data = [
    { title: 'Project A', desc: 'Deskripsi singkat project A.' },
    { title: 'Project B', desc: 'Deskripsi singkat project B.' },
    { title: 'Project C', desc: 'Deskripsi singkat project C.' },
  ];

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center px-6">
      <h2 className="text-3xl font-semibold my-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((p, i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-gray-700 p-4 rounded transition hover:shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
