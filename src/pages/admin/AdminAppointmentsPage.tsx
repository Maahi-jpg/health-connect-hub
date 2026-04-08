import { mockAppointments } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin } from "lucide-react";

const statusColors: Record<string, string> = {
  scheduled: "bg-info/10 text-info border-info/20",
  confirmed: "bg-success/10 text-success border-success/20",
  completed: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  "no-show": "bg-warning/10 text-warning border-warning/20",
};

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="page-header">All Appointments</h1>
        <Button>Export CSV</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="p-3 font-medium">Patient</th>
                  <th className="p-3 font-medium">Doctor</th>
                  <th className="p-3 font-medium">Specialty</th>
                  <th className="p-3 font-medium">Date & Time</th>
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="p-3 font-medium">{apt.patientName}</td>
                    <td className="p-3 text-muted-foreground">{apt.doctorName}</td>
                    <td className="p-3 text-muted-foreground">{apt.specialty}</td>
                    <td className="p-3 text-muted-foreground">
                      <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{apt.date}</div>
                      <div className="flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" />{apt.time}</div>
                    </td>
                    <td className="p-3">
                      <span className="flex items-center gap-1 text-muted-foreground capitalize">
                        {apt.type === "telehealth" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                        {apt.type}
                      </span>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className={statusColors[apt.status]}>{apt.status}</Badge>
                    </td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
