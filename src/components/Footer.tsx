import { Instagram, Youtube } from "lucide-react";
import { socialLinks } from "@/lib/social";

// lucide-react has no Pinterest/TikTok glyphs; inline minimal SVGs keep the footer icon-only and consistent.
function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12.017 2C6.484 2 2 6.484 2 12.017c0 4.246 2.65 7.87 6.388 9.312-.088-.79-.167-2.005.035-2.868.183-.78 1.183-4.97 1.183-4.97s-.302-.604-.302-1.496c0-1.402.813-2.448 1.824-2.448.86 0 1.276.646 1.276 1.42 0 .865-.552 2.158-.836 3.355-.238 1.002.502 1.82 1.49 1.82 1.788 0 3.164-1.887 3.164-4.607 0-2.409-1.73-4.093-4.2-4.093-2.862 0-4.542 2.146-4.542 4.365 0 .864.332 1.792.747 2.296a.3.3 0 0 1 .069.288c-.076.316-.245.988-.278 1.126-.043.183-.145.222-.334.134-1.248-.581-2.028-2.406-2.028-3.873 0-3.152 2.29-6.045 6.6-6.045 3.465 0 6.16 2.469 6.16 5.769 0 3.44-2.169 6.21-5.18 6.21-1.012 0-1.963-.526-2.289-1.148 0 0-.501 1.907-.622 2.374-.226.865-.836 1.949-1.244 2.61A10 10 0 0 0 12.017 22C17.55 22 22 17.516 22 12.017 22 6.484 17.55 2 12.017 2Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82a4.7 4.7 0 0 1-3.87-4.02h-3v13.6a2.7 2.7 0 1 1-1.9-2.58v-3.09a5.7 5.7 0 1 0 4.9 5.65V9.4a7.7 7.7 0 0 0 4.5 1.44V7.83a4.7 4.7 0 0 1-.63-2.01Z" />
    </svg>
  );
}

const socials = [
  { href: socialLinks.pinterest, label: "Pinterest", icon: PinterestIcon },
  { href: socialLinks.instagram, label: "Instagram", icon: Instagram },
  { href: socialLinks.tiktok, label: "TikTok", icon: TikTokIcon },
  { href: socialLinks.youtube, label: "YouTube", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-apricot-200/60 bg-apricot-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-serif text-lg text-apricot-800">Apricot Tree Stationery</p>
            <p className="mt-1 text-sm text-ink/70">
              Letterpress-style notecards and paper goods, printed on demand, one order at a time.
            </p>
          </div>

          <div className="flex gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full bg-white p-2.5 text-apricot-700 shadow-sm transition hover:bg-apricot-100 hover:text-apricot-800"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-ink/50">
          © {new Date().getFullYear()} Apricot Tree Stationery. Made to order, shipped by Printify.
        </p>
      </div>
    </footer>
  );
}
