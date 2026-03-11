import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import MugguBackground from '../components/layout/MugguBackground'

export default function HomePage() {
  return (
    <PageShell>
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-10 md:px-10 md:pb-24 md:pt-12">
          <MugguBackground position="top-right" size="lg" opacity="opacity-10" />
          <MugguBackground position="bottom-left" size="md" opacity="opacity-5" />

          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-xl">
              <p className="mb-5 text-xs uppercase tracking-[0.42em] text-maanvi-orange">
                vijayawada • est. 2017
              </p>

              <h1 className="text-4xl leading-[1.14] text-maanvi-text md:text-6xl">
                <span className="mb-3 block font-teluguSerif font-semibold md:mb-4">
                  మన మాన్వి
                </span>
                <span className="block font-teluguSerif font-semibold">
                  మన వేడుక
                </span>
              </h1>

              <p className="mt-6 font-serif text-2xl italic text-maanvi-orange/90 md:text-3xl">
                celebrating maanvi, celebrating you
              </p>

              <p className="mt-8 max-w-xl text-base leading-8 text-maanvi-muted md:text-lg">
                a family-owned saree house rooted in warmth, trust, and timeless
                style... thoughtfully curating drapes for weddings, festivals,
                and the moments that become cherished memories.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/collections"
                  className="rounded-full bg-maanvi-orange px-6 py-3 text-sm font-medium text-white shadow-[0_14px_34px_rgba(255,98,1,0.18)] transition hover:-translate-y-[1px]"
                >
                  explore collections
                </Link>

                <Link
                  to="/our-story"
                  className="rounded-full border border-maanvi-soft bg-transparent px-6 py-3 text-sm font-medium text-maanvi-muted transition hover:border-maanvi-orange hover:text-maanvi-orange"
                >
                  read our story
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[2.2rem] border border-[#ead5c2] bg-maanvi-sand shadow-hero lg:ml-auto">
              <img
                src="/images/hero/hero-1.jpg"
                alt="Maanvi saree hero"
                className="h-[420px] w-full object-cover md:h-[520px]"
              />
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-10">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            <article className="rounded-[2rem] border border-maanvi-soft bg-white/70 p-8 shadow-soft">
              <p className="font-serif text-3xl text-maanvi-text">
                family owned
              </p>
              <p className="mt-4 text-sm leading-7 text-maanvi-muted">
                built with warmth, personal care, and a love for helping people
                find something beautiful for their most meaningful occasions.
              </p>
            </article>

            <article className="rounded-[2rem] border border-maanvi-soft bg-white/70 p-8 shadow-soft">
              <p className="font-serif text-3xl text-maanvi-text">
                trusted and loved
              </p>
              <p className="mt-4 text-sm leading-7 text-maanvi-muted">
                known for thoughtful service, a carefully chosen collection, and
                a shopping experience customers return to with confidence.
              </p>
            </article>

            <article className="rounded-[2rem] border border-maanvi-soft bg-white/70 p-8 shadow-soft">
              <p className="font-serif text-3xl text-maanvi-text">
                made for celebrations
              </p>
              <p className="mt-4 text-sm leading-7 text-maanvi-muted">
                from festive mornings to bridal moments, maanvi is here to be
                part of the memories people want to wear and remember.
              </p>
            </article>
          </div>
        </section>

        <section className="px-6 py-32 md:px-10">
  <div className="mx-auto max-w-6xl text-center">

    <img
  src="/logo/maanvi-logo.png"
  alt="Maanvi"
  className="mx-auto h-40 w-auto"
/>

    <h2 className="mt-8 font-serif text-5xl leading-tight text-maanvi-text md:text-7xl">
      a house of sarees
    </h2>

    <p className="mt-10 mx-auto max-w-2xl text-base leading-8 text-maanvi-muted md:text-lg">
      where tradition feels personal, celebration feels effortless,
      and every drape becomes part of a memory.
    </p>

  </div>
</section>
      </main>
    </PageShell>
  )
}