'use client'

import { useState } from 'react'
import type { TemplateSection, FaqContent } from '@/lib/templates/types'
import { ChevronDown } from 'lucide-react'

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

export function FAQSection({ section, colors }: SectionProps) {
  const { heading, subheading, items } = section.content as FaqContent
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx)

  return (
    <section className="py-20 px-4" style={{ backgroundColor: colors.background }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        {heading && (
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-3"
              style={{ color: colors.text }}
            >
              {heading}
            </h2>
            {subheading && (
              <p className="text-lg text-gray-500">{subheading}</p>
            )}
          </div>
        )}

        {/* Accordion Items */}
        <div className="space-y-3">
          {items?.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="rounded-xl border overflow-hidden transition-shadow hover:shadow-sm"
                style={{ borderColor: `${colors.primary}30` }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                >
                  <span
                    className="font-semibold text-base"
                    style={{ color: colors.text }}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className="flex-shrink-0 w-5 h-5 transition-transform duration-200"
                    style={{
                      color: colors.primary,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                {isOpen && (
                  <div
                    className="px-6 pb-5 text-base leading-relaxed"
                    style={{ color: colors.text + 'cc' }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}