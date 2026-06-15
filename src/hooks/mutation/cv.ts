import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys, mutationKeys } from '#/lib/tanstack-query/keys'
import * as cvServer from '#/lib/server/cv'
import * as experienceServer from '#/lib/server/experience'
import * as educationServer from '#/lib/server/education'
import * as skillServer from '#/lib/server/skill'
import * as projectServer from '#/lib/server/project'
import * as certificateServer from '#/lib/server/certificate'
import * as awardServer from '#/lib/server/award'
import * as organizationServer from '#/lib/server/organization'
import * as socialLinkServer from '#/lib/server/social-link'
import type {
  CreateCvSchema,
  ExperienceSchema,
  EducationSchema,
  SkillSchema,
  ProjectSchema,
  CertificateSchema,
  AwardSchema,
  OrganizationSchema,
  SocialLinkSchema,
} from '#/lib/schema/cv'

export function useCreateCvMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.create,
    mutationFn: async (values: CreateCvSchema) => {
      const cv = await cvServer.createCv({ data: values })
      return cv
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.lists })
    },
  })
}

export function useUpdateCvMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.update(cvId),
    mutationFn: async (values: { name?: string; isPublic?: boolean }) => {
      const cv = await cvServer.updateCv({ data: { id: cvId, ...values } })
      return cv
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.detail(cvId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.lists })
    },
  })
}

export function useDeleteCvMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => cvServer.deleteCv({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.lists })
    },
  })
}

export function useUpsertPersonalDetailMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.personalDetail.upsert(cvId),
    mutationFn: async (values: {
      fullName: string
      phone: string
      email: string
      photoUrl?: string | null
      city?: string | null
      summary?: string | null
    }) => {
      const result = await cvServer.upsertPersonalDetail({
        data: { cvId, ...values },
      })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.personalDetail(cvId),
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.detail(cvId) })
    },
  })
}

export function useCreateExperienceMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.experience.create(cvId),
    mutationFn: async (values: ExperienceSchema) => {
      const result = await experienceServer.createExperience({
        data: { cvId, ...values },
      })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.experience.all(cvId),
      })
    },
  })
}

export function useUpdateExperienceMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: { id: string } & Partial<ExperienceSchema>) => {
      const result = await experienceServer.updateExperience({ data: values })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.experience.all(cvId),
      })
    },
  })
}

export function useDeleteExperienceMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => experienceServer.deleteExperience({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.experience.all(cvId),
      })
    },
  })
}

export function useCreateEducationMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.education.create(cvId),
    mutationFn: async (values: EducationSchema) => {
      const result = await educationServer.createEducation({
        data: { cvId, ...values },
      })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.education.all(cvId),
      })
    },
  })
}

export function useUpdateEducationMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: { id: string } & Partial<EducationSchema>) => {
      const result = await educationServer.updateEducation({ data: values })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.education.all(cvId),
      })
    },
  })
}

export function useDeleteEducationMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => educationServer.deleteEducation({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.education.all(cvId),
      })
    },
  })
}

export function useCreateSkillMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.skill.create(cvId),
    mutationFn: async (values: SkillSchema) => {
      const result = await skillServer.createSkill({
        data: { cvId, ...values },
      })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.skill.all(cvId) })
    },
  })
}

export function useUpdateSkillMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: { id: string } & Partial<SkillSchema>) => {
      const result = await skillServer.updateSkill({ data: values })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.skill.all(cvId) })
    },
  })
}

export function useDeleteSkillMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => skillServer.deleteSkill({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.skill.all(cvId) })
    },
  })
}

export function useCreateProjectMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.project.create(cvId),
    mutationFn: async (values: ProjectSchema) => {
      const result = await projectServer.createProject({
        data: { cvId, ...values },
      })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.project.all(cvId),
      })
    },
  })
}

export function useUpdateProjectMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: { id: string } & Partial<ProjectSchema>) => {
      const result = await projectServer.updateProject({ data: values })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.project.all(cvId),
      })
    },
  })
}

export function useDeleteProjectMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => projectServer.deleteProject({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.project.all(cvId),
      })
    },
  })
}

export function useCreateCertificateMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.certificate.create(cvId),
    mutationFn: async (values: CertificateSchema) => {
      const result = await certificateServer.createCertificate({
        data: { cvId, ...values },
      })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.certificate.all(cvId),
      })
    },
  })
}

export function useUpdateCertificateMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: { id: string } & Partial<CertificateSchema>) => {
      const result = await certificateServer.updateCertificate({ data: values })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.certificate.all(cvId),
      })
    },
  })
}

export function useDeleteCertificateMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      certificateServer.deleteCertificate({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.certificate.all(cvId),
      })
    },
  })
}

export function useCreateAwardMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.award.create(cvId),
    mutationFn: async (values: AwardSchema) => {
      const result = await awardServer.createAward({
        data: { cvId, ...values },
      })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.award.all(cvId) })
    },
  })
}

export function useUpdateAwardMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: { id: string } & Partial<AwardSchema>) => {
      const result = await awardServer.updateAward({ data: values })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.award.all(cvId) })
    },
  })
}

export function useDeleteAwardMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => awardServer.deleteAward({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cv.award.all(cvId) })
    },
  })
}

export function useCreateOrganizationMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.organization.create(cvId),
    mutationFn: async (values: OrganizationSchema) => {
      const result = await organizationServer.createOrganization({
        data: { cvId, ...values },
      })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.organization.all(cvId),
      })
    },
  })
}

export function useUpdateOrganizationMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      values: { id: string } & Partial<OrganizationSchema>,
    ) => {
      const result = await organizationServer.updateOrganization({
        data: values,
      })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.organization.all(cvId),
      })
    },
  })
}

export function useDeleteOrganizationMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      organizationServer.deleteOrganization({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.organization.all(cvId),
      })
    },
  })
}

export function useCreateSocialLinkMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.cv.socialLink.create(cvId),
    mutationFn: async (values: SocialLinkSchema) => {
      const result = await socialLinkServer.createSocialLink({
        data: { cvId, ...values },
      })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.socialLink.all(cvId),
      })
    },
  })
}

export function useUpdateSocialLinkMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: { id: string } & Partial<SocialLinkSchema>) => {
      const result = await socialLinkServer.updateSocialLink({ data: values })
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.socialLink.all(cvId),
      })
    },
  })
}

export function useDeleteSocialLinkMutation(cvId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => socialLinkServer.deleteSocialLink({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.cv.socialLink.all(cvId),
      })
    },
  })
}
