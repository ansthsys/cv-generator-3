import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '#/lib/tanstack-query/keys'
import * as cvServer from '#/lib/server/cv'
import * as experienceServer from '#/lib/server/experience'
import * as educationServer from '#/lib/server/education'
import * as skillServer from '#/lib/server/skill'
import * as projectServer from '#/lib/server/project'
import * as certificateServer from '#/lib/server/certificate'
import * as awardServer from '#/lib/server/award'
import * as organizationServer from '#/lib/server/organization'
import * as socialLinkServer from '#/lib/server/social-link'

export function useCvListQuery() {
  return useQuery({
    queryKey: queryKeys.cv.lists,
    queryFn: () => cvServer.listCvs(),
  })
}

export function useCvQuery(cvId: string) {
  return useQuery({
    queryKey: queryKeys.cv.detail(cvId),
    queryFn: () => cvServer.getCv({ data: cvId }),
    enabled: !!cvId,
  })
}

export function usePersonalDetailQuery(cvId: string) {
  return useQuery({
    queryKey: queryKeys.cv.personalDetail(cvId),
    queryFn: () => cvServer.getPersonalDetail({ data: cvId }),
    enabled: !!cvId,
  })
}

export function useExperiencesQuery(cvId: string) {
  return useQuery({
    queryKey: queryKeys.cv.experience.all(cvId),
    queryFn: () => experienceServer.listExperiences({ data: cvId }),
    enabled: !!cvId,
  })
}

export function useEducationsQuery(cvId: string) {
  return useQuery({
    queryKey: queryKeys.cv.education.all(cvId),
    queryFn: () => educationServer.listEducations({ data: cvId }),
    enabled: !!cvId,
  })
}

export function useSkillsQuery(cvId: string) {
  return useQuery({
    queryKey: queryKeys.cv.skill.all(cvId),
    queryFn: () => skillServer.listSkills({ data: cvId }),
    enabled: !!cvId,
  })
}

export function useProjectsQuery(cvId: string) {
  return useQuery({
    queryKey: queryKeys.cv.project.all(cvId),
    queryFn: () => projectServer.listProjects({ data: cvId }),
    enabled: !!cvId,
  })
}

export function useCertificatesQuery(cvId: string) {
  return useQuery({
    queryKey: queryKeys.cv.certificate.all(cvId),
    queryFn: () => certificateServer.listCertificates({ data: cvId }),
    enabled: !!cvId,
  })
}

export function useAwardsQuery(cvId: string) {
  return useQuery({
    queryKey: queryKeys.cv.award.all(cvId),
    queryFn: () => awardServer.listAwards({ data: cvId }),
    enabled: !!cvId,
  })
}

export function useOrganizationsQuery(cvId: string) {
  return useQuery({
    queryKey: queryKeys.cv.organization.all(cvId),
    queryFn: () => organizationServer.listOrganizations({ data: cvId }),
    enabled: !!cvId,
  })
}

export function useSocialLinksQuery(cvId: string) {
  return useQuery({
    queryKey: queryKeys.cv.socialLink.all(cvId),
    queryFn: () => socialLinkServer.listSocialLinks({ data: cvId }),
    enabled: !!cvId,
  })
}
