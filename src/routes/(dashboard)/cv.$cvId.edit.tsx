import { useState } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoaderCircleIcon } from 'lucide-react'
import { useSessionQuery } from '#/hooks/query/auth'
import {
  useCvQuery,
  usePersonalDetailQuery,
  useExperiencesQuery,
  useEducationsQuery,
  useSkillsQuery,
  useProjectsQuery,
  useCertificatesQuery,
  useAwardsQuery,
  useOrganizationsQuery,
  useSocialLinksQuery,
} from '#/hooks/query/cv'
import {
  useUpsertPersonalDetailMutation,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useCreateEducationMutation,
  useDeleteEducationMutation,
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useDeleteProjectMutation,
  useDeleteCertificateMutation,
  useDeleteAwardMutation,
  useDeleteOrganizationMutation,
  useDeleteSocialLinkMutation,
} from '#/hooks/mutation/cv'
import { TypographyH2, TypographyMuted } from '#/components/atoms/typography'
import { Button } from '#/components/atoms/ui/button'
import { LoadingButton } from '#/components/atoms/common/LoadingButton'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit')({
  component: CvEditorPage,
  beforeLoad: async ({ context }) => {
    const session = context.session
    if (!session) {
      throw redirect({ to: '/login' })
    }
  },
})

function CvEditorPage() {
  const { cvId } = Route.useParams()
  const { data: session, isPending: sessionPending } = useSessionQuery()
  const { data: cv, isPending: cvPending } = useCvQuery(cvId)

  if (sessionPending || cvPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircleIcon className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!cv) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <TypographyMuted>CV not found</TypographyMuted>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <header className="mb-8">
        <TypographyH2>{cv.name}</TypographyH2>
        <TypographyMuted>Edit your CV sections below</TypographyMuted>
      </header>

      <div className="space-y-8">
        <section className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-semibold">Personal Detail</h3>
          <PersonalDetailSection cvId={cvId} />
        </section>

        <section className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-semibold">Experience</h3>
          <ExperienceSection cvId={cvId} />
        </section>

        <section className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-semibold">Education</h3>
          <EducationSection cvId={cvId} />
        </section>

        <section className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-semibold">Skills</h3>
          <SkillSection cvId={cvId} />
        </section>

        <section className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-semibold">Projects</h3>
          <ProjectSection cvId={cvId} />
        </section>

        <section className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-semibold">Certificates</h3>
          <CertificateSection cvId={cvId} />
        </section>

        <section className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-semibold">Awards</h3>
          <AwardSection cvId={cvId} />
        </section>

        <section className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-semibold">Organizations</h3>
          <OrganizationSection cvId={cvId} />
        </section>

        <section className="rounded-lg border p-4">
          <h3 className="mb-4 text-lg font-semibold">Social Links</h3>
          <SocialLinkSection cvId={cvId} />
        </section>
      </div>
    </div>
  )
}

function PersonalDetailSection({ cvId }: { cvId: string }) {
  const { data: personalDetail, isPending } = usePersonalDetailQuery(cvId)
  const upsertMutation = useUpsertPersonalDetailMutation(cvId)

  const [form, setForm] = useState({
    fullName: personalDetail?.fullName ?? '',
    phone: personalDetail?.phone ?? '',
    email: personalDetail?.email ?? '',
    photoUrl: personalDetail?.photoUrl ?? '',
    city: personalDetail?.city ?? '',
    summary: personalDetail?.summary ?? '',
  })

  if (isPending) return <LoaderCircleIcon className="size-4 animate-spin" />

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        upsertMutation.mutate(form)
      }}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">Full Name</label>
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="w-full rounded-md border px-3 py-1.5 text-sm"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Phone</label>
        <input
          type="text"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-md border px-3 py-1.5 text-sm"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-md border px-3 py-1.5 text-sm"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Photo URL</label>
        <input
          type="text"
          value={form.photoUrl}
          onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
          className="w-full rounded-md border px-3 py-1.5 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">City</label>
        <input
          type="text"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full rounded-md border px-3 py-1.5 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Summary</label>
        <textarea
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="w-full rounded-md border px-3 py-1.5 text-sm"
          rows={3}
        />
      </div>
      <LoadingButton
        type="submit"
        isLoading={upsertMutation.isPending}
        loadingText="Saving..."
      >
        Save
      </LoadingButton>
    </form>
  )
}

function getDefaultExperience() {
  return {
    title: '',
    company: '',
    type: 'PENUH_WAKTU',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
  }
}

