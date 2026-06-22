import { useState, useEffect } from 'react'
import { LoaderCircleIcon } from 'lucide-react'

import { useCvQuery } from '#/hooks/query/cv'
import { useUpdateCvMutation } from '#/hooks/mutation/cv'
import { TypographyH3, TypographyMuted } from '#/components/atoms/typography'
import { Button } from '#/components/atoms/ui/button'
import { Input } from '#/components/atoms/ui/input'
import { Label } from '#/components/atoms/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/atoms/ui/select'
import { Card, CardContent } from '#/components/atoms/ui/card'
import { Separator } from '#/components/atoms/ui/separator'

interface LayoutConfig {
  template: string
  fontFamily: string
  fontSize: number
  pageSize: string
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  primaryColor: string
}

const DEFAULT_CONFIG: LayoutConfig = {
  template: 'classic',
  fontFamily: 'inter',
  fontSize: 11,
  pageSize: 'a4',
  marginTop: 20,
  marginRight: 20,
  marginBottom: 20,
  marginLeft: 20,
  primaryColor: '#000000',
}

const FONT_OPTIONS = [
  { value: 'inter', label: 'Inter' },
  { value: 'sans-serif', label: 'Sans-serif' },
  { value: 'serif', label: 'Serif' },
  { value: 'monospace', label: 'Monospace' },
] as const

const PAGE_SIZE_OPTIONS = [
  { value: 'a4', label: 'A4' },
  { value: 'letter', label: 'Letter' },
] as const

const COLOR_OPTIONS = [
  { value: '#000000', label: 'Black' },
  { value: '#1e40af', label: 'Blue' },
  { value: '#166534', label: 'Green' },
  { value: '#991b1b', label: 'Red' },
  { value: '#6b21a8', label: 'Purple' },
  { value: '#9a3412', label: 'Orange' },
] as const

interface CvSettingsPageProps {
  cvId: string
}

function CvSettingsPage({ cvId }: CvSettingsPageProps) {
  const { data: cv, isPending } = useCvQuery(cvId)
  const updateCvMutation = useUpdateCvMutation(cvId)
  const [config, setConfig] = useState<LayoutConfig>(DEFAULT_CONFIG)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (cv?.config && typeof cv.config === 'object') {
      setConfig({ ...DEFAULT_CONFIG, ...(cv.config as Partial<LayoutConfig>) })
    }
  }, [cv?.config])

  function updateField<TField extends keyof LayoutConfig>(
    key: TField,
    value: LayoutConfig[TField],
  ) {
    setConfig((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    await updateCvMutation.mutateAsync({ config })
    setSaved(true)
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderCircleIcon className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <TypographyH3>Layout Settings</TypographyH3>
      <TypographyMuted>
        Customize how your CV looks when exported to PDF.
      </TypographyMuted>

      <Separator />

      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-1">
              <Label>Template</Label>
              <TypographyMuted className="text-xs">
                Choose a layout template for your CV
              </TypographyMuted>
            </div>
            <Select
              value={config.template}
              onValueChange={(v) => updateField('template', v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-1">
              <Label>Font</Label>
              <TypographyMuted className="text-xs">
                Choose font family and size
              </TypographyMuted>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Font family</Label>
                <Select
                  value={config.fontFamily}
                  onValueChange={(v) => updateField('fontFamily', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Font size</Label>
                <Input
                  type="number"
                  min={8}
                  max={16}
                  value={config.fontSize}
                  onChange={(e) =>
                    updateField('fontSize', Number(e.target.value))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-1">
              <Label>Page</Label>
              <TypographyMuted className="text-xs">
                Choose page size and margins
              </TypographyMuted>
            </div>
            <div className="space-y-2">
              <Label>Page size</Label>
              <Select
                value={config.pageSize}
                onValueChange={(v) => updateField('pageSize', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-4">
              {(['top', 'right', 'bottom', 'left'] as const).map((pos) => (
                <div key={pos} className="space-y-2">
                  <Label className="capitalize">Margin {pos}</Label>
                  <Input
                    type="number"
                    min={0}
                    max={50}
                    value={
                      config[
                        `margin${pos.charAt(0).toUpperCase() + pos.slice(1)}` as keyof LayoutConfig
                      ]
                    }
                    onChange={(e) =>
                      updateField(
                        `margin${pos.charAt(0).toUpperCase() + pos.slice(1)}` as keyof LayoutConfig,
                        Number(e.target.value),
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-1">
              <Label>Primary color</Label>
              <TypographyMuted className="text-xs">
                Choose the accent color for your CV
              </TypographyMuted>
            </div>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField('primaryColor', opt.value)}
                  className={`size-8 rounded-full border-2 transition-all ${
                    config.primaryColor === opt.value
                      ? 'scale-110 border-foreground'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: opt.value }}
                  title={opt.label}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={updateCvMutation.isPending}>
          {updateCvMutation.isPending ? (
            <LoaderCircleIcon className="size-4 animate-spin" />
          ) : null}
          Save Settings
        </Button>
        {saved && (
          <TypographyMuted className="text-sm text-green-600">
            Settings saved successfully
          </TypographyMuted>
        )}
      </div>
    </div>
  )
}

export { CvSettingsPage }
