import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAppointments, mockDoctors } from "@/lib/mock-data";
import { Calendar, Users, DollarSign, TrendingUp, Clock, Stethoscope } from "lucide-react";

export default function AdminDashboard() {
  const totalAppts = mockAppointments.length;
  const completed = mockAppointments.filter(a => a.status === "completed").length;
  const cancelled = mockAppointments.filter(a => a.status === "cancelled").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of clinic operations</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Appointments", value: totalAppts.toString(), icon: Calendar, color: "text-primary", change: "+12%" },
          { label: "Active Doctors", value: mockDoctors.length.toString(), icon: Stethoscope, color: "text-accent", change: "+2" },
          { label: "Patients This Month", value: "142", icon: Users, color: "text-info", change: "+18%" },
          { label: "Revenue", value: "$28,450", icon: DollarSign, color: "text-success", change: "+8.5%" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center justify-between">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <span className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" /> {s.change}
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <Card>
        <CardHeader><CardTitle className="section-header">Recent Appointments</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="pb-2 font-medium">Patient</th>
                  <th className="pb-2 font-medium">Doctor</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Time</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b last:border-0">
                    <td className="py-2.5 font-medium">{apt.patientName}</td>
                    <td className="py-2.5 text-muted-foreground">{apt.doctorName}</td>
                    <td className="py-2.5 text-muted-foreground">{apt.date}</td>
                    <td className="py-2.5 text-muted-foreground">{apt.time}</td>
                    <td className="py-2.5 capitalize text-muted-foreground">{apt.type}</td>
                    <td className="py-2.5">
                      <Badge variant="outline" className={`text-[10px] ${
                        apt.status === "completed" ? "bg-success/10 text-success border-success/20" :
                        apt.status === "cancelled" ? "bg-destructive/10 text-destructive border-destructive/20" :
                        apt.status === "confirmed" ? "bg-success/10 text-success border-success/20" :
                        "bg-info/10 text-info border-info/20"
                      }`}>
                        {apt.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Doctor Overview */}
      <Card>
        <CardHeader><CardTitle className="section-header">Doctor Overview</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockDoctors.slice(0, 4).map((doc) => (
            <div key={doc.id} className="flex items-center gap-4 rounded-md border p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.specialty} · {doc.location}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p className="font-medium text-foreground">${doc.fee}/visit</p>
                <p>{doc.reviewCount} reviews</p>
              </div>
              <Badge variant="outline" className={doc.availableToday ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground"}>
                {doc.availableToday ? "Available" : "Offline"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
