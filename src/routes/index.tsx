import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'

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
import {
  FieldInput,
  FieldTextarea,
  FieldSelect,
  FieldCheckbox,
  FieldRadioGroup,
} from '#/components/molecules/form-field'

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

const formSchema = z.object({
  name: z.string().min(3, 'Minimal 3 karakter'),
  bio: z
    .string()
    .min(10, 'Minimal 10 karakter')
    .max(200, 'Maksimal 200 karakter'),
  gender: z.string().min(1, 'Pilih gender'),
  skills: z.array(z.string()).min(1, 'Pilih minimal 1 skill'),
  plan: z.string().min(1, 'Pilih plan'),
})

function Home() {
  const form = useForm({
    defaultValues: {
      name: '',
      bio: '',
      gender: '',
      skills: [] as string[],
      plan: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <div className="mx-auto max-w-sm p-4">
      <section className="space-y-4">
        <TypographyH1>CV Generator 3</TypographyH1>
        <TypographyLead>Build your professional CV with ease</TypographyLead>
        <TypographyP>
          A modern CV builder built with TanStack Start, React 19, and Tailwind
          CSS v4.
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
          <form.Field
            name="name"
            validators={{ onChange: z.string().min(3, 'Minimal 3 karakter') }}
          >
            {(field) => (
              <FieldInput
                title="Nama Lengkap"
                description={
                  'Lorem ipsum dolor sit amet, esse amet sunt consectetur ipsum sint do aute exercitation ut. Consectetur quis nostrud anim reprehenderit dolor sit quis eiusmod aliqua laboris enim consectetur reprehenderit velit duis laborum sit anim. Esse consequat pariatur consequat ut tempor eu dolore elit nostrud excepteur mollit cupidatat minim nulla dolore minim dolor sit.'
                }
                placeholder="John Doe"
                error={field.state.meta.errors[0]?.message}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            )}
          </form.Field>

          <form.Field
            name="bio"
            validators={{ onChange: z.string().min(10, 'Minimal 10 karakter') }}
          >
            {(field) => (
              <FieldTextarea
                title="Bio"
                placeholder="Tell us about yourself..."
                error={field.state.meta.errors[0]?.message}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                rows={4}
              />
            )}
          </form.Field>

          <form.Field
            name="gender"
            validators={{ onChange: z.string().min(1, 'Pilih gender') }}
          >
            {(field) => (
              <FieldSelect
                title="Gender"
                placeholder="Pilih"
                error={field.state.meta.errors[0]?.message}
                value={field.state.value}
                onValueChange={field.handleChange}
                options={[
                  { value: 'L', label: 'Laki-laki' },
                  { value: 'P', label: 'Perempuan' },
                ]}
              />
            )}
          </form.Field>

          <form.Field name="skills" mode="array">
            {(field) => (
              <FieldCheckbox
                title="Skills"
                description="Pilih minimal 1"
                error={field.state.meta.errors[0]?.message}
                checked={field.state.value.length > 0}
                onCheckedChange={(checked) => {
                  if (checked) {
                    field.pushValue(skillOptions[0].value)
                  }
                }}
                options={skillOptions}
              />
            )}
          </form.Field>

          <form.Field
            name="plan"
            validators={{ onChange: z.string().min(1, 'Pilih plan') }}
          >
            {(field) => (
              <FieldRadioGroup
                title="Subscription Plan"
                error={field.state.meta.errors[0]?.message}
                value={field.state.value}
                onValueChange={field.handleChange}
                options={planOptions}
              />
            )}
          </form.Field>

          <button
            type="submit"
            className="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}
