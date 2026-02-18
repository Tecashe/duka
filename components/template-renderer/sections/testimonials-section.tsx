import type { TemplateSection, TestimonialsContent } from '@/lib/templates/types'
import Image from 'next/image'

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

export function TestimonialsSection({ section, colors }: SectionProps) {
  const { heading, items } = section.content as TestimonialsContent

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.secondary + '18' }}>
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: colors.text }}
          >
            {heading}
          </h2>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4"
            >
              {/* Star Rating */}
              {item.rating && (
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="text-lg"
                      style={{ color: i < item.rating! ? colors.primary : '#e5e7eb' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              {/* Review Text */}
              <p className="text-base leading-relaxed flex-1" style={{ color: colors.text }}>
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                {item.avatar ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm" style={{ color: colors.text }}>
                    {item.name}
                  </p>
                  {item.role && (
                    <p className="text-xs text-gray-500">{item.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}