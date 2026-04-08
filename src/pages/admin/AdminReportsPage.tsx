import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download } from "lucide-react";

export default function AdminReportsPage() {
  const metrics = [
    { label: "Booking Completion Rate", value: "87%", desc: "of bookings completed successfully" },
    { label: "No-Show Rate", value: "4.2%", desc: "average across all providers" },
    { label: "Avg. Scheduling Time", value: "2.3 min", desc: "from search to confirmation" },
    { label: "Provider Utilization", value: "76%", desc: "average slot utilization" },
    { label: "Patient Satisfaction", value: "4.7/5", desc: "based on 1,240 reviews" },
    { label: "Monthly Active Users", value: "892", desc: "unique users this month" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="page-header">Reports & Analytics</h1>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" />Export PDF</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="stat-card">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{m.label}</p>
            <p className="mt-2 text-3xl font-semibold">{m.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{m.desc}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="section-header">Appointments by Month</CardTitle></CardHeader>
        <CardContent>
          <div className="flex h-48 items-end gap-3">
            {[45, 52, 61, 58, 72, 68, 85, 79, 92, 88, 95, 102].map((val, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-primary/80 transition-all hover:bg-primary"
                  style={{ height: `${(val / 102) * 100}%` }}
                />
                <span className="text-[9px] text-muted-foreground">
                  {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="section-header">Revenue by Department</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { dept: "Cardiology", revenue: "$8,400", pct: 30 },
            { dept: "Dermatology", revenue: "$6,200", pct: 22 },
            { dept: "Pediatrics", revenue: "$5,100", pct: 18 },
            { dept: "Orthopedics", revenue: "$4,800", pct: 17 },
            { dept: "Neurology", revenue: "$3,950", pct: 13 },
          ].map((d) => (
            <div key={d.dept} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{d.dept}</span>
                <span className="font-medium">{d.revenue}</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary/70" style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
