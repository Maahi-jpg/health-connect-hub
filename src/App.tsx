import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

import PatientDashboard from "./pages/patient/PatientDashboard";
import FindDoctorPage from "./pages/patient/FindDoctorPage";
import BookAppointmentPage from "./pages/patient/BookAppointmentPage";
import AppointmentsPage from "./pages/patient/AppointmentsPage";
import PatientProfilePage from "./pages/patient/PatientProfilePage";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorSchedulePage from "./pages/doctor/DoctorSchedulePage";
import DoctorAppointmentsPage from "./pages/doctor/DoctorAppointmentsPage";
import DoctorAvailabilityPage from "./pages/doctor/DoctorAvailabilityPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAppointmentsPage from "./pages/admin/AdminAppointmentsPage";
import AdminDoctorsPage from "./pages/admin/AdminDoctorsPage";
import AdminPatientsPage from "./pages/admin/AdminPatientsPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Patient Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
      <Route path="/find-doctor" element={<ProtectedRoute><FindDoctorPage /></ProtectedRoute>} />
      <Route path="/book/:doctorId" element={<ProtectedRoute><BookAppointmentPage /></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><PatientProfilePage /></ProtectedRoute>} />

      {/* Doctor Routes */}
      <Route path="/doctor/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/doctor/schedule" element={<ProtectedRoute><DoctorSchedulePage /></ProtectedRoute>} />
      <Route path="/doctor/appointments" element={<ProtectedRoute><DoctorAppointmentsPage /></ProtectedRoute>} />
      <Route path="/doctor/availability" element={<ProtectedRoute><DoctorAvailabilityPage /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/appointments" element={<ProtectedRoute><AdminAppointmentsPage /></ProtectedRoute>} />
      <Route path="/admin/doctors" element={<ProtectedRoute><AdminDoctorsPage /></ProtectedRoute>} />
      <Route path="/admin/patients" element={<ProtectedRoute><AdminPatientsPage /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute><AdminReportsPage /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
