import {
  ArrowRightLeft,
  BookText,
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
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: HomeIcon, exact: true },
  { label: "Modules", href: "/modules", icon: Building2 },
  { label: "Pathology", href: "/pathology", icon: Microscope },
  { label: "Radiology", href: "/radiology", icon: FlaskConical },
  { label: "Appointment", href: "/appointment", icon: CalendarCheck2 },
  { label: "OPD", href: "/opd", icon: Stethoscope },
  { label: "IPD", href: "/ipd", icon: Hotel },
  { label: "Ambulance", href: "/ambulance", icon: MapPinned },
  { label: "Blood", href: "/blood", icon: ShieldPlus },
  { label: "Pharmacy", href: "/pharmacy", icon: Pill },
  { label: "Medicine", href: "/medicine", icon: Package },
  { label: "Finance", href: "/finance", icon: WalletCards },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "BED", href: "/bed", icon: Landmark },
  { label: "Patient", href: "/patient", icon: UserRound },
  { label: "Doctor", href: "/doctor", icon: Users },
  { label: "Referral", href: "/referral", icon: ArrowRightLeft },
  { label: "HR & Payroll", href: "/hr-payroll", icon: BookText },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const moduleLookup = navItems.reduce((acc, item) => {
  const slug = item.href.replace(/^\//, "");
  acc[slug] = item;
  return acc;
}, {});
