import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockDoctors, mockTimeSlots } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star, MapPin, Video, Check, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const doctor = mockDoctors.find((d) => d.id === doctorId);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointmentType, setAppointmentType] = useState<"in-person" | "telehealth">("in-person");
  const [reason, setReason] = useState("");
  const [booked, setBooked] = useState(false);

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Doctor not found</p>
        <Button variant="ghost" onClick={() => navigate("/find-doctor")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to search
        </Button>
      </div>
    );
  }

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      toast({ title: "Please select a date and time slot", variant: "destructive" });
      return;
    }
    setBooked(true);
    toast({ title: "Appointment booked!", description: `${doctor.name} on ${selectedDate} at ${selectedSlot}` });
  };

  if (booked) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mb-4">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold">Appointment Confirmed!</h2>
        <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
          Your {appointmentType} appointment with {doctor.name} has been scheduled for {selectedDate} at {selectedSlot}.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => navigate("/appointments")}>View My Appointments</Button>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      {/* Doctor Info */}
      <Card>
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {doctor.name.split(" ").slice(1).map(n => n[0]).join("")}
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold">{doctor.name}</h2>
            <p className="text-xs text-muted-foreground">{doctor.specialty} · {doctor.qualifications}</p>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning" /> {doctor.rating}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {doctor.location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">${doctor.fee}</p>
            <p className="text-[10px] text-muted-foreground">per visit</p>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Type */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="section-header">Appointment Type</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          {(["in-person", "telehealth"] as const).map((type) => (
            <button
              key={type}
              disabled={type === "telehealth" && !doctor.telehealth}
              onClick={() => setAppointmentType(type)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors ${
                appointmentType === type
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {type === "telehealth" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              {type === "in-person" ? "In-Person" : "Telehealth"}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Date & Time */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="section-header">Select Date & Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min="2026-04-08" />
          </div>
          {selectedDate && (
            <div className="space-y-2">
              <Label>Available Slots</Label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {mockTimeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`rounded-md border px-3 py-2 text-xs font-medium transition-colors ${
                      selectedSlot === slot.time
                        ? "border-primary bg-primary text-primary-foreground"
                        : slot.available
                        ? "border-border text-foreground hover:bg-muted"
                        : "border-border bg-muted/50 text-muted-foreground/50 cursor-not-allowed line-through"
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reason */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="section-header">Reason for Visit</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Brief description of your concern..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </CardContent>
      </Card>

      <Button className="w-full" size="lg" onClick={handleBook}>
        Confirm Booking — ${doctor.fee}
      </Button>
    </div>
  );
}
