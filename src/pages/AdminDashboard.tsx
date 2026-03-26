import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cities, buildings, mockBookings, employees, services, extras, reviews, timeSlots } from "@/data/mockData";
import { useAdminStore, isSlotBlocked } from "@/data/adminStore";
import { LayoutDashboard, Building2, MapPin, Users, CalendarCheck, Star, BarChart3, Settings, LogOut, Sparkles, Menu, X, DollarSign, Save, Clock, Ban } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  confirmed: "bg-primary/10 text-primary border-primary/20",
  in_progress: "bg-info/10 text-primary border-primary/20",
  completed: "bg-accent/10 text-accent border-accent/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [availBuildingId, setAvailBuildingId] = useState(buildings[0]?.id || "");
  const admin = useAdminStore();

  // Local editing state for pricing
  const [editHourlyRate, setEditHourlyRate] = useState(admin.pricing.hourlyRate);
  const [editMaterialsFee, setEditMaterialsFee] = useState(admin.pricing.cleaningMaterialsFee);
  const [editServicePrices, setEditServicePrices] = useState({ ...admin.pricing.serviceBasePrices });
  const [editExtraPrices, setEditExtraPrices] = useState({ ...admin.pricing.extraPrices });

  // Local editing state for settings
  const [editPhone, setEditPhone] = useState(admin.contact.phone);
  const [editEmail, setEditEmail] = useState(admin.contact.email);
  const [editOnlinePayment, setEditOnlinePayment] = useState(admin.settings.onlinePaymentEnabled);

  const totalRevenue = mockBookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + b.total, 0);
  const activeBookings = mockBookings.filter((b) => ["pending", "confirmed", "in_progress"].includes(b.status)).length;

  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "bookings", label: "Reservations", icon: CalendarCheck },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "availability", label: "Availability", icon: Clock },
    { id: "locations", label: "Locations", icon: MapPin },
    { id: "employees", label: "Employees", icon: Users },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const savePricing = () => {
    admin.setPricing({
      hourlyRate: editHourlyRate,
      cleaningMaterialsFee: editMaterialsFee,
      serviceBasePrices: editServicePrices,
      extraPrices: editExtraPrices,
    });
    toast({ title: "Pricing updated ✅", description: "Changes are now live in the booking flow." });
  };

  const saveSettings = () => {
    admin.setContact({ phone: editPhone, email: editEmail });
    admin.setSettings({ onlinePaymentEnabled: editOnlinePayment });
    toast({ title: "Settings saved ✅" });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition-transform lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold">Admin Panel</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <nav className="space-y-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-3 right-3 space-y-1">
          <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
            <LogOut className="h-4 w-4" /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="flex h-16 items-center gap-3 border-b border-border px-5">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></button>
          <h1 className="font-display text-lg font-bold capitalize">{navItems.find(n => n.id === activeTab)?.label || activeTab}</h1>
        </header>

        <div className="p-5">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total Revenue", value: `AED ${totalRevenue.toLocaleString()}`, icon: BarChart3 },
                  { label: "Active Bookings", value: activeBookings, icon: CalendarCheck },
                  { label: "Employees", value: employees.length, icon: Users },
                  { label: "Avg Rating", value: "4.9/5", icon: Star },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <stat.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="mt-2 font-display text-2xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                <h3 className="font-display font-bold">Recent Bookings</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border text-left text-muted-foreground"><th className="pb-2">Customer</th><th className="pb-2">Service</th><th className="pb-2">Date</th><th className="pb-2">Status</th><th className="pb-2">Total</th></tr></thead>
                    <tbody>
                      {mockBookings.slice(0, 5).map((b) => (
                        <tr key={b.id} className="border-b border-border">
                          <td className="py-3 font-medium">{b.customerName}</td>
                          <td className="py-3">{services.find((s) => s.id === b.serviceId)?.name}</td>
                          <td className="py-3">{b.date} {b.time}</td>
                          <td className="py-3"><Badge variant="outline" className={statusColors[b.status]}>{b.status.replace("_", " ")}</Badge></td>
                          <td className="py-3 font-medium">AED {b.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* RESERVATIONS */}
          {activeTab === "bookings" && (
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold">All Reservations</h3>
                <Input placeholder="Search bookings..." className="max-w-xs" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border text-left text-muted-foreground"><th className="pb-2">ID</th><th className="pb-2">Customer</th><th className="pb-2">Building</th><th className="pb-2">Service</th><th className="pb-2">Date</th><th className="pb-2">Status</th><th className="pb-2">Total</th><th className="pb-2">Actions</th></tr></thead>
                  <tbody>
                    {mockBookings.map((b) => (
                      <tr key={b.id} className="border-b border-border">
                        <td className="py-3 font-mono text-xs">{b.id}</td>
                        <td className="py-3">
                          <div>
                            <p className="font-medium">{b.customerName}</p>
                            <p className="text-xs text-muted-foreground">{b.customerEmail}</p>
                            <p className="text-xs text-muted-foreground">{b.customerPhone}</p>
                          </div>
                        </td>
                        <td className="py-3">{buildings.find((bl) => bl.id === b.buildingId)?.name}</td>
                        <td className="py-3">{services.find((s) => s.id === b.serviceId)?.name}</td>
                        <td className="py-3">{b.date} {b.time}</td>
                        <td className="py-3"><Badge variant="outline" className={statusColors[b.status]}>{b.status.replace("_", " ")}</Badge></td>
                        <td className="py-3 font-medium">AED {b.total}</td>
                        <td className="py-3"><Button variant="ghost" size="sm">View</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PRICING */}
          {activeTab === "pricing" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display font-bold mb-4">General Pricing</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Hourly Rate (AED)</Label>
                    <Input type="number" value={editHourlyRate} onChange={(e) => setEditHourlyRate(Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Cleaning Materials Fee (AED)</Label>
                    <Input type="number" value={editMaterialsFee} onChange={(e) => setEditMaterialsFee(Number(e.target.value))} />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display font-bold mb-4">Service Base Prices</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((s) => (
                    <div key={s.id}>
                      <Label>{s.icon} {s.name} (AED)</Label>
                      <Input
                        type="number"
                        value={editServicePrices[s.id] || 0}
                        onChange={(e) => setEditServicePrices({ ...editServicePrices, [s.id]: Number(e.target.value) })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display font-bold mb-4">Extra Services Pricing</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {extras.map((ex) => (
                    <div key={ex.id}>
                      <Label>{ex.icon} {ex.name} (AED)</Label>
                      <Input
                        type="number"
                        value={editExtraPrices[ex.id] || 0}
                        onChange={(e) => setEditExtraPrices({ ...editExtraPrices, [ex.id]: Number(e.target.value) })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={savePricing} className="bg-gradient-hero text-primary-foreground">
                <Save className="mr-2 h-4 w-4" /> Save Pricing
              </Button>
            </div>
          )}

          {/* AVAILABILITY */}
          {activeTab === "availability" && (() => {
            const buildingSlots = timeSlots.filter((s) => s.buildingId === availBuildingId);
            const dates = [...new Set(buildingSlots.map((s) => s.date))].sort();
            const times = [...new Set(buildingSlots.map((s) => s.time))].sort();

            return (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h3 className="font-display font-bold">Manage Availability</h3>
                  <Select value={availBuildingId} onValueChange={setAvailBuildingId}>
                    <SelectTrigger className="w-64"><SelectValue placeholder="Select building" /></SelectTrigger>
                    <SelectContent>
                      {buildings.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">Click a cell to block/unblock. Click a date header to block the entire day. Red = blocked.</p>

                <div className="rounded-xl border border-border bg-card p-4 shadow-card overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="pb-2 text-left text-muted-foreground">Time ↓ / Date →</th>
                        {dates.map((date) => {
                          const d = new Date(date);
                          const label = d.toLocaleDateString("en-AE", { weekday: "short", day: "numeric", month: "short" });
                          const dayBlocked = isSlotBlocked(availBuildingId, date);
                          return (
                            <th key={date} className="pb-2 px-1">
                              <button
                                onClick={() => admin.toggleBlock(`${availBuildingId}:${date}`)}
                                className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                                  dayBlocked ? "bg-destructive/10 text-destructive" : "hover:bg-muted"
                                }`}
                              >
                                {label}
                                {dayBlocked && <Ban className="inline ml-1 h-3 w-3" />}
                              </button>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {times.map((time) => (
                        <tr key={time}>
                          <td className="py-1 font-medium text-muted-foreground">{time}</td>
                          {dates.map((date) => {
                            const dayBlocked = isSlotBlocked(availBuildingId, date);
                            const slotBlocked = isSlotBlocked(availBuildingId, date, time);
                            const blocked = dayBlocked || slotBlocked;
                            return (
                              <td key={`${date}-${time}`} className="px-1 py-1">
                                <button
                                  onClick={() => {
                                    if (!dayBlocked) admin.toggleBlock(`${availBuildingId}:${date}:${time}`);
                                  }}
                                  disabled={dayBlocked}
                                  className={`w-full rounded px-2 py-1.5 text-xs font-medium transition-colors ${
                                    blocked
                                      ? "bg-destructive/15 text-destructive cursor-not-allowed"
                                      : "bg-accent/10 text-accent hover:bg-accent/20"
                                  }`}
                                >
                                  {blocked ? "Blocked" : "Open"}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}


          {activeTab === "locations" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold">Cities & Buildings</h3>
                <Button className="bg-gradient-hero text-primary-foreground" size="sm">+ Add City</Button>
              </div>
              {cities.map((city) => (
                <div key={city.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h4 className="font-display font-bold">{city.name}</h4>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">+ Add Building</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {buildings.filter((b) => b.cityId === city.id).map((b) => (
                      <div key={b.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{b.name}</span>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* EMPLOYEES */}
          {activeTab === "employees" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold">Team Members</h3>
                <Button className="bg-gradient-hero text-primary-foreground" size="sm">+ Add Employee</Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {employees.map((emp) => (
                  <div key={emp.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{emp.avatar}</span>
                      <div>
                        <p className="font-display font-bold">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Assigned Buildings:</p>
                      <div className="flex flex-wrap gap-1">
                        {emp.assignedBuildings.map((bid) => (
                          <Badge key={bid} variant="secondary" className="text-xs">
                            {buildings.find((b) => b.id === bid)?.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full">Manage</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              <h3 className="font-display font-bold">Customer Reviews</h3>
              {reviews.map((r) => (
                <div key={r.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold">{r.userName}</p>
                      <p className="text-xs text-muted-foreground">{r.serviceType} — {r.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display font-bold mb-4">Contact Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Phone Number</Label>
                    <Input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="+971 50 XXX XXXX" />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="info@cleanzygo.com" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display font-bold mb-4">Feature Toggles</h3>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium text-sm">Online Payment</p>
                    <p className="text-xs text-muted-foreground">Enable online payment option for customers</p>
                  </div>
                  <Switch checked={editOnlinePayment} onCheckedChange={setEditOnlinePayment} />
                </div>
              </div>

              <Button onClick={saveSettings} className="bg-gradient-hero text-primary-foreground">
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
