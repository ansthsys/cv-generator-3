import { createFileRoute } from '@tanstack/react-router'
import { SkillPage } from '#/components/pages/cv-edit/SkillPage'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit/skill')({
  component: SkillPage,
})
