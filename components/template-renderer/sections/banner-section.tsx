import type { TemplateSection, BannerContent } from '@/lib/templates/types'
import Link from 'next/link'

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

export function BannerSection({ section, colors }: SectionProps) {
  const { heading, text, buttonText, buttonLink, bgColor, textColor } =
    section.content as BannerContent

  const bg = bgColor || colors.accent
  const fg = textColor || '#ffffff'

  return (
    <section className="py-16 px-4" style={{ backgroundColor: bg }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: fg }}
        >
          {heading}
        </h2>
        {text && (
          <p
            className="text-lg md:text-xl mb-8 opacity-90"
            style={{ color: fg }}
          >
            {text}
          </p>
        )}
        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className="inline-block px-8 py-3 rounded-lg font-semibold text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: fg, color: bg }}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  )
}