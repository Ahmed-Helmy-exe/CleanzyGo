import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { services, extras } from "@/data/mockData";

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold">Our Services</h1>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              From quick room refreshes to deep apartment cleanings, we offer flexible services for every need.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="font-display text-2xl font-bold">Add-on Extras</h2>
            <p className="mt-2 text-muted-foreground">Enhance your cleaning with optional extras</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {extras.map((extra) => (
              <div key={extra.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
                <span className="text-3xl">{extra.icon}</span>
                <div>
                  <p className="font-display font-bold">{extra.name}</p>
                  <p className="text-sm text-primary font-semibold">+ AED {extra.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
