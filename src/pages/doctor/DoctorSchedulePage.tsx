import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAppointments } from "@/lib/mock-data";
import { Calendar, Clock, Video, MapPin } from "lucide-react";

const statusColors: Record<string, string> = {
  scheduled: "bg-info/10 text-info border-info/20",
  confirmed: "bg-success/10 text-success border-success/20",
  completed: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  "no-show": "bg-warning/10 text-warning border-warning/20",
};

const days = ["Mon Apr 7", "Tue Apr 8", "Wed Apr 9", "Thu Apr 10", "Fri Apr 11"];
const hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00"];

export default function DoctorSchedulePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-header">My Schedule</h1>

      {/* Week View */}
      <Card>
        <CardHeader><CardTitle className="section-header">This Week</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-6 border-b">
              <div className="p-2 text-xs font-medium text-muted-foreground">Time</div>
              {days.map((d) => (
                <div key={d} className="p-2 text-center text-xs font-medium">{d}</div>
              ))}
            </div>
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-6 border-b last:border-0">
                <div className="p-2 text-xs text-muted-foreground">{hour}</div>
                {days.map((day, i) => {
                  const hasAppt = (hour === "9:00" && i === 3) || (hour === "10:00" && i === 3) || (hour === "2:00" && i === 1);
                  return (
                    <div key={day} className="border-l p-1">
                      {hasAppt && (
                        <div className="rounded bg-primary/10 p-1.5 text-[10px] text-primary font-medium">
                          Patient Visit
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming List */}
      <Card>
        <CardHeader><CardTitle className="section-header">Upcoming Appointments</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockAppointments.filter(a => a.doctorId === "d1").map((apt) => (
            <div key={apt.id} className="flex items-center gap-4 rounded-md border p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                {apt.type === "telehealth" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{apt.patientName}</p>
                <p className="text-xs text-muted-foreground">{apt.reason}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{apt.date}</div>
                <div className="flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" />{apt.time}</div>
              </div>
              <Badge variant="outline" className={statusColors[apt.status]}>{apt.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
