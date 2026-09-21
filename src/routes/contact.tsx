import { createFileRoute } from "@tanstack/react-router";
import { brand, social } from "@/data/site";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero } from "@/components/site/PageHero";
import { Meta } from "@/components/site/primitives";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

const title = "Contact — Arabian Rangers Tourism";
const description =
  "Tell Arabian Rangers Tourism what kind of UAE experience you're looking for — desert, city or adventure.";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/contact",
      keywords:
        "contact Arabian Rangers Tourism, UAE tour enquiry, book desert safari, Dubai tour contact",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        label="Arabian Rangers / Contact"
        title={
          <>
            Ready to
            <br />
            go?
          </>
        }
        intro="Tell us what kind of UAE experience you're looking for."
        right="UAE"
      />
      <section className="shell mt-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="border-t-2 border-ink pt-4">
            <Meta>Company</Meta>
            <p className="mt-3 text-sm">{brand.name}</p>
          </div>
          <div className="mt-8 border-t border-ink pt-4">
            <Meta>Category</Meta>
            <p className="mt-3 text-sm">{brand.category}</p>
          </div>
          <div className="mt-8 border-t border-ink pt-4">
            <Meta>Direct channels</Meta>
            <p className="mt-3 text-sm text-muted-foreground">
              Phone, email and WhatsApp details will appear here once confirmed.
            </p>
          </div>
          <div className="mt-8 border-t border-ink pt-4">
            <Meta>Social</Meta>
            <ul className="mt-3 flex flex-col gap-2">
              {social.map((item) => (
                <li key={item.label} className="text-sm">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-rule meta text-ink transition-colors duration-300 hover:text-signal"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="meta text-muted-foreground">
                      {item.label} — add here
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:col-span-8">
          <EnquiryForm variant="contact" />
        </div>
      </section>
    </>
  );
}
