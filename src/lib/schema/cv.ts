import { z } from 'zod'

export const createCvSchema = z.object({
  name: z.string().min(1, 'CV name is required').max(100),
})

export type CreateCvSchema = z.infer<typeof createCvSchema>

export const personalDetailSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.email('Invalid email'),
  photoUrl: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
})

export type PersonalDetailSchema = z.infer<typeof personalDetailSchema>

export const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  type: z.string().min(1, 'Type is required'),
  startDate: z.string().date('Invalid date'),
  endDate: z.string().date('Invalid date').optional().nullable(),
  isCurrent: z.boolean(),
  description: z.string().optional().nullable(),
})

export type ExperienceSchema = z.infer<typeof experienceSchema>

export const educationSchema = z.object({
  level: z.string().min(1, 'Level is required'),
  institution: z.string().min(1, 'Institution is required'),
  fieldOfStudy: z.string().optional().nullable(),
  gpa: z.coerce.number().min(0).max(4).optional().nullable(),
  startDate: z.string().date('Invalid date'),
  endDate: z.string().date('Invalid date').optional().nullable(),
  isCurrent: z.boolean(),
  description: z.string().optional().nullable(),
})

export type EducationSchema = z.infer<typeof educationSchema>

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  level: z.string().optional().nullable(),
})

export type SkillSchema = z.infer<typeof skillSchema>

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  url: z.string().url('Invalid URL').optional().nullable(),
  startDate: z.string().date('Invalid date'),
  endDate: z.string().date('Invalid date').optional().nullable(),
  isCurrent: z.boolean(),
  description: z.string().optional().nullable(),
})

export type ProjectSchema = z.infer<typeof projectSchema>

export const certificateSchema = z.object({
  name: z.string().min(1, 'Certificate name is required'),
  organization: z.string().min(1, 'Organization is required'),
  date: z.string().date('Invalid date'),
  description: z.string().optional().nullable(),
})

export type CertificateSchema = z.infer<typeof certificateSchema>

export const awardSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  organization: z.string().min(1, 'Organization is required'),
  date: z.string().date('Invalid date'),
  description: z.string().optional().nullable(),
})

export type AwardSchema = z.infer<typeof awardSchema>

export const organizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  role: z.string().min(1, 'Role is required'),
  startDate: z.string().date('Invalid date'),
  endDate: z.string().date('Invalid date').optional().nullable(),
  isCurrent: z.boolean(),
  description: z.string().optional().nullable(),
})

export type OrganizationSchema = z.infer<typeof organizationSchema>

export const socialLinkSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  url: z.string().url('Invalid URL'),
})

export type SocialLinkSchema = z.infer<typeof socialLinkSchema>
