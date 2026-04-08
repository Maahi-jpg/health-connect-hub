import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAppointments } from "@/lib/mock-data";
import { Calendar, Clock, Video, MapPin, Check, X } from "lucide-react";

const statusColors: Record<string, string> = {
  scheduled: "bg-info/10 text-info border-info/20",
  confirmed: "bg-success/10 text-success border-success/20",
  completed: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  "no-show": "bg-warning/10 text-warning border-warning/20",
  "checked-in": "bg-accent/10 text-accent border-accent/20",
};

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments.filter(a => a.doctorId === "d1"));

  const updateStatus = (id: string, status: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: status as any } : a));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-header">Appointments</h1>

      <div className="space-y-3">
        {appointments.map((apt) => (
          <Card key={apt.id}>
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                {apt.type === "telehealth" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{apt.patientName}</p>
                <p className="text-xs text-muted-foreground">{apt.reason}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{apt.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{apt.time}</span>
                </div>
              </div>
              <Badge variant="outline" className={statusColors[apt.status]}>{apt.status}</Badge>
              {apt.status === "scheduled" && (
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => updateStatus(apt.id, "confirmed")}>
                    <Check className="mr-1 h-3 w-3" /> Confirm
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateStatus(apt.id, "cancelled")} className="text-destructive">
                    <X className="mr-1 h-3 w-3" /> Cancel
                  </Button>
                </div>
              )}
              {apt.status === "confirmed" && (
                <Button size="sm" onClick={() => updateStatus(apt.id, "completed")}>
                  Mark Complete
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
