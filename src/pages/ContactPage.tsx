import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold">Contact Us</h1>
            <p className="mt-2 text-muted-foreground">Have a question? We'd love to hear from you.</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-5">
            <div className="space-y-6 md:col-span-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold">Address</p>
                  <p className="text-sm text-muted-foreground">Abu Dhabi, United Arab Emirates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold">Phone</p>
                  <p className="text-sm text-muted-foreground">+971 50 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">hello@cleanzygo.com</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:col-span-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Your name" required />
                <Input type="email" placeholder="Your email" required />
              </div>
              <Input placeholder="Subject" required />
              <Textarea placeholder="Your message..." rows={5} required />
              <Button type="submit" disabled={sending} className="bg-gradient-hero text-primary-foreground">
                <Send className="mr-2 h-4 w-4" />
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
