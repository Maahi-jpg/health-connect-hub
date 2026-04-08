import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const defaultAvailability = days.map((day, i) => ({
  day,
  enabled: i < 5,
  start: "09:00",
  end: "17:00",
}));

export default function DoctorAvailabilityPage() {
  const [availability, setAvailability] = useState(defaultAvailability);
  const [bufferTime, setBufferTime] = useState(15);

  const toggle = (index: number) => {
    setAvailability((prev) =>
      prev.map((a, i) => (i === index ? { ...a, enabled: !a.enabled } : a))
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <h1 className="page-header">Availability Settings</h1>

      <Card>
        <CardHeader><CardTitle className="section-header">Weekly Schedule</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {availability.map((slot, i) => (
            <div key={slot.day} className="flex items-center gap-4">
              <div className="w-24">
                <span className="text-sm font-medium">{slot.day}</span>
              </div>
              <Switch checked={slot.enabled} onCheckedChange={() => toggle(i)} />
              {slot.enabled ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="time"
                    value={slot.start}
                    onChange={(e) =>
                      setAvailability((prev) => prev.map((a, j) => (j === i ? { ...a, start: e.target.value } : a)))
                    }
                    className="rounded-md border bg-background px-2 py-1 text-sm"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={slot.end}
                    onChange={(e) =>
                      setAvailability((prev) => prev.map((a, j) => (j === i ? { ...a, end: e.target.value } : a)))
                    }
                    className="rounded-md border bg-background px-2 py-1 text-sm"
                  />
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Unavailable</span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="section-header">Appointment Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Buffer time between appointments</Label>
            <select
              value={bufferTime}
              onChange={(e) => setBufferTime(Number(e.target.value))}
              className="rounded-md border bg-background px-3 py-1.5 text-sm"
            >
              <option value={0}>No buffer</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Slot duration</Label>
            <select className="rounded-md border bg-background px-3 py-1.5 text-sm" defaultValue="30">
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Accept telehealth</Label>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Button className="w-full">Save Availability</Button>
    </div>
  );
}
