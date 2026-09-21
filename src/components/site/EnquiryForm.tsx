import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { experienceOptions } from "@/data/site";
import { BrutalButton } from "./primitives";

const field =
  "w-full min-h-12 rounded-none border-2 border-ink bg-transparent px-4 py-3 font-mono text-sm text-ink placeholder:text-muted-foreground transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-sand/40 focus:bg-bone focus:shadow-[4px_4px_0_0_var(--signal)]";
const label = "meta mb-2 block text-ink";

export function EnquiryForm({
  variant = "contact",
}: {
  variant?: "contact" | "booking";
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    toast("Enquiry captured", {
      description:
        "Message delivery isn't connected yet — add an email or WhatsApp destination and this form will send there.",
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2" noValidate={false}>
      <div>
        <label className={label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          aria-required="true"
          className={field}
          placeholder="Full name"
        />
      </div>
      <div>
        <label className={label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          aria-required="true"
          className={field}
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className={label} htmlFor="phone">
          {variant === "booking" ? "WhatsApp / Phone" : "Phone"}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={field}
          placeholder="+971 ..."
        />
      </div>
      <div>
        <label className={label} htmlFor="experience">
          Experience
        </label>
        <select id="experience" name="experience" className={field} defaultValue="" autoComplete="off">
          <option value="">Select an experience</option>
          {experienceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <div>
        <label className={label} htmlFor="date">
          Preferred date
        </label>
        <input id="date" name="date" type="date" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="guests">
          Guests
        </label>
        <input
          id="guests"
          name="guests"
          type="number"
          min={1}
          inputMode="numeric"
          className={field}
          placeholder="2"
        />
      </div>
      <div className="md:col-span-2">
        <label className={label} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${field} min-h-[8.5rem]`}
          placeholder="Tell us what kind of UAE experience you're looking for."
        />
      </div>
      <div className="md:col-span-2">
        <BrutalButton type="submit" variant="signal">
          {variant === "booking" ? "Request experience" : "Send enquiry"}
        </BrutalButton>
        {sent ? (
          <p role="status" aria-live="polite" className="meta mt-4 text-muted-foreground">
            Received. A delivery destination has not been supplied yet.
          </p>
        ) : null}
      </div>
    </form>
  );
}
