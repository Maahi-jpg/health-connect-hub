import { mockDoctors } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Plus } from "lucide-react";

export default function AdminDoctorsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="page-header">Manage Doctors</h1>
        <Button><Plus className="mr-2 h-4 w-4" />Add Doctor</Button>
      </div>

      <div className="space-y-3">
        {mockDoctors.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
                {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold">{doc.name}</h3>
                <p className="text-xs text-muted-foreground">{doc.specialty} · {doc.qualifications} · {doc.experience} yrs</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning" />{doc.rating}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{doc.location}</span>
                  <span>${doc.fee}/visit</span>
                </div>
              </div>
              <Badge variant="outline" className={doc.availableToday ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground"}>
                {doc.availableToday ? "Active" : "Offline"}
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
