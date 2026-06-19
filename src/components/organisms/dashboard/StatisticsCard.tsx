import { Card, CardHeader, CardContent } from '#/components/atoms/ui/card'
import { TypographyH4 } from '#/components/atoms/typography'

function StatisticsCard() {
  return (
    <Card variant="primary">
      <CardHeader>
        <TypographyH4 className="uppercase tracking-wider">
          Statistics
        </TypographyH4>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Chart coming soon.</p>
      </CardContent>
    </Card>
  )
}

export { StatisticsCard }
