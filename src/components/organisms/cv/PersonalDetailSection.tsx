import { PersonalDetailForm } from './PersonalDetailForm'

interface PersonalDetailSectionProps {
  cvId: string
}

function PersonalDetailSection({ cvId }: PersonalDetailSectionProps) {
  return <PersonalDetailForm cvId={cvId} />
}

export { PersonalDetailSection }
