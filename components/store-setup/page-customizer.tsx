'use client'

import { useState } from 'react'
import { WebsiteTemplate, TemplatePage, PageType } from '@/lib/templates'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Eye, Sparkles, FileText, Home, Info, Store, Phone, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
//
interface PageCustomizerProps {
  template: WebsiteTemplate
  onComplete: (customizedPages: TemplatePage[]) => void
}

const pageIcons = {
  home: Home,
  about: Info,
  shop: Store,
  contact: Phone,
  faq: HelpCircle,
  blog: FileText
}

export function PageCustomizer({ template, onComplete }: PageCustomizerProps) {
  const [pages, setPages] = useState<TemplatePage[]>(template.pages)
  const [editingSection, setEditingSection] = useState<{ pageId: string; sectionId: string } | null>(null)

  const togglePage = (pageId: string) => {
    setPages(pages.map(page =>
      page.id === pageId ? { ...page, enabled: !page.enabled } : page
    ))
  }

  const updateSectionContent = (pageId: string, sectionId: string, content: any) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          sections: page.sections.map(section =>
            section.id === sectionId ? { ...section, content: { ...section.content, ...content } } : section
          )
        }
      }
      return page
    }))
  }

  const enabledPages = pages.filter(p => p.enabled)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Customize Your Website Pages</h2>
        <p className="text-muted-foreground">
          Choose which pages to include and customize the content
        </p>
      </div>

      {/* Page Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Pages</CardTitle>
          <CardDescription>Toggle pages on/off for your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {pages.map((page) => {
              const Icon = pageIcons[page.id as PageType] || FileText
              return (
                <div
                  key={page.id}
                  className={cn(
                    'flex items-center justify-between p-4 border rounded-lg transition-colors',
                    page.enabled ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('h-5 w-5', page.enabled ? 'text-primary' : 'text-muted-foreground')} />
                    <div>
                      <p className="font-medium">{page.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {page.sections.length} sections
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {page.id === 'home' && (
                      <Badge variant="secondary" className="text-xs">Required</Badge>
                    )}
                    <Switch
                      checked={page.enabled}
                      onCheckedChange={() => togglePage(page.id)}
                      disabled={page.id === 'home'}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Content Customization */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customize Content</CardTitle>
              <CardDescription>
                Edit the text content for your selected pages
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="h-4 w-4" />
              AI Generate
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {enabledPages.map((page) => (
              <AccordionItem key={page.id} value={page.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = pageIcons[page.id as PageType] || FileText
                      return <Icon className="h-4 w-4" />
                    })()}
                    <span className="font-semibold">{page.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {page.sections.length} sections
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    {page.sections.map((section) => (
                      <Card key={section.id}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {(section.content as any).heading !== undefined && (
                            <div className="space-y-1">
                              <Label className="text-xs text-muted-foreground">Heading</Label>
                              <Input
                                value={(section.content as any).heading}
                                onChange={(e) => updateSectionContent(page.id, section.id, { heading: e.target.value })}
                                placeholder="Enter heading"
                              />
                            </div>
                          )}
                          {(section.content as any).subheading !== undefined && (
                            <div className="space-y-1">
                              <Label className="text-xs text-muted-foreground">Subheading</Label>
                              <Input
                                value={(section.content as any).subheading}
                                onChange={(e) => updateSectionContent(page.id, section.id, { subheading: e.target.value })}
                                placeholder="Enter subheading"
                              />
                            </div>
                          )}
                          {(section.content as any).description !== undefined && (
                            <div className="space-y-1">
                              <Label className="text-xs text-muted-foreground">Description</Label>
                              <Textarea
                                value={(section.content as any).description}
                                onChange={(e) => updateSectionContent(page.id, section.id, { description: e.target.value })}
                                placeholder="Enter description"
                                rows={3}
                              />
                            </div>
                          )}
                          {(section.content as any).buttonText !== undefined && (
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Button Text</Label>
                                <Input
                                  value={(section.content as any).buttonText}
                                  onChange={(e) => updateSectionContent(page.id, section.id, { buttonText: e.target.value })}
                                  placeholder="Button text"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Button Link</Label>
                                <Input
                                  value={(section.content as any).buttonLink}
                                  onChange={(e) => updateSectionContent(page.id, section.id, { buttonLink: e.target.value })}
                                  placeholder="/link"
                                />
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>Review your website configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Selected Pages:</span>
            <span className="font-semibold">{enabledPages.length} of {pages.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Sections:</span>
            <span className="font-semibold">
              {enabledPages.reduce((acc, page) => acc + page.sections.length, 0)}
            </span>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={() => onComplete(pages)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview & Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
