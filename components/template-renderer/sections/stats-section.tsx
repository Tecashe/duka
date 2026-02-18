import type { TemplateSection, StatsContent } from '@/lib/templates/types'

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

export function StatsSection({ section, colors }: SectionProps) {
  const { heading, stats } = section.content as StatsContent

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats?.map((stat, idx) => (
            <div
              key={idx}
              className="text-center space-y-2 px-4 py-6 rounded-2xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <div className="text-5xl font-extrabold text-white leading-none">
                {stat.value}
              </div>
              <div className="text-sm font-medium uppercase tracking-widest text-white opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}