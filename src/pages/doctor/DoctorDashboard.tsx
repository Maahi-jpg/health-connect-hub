import { mockAppointments } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, CheckCircle, Video, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const statusColors: Record<string, string> = {
  scheduled: "bg-info/10 text-info border-info/20",
  confirmed: "bg-success/10 text-success border-success/20",
  completed: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  "no-show": "bg-warning/10 text-warning border-warning/20",
  "checked-in": "bg-accent/10 text-accent border-accent/20",
};

export default function DoctorDashboard() {
  const { user } = useAuth();
  const todayAppts = mockAppointments.filter((a) => a.doctorId === "d1" && ["scheduled", "confirmed"].includes(a.status));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Good morning, {user?.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's your schedule for today</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Today's Patients", value: "6", icon: Users, color: "text-primary" },
          { label: "Completed", value: "3", icon: CheckCircle, color: "text-success" },
          { label: "Upcoming", value: "3", icon: Clock, color: "text-info" },
          { label: "This Week", value: "24", icon: Calendar, color: "text-accent" },
        ].map((s) => (
          <div key={s.label} className="stat-card flex items-center gap-3">
            <s.icon className={`h-8 w-8 ${s.color}`} />
            <div>
              <p className="text-2xl font-semibold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="section-header">Today's Schedule</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {todayAppts.map((apt) => (
            <div key={apt.id} className="flex items-center gap-4 rounded-md border p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                {apt.type === "telehealth" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{apt.patientName}</p>
                <p className="text-xs text-muted-foreground">{apt.reason}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {apt.time}
              </div>
              <Badge variant="outline" className={statusColors[apt.status]}>{apt.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
