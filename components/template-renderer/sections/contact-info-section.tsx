import type { TemplateSection, SplitContactInfo } from '@/lib/templates/types'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

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

interface ContactRow {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

export function ContactInfoSection({ section, colors }: SectionProps) {
  const { heading, email, phone, address, hours } =
    section.content as SplitContactInfo

  const rows: ContactRow[] = [
    email && {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
    },
    phone && {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
    },
    address && {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Address',
      value: address,
    },
    hours && {
      icon: <Clock className="w-5 h-5" />,
      label: 'Hours',
      value: hours,
    },
  ].filter(Boolean) as ContactRow[]

  return (
    <section className="py-16 px-4" style={{ backgroundColor: colors.background }}>
      <div className="max-w-xl mx-auto">
        {heading && (
          <h2
            className="text-2xl font-bold mb-8"
            style={{ color: colors.primary }}
          >
            {heading}
          </h2>
        )}
        <div className="space-y-5">
          {rows.map(({ icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
              >
                {icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="text-base font-medium hover:underline"
                    style={{ color: colors.text }}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-base font-medium" style={{ color: colors.text }}>
                    {value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}