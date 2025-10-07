import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/tools/')({
  component: ToolsPage,
});

function ToolsPage() {
  const tools = [
    {
      id: 1,
      name: 'SDI 3005C Aluminum Diecast Grip Cutter',
      description:
        'Surprisingly affordable, super sharp, and has a nice weight - great for clean, precise cuts.',
      link: 'https://stationery.sdi.com.tw/en/catalog-detail/3005C/',
      imageUrl: '/images/tools/knife.png',
    },
    {
      id: 2,
      name: 'Anti-slip 30cm Metal Ruler',
      description:
        "Any good metal ruler will work - just make sure it's long enough and has a cork backing so it doesn't slip.",
      link: 'https://www.amazon.com/Stainless-Non-Slip-Centimeters-Straight-Drafting/dp/B0DSC9TF2R/ref=sr_1_4?crid=37UH9FUHPKCEV&dib=eyJ2IjoiMSJ9.wnzt1fYLPeb5Tca2iUMHQd6CJpqQKqNoBO0cDUabBolrOLeyqODk9015JFGs-MDRU85WR7lSFPvQv_zYyO9s7eBr6kM6sLPFJLQnP-SjF-Je3QUwOJwDGqsrTMV2F0CliL3JOfgLV2dymdQy45tL47XWeNCeqcK4ifhSUeaf8Q0Jx1GN4n7BOPN2kdtPfH8RmE-bL6-QZHQOMpjD6Y0CxuhvanEo_CsV0o9FanASUgMEtERDwVqFiwV1vbdNUuh4ZJpSk-y5YWXB3rfZyyioPiQdaWRWyLWQ2vbG6Ytnv5E.2kzH2akILuP3pVldZpmJch2WYLl1gViHqtm7mUW6esI&dib_tag=se&keywords=metal%2Bruler%2Bcork&qid=1759686336&sprefix=metal%2Bruler%2Bcork%2Caps%2C216&sr=8-4&th=1',
      imageUrl: '/images/tools/ruler.png',
    },
    {
      id: 3,
      name: 'A3 Cutting Mat',
      description:
        "You don't need this exact one, but go for a large, self-healing mat to protect your workspace and blades.",
      link: 'https://craft-point.com/sklep/mata-samogojaca-dwustronna-a3/',
      imageUrl: '/images/tools/cutting-mat.png',
    },
    {
      id: 4,
      name: 'Seiwa Tokonole Leather Burnishing Gum',
      description:
        'One of the best edge burnishing products out there - gives leather a smooth, professional finish.',
      link: 'https://www.amazon.com/Buckleguy-com-Tokonole-Leather-Burnishing-Choose/dp/B0DV4C1PJ4/ref=sr_1_2?crid=15TWQETKO1FC1&dib=eyJ2IjoiMSJ9.9wE0ZJHe7kH3KFc0FEkKq3rENFSdpEUwlN_FohVlcKqrMfqwRQTqDz3wkEZlcGo1oTmzIXE9HR80PDLijaGFx72BUqRjJvcMEYotg3snyJT_VXGH9DnzLQJZuL_1H9qi8bYiXZaSK9lNdQVOd3c8sjV6DjbS79DxcP-Bf5nS1JspNSEyw6JD4XFXx75lU1FTWdi68aePMdzh4jJPO27L5Q6hi0o8T7MmeP-Xaf0AYmBw7luDmgQAiRgM6otWYVF034htHBbm7aihN1dKhIGjLSsMn1nnK5vo3ZXHcIW9ujg.YTAiyA6PRkMHliaU5tdi2TLl0aTjEZNTVcFLKSfucmk&dib_tag=se&keywords=tokonole&qid=1759684788&sprefix=tokonol%2Caps%2C231&sr=8-2&th=1',
      imageUrl: '/images/tools/burnishing-gum.png',
    },
    {
      id: 5,
      name: 'Seiwa Leather Adhesive',
      description:
        'Strong, easy to use, and dries clear - honestly one of the best glues for leathercraft.',
      link: 'https://www.rmleathersupply.com/products/water-based-leather-glue-glue-spreader-really-strong-and-dries-clear?srsltid=AfmBOoq_op-2koKnNrHVkWsU5CZpsHL2UnNkT3R5_ow93ayi771LH2Fu&variant=1222680143',
      imageUrl: '/images/tools/glue.png',
    },
  ];

  return (
    <div className="max-w-8xl mx-auto space-y-12">
      <div className="text-center space-y-6 pb-12 pt-4 border-b-2 border-stone-800/20">
        <h1 className="text-4xl font-bold text-stone-800 tracking-tight">
          Some of My Recommended Leathercraft Tools
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          This list doesn't cover every tool you'll need, but each one here
          stands out in its category. I only included tools that I've found to
          be exceptional - the kind that make a real difference when you're
          learning leathercraft.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="group bg-white rounded-lg overflow-hidden hover:shadow transition-all duration-300 border border-stone-200 hover:border-stone-800 flex flex-col">
            <div className="aspect-video bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center overflow-hidden">
              {tool.imageUrl ?
                <img
                  src={tool.imageUrl}
                  alt={tool.name || 'Tool image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              : <span className="text-6xl">🔨</span>}
            </div>
            <div className="p-6 bg-stone-50/50 flex flex-col flex-1">
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-bold text-stone-800 line-clamp-2 group-hover:text-stone-700 transition-colors">
                  {tool.name || 'Tool Name'}
                </h3>
                <p className="text-sm text-stone-600 line-clamp-3">
                  {tool.description ||
                    'Add details about this tool and how you use it in your leatherwork.'}
                </p>
              </div>

              <div className="pt-6">
                <a
                  href={tool.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-stone-800 text-white py-3 px-4 rounded-md hover:bg-stone-700 transition-colors duration-200 font-medium text-sm uppercase tracking-wider text-center">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-stone-800 text-white rounded-lg p-12 text-center space-y-4 mt-16">
        <h2 className="text-3xl font-bold">Got questions about these tools?</h2>
        <p className="text-stone-300 text-lg max-w-2xl mx-auto">
          I'm still learning, but happy to share what I know. Feel free to ask
          about anything!
        </p>
        <div className="pt-4">
          <Link
            to="/about"
            className="inline-block px-8 py-3 bg-white text-stone-800 rounded-md hover:bg-stone-100 transition font-semibold">
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
