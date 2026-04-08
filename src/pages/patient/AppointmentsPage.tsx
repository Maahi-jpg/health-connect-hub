import { useState } from "react";
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
  "checked-in": "bg-accent/10 text-accent border-accent/20",
};

const tabs = ["upcoming", "past", "cancelled"] as const;

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("upcoming");

  const appointments = mockAppointments.filter((a) => {
    if (activeTab === "upcoming") return ["scheduled", "confirmed"].includes(a.status);
    if (activeTab === "past") return ["completed", "no-show"].includes(a.status);
    return a.status === "cancelled";
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">My Appointments</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your scheduled visits</p>
      </div>

      <div className="flex gap-1 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              No {activeTab} appointments
            </CardContent>
          </Card>
        ) : (
          appointments.map((apt) => (
            <Card key={apt.id}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  {apt.type === "telehealth" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{apt.doctorName}</p>
                  <p className="text-xs text-muted-foreground">{apt.specialty} · {apt.reason}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{apt.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{apt.time}</span>
                    <span className="capitalize">{apt.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={statusColors[apt.status]}>{apt.status}</Badge>
                  {["scheduled", "confirmed"].includes(apt.status) && (
                    <Button variant="outline" size="sm">Reschedule</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
