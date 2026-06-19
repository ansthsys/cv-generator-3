import { TypographyH3 } from '#/components/atoms/typography'
import { CvListCard } from '#/components/organisms/cv/CvListCard'
import { StatisticsCard } from '#/components/organisms/dashboard/StatisticsCard'

function DashboardPage() {
  return (
    <div className="space-y-8">
      <TypographyH3>Dashboard</TypographyH3>

      <div className="mt-6 space-y-5">
        <CvListCard />
        <StatisticsCard />
      </div>
    </div>
  )
}

export { DashboardPage }
