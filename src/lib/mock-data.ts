export type UserRole = "patient" | "doctor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  qualifications: string;
  experience: number;
  fee: number;
  bio: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  location: string;
  availableToday: boolean;
  telehealth: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: "in-person" | "telehealth";
  status: "scheduled" | "confirmed" | "checked-in" | "completed" | "cancelled" | "no-show";
  reason: string;
}

export const mockDoctors: Doctor[] = [
  {
    id: "d1",
    userId: "u2",
    name: "Dr. Sarah Chen",
    specialty: "Cardiology",
    qualifications: "MD, FACC",
    experience: 15,
    fee: 200,
    bio: "Board-certified cardiologist with 15 years of experience in interventional cardiology and heart failure management.",
    avatar: "",
    rating: 4.9,
    reviewCount: 328,
    location: "Downtown Medical Center",
    availableToday: true,
    telehealth: true,
  },
  {
    id: "d2",
    userId: "u3",
    name: "Dr. James Wilson",
    specialty: "Dermatology",
    qualifications: "MD, FAAD",
    experience: 12,
    fee: 175,
    bio: "Specializing in medical and cosmetic dermatology, skin cancer screening, and advanced laser treatments.",
    avatar: "",
    rating: 4.7,
    reviewCount: 215,
    location: "Westside Clinic",
    availableToday: true,
    telehealth: true,
  },
  {
    id: "d3",
    userId: "u4",
    name: "Dr. Maria Rodriguez",
    specialty: "Pediatrics",
    qualifications: "MD, FAAP",
    experience: 20,
    fee: 150,
    bio: "Dedicated pediatrician caring for children from newborn through adolescence with a focus on preventive care.",
    avatar: "",
    rating: 4.8,
    reviewCount: 445,
    location: "Children's Health Pavilion",
    availableToday: false,
    telehealth: true,
  },
  {
    id: "d4",
    userId: "u5",
    name: "Dr. Michael Park",
    specialty: "Orthopedics",
    qualifications: "MD, FAAOS",
    experience: 18,
    fee: 225,
    bio: "Orthopedic surgeon specializing in sports medicine, joint replacement, and minimally invasive procedures.",
    avatar: "",
    rating: 4.6,
    reviewCount: 189,
    location: "Sports Medicine Institute",
    availableToday: true,
    telehealth: false,
  },
  {
    id: "d5",
    userId: "u6",
    name: "Dr. Emily Thompson",
    specialty: "Neurology",
    qualifications: "MD, PhD",
    experience: 10,
    fee: 250,
    bio: "Neurologist with expertise in headache disorders, epilepsy, and neurodegenerative diseases.",
    avatar: "",
    rating: 4.9,
    reviewCount: 167,
    location: "Neuro Health Center",
    availableToday: true,
    telehealth: true,
  },
  {
    id: "d6",
    userId: "u7",
    name: "Dr. Robert Kim",
    specialty: "General Practice",
    qualifications: "MD, FAAFP",
    experience: 8,
    fee: 120,
    bio: "Family medicine physician providing comprehensive primary care for patients of all ages.",
    avatar: "",
    rating: 4.5,
    reviewCount: 302,
    location: "Community Health Center",
    availableToday: true,
    telehealth: true,
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "a1",
    patientId: "u1",
    patientName: "Alex Johnson",
    doctorId: "d1",
    doctorName: "Dr. Sarah Chen",
    specialty: "Cardiology",
    date: "2026-04-10",
    time: "09:00 AM",
    type: "in-person",
    status: "confirmed",
    reason: "Annual heart checkup",
  },
  {
    id: "a2",
    patientId: "u1",
    patientName: "Alex Johnson",
    doctorId: "d2",
    doctorName: "Dr. James Wilson",
    specialty: "Dermatology",
    date: "2026-04-12",
    time: "02:30 PM",
    type: "telehealth",
    status: "scheduled",
    reason: "Skin rash consultation",
  },
  {
    id: "a3",
    patientId: "u8",
    patientName: "Lisa Park",
    doctorId: "d1",
    doctorName: "Dr. Sarah Chen",
    specialty: "Cardiology",
    date: "2026-04-10",
    time: "10:30 AM",
    type: "in-person",
    status: "scheduled",
    reason: "Follow-up consultation",
  },
  {
    id: "a4",
    patientId: "u9",
    patientName: "Tom Garcia",
    doctorId: "d5",
    doctorName: "Dr. Emily Thompson",
    specialty: "Neurology",
    date: "2026-04-08",
    time: "11:00 AM",
    type: "telehealth",
    status: "completed",
    reason: "Migraine follow-up",
  },
  {
    id: "a5",
    patientId: "u10",
    patientName: "Nina Williams",
    doctorId: "d3",
    doctorName: "Dr. Maria Rodriguez",
    specialty: "Pediatrics",
    date: "2026-04-09",
    time: "03:00 PM",
    type: "in-person",
    status: "cancelled",
    reason: "Child vaccination",
  },
];

export const mockTimeSlots: TimeSlot[] = [
  { id: "s1", time: "09:00 AM", available: true },
  { id: "s2", time: "09:30 AM", available: false },
  { id: "s3", time: "10:00 AM", available: true },
  { id: "s4", time: "10:30 AM", available: true },
  { id: "s5", time: "11:00 AM", available: false },
  { id: "s6", time: "11:30 AM", available: true },
  { id: "s7", time: "01:00 PM", available: true },
  { id: "s8", time: "01:30 PM", available: true },
  { id: "s9", time: "02:00 PM", available: false },
  { id: "s10", time: "02:30 PM", available: true },
  { id: "s11", time: "03:00 PM", available: true },
  { id: "s12", time: "03:30 PM", available: false },
  { id: "s13", time: "04:00 PM", available: true },
  { id: "s14", time: "04:30 PM", available: true },
];

export const specialties = [
  "All Specialties",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "General Practice",
  "Ophthalmology",
  "Psychiatry",
  "ENT",
];

export const mockCurrentUser: User = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  role: "patient",
};
