import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'

import { AppLayout } from '#/components/templates/AppLayout'
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyCode,
  TypographyUl,
  TypographyOl,
  TypographyLi,
} from '#/components/atoms/typography'
import { useAppForm } from '#/hooks/useAppForm'

export const Route = createFileRoute('/')({ component: Home })

const skillOptions = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'node', label: 'Node.js' },
]

const planOptions = [
  { value: 'basic', label: 'Basic' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
]

function Home() {
  const form = useAppForm({
    defaultValues: {
      name: '',
      bio: '',
      gender: '',
      skills: [] as string[],
      plan: '',
    },
    validators: {
      onChange: z.object({
        name: z.string().min(3, 'At least 3 characters'),
        bio: z
          .string()
          .min(10, 'At least 10 characters')
          .max(200, 'At most 200 characters'),
        gender: z.string().min(1, 'Select a gender'),
        skills: z.array(z.string()).min(1, 'Select at least 1 skill'),
        plan: z.string().min(1, 'Select a plan'),
      }),
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <AppLayout>
      <div className="mx-auto max-w-sm">
        <section className="space-y-4">
          <TypographyH1>CV Generator 3</TypographyH1>
          <TypographyLead>Build your professional CV with ease</TypographyLead>
          <TypographyP>
            A modern CV builder built with TanStack Start, React 19, and
            Tailwind CSS v4.
          </TypographyP>

          <TypographyH2>Typography Scale</TypographyH2>
          <TypographyH1>Heading 1</TypographyH1>
          <TypographyH2>Heading 2</TypographyH2>
          <TypographyH3>Heading 3</TypographyH3>
          <TypographyH4>Heading 4</TypographyH4>
          <TypographyLarge>Large text</TypographyLarge>
          <TypographyP>
            Paragraph text — the quick brown fox jumps over the lazy dog.
          </TypographyP>
          <TypographySmall>Small text</TypographySmall>
          <TypographyMuted>Muted text</TypographyMuted>
          <TypographyBlockquote>
            This is a blockquote. It stands out from regular text.
          </TypographyBlockquote>
          <TypographyP>
            Inline code: <TypographyCode>const x = 1</TypographyCode>
          </TypographyP>
          <TypographyH3>Unordered List</TypographyH3>
          <TypographyUl>
            <TypographyLi>First item</TypographyLi>
            <TypographyLi>Second item</TypographyLi>
            <TypographyLi>Third item</TypographyLi>
          </TypographyUl>
          <TypographyH3>Ordered List</TypographyH3>
          <TypographyOl>
            <TypographyLi>Step one</TypographyLi>
            <TypographyLi>Step two</TypographyLi>
            <TypographyLi>Step three</TypographyLi>
          </TypographyOl>
        </section>

        <hr className="my-8" />

        <section className="space-y-6">
          <TypographyH2>Demo Form</TypographyH2>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="space-y-4"
          >
            <form.AppField name="name">
              {(field: any) => (
                <field.FieldInput
                  label="Nama Lengkap"
                  description="Lorem ipsum dolor sit amet, esse amet sunt consectetur ipsum sint do aute exercitation ut."
                  placeholder="John Doe"
                />
              )}
            </form.AppField>

            <form.AppField name="bio">
              {(field: any) => (
                <field.FieldTextarea
                  label="Bio"
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              )}
            </form.AppField>

            <form.AppField name="gender">
              {(field: any) => (
                <field.FieldSelect
                  label="Gender"
                  placeholder="Pilih"
                  options={[
                    { value: 'L', label: 'Laki-laki' },
                    { value: 'P', label: 'Perempuan' },
                  ]}
                />
              )}
            </form.AppField>

            <form.AppField name="skills">
              {(field: any) => (
                <field.FieldCheckbox
                  label="Skills"
                  description="Pilih minimal 1"
                  options={skillOptions}
                />
              )}
            </form.AppField>

            <form.AppField name="plan">
              {(field: any) => (
                <field.FieldRadioGroup
                  label="Subscription Plan"
                  options={planOptions}
                />
              )}
            </form.AppField>

            <form.AppForm>
              <form.SubscribeButton label="Submit" />
            </form.AppForm>
          </form>
        </section>
      </div>
    </AppLayout>
  )
}
