import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import ReviewCard from "@/components/ReviewCard";
import { services, reviews, cities } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Building2, CalendarCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: MapPin, title: "Select Your City", desc: "Choose from Abu Dhabi's top areas" },
  { icon: Building2, title: "Pick Your Building", desc: "Find your tower from our list" },
  { icon: CalendarCheck, title: "Book Available Slots", desc: "See real-time availability" },
  { icon: CheckCircle, title: "Enjoy Clean Spaces", desc: "Our team handles the rest" },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />

      <HeroSection />

      {/* How It Works */}
      <section className="bg-card py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Smart booking in 4 simple steps</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero text-primary-foreground shadow-soft">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display font-bold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold">Our Services</h2>
            <p className="mt-2 text-muted-foreground">Professional cleaning tailored to your needs</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="bg-card py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold">We Cover All of Abu Dhabi</h2>
            <p className="mt-2 text-muted-foreground">Available in {cities.length} areas and growing</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {cities.map((city) => (
              <div key={city.id} className="flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 shadow-card">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{city.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold">What Our Customers Say</h2>
            <p className="mt-2 text-muted-foreground">Trusted by hundreds of residents across Abu Dhabi</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero py-20 text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold">Ready for a Spotless Home?</h2>
          <p className="mx-auto mt-3 max-w-md opacity-90">Book your first cleaning today and enjoy a sparkling space. First-time customers get 10% off!</p>
          <Link to="/booking">
            <Button size="lg" className="mt-8 bg-card text-foreground shadow-elevated hover:bg-card/90">
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
