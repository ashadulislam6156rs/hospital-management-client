import {
  ArrowRightLeft,
  Bell,
  Building2,
  CalendarCheck2,
  FileText,
  FlaskConical,
  Home as HomeIcon,
  Hotel,
  Landmark,
  MapPinned,
  Microscope,
  Package,
  Pill,
  Settings,
  ShieldPlus,
  Stethoscope,
  UserRound,
  Users,
  WalletCards,
  BookText,
} from "lucide-react";
import { BedIcon } from "./bed-icon";

export const topNav = [
  { label: "Options", icon: Bell },
  { label: "Quick Options", icon: Building2 },
  { label: "Dashboard", icon: HomeIcon, active: true },
  { label: "Modules", icon: Building2 },
  { label: "Pathology", icon: Microscope },
  { label: "Radiology", icon: FlaskConical },
  { label: "Appointment", icon: CalendarCheck2 },
  { label: "OPD", icon: Stethoscope },
  { label: "IPD", icon: Hotel },
  { label: "Ambulance", icon: MapPinned },
  { label: "Blood", icon: ShieldPlus },
  { label: "Pharmacy", icon: Pill },
  { label: "Medicine", icon: Package },
  { label: "Finance", icon: WalletCards },
  { label: "Reports", icon: FileText },
  { label: "BED", icon: Landmark },
  { label: "Patient", icon: UserRound },
  { label: "Doctor", icon: Users },
  { label: "Referral", icon: ArrowRightLeft },
  { label: "HR & Payroll", icon: BookText },
  { label: "Settings", icon: Settings },
];

export const sidebarItems = topNav;

export const quickNav = [
  { label: "Pathology", icon: Microscope },
  { label: "Radiology", icon: FlaskConical },
  { label: "OPD", icon: Stethoscope },
  { label: "IPD", icon: Hotel },
  { label: "Appointment", icon: CalendarCheck2 },
  { label: "Blood", icon: ShieldPlus },
  { label: "Pharmacy", icon: Pill },
  { label: "Ambulance", icon: MapPinned },
  { label: "Reports", icon: FileText },
  { label: "Finance", icon: WalletCards },
  { label: "HR & Payroll", icon: BookText },
  { label: "Patient", icon: UserRound },
  { label: "BED", icon: Landmark },
  { label: "Medicine", icon: Package },
  { label: "Doctor", icon: Users },
  { label: "Referral", icon: ArrowRightLeft },
  { label: "Settings", icon: Settings },
];

export const highlights = [
  { label: "Cash Balance", value: "24,820", className: "bg-sky-300/80" },
  { label: "Bank Balance", value: "0", className: "bg-sky-300/80" },
  { label: "Total Doctors", value: "2", className: "bg-violet-300/80" },
  { label: "Total Patients", value: "14", className: "bg-violet-300/80" },
  { label: "Total Medicines", value: "4", className: "bg-violet-300/80" },
  { label: "Expired Medicine Stock", value: "14", className: "bg-violet-300/80" },
];

export const billingCards = [
  {
    title: "Today Pathology Bill",
    amount: "0",
    amountLabel: "Amount: 0",
    icon: FlaskConical,
    color: "bg-red-500",
  },
  {
    title: "Today OPD BILL",
    amount: "0",
    amountLabel: "Amount: 0",
    icon: Stethoscope,
    color: "bg-blue-500",
  },
  {
    title: "Today IPD BILL",
    amount: "0",
    amountLabel: "Amount: 0",
    icon: Hotel,
    color: "bg-emerald-400",
  },
  {
    title: "Today Pharmacy BILL",
    amount: "0",
    amountLabel: "Amount: 0",
    icon: Pill,
    color: "bg-amber-400",
  },
  {
    title: "Today Radiology BILL",
    amount: "0",
    amountLabel: "Amount: 0",
    icon: Microscope,
    color: "bg-fuchsia-500",
  },
  {
    title: "Today Appointment BILL",
    amount: "0",
    amountLabel: "Amount: 0",
    icon: CalendarCheck2,
    color: "bg-emerald-500",
  },
  {
    title: "Today Ambulance Service",
    amount: "0",
    amountLabel: "Amount: 0",
    icon: MapPinned,
    color: "bg-orange-500",
  },
  {
    title: "Total Today Collections",
    amount: "0",
    amountLabel: "Amount: 100",
    icon: WalletCards,
    color: "bg-slate-600",
  },
  {
    title: "Total Available Bed",
    amount: "4",
    amountLabel: "",
    icon: BedIcon,
    color: "bg-slate-400",
  },
];

export const departmentBars = [
  { label: "Pathology", value: 12000 },
  { label: "Radiology", value: 21000 },
  { label: "OPD", value: 5000 },
  { label: "IPD", value: 1000 },
  { label: "Pharmacy", value: 11000 },
  { label: "Appoint", value: 6000 },
];

export const expenseBars = [
  { label: "Jan", value: 12000 },
  { label: "Feb", value: 21000 },
  { label: "Mar", value: 2000 },
  { label: "Apr", value: 1200 },
  { label: "May", value: 10500 },
  { label: "Jun", value: 6200 },
];

export const shellMeta = {
  // branch: "DeshIT-BD",
  // user: "DeshIT-BD",
  title: "Hospital managment",
  // date: "11 Apr 2026",
  // time: "01:45:00 PM",
};

export const headerActions = [
  { label: "Search", icon: Bell },
];
