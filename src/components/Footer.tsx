import { Link } from "react-router-dom";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              CleanzyGo
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Abu Dhabi's smartest cleaning service. Premium quality, location-based scheduling.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/booking" className="hover:text-primary transition-colors">Book Now</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors">Admin Portal</Link></li>
              <li><Link to="/employee" className="hover:text-primary transition-colors">Employee Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Abu Dhabi, UAE</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +971 50 123 4567</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@cleanzygo.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CleanzyGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
