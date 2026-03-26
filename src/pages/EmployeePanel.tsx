import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockBookings, buildings, services, cities } from "@/data/mockData";
import { Link } from "react-router-dom";
import { CalendarCheck, MapPin, Clock, Sparkles, LogOut, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  confirmed: "bg-primary/10 text-primary border-primary/20",
  in_progress: "bg-info/10 text-primary border-primary/20",
  completed: "bg-accent/10 text-accent border-accent/20",
};

export default function EmployeePanel() {
  const [jobs, setJobs] = useState(mockBookings.filter((b) => b.status !== "cancelled"));

  const updateStatus = (bookingId: string, newStatus: string) => {
    setJobs((prev) => prev.map((j) => (j.id === bookingId ? { ...j, status: newStatus as any } : j)));
    toast({ title: "Status updated", description: `Job ${bookingId} is now "${newStatus.replace("_", " ")}"` });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">Employee Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Maria Santos</span>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm"><LogOut className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold">My Assigned Jobs</h1>
          <p className="text-sm text-muted-foreground">View and update your cleaning assignments</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => {
            const building = buildings.find((b) => b.id === job.buildingId);
            const city = cities.find((c) => c.id === building?.cityId);
            const service = services.find((s) => s.id === job.serviceId);
            return (
              <div key={job.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={statusColors[job.status]}>
                    {job.status.replace("_", " ")}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{job.id}</span>
                </div>

                <h3 className="mt-3 font-display font-bold">{service?.name}</h3>
                <p className="text-sm text-muted-foreground">{job.customerName}</p>

                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {city?.name} — {building?.name}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarCheck className="h-4 w-4" />
                    {job.date}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {job.time}
                  </div>
                </div>

                <div className="mt-4">
                  <Select
                    value={job.status}
                    onValueChange={(v) => updateStatus(job.id, v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
