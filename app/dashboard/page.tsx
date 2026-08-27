import { WelcomeSection } from "@/components/dashboard/welcome-section"
import { MandatoryTrainingChart } from "@/components/dashboard/mandatory-training-chart"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { InProgressCourses } from "@/components/dashboard/in-progress-courses"
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines"

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="sr-only">Dashboard Pyridam Learning</h1>
      {/* Welcome Section */}
      <WelcomeSection />

      {/* Stats Row: Training Chart + Stats Cards */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <MandatoryTrainingChart />
        </div>
        <div className="lg:col-span-2">
          <StatsCards />
        </div>
      </div>

      {/* In-Progress Courses */}
      <InProgressCourses />

      {/* Upcoming Deadlines */}
      <UpcomingDeadlines />
    </div>
  )
}
