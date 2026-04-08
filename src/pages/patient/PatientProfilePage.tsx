import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function PatientProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <h1 className="page-header">My Profile</h1>

      <Card>
        <CardHeader><CardTitle className="section-header">Personal Information</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={user?.name || ""} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user?.email || ""} type="email" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue="+1 (555) 123-4567" />
          </div>
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Input type="date" defaultValue="1990-05-15" />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Input defaultValue="Male" />
          </div>
          <div className="space-y-2">
            <Label>Blood Type</Label>
            <Input defaultValue="O+" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="section-header">Insurance Information</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Provider</Label>
            <Input defaultValue="Blue Cross Blue Shield" />
          </div>
          <div className="space-y-2">
            <Label>Policy Number</Label>
            <Input defaultValue="BCBS-2024-78901" />
          </div>
          <div className="space-y-2">
            <Label>Group Number</Label>
            <Input defaultValue="GRP-456789" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="section-header">Emergency Contact</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Contact Name</Label>
            <Input defaultValue="Jane Johnson" />
          </div>
          <div className="space-y-2">
            <Label>Contact Phone</Label>
            <Input defaultValue="+1 (555) 987-6543" />
          </div>
        </CardContent>
      </Card>

      <Button className="w-full">Save Changes</Button>
    </div>
  );
}
