import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StepIndicator from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cities, buildings, timeSlots, services, extras } from "@/data/mockData";
import { getAdminPricing, isSlotBlocked } from "@/data/adminStore";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, MapPin, Building2, CalendarCheck, CreditCard, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const bookingSteps = ["Location", "Service", "Schedule", "Details", "Confirm"];

const defaultLocationShortcuts = [
  { label: "Adnec Twin Tower", cityId: "abu-dhabi", buildingId: "b1" },
  { label: "Adnec Torsion Tower B", cityId: "abu-dhabi", buildingId: "b2" },
];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [cityId, setCityId] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [cleaners, setCleaners] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("cash");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [hours, setHours] = useState(2);
  const [includeCleaningMaterials, setIncludeCleaningMaterials] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const pricing = getAdminPricing();

  const cityBuildings = useMemo(() => buildings.filter((b) => b.cityId === cityId), [cityId]);

  const availableSlots = useMemo(() => {
    if (!buildingId) return [];
    return timeSlots.filter((s) =>
      s.buildingId === buildingId &&
      s.currentBookings < s.maxBookings &&
      !isSlotBlocked(buildingId, s.date) &&
      !isSlotBlocked(buildingId, s.date, s.time)
    );
  }, [buildingId]);

  const availableDates = useMemo(() => [...new Set(availableSlots.map((s) => s.date))].sort(), [availableSlots]);

  const availableTimes = useMemo(
    () => availableSlots.filter((s) => s.date === selectedDate).map((s) => s.time),
    [availableSlots, selectedDate]
  );

  const total = useMemo(() => {
    const hourlyTotal = pricing.hourlyRate * hours;
    const extrasTotal = selectedExtras.reduce((sum, eid) => {
      return sum + (pricing.extraPrices[eid] || 0);
    }, 0);
    const materialsFee = includeCleaningMaterials ? pricing.cleaningMaterialsFee : 0;
    return hourlyTotal + extrasTotal + materialsFee;
  }, [pricing, hours, selectedExtras, includeCleaningMaterials]);

  const selectedService = services.find((s) => s.id === serviceId);

  const canNext = () => {
    switch (step) {
      case 0: return cityId && buildingId;
      case 1: return serviceId;
      case 2: return selectedDate && selectedTime;
      case 3: return name && email && phone && floorNumber && apartmentNumber;
      default: return true;
    }
  };

  const handleConfirm = () => {
    toast({ title: "Booking Confirmed! 🎉", description: `Your ${selectedService?.name} is booked for ${selectedDate} at ${selectedTime}.` });
    setStep(5);
  };

  const handleShortcut = (shortcut: typeof defaultLocationShortcuts[0]) => {
    setCityId(shortcut.cityId);
    setBuildingId(shortcut.buildingId);
  };

  const selectedBuilding = buildings.find((b) => b.id === buildingId);
  const selectedCity = cities.find((c) => c.id === cityId);

  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-12">
        <div className="container max-w-2xl">
          {step < 5 && (
            <div className="mb-10">
              <StepIndicator steps={bookingSteps} currentStep={step} />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 0: Location */}
              {step === 0 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <MapPin className="mx-auto h-10 w-10 text-primary" />
                    <h2 className="mt-3 font-display text-2xl font-bold">Select Your Location</h2>
                    <p className="text-sm text-muted-foreground">Choose your city and building to see availability</p>
                  </div>

                  {/* Quick Select Shortcuts */}
                  <div>
                    <Label className="text-xs text-muted-foreground">Quick Select</Label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {defaultLocationShortcuts.map((s) => (
                        <Button
                          key={s.label}
                          variant="outline"
                          size="sm"
                          onClick={() => handleShortcut(s)}
                          className={`text-xs ${
                            buildingId === s.buildingId ? "border-primary bg-primary/5 text-primary" : ""
                          }`}
                        >
                          <Building2 className="mr-1 h-3 w-3" /> {s.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>City</Label>
                      <Select value={cityId} onValueChange={(v) => { setCityId(v); setBuildingId(""); }}>
                        <SelectTrigger><SelectValue placeholder="Select a city" /></SelectTrigger>
                        <SelectContent>
                          {cities.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    {cityId && (
                      <div>
                        <Label>Building / Tower</Label>
                        <Select value={buildingId} onValueChange={setBuildingId}>
                          <SelectTrigger><SelectValue placeholder="Select a building" /></SelectTrigger>
                          <SelectContent>
                            {cityBuildings.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 1: Service */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-display text-2xl font-bold">Choose Your Service</h2>
                    <p className="text-sm text-muted-foreground">Select the type of cleaning you need</p>
                  </div>
                  <div className="grid gap-3">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                          serviceId === s.id ? "border-primary bg-primary/5 shadow-soft" : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <span className="text-3xl">{s.icon}</span>
                        <div className="flex-1">
                          <p className="font-display font-bold">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.duration}</p>
                        </div>
                        <span className="font-display font-bold text-primary">AED {pricing.serviceBasePrices[s.id] || s.basePrice}</span>
                      </button>
                    ))}
                  </div>

                  {/* Hours selector */}
                  <div>
                    <Label>How many hours do you need?</Label>
                    <div className="mt-2 flex items-center gap-3">
                      <Button variant="outline" size="sm" onClick={() => setHours(Math.max(1, hours - 1))}>-</Button>
                      <Input
                        type="number"
                        min={1}
                        max={12}
                        value={hours}
                        onChange={(e) => setHours(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-20 text-center font-display text-lg font-bold"
                      />
                      <Button variant="outline" size="sm" onClick={() => setHours(Math.min(12, hours + 1))}>+</Button>
                      <span className="text-sm text-muted-foreground">hours × AED {pricing.hourlyRate}/hr</span>
                    </div>
                  </div>

                  <div>
                    <Label>Number of Cleaners</Label>
                    <div className="mt-1 flex items-center gap-3">
                      <Button variant="outline" size="sm" onClick={() => setCleaners(Math.max(1, cleaners - 1))}>-</Button>
                      <span className="font-display text-lg font-bold">{cleaners}</span>
                      <Button variant="outline" size="sm" onClick={() => setCleaners(Math.min(5, cleaners + 1))}>+</Button>
                    </div>
                  </div>

                  {/* Cleaning Materials */}
                  <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                    includeCleaningMaterials ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                    <Checkbox
                      checked={includeCleaningMaterials}
                      onCheckedChange={(checked) => setIncludeCleaningMaterials(!!checked)}
                    />
                    <span className="text-xl">🧹</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Include Cleaning Materials</p>
                      <p className="text-xs text-primary">+AED {pricing.cleaningMaterialsFee}</p>
                    </div>
                  </label>

                  <div>
                    <Label>Optional Extras</Label>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {extras.map((extra) => (
                        <label
                          key={extra.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                            selectedExtras.includes(extra.id) ? "border-primary bg-primary/5" : "border-border"
                          }`}
                        >
                          <Checkbox
                            checked={selectedExtras.includes(extra.id)}
                            onCheckedChange={(checked) => {
                              setSelectedExtras(checked ? [...selectedExtras, extra.id] : selectedExtras.filter((id) => id !== extra.id));
                            }}
                          />
                          <span className="text-xl">{extra.icon}</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{extra.name}</p>
                            <p className="text-xs text-primary">+AED {pricing.extraPrices[extra.id] || extra.price}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Live price preview */}
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="flex justify-between text-sm">
                      <span>Hourly ({hours}h × AED {pricing.hourlyRate})</span>
                      <span className="font-medium">AED {pricing.hourlyRate * hours}</span>
                    </div>
                    {includeCleaningMaterials && (
                      <div className="flex justify-between text-sm mt-1">
                        <span>Cleaning Materials</span>
                        <span className="font-medium">AED {pricing.cleaningMaterialsFee}</span>
                      </div>
                    )}
                    {selectedExtras.length > 0 && (
                      <div className="flex justify-between text-sm mt-1">
                        <span>Extras</span>
                        <span className="font-medium">AED {selectedExtras.reduce((s, eid) => s + (pricing.extraPrices[eid] || 0), 0)}</span>
                      </div>
                    )}
                    <hr className="my-2 border-primary/20" />
                    <div className="flex justify-between font-display font-bold text-primary">
                      <span>Estimated Total</span>
                      <span>AED {total}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Schedule */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <CalendarCheck className="mx-auto h-10 w-10 text-primary" />
                    <h2 className="mt-3 font-display text-2xl font-bold">Pick a Date & Time</h2>
                    <p className="text-sm text-muted-foreground">
                      Showing availability for <strong>{selectedBuilding?.name}</strong>
                    </p>
                  </div>

                  <div>
                    <Label>Available Dates</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {availableDates.map((date) => {
                        const d = new Date(date);
                        const label = d.toLocaleDateString("en-AE", { weekday: "short", month: "short", day: "numeric" });
                        return (
                          <button
                            key={date}
                            onClick={() => { setSelectedDate(date); setSelectedTime(""); }}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                              selectedDate === date ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/30"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedDate && (
                    <div>
                      <Label>Available Times</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {availableTimes.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No slots available on this date.</p>
                        ) : (
                          availableTimes.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                                selectedTime === time ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/30"
                              }`}
                            >
                              {time}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Customer Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-display text-2xl font-bold">Your Details</h2>
                    <p className="text-sm text-muted-foreground">We'll use this info for your booking confirmation</p>
                  </div>
                  <div className="space-y-4">
                    <div><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required /></div>
                    <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
                    <div><Label>Phone</Label><Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+971 50 XXX XXXX" required /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Floor Number *</Label><Input value={floorNumber} onChange={(e) => setFloorNumber(e.target.value)} placeholder="e.g. 5" required /></div>
                      <div><Label>Apartment Number *</Label><Input value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} placeholder="e.g. 502" required /></div>
                    </div>

                    <div>
                      <Label>Special Instructions</Label>
                      <Textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="Any special requests or instructions?"
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Payment Method</Label>
                      <div className="mt-2 flex gap-3">
                        <div className="relative flex-1 cursor-not-allowed rounded-lg border border-border bg-muted/50 p-3 text-center text-sm font-medium opacity-60">
                          <CreditCard className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
                          <span className="text-muted-foreground">Online Payment</span>
                          <span className="absolute -top-2 right-2 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">Coming Soon</span>
                        </div>
                        <button
                          onClick={() => setPaymentMethod("cash")}
                          className="flex-1 rounded-lg border border-primary bg-primary/5 p-3 text-center text-sm font-medium"
                        >
                          💵 Cash on Delivery
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-display text-2xl font-bold">Confirm Your Booking</h2>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="font-medium">{selectedCity?.name} — {selectedBuilding?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{selectedService?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">{hours} hour(s)</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Date & Time</span><span className="font-medium">{selectedDate} at {selectedTime}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Cleaners</span><span className="font-medium">{cleaners}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Floor / Apt</span><span className="font-medium">Floor {floorNumber}, Apt {apartmentNumber}</span></div>
                    {includeCleaningMaterials && (
                      <div className="flex justify-between"><span className="text-muted-foreground">Cleaning Materials</span><span className="font-medium">Included (+AED {pricing.cleaningMaterialsFee})</span></div>
                    )}
                    {selectedExtras.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Extras</span>
                        <span className="font-medium">{selectedExtras.map((eid) => extras.find((e) => e.id === eid)?.name).join(", ")}</span>
                      </div>
                    )}
                    {specialInstructions && (
                      <div><span className="text-muted-foreground">Instructions:</span><p className="mt-1 text-sm italic">{specialInstructions}</p></div>
                    )}
                    <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span className="font-medium">Cash on Delivery</span></div>
                    <hr className="border-border" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">AED {total}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Success */}
              {step === 5 && (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                    <CheckCircle className="h-10 w-10 text-accent" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-bold">Booking Confirmed!</h2>
                  <p className="mt-2 text-muted-foreground">We've sent a confirmation to {email}. Our team will be at {selectedBuilding?.name}, Floor {floorNumber}, Apt {apartmentNumber} on {selectedDate} at {selectedTime}.</p>
                  <Button className="mt-8 bg-gradient-hero text-primary-foreground" onClick={() => window.location.href = "/"}>Back to Home</Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < 5 && (
            <div className="mt-8 flex justify-between">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {step < 4 ? (
                <Button disabled={!canNext()} onClick={() => setStep(step + 1)} className="bg-gradient-hero text-primary-foreground">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleConfirm} className="bg-gradient-hero text-primary-foreground">
                  Confirm Booking <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
