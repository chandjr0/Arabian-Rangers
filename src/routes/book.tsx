import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero } from "@/components/site/PageHero";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

const title = "Book — Arabian Rangers Tourism";
const description =
  "Request a UAE experience with Arabian Rangers Tourism: desert safari, city tour, buggy ride or a custom adventure.";

export const Route = createFileRoute("/book")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/book",
      keywords:
        "book UAE tour, desert safari booking, Dubai city tour booking, buggy ride UAE, Arabian Rangers Tourism",
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Book", path: "/book" },
      ]),
    }),
  component: BookPage,
});

function BookPage() {
  return (
    <>
      <PageHero
        label="Arabian Rangers / Book"
        title={
          <>
            Let's plan
            <br />
            your UAE.
          </>
        }
        intro="Send the request. We come back with options, timing and a plan built around your group."
        right="Enquiry"
      />
      <section className="shell mt-16">
        <div className="border-t-2 border-ink pt-10">
          <h2 className="meta text-muted-foreground">Request form</h2>
          <div className="mt-8">
            <EnquiryForm variant="booking" />
          </div>
        </div>
      </section>
    </>
  );
}
