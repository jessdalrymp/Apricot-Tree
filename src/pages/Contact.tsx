import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this to a form backend (Formspree, Resend, or a Vercel API route) once one is chosen.
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl text-apricot-800">Get in touch</h1>
      <p className="mt-3 text-ink/70">
        Questions about an order, a custom design, or wholesale? Send a note below.
      </p>

      {sent ? (
        <p className="mt-8 rounded-xl bg-apricot-100 px-4 py-3 text-apricot-800">
          Thanks, that came through. I'll get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink/80">Name</label>
            <input required className="mt-1 w-full rounded-lg border border-apricot-200 px-3 py-2 focus:border-apricot-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/80">Email</label>
            <input required type="email" className="mt-1 w-full rounded-lg border border-apricot-200 px-3 py-2 focus:border-apricot-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/80">Message</label>
            <textarea required rows={5} className="mt-1 w-full rounded-lg border border-apricot-200 px-3 py-2 focus:border-apricot-500 focus:outline-none" />
          </div>
          <button type="submit" className="rounded-full bg-apricot-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-apricot-700">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
