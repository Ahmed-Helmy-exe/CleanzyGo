import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How does location-based booking work?", a: "When you book, you select your city and building first. Our system then shows only the available time slots for that specific building, ensuring we have a team nearby and ready." },
  { q: "What areas do you cover?", a: "We currently cover Abu Dhabi City, Yas Island, Khalifa City, Al Reem Island, and Saadiyat Island. We're expanding to more areas soon!" },
  { q: "Can I cancel or reschedule a booking?", a: "Yes! You can cancel or reschedule up to 24 hours before your appointment at no charge through your account dashboard." },
  { q: "What cleaning products do you use?", a: "We use eco-friendly, non-toxic cleaning products that are safe for children and pets while being highly effective." },
  { q: "Are your cleaners background-checked?", a: "Absolutely. All our cleaning professionals undergo thorough background checks and extensive training before joining our team." },
  { q: "How long does a typical cleaning take?", a: "Room cleaning takes 1-2 hours, full apartment cleaning 3-4 hours, and deep cleaning 5-6 hours. Times may vary based on the size of the space." },
  { q: "Do you provide all the supplies?", a: "Yes, our teams come fully equipped with all necessary cleaning supplies and equipment. No need to provide anything." },
  { q: "What payment methods do you accept?", a: "We accept online payments (credit/debit cards) and cash on delivery." },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="mt-2 text-muted-foreground">Everything you need to know about CleanzyGo</p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-5 shadow-card">
                  <AccordionTrigger className="font-display font-semibold text-left hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
