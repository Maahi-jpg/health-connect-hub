import { Button } from "@/components/ui/button";
import { Heart, Calendar, Shield, Video, Users, ArrowRight, Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold">MedSchedule</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Sign In</Button>
            <Button size="sm" onClick={() => navigate("/login")}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Shield className="h-3 w-3" /> HIPAA Compliant · Secure Platform
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Healthcare scheduling,{" "}
            <span className="text-primary">simplified</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Book appointments with top healthcare providers in minutes. Manage your health schedule with a platform built for patients, doctors, and clinics.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button size="lg" onClick={() => navigate("/login")}>
              Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/login")}>
              For Providers
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-success" />Free for patients</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-success" />No waitlists</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-success" />Instant confirmation</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-card py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-semibold">Everything you need</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">A complete platform for modern healthcare scheduling</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Calendar, title: "Easy Scheduling", desc: "Search by doctor, specialty, or date. Book in under 2 minutes." },
              { icon: Video, title: "Telehealth Ready", desc: "Virtual consultations with secure video meeting integration." },
              { icon: Shield, title: "HIPAA Compliant", desc: "Enterprise-grade security for all patient data and records." },
              { icon: Users, title: "Multi-Role Access", desc: "Tailored dashboards for patients, doctors, and administrators." },
              { icon: Star, title: "Provider Ratings", desc: "Make informed decisions with patient reviews and ratings." },
              { icon: CheckCircle, title: "Smart Reminders", desc: "Automated email and SMS reminders to reduce no-shows." },
            ].map((f) => (
              <div key={f.title} className="rounded-md border bg-background p-5">
                <f.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-4 text-center">
            {[
              { value: "10,000+", label: "Appointments Booked" },
              { value: "500+", label: "Healthcare Providers" },
              { value: "98%", label: "Patient Satisfaction" },
              { value: "< 2 min", label: "Average Booking Time" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-semibold text-primary">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-card py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold">Ready to get started?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Join thousands of patients and providers on MedSchedule</p>
          <Button size="lg" className="mt-6" onClick={() => navigate("/login")}>
            Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto flex items-center justify-between px-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Heart className="h-3.5 w-3.5 text-primary" />
            <span>MedSchedule</span>
          </div>
          <p>© 2026 MedSchedule. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
