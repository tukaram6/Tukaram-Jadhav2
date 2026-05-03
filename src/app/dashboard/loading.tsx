import { Skeleton } from "@/components/lb/skeleton"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLoading() {
  return (
    <div className="flex bg-slate-50/50 dark:bg-background">
      <Sidebar />
      <div className="flex-1 lg:pl-72">
        <div className="container p-6 md:p-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="space-y-3">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>

          <section className="mb-12">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
