import { useAuth } from "@/contexts/AuthContext";
import { mockAppointments, mockDoctors } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusColors: Record<string, string> = {
  scheduled: "bg-info/10 text-info border-info/20",
  confirmed: "bg-success/10 text-success border-success/20",
  completed: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  "no-show": "bg-warning/10 text-warning border-warning/20",
  "checked-in": "bg-accent/10 text-accent border-accent/20",
};

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const upcoming = mockAppointments
    .filter((a) => a.patientId === "u1" && ["scheduled", "confirmed"].includes(a.status))
    .slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Welcome back, {user?.name?.split(" ")[0]}</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's an overview of your health schedule</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Upcoming", value: "2", sub: "appointments" },
          { label: "Completed", value: "8", sub: "this year" },
          { label: "Doctors", value: "3", sub: "connected" },
          { label: "Next Visit", value: "Apr 10", sub: "in 2 days" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className="mt-1 text-2xl font-semibold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="section-header">Upcoming Appointments</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate("/appointments")} className="text-primary">
            View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcoming.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No upcoming appointments</p>
          ) : (
            upcoming.map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 rounded-md border p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  {apt.type === "telehealth" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{apt.doctorName}</p>
                  <p className="text-xs text-muted-foreground">{apt.specialty} · {apt.reason}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {apt.date}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Clock className="h-3 w-3" /> {apt.time}
                  </div>
                </div>
                <Badge variant="outline" className={statusColors[apt.status]}>
                  {apt.status}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => navigate("/find-doctor")}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-sm">Book an Appointment</p>
              <p className="text-xs text-muted-foreground">Find a doctor and schedule a visit</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => navigate("/appointments")}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-info/10 text-info">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-sm">View History</p>
              <p className="text-xs text-muted-foreground">Review past and upcoming appointments</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
