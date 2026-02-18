import type { TemplateSection, SplitFormField } from '@/lib/templates/types'

interface SectionProps {
  section: TemplateSection
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted?: string
  }
}

export function FormSection({ section, colors }: SectionProps) {
  const { heading, fields, buttonText } = section.content as SplitFormField

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
      <div className="max-w-2xl mx-auto">
        {heading && (
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: colors.primary }}
          >
            {heading}
          </h2>
        )}
        <div className="space-y-4">
          {fields?.map((field) => (
            <div key={field} className="space-y-1">
              <label
                htmlFor={field}
                className="block text-sm font-medium capitalize"
                style={{ color: colors.text }}
              >
                {field}
              </label>
              {field === 'message' ? (
                <textarea
                  id={field}
                  name={field}
                  rows={5}
                  placeholder={`Your ${field}`}
                  className="w-full rounded-lg border px-4 py-3 text-base outline-none focus:ring-2 resize-none"
                  style={{
                    borderColor: `${colors.primary}40`,
                    color: colors.text,
                  }}
                />
              ) : (
                <input
                  id={field}
                  name={field}
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  placeholder={`Your ${field}`}
                  className="w-full rounded-lg border px-4 py-3 text-base outline-none focus:ring-2"
                  style={{
                    borderColor: `${colors.primary}40`,
                    color: colors.text,
                  }}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 mt-2"
            style={{ backgroundColor: colors.primary }}
          >
            {buttonText || 'Send Message'}
          </button>
        </div>
      </div>
    </section>
  )
}