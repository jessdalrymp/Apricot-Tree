export default function About() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl text-apricot-800">Our Story</h1>
      <div className="prose mt-6 space-y-4 text-ink/80">
        <p>
          Apricot Tree Stationery started the way most good things do, with too many notecards, no
          plan, and a stubborn love of nice paper. Every design here started as a hand-drawn or
          hand-painted piece before it became a notecard, journal, or greeting card set.
        </p>
        <p>
          Everything is printed and shipped only once you order it. No warehouse of boxes going
          unsold, no guessing what colors people want. That means a couple extra days in transit
          sometimes, but it also means every sale is one less thing sitting in a landfill because
          somebody over-guessed demand.
        </p>
        <p>
          If you want to see what's new before it hits the shop, that's what the socials in the
          footer are for. New designs usually show up there first.
        </p>
      </div>

      <figure className="mt-10 overflow-hidden rounded-2xl bg-apricot-50">
        <img
          src="/images/thank-you-card-illustration.png"
          alt="A thank-you note included with every Apricot Tree order"
          className="w-full object-cover"
        />
        <figcaption className="p-4 text-center text-sm text-ink/60">
          Every order ships with a note like this one, small thanks, real paper.
        </figcaption>
      </figure>
    </div>
  );
}
