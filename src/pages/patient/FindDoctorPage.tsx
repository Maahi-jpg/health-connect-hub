import { useState } from "react";
import { mockDoctors, specialties } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, MapPin, Video, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FindDoctorPage() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const navigate = useNavigate();

  const filtered = mockDoctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpec = selectedSpecialty === "All Specialties" || d.specialty === selectedSpecialty;
    return matchSearch && matchSpec;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-header">Find a Doctor</h1>
        <p className="text-sm text-muted-foreground mt-1">Search by name, specialty, or location</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {specialties.slice(0, 6).map((s) => (
            <Button
              key={s}
              variant={selectedSpecialty === s ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpecialty(s)}
              className="text-xs"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">{filtered.length} doctors found</p>
        {filtered.map((doctor) => (
          <Card key={doctor.id} className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                {doctor.name.split(" ").slice(1).map(n => n[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">{doctor.name}</h3>
                  {doctor.availableToday && (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                      Available Today
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {doctor.specialty} · {doctor.qualifications} · {doctor.experience} yrs exp
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning" /> {doctor.rating} ({doctor.reviewCount})</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {doctor.location}</span>
                  {doctor.telehealth && <span className="flex items-center gap-1"><Video className="h-3 w-3" /> Telehealth</span>}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-lg font-semibold">${doctor.fee}</p>
                <p className="text-[10px] text-muted-foreground">per consultation</p>
                <Button size="sm" onClick={() => navigate(`/book/${doctor.id}`)}>
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
