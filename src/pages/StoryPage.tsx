import PageShell from '../components/layout/PageShell'
import MugguBackground from '../components/layout/MugguBackground'

export default function StoryPage() {
  return (
    <PageShell>
      <main className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24">
        <MugguBackground position="top-left" size="md" opacity="opacity-10" />
        <MugguBackground position="bottom-right" size="lg" opacity="opacity-5" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-s uppercase tracking-[0.002em] text-maanvi-orange">
              మా కథ
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
              a family house woven with celebration
            </h1>
          </div>

          <div className="text-base leading-8 text-maanvi-muted">
            <p>
              maanvi began with a simple, beautiful intention... to be part of
              people’s happiest moments through sarees chosen with care, taste,
              and trust.
            </p>

            <p className="mt-6">
              over the years, it has grown into more than a house. it has become
              a place where weddings, festivals, first drapes, and family
              memories are wrapped in color and tradition.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2.5rem] border border-[#ead5c2] bg-maanvi-sand shadow-warm">
            <img
              src="/images/story/founders.jpg"
              alt="Maanvi founders"
              className="h-[620px] w-full object-cover"
            />
          </div>

          <div className="rounded-[2.5rem] border border-maanvi-soft bg-white/60 p-10 shadow-soft md:p-14">
            <p className="text-xs uppercase tracking-[0.32em] text-maanvi-orange">
              founder&apos;s note
            </p>

            <p className="mt-8 font-serif text-xl leading-[1.7] text-maanvi-text">
              భారతదేశం నలుమూలల నుంచి వచ్చిన చీరల సౌందర్యం, రంగులు, కథలు... అన్నీ ఒకేచోట చేరే చిన్న గృహం పేరు మాన్వి.
              ప్రతి పండుగకు, ప్రతి కొత్త ఆరంభానికి, ఒక ప్రత్యేకమైన చీరను ఎంచుకునే ఆ ఆనందాన్ని మీకు అందించాలనే ఆలోచనతో ఈ ప్రయాణం మొదలైంది.
              
              ఈ రోజు మాన్వి మొదలై తోమిది సంవత్సరాలు గడిచింది. ఈ ప్రయాణంలో మేము కేవలం చీరలను మాత్రమే కాదు, వాటి వెనుక ఉన్న జ్ఞాపకాలను, సంస్కృతిని, మరియు వేడుకల ఆనందాన్ని కూడా పంచుకుంటున్నాం.
              ఇలాగే మీ ప్రతి వేడుకలో మాన్వి భాగం కావాలని మేము కోరుకుంటున్నాం.
              మగువలకు, మగ్గములకు మధ్య వారధిగా మాన్వి నిలబడాలని ఆశిస్తున్నాం. 
          
            </p>

            <p className="mt-8 text-base leading-8 text-maanvi-muted">
              మీ మాన్వి కుటుంబం నుండి ♥
            </p>
          </div>
        </div>
      </main>
    </PageShell>
  )
}