function ExperienceSection({ cvId }: { cvId: string }) {
  const { data: experiences, isPending } = useExperiencesQuery(cvId)
  const createMutation = useCreateExperienceMutation(cvId)
  const updateMutation = useUpdateExperienceMutation(cvId)
  const deleteMutation = useDeleteExperienceMutation(cvId)
  const [newItem, setNewItem] = useState(getDefaultExperience)
  const [editing, setEditing] = useState<string | null>(null)
  const [editForm, setEditForm] = useState(getDefaultExperience)

  if (isPending) return <LoaderCircleIcon className="size-4 animate-spin" />

  return (
    <div className="space-y-4">
      {experiences && experiences.length > 0 ? (
        <div className="space-y-2">
          {experiences.map((exp) => (
            <div key={exp.id} className="rounded border p-3 text-sm">
              {editing === exp.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="w-full rounded border px-2 py-1 text-sm"
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(e) =>
                      setEditForm({ ...editForm, company: e.target.value })
                    }
                    className="w-full rounded border px-2 py-1 text-sm"
                    placeholder="Company"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        updateMutation.mutate({ id: exp.id, ...editForm })
                        setEditing(null)
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{exp.title}</span>
                    <span className="text-muted-foreground">
                      {' '}
                      at {exp.company}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditForm({
                          title: exp.title,
                          company: exp.company,
                          type: exp.type,
                          startDate: '',
                          endDate: '',
                          isCurrent: exp.isCurrent,
                          description: exp.description ?? '',
                        })
                        setEditing(exp.id)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteMutation.mutate(exp.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No experiences added yet.
        </p>
      )}

      <div className="space-y-2 rounded border p-3">
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Add Experience
        </p>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="rounded border px-2 py-1 text-sm"
            placeholder="Title"
          />
          <input
            type="text"
            value={newItem.company}
            onChange={(e) =>
              setNewItem({ ...newItem, company: e.target.value })
            }
            className="rounded border px-2 py-1 text-sm"
            placeholder="Company"
          />
          <select
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            className="rounded border px-2 py-1 text-sm"
          >
            <option value="PENUH_WAKTU">Full Time</option>
            <option value="PARUH_WAKTU">Part Time</option>
            <option value="KONTRAK">Contract</option>
            <option value="PEKERJA_LEPAS">Freelance</option>
            <option value="MAGANG">Internship</option>
          </select>
          <input
            type="date"
            value={newItem.startDate}
            onChange={(e) =>
              setNewItem({ ...newItem, startDate: e.target.value })
            }
            className="rounded border px-2 py-1 text-sm"
          />
        </div>
        <LoadingButton
          size="sm"
          onClick={() => {
            createMutation.mutate(newItem)
            setNewItem(getDefaultExperience())
          }}
          isLoading={createMutation.isPending}
          loadingText="Adding..."
        >
          Add
        </LoadingButton>
      </div>
    </div>
  )
}

function getDefaultEducation() {
  return {
    level: 'S1',
    institution: '',
    fieldOfStudy: '',
    gpa: null as number | null,
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
  }
}

function EducationSection({ cvId }: { cvId: string }) {
  const { data: educations, isPending } = useEducationsQuery(cvId)
  const createMutation = useCreateEducationMutation(cvId)
  const deleteMutation = useDeleteEducationMutation(cvId)
  const [newItem, setNewItem] = useState(getDefaultEducation)

  if (isPending) return <LoaderCircleIcon className="size-4 animate-spin" />

  return (
    <div className="space-y-4">
      {educations && educations.length > 0 ? (
        <div className="space-y-2">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="flex items-center justify-between rounded border p-3 text-sm"
            >
              <div>
                <span className="font-medium">{edu.level}</span>
                <span className="text-muted-foreground">
                  {' '}
                  - {edu.institution}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteMutation.mutate(edu.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No education added yet.</p>
      )}

      <div className="space-y-2 rounded border p-3">
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Add Education
        </p>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={newItem.level}
            onChange={(e) => setNewItem({ ...newItem, level: e.target.value })}
            className="rounded border px-2 py-1 text-sm"
          >
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
            <option value="SMK">SMK</option>
            <option value="D3">D3</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>
          <input
            type="text"
            value={newItem.institution}
            onChange={(e) =>
              setNewItem({ ...newItem, institution: e.target.value })
            }
            className="rounded border px-2 py-1 text-sm"
            placeholder="Institution"
          />
          <input
            type="text"
            value={newItem.fieldOfStudy}
            onChange={(e) =>
              setNewItem({ ...newItem, fieldOfStudy: e.target.value })
            }
            className="rounded border px-2 py-1 text-sm"
            placeholder="Field of study"
          />
          <input
            type="date"
            value={newItem.startDate}
            onChange={(e) =>
              setNewItem({ ...newItem, startDate: e.target.value })
            }
            className="rounded border px-2 py-1 text-sm"
          />
        </div>
        <LoadingButton
          size="sm"
          onClick={() => {
            createMutation.mutate(newItem)
            setNewItem(getDefaultEducation())
          }}
          isLoading={createMutation.isPending}
          loadingText="Adding..."
        >
          Add
        </LoadingButton>
      </div>
    </div>
  )
}

function SkillSection({ cvId }: { cvId: string }) {
  const { data: skills, isPending } = useSkillsQuery(cvId)
  const createMutation = useCreateSkillMutation(cvId)
  const deleteMutation = useDeleteSkillMutation(cvId)
  const [name, setName] = useState('')
  const [level, setLevel] = useState('')

  if (isPending) return <LoaderCircleIcon className="size-4 animate-spin" />

  return (
    <div className="space-y-4">
      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
            >
              <span>
                {skill.name}
                {skill.level ? ` (${skill.level})` : ''}
              </span>
              <button
                onClick={() => deleteMutation.mutate(skill.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No skills added yet.</p>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border px-2 py-1 text-sm"
          placeholder="Skill name"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded border px-2 py-1 text-sm"
        >
          <option value="">No level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
        <LoadingButton
          size="sm"
          onClick={() => {
            if (name.trim()) {
              createMutation.mutate({ name: name.trim(), level: level || null })
              setName('')
              setLevel('')
            }
          }}
          isLoading={createMutation.isPending}
          loadingText="Adding..."
        >
          Add
        </LoadingButton>
      </div>
    </div>
  )
}

function ProjectSection({ cvId }: { cvId: string }) {
  const { data: projects, isPending } = useProjectsQuery(cvId)
  const deleteMutation = useDeleteProjectMutation(cvId)

  if (isPending) return <LoaderCircleIcon className="size-4 animate-spin" />

  return (
    <div className="space-y-4">
      {projects && projects.length > 0 ? (
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded border p-3 text-sm"
            >
              <span className="font-medium">{project.name}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteMutation.mutate(project.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No projects added yet.</p>
      )}
    </div>
  )
}

function CertificateSection({ cvId }: { cvId: string }) {
  const { data: certificates, isPending } = useCertificatesQuery(cvId)
  const deleteMutation = useDeleteCertificateMutation(cvId)

  if (isPending) return <LoaderCircleIcon className="size-4 animate-spin" />

  return (
    <div className="space-y-4">
      {certificates && certificates.length > 0 ? (
        <div className="space-y-2">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between rounded border p-3 text-sm"
            >
              <span className="font-medium">{cert.name}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteMutation.mutate(cert.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No certificates added yet.
        </p>
      )}
    </div>
  )
}

function AwardSection({ cvId }: { cvId: string }) {
  const { data: awards, isPending } = useAwardsQuery(cvId)
  const deleteMutation = useDeleteAwardMutation(cvId)

  if (isPending) return <LoaderCircleIcon className="size-4 animate-spin" />

  return (
    <div className="space-y-4">
      {awards && awards.length > 0 ? (
        <div className="space-y-2">
          {awards.map((award) => (
            <div
              key={award.id}
              className="flex items-center justify-between rounded border p-3 text-sm"
            >
              <span className="font-medium">{award.title}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteMutation.mutate(award.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No awards added yet.</p>
      )}
    </div>
  )
}

function OrganizationSection({ cvId }: { cvId: string }) {
  const { data: organizations, isPending } = useOrganizationsQuery(cvId)
  const deleteMutation = useDeleteOrganizationMutation(cvId)

  if (isPending) return <LoaderCircleIcon className="size-4 animate-spin" />

  return (
    <div className="space-y-4">
      {organizations && organizations.length > 0 ? (
        <div className="space-y-2">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="flex items-center justify-between rounded border p-3 text-sm"
            >
              <span className="font-medium">{org.name}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteMutation.mutate(org.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No organizations added yet.
        </p>
      )}
    </div>
  )
}

function SocialLinkSection({ cvId }: { cvId: string }) {
  const { data: socialLinks, isPending } = useSocialLinksQuery(cvId)
  const deleteMutation = useDeleteSocialLinkMutation(cvId)

  if (isPending) return <LoaderCircleIcon className="size-4 animate-spin" />

  return (
    <div className="space-y-4">
      {socialLinks && socialLinks.length > 0 ? (
        <div className="space-y-2">
          {socialLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between rounded border p-3 text-sm"
            >
              <span className="font-medium">{link.label}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteMutation.mutate(link.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No social links added yet.
        </p>
      )}
    </div>
  )
}
