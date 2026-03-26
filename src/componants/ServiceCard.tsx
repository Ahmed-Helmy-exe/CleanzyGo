import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import type { Service } from "@/data/mockData";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-1">
      <div className="text-4xl">{service.icon}</div>
      <h3 className="mt-4 font-display text-lg font-bold">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.description}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        {service.duration}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-display text-xl font-bold text-primary">
          AED {service.basePrice}
        </p>
        <Link to="/booking">
          <Button variant="ghost" size="sm" className="text-primary group-hover:bg-primary/10">
            Book <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
