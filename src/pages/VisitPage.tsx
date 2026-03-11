import PageShell from '../components/layout/PageShell'
import MugguBackground from '../components/layout/MugguBackground'

export default function VisitPage() {
  return (
    <PageShell>
      <main className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
        <MugguBackground position="bottom-left" size="lg" opacity="opacity-10" />

        <section className="mx-auto max-w-3xl rounded-[2.8rem] border border-[#e4c2a8] bg-maanvi-orange px-8 py-14 text-white shadow-[0_28px_90px_rgba(120,50,5,0.22)] md:px-14 md:py-18">
          <p className="text-sm uppercase tracking-[0.35em] text-white/70">
            స్వాగతం · welcome
          </p>

          <h1 className="mt-6 font-serif text-4xl md:text-6xl">
            experience maanvi
          </h1>

          <p className="mt-6 text-base leading-8 text-white/85">
            experience our gallery, explore sarees up close, and discover something
            that feels made for your celebration.
          </p>

          <div className="mt-12 space-y-10">
            <div>
  <p className="text-xs uppercase tracking-[0.35em] text-white/70">
    address
  </p>

  <p className="mt-3 text-lg leading-7">
    maanvi<br/>
    52-1-7/5, Rd Number 2A, NTR Colony,<br/>
    vijayawada, andhra pradesh 520008<br/>
    india
  </p>

  <div className="mt-4 flex gap-4 text-sm">
    <a
      href="https://maps.app.goo.gl/y8CxLjVj8HCtkLbD7"
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-white/80"
    >
      google maps ↗
    </a>

    <a
      href="https://maps.apple.com/?q=Maanvi+Selections+Vijayawada"
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-white/80"
    >
      apple maps ↗
    </a>
  </div>
</div>

            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                connect
              </p>

              <div className="mt-3 space-y-2 text-lg">
                <a href="https://www.instagram.com/maanviofficial/" target="_blank" rel="noopener noreferrer" className="block hover:underline">
                  instagram
                </a>

                <a href="#" className="block hover:underline">
                  pinterest
                </a>

                <a href="#" className="block hover:underline">
                  behance
                </a>

                <a href="https://www.linkedin.com/company/maanvi-official" target="_blank" rel="noopener noreferrer" className="block hover:underline">
                  careers · linkedin
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-4xl px-2 md:mt-20">
          <div className="rounded-[2.2rem] border border-maanvi-soft bg-white/60 p-8 shadow-soft md:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-maanvi-orange">
              updates
            </p>

            <h2 className="mt-5 font-serif text-3xl leading-tight text-maanvi-text md:text-4xl">
              celebrating 9 years of maanvi
            </h2>

            <p className="mt-5 text-base leading-8 text-maanvi-muted">
              మార్చి 12న, 10 గం. నుండి మన మాన్వి 9వ వార్షికోత్సవ వేడుకలు 
              మాన్వి మహాలక్ష్ములకు స్వాగతం, సుస్వాగతం ♥
            </p>

            <p className="mt-5 text-base leading-8 text-maanvi-muted">
              Join us on March 12th, 10 am onwards to celebrate 9 YEARS of tradition and timeless elegance. Thank you for being part of our maanvi family ♥
            </p>

            <p className="mt-6 text-sm text-maanvi-mutedLight">
              last updated · march 2026
            </p>
          </div>
        </section>
      </main>
    </PageShell>
  )
}