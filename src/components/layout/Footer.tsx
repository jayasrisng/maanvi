export default function Footer() {
  return (
    <footer className="border-t border-maanvi-soft bg-maanvi-cream py-10">
      <div className="mx-auto max-w-5xl px-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

        <div>
          <p className="font-serif text-[1.9rem] text-maanvi-orange">
            maanvi
          </p>

          <p className="mt-1 font-teluguSans text-sm text-maanvi-muted">
            మన మాన్వి మన వేడుక
          </p>

          <p className="mt-1 text-xs text-maanvi-mutedLight">
            since 2017
          </p>
        </div>

        <p className="text-sm text-maanvi-mutedLight">
          celebrating maanvi, celebrating you
        </p>

      </div>
    </footer>
  )
}