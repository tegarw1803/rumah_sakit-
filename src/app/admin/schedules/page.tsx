"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { useToast } from "@/hooks/use-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  Stethoscope,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { useHospital } from "@/lib/hospital-context";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const polis = [
  "Poli Umum",
  "Penyakit Dalam",
  "Anak",
  "Bedah",
  "Kandungan",
  "Jantung",
  "Paru",
  "Saraf",
  "Kulit dan Kelamin",
  "Mata",
  "THT",
];

export default function SchedulesManagementPage() {
  const { doctors, schedules, updateSchedules } = useHospital();
  const { toast } = useToast();

  const [filterDoctor, setFilterDoctor] = useState("all");
  const [filterDay, setFilterDay] = useState("all");
  const [filterPoli, setFilterPoli] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);

  const [formData, setFormData] = useState({
    doctorId: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    poli: "",
    isActive: true,
  });

  const filteredSchedules = schedules.filter((s) => {
    return (
      (filterDoctor === "all" || s.doctorId === filterDoctor) &&
      (filterDay === "all" || s.dayOfWeek === filterDay) &&
      (filterPoli === "all" || s.poli === filterPoli)
    );
  });

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.doctorId ||
      !formData.dayOfWeek ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.poli
    ) {
      toast({
        title: "Error",
        description: "Lengkapi semua field wajib",
        variant: "destructive",
      });
      return;
    }

    const doctor = doctors.find((d) => d.id === formData.doctorId);

    let newSchedules;
    if (editingSchedule) {
      newSchedules = schedules.map((s) =>
        s.id === editingSchedule.id
          ? { ...s, ...formData, doctorName: doctor?.name || "" }
          : s
      );
    } else {
      newSchedules = [
        ...schedules,
        {
          id: Date.now().toString(),
          ...formData,
          doctorName: doctor?.name || "",
        },
      ];
    }

    updateSchedules(newSchedules);
    setDialogOpen(false);
    setEditingSchedule(null);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Stethoscope />
              <span className="font-bold">Admin Panel</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/dashboard">
                        <LayoutDashboard /> Dashboard
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/admin/schedules">
                        <Calendar /> Jadwal
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t">
            <Button variant="ghost">Admin</Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Manajemen Jadwal</h1>
              <p className="text-muted-foreground">
                Kelola jadwal praktik dokter
              </p>
            </div>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Jadwal
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Jadwal</CardTitle>
              <CardDescription>
                Total {filteredSchedules.length} jadwal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredSchedules.map((s) => (
                <div
                  key={s.id}
                  className="flex justify-between items-center border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">{s.doctorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {s.dayOfWeek} • {s.startTime} - {s.endTime}
                    </p>
                  </div>
                  <Badge>{s.poli}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Jadwal</DialogTitle>
            <DialogDescription>Isi jadwal praktik dokter</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveSchedule} className="space-y-4">
            <Select
              onValueChange={(v) =>
                setFormData({ ...formData, doctorId: v })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Dokter" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="submit" className="w-full">
              Simpan
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
