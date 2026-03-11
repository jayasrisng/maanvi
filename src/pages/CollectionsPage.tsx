import PageShell from '../components/layout/PageShell'
import MugguBackground from '../components/layout/MugguBackground'

const collections = [
  {
    title: 'పెళ్లి వేడుక',
    image: '/images/collections/bridal.jpg',
    copy: 'ప్రతి కొత్త కథ ఆరంభం మొదలవుతుంది, మన మాన్వి మహాలక్ష్మిలతో.',
  },
  {
    title: 'పండుగ రంగులు',
    image: '/images/collections/festival.jpg',
    copy: 'ఉగాది నుండి సంక్రాంతి వరకు, ప్రతి పండుగను మాన్వితో జరుపుకుందాం.',
  },
  {
    title: 'నిత్యమైన అందం ఆనాదం',
    image: '/images/collections/classics.jpg',
    copy: 'ప్రతి విజయానికి ఒక అడుగు, మీ మాన్వితో.',
  },
]

export default function CollectionsPage() {
  return (
    <PageShell>
      <main className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24">
        <MugguBackground position="top-right" size="md" opacity="opacity-10" />

        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs uppercase tracking-[0.42em] text-maanvi-orange">
            collections • అధ్యాయాలు
          </p>

          <h1 className="mt-4 font-serif text-5xl md:text-6xl">
            not products, but chapters of celebration
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-maanvi-muted">
            each collection is designed to feel like its own world... slower,
            softer, and beautifully revealed.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[2.3rem] border border-maanvi-soft bg-white/60 shadow-soft"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[420px] w-full object-cover"
              />

              <div className="p-8">
                <h2 className="font-serif text-3xl text-maanvi-text">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-maanvi-muted">
                  {item.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </PageShell>
  )
}