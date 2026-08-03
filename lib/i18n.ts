export type Language = "id" | "en"

export const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.pelatihan_saya": "Pelatihan Saya",
    "nav.katalog": "Katalog Pelatihan",
    "nav.sertifikat": "Sertifikat",
    "nav.pengajuan": "Pengajuan Pelatihan",
    "nav.tna": "TNA",
    "nav.persetujuan": "Persetujuan",
    "nav.konten": "Kelola Konten",
    "nav.pengguna": "Kelola Pengguna",
    "nav.audit": "Audit Log",
    "nav.manajemen": "Dashboard Manajemen",
    "nav.laporan": "Laporan",
    "nav.laporan_divisi": "Laporan Divisi",
    "nav.laporan_tim": "Laporan Tim",
    "nav.laporan_konten": "Laporan Konten",
    "nav.trainer": "Kelola Trainer",
    "nav.pengaturan": "Pengaturan",
    "nav.keluar": "Keluar",
    "nav.budget": "Biaya & Budget",
    "nav.surat_tugas": "Kelola Surat Tugas",
    "nav.learning_menu": "Menu Pembelajaran",
    "nav.control_menu": "Menu Kontrol",

    // Common
    "common.detail": "Lihat Detail",
    "common.edit": "Edit",
    "common.delete": "Hapus",
    "common.save": "Simpan",
    "common.cancel": "Batal",
    "common.search": "Cari",
    "common.filter": "Filter",
    "common.export": "Ekspor",
    "common.action": "Aksi",
    "common.more_actions": "Tindak Lanjut",
    "common.status": "Status",

    // Course Detail
    "course.learning_path": "Learning Path",
    "course.materials": "Materi Pelatihan",
    "course.assessment": "Assessment Pelatihan",
    "course.final_project": "Final Project",
    "course.duration": "Durasi",
    "course.instructor": "Instruktur",
    "course.participants": "Peserta",

    // Budget
    "budget.title": "Biaya & Budget Pelatihan",
    "budget.total_budget": "Total Budget",
    "budget.spent": "Terpakai",
    "budget.remaining": "Sisa",
    "budget.by_division": "Per Divisi",

    // Surat Tugas
    "surat_tugas.title": "Kelola Surat Tugas",
    "surat_tugas.number": "Nomor Surat",
    "surat_tugas.date": "Tanggal",
    "surat_tugas.employee": "Karyawan",
    "surat_tugas.training": "Pelatihan",
    "surat_tugas.status": "Status",
  },
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.pelatihan_saya": "My Training",
    "nav.katalog": "Training Catalog",
    "nav.sertifikat": "Certificate",
    "nav.pengajuan": "Training Request",
    "nav.tna": "TNA",
    "nav.persetujuan": "Approval",
    "nav.konten": "Manage Content",
    "nav.pengguna": "Manage Users",
    "nav.audit": "Audit Log",
    "nav.manajemen": "Management Dashboard",
    "nav.laporan": "Report",
    "nav.laporan_divisi": "Division Report",
    "nav.laporan_tim": "Team Report",
    "nav.laporan_konten": "Content Report",
    "nav.trainer": "Manage Trainer",
    "nav.pengaturan": "Settings",
    "nav.keluar": "Logout",
    "nav.budget": "Cost & Budget",
    "nav.surat_tugas": "Manage Assignment Letter",
    "nav.learning_menu": "Learning Menu",
    "nav.control_menu": "Control Menu",

    // Common
    "common.detail": "View Details",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.export": "Export",
    "common.action": "Action",
    "common.more_actions": "More Actions",
    "common.status": "Status",

    // Course Detail
    "course.learning_path": "Learning Path",
    "course.materials": "Training Materials",
    "course.assessment": "Training Assessment",
    "course.final_project": "Final Project",
    "course.duration": "Duration",
    "course.instructor": "Instructor",
    "course.participants": "Participants",

    // Budget
    "budget.title": "Training Cost & Budget",
    "budget.total_budget": "Total Budget",
    "budget.spent": "Spent",
    "budget.remaining": "Remaining",
    "budget.by_division": "By Division",

    // Surat Tugas
    "surat_tugas.title": "Manage Assignment Letter",
    "surat_tugas.number": "Letter Number",
    "surat_tugas.date": "Date",
    "surat_tugas.employee": "Employee",
    "surat_tugas.training": "Training",
    "surat_tugas.status": "Status",
  },
}

export function t(key: string, language: Language): string {
  return translations[language]?.[key] || key
}
