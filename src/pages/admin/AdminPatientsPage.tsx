import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const patients = [
  { id: "u1", name: "Alex Johnson", email: "alex@email.com", phone: "+1 555-123-4567", lastVisit: "2026-04-08", status: "active" },
  { id: "u8", name: "Lisa Park", email: "lisa@email.com", phone: "+1 555-234-5678", lastVisit: "2026-04-05", status: "active" },
  { id: "u9", name: "Tom Garcia", email: "tom@email.com", phone: "+1 555-345-6789", lastVisit: "2026-03-28", status: "active" },
  { id: "u10", name: "Nina Williams", email: "nina@email.com", phone: "+1 555-456-7890", lastVisit: "2026-03-15", status: "inactive" },
];

export default function AdminPatientsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="page-header">Patients</h1>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Email</th>
                  <th className="p-3 font-medium">Phone</th>
                  <th className="p-3 font-medium">Last Visit</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3 text-muted-foreground">{p.email}</td>
                    <td className="p-3 text-muted-foreground">{p.phone}</td>
                    <td className="p-3 text-muted-foreground">{p.lastVisit}</td>
                    <td className="p-3">
                      <Badge variant="outline" className={p.status === "active" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground"}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">View</Button>
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
