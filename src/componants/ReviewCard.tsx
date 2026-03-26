import { Star } from "lucide-react";
import type { Review } from "@/data/mockData";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? "fill-warning text-warning" : "text-muted"}`}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">"{review.comment}"</p>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-semibold">{review.userName}</p>
        <span className="text-xs text-muted-foreground">{review.serviceType}</span>
      </div>
    </div>
  );
}
