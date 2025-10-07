import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/about/')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-6 pb-12 pt-4 border-b-2 border-stone-800/20">
        <h1 className="text-4xl font-bold text-stone-800 tracking-tight">About Me</h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Just a beginner learning leathercraft and sharing the ride.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/3">
          <div className="aspect-square bg-stone-200 rounded-lg overflow-hidden shadow-md">
            <div className="w-full h-full flex items-center justify-center text-stone-400">
              <img
                className="size-full object-cover"
                src="https://www.spain.info/export/sites/segtur/.content/imagenes/cabeceras-grandes/Genericas/artesania-piel-cuero-s2174919265.jpg_1014274486.jpg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="md:w-2/3 space-y-4">
          <h2 className="text-3xl font-semibold text-stone-800">Oliwier</h2>
          <p className="text-stone-600 leading-relaxed">
            Hey! I'm just starting out with leathercraft - still figuring things
            out, making plenty of mistakes, and having a lot of fun along the
            way. What began as a random interest turned into a hobby I can't
            stop thinking about.
          </p>
          <p className="text-stone-600 leading-relaxed">
            I started this blog to keep track of what I'm learning - from my
            first messy stitches to the little things that start to make sense
            over time. If you're also new to leatherwork or just curious about
            it, I hope my posts make you feel like you're not learning alone.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-8">
        <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
          <h3 className="text-2xl font-semibold text-stone-800 mb-4">
            What I'm Working On
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center text-stone-600">
              <span className="w-2 h-2 bg-stone-800 rounded-full mr-3"></span>
              Getting the hang of hand-stitching
            </li>
            <li className="flex items-center text-stone-600">
              <span className="w-2 h-2 bg-stone-800 rounded-full mr-3"></span>
              Making simple wallets and small projects
            </li>
            <li className="flex items-center text-stone-600">
              <span className="w-2 h-2 bg-stone-800 rounded-full mr-3"></span>
              Learning how to make clean edges
            </li>
            <li className="flex items-center text-stone-600">
              <span className="w-2 h-2 bg-stone-800 rounded-full mr-3"></span>
              Experimenting with various tools
            </li>
          </ul>
        </div>

        <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
          <h3 className="text-2xl font-semibold text-stone-800 mb-4">
            Contact
          </h3>
          <div className="space-y-3">
            <p className="text-stone-600">
              <span className="font-medium text-stone-800">Email:</span>{' '}
              <a
                href="mailto:juncmakes@gmail.com"
                className="text-stone-800 hover:text-stone-600 transition">
                juncmakes@gmail.com
              </a>
            </p>
            <p className="text-stone-600">
              <span className="font-medium text-stone-800">Location:</span>{' '}
              Łódź, Poland
            </p>
            <div className="pt-2">
              <p className="text-sm text-stone-500">
                Feel free to reach out if you have any questions about
                leathercraft!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-stone-800 text-white rounded-lg p-12 text-center space-y-4">
        <h3 className="text-3xl font-bold">Check Out My Progress</h3>
        <p className="text-stone-300 text-lg max-w-2xl mx-auto">
          Take a look at my recent projects and the tools I'm using to make them!
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link
            to="/projects"
            className="px-6 py-3 bg-white text-stone-800 rounded-md hover:bg-stone-100 transition font-medium">
            View Projects
          </Link>
          <Link
            to="/tools"
            className="px-6 py-3 bg-stone-700 text-white rounded-md hover:bg-stone-600 transition font-medium">
            See Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
