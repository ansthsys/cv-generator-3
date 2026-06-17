import { useParams } from '@tanstack/react-router'
import { useProjectsQuery } from '#/hooks/query/cv'
import { SectionPageTemplate } from '#/components/templates'
import { ProjectForm } from '#/components/organisms/cv/ProjectForm'

function ProjectPage() {
  const { cvId } = useParams({ from: '/(dashboard)/cv/$cvId/edit/project' })
  const { data: projects, isPending } = useProjectsQuery(cvId)

  return (
    <SectionPageTemplate
      title="Project"
      FormComponent={ProjectForm}
      formProps={{ cvId }}
      items={projects}
      isPending={isPending}
      emptyMessage="No projects added yet."
      addButtonLabel="Add Project"
    />
  )
}

export { ProjectPage }
