// 'use client'

// import { useState, useEffect } from 'react'
// import { useOnboarding } from '../onboarding-context'
// import { StepNavigation } from './step-navigation'
// import { SavedIndicator } from './saved-indicator'
// import { AIDescriptionGenerator } from '@/components/ai-description-generator'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { AlertCircle } from 'lucide-react'

// const RESERVED_SLUGS = ['duka', 'admin', 'test', 'shop']

// const CATEGORIES = [
//   'Fashion & Clothing',
//   'Beauty & Personal Care',
//   'Food & Beverages',
//   'Home & Living',
//   'Electronics & Accessories',
//   'Agriculture & Farming',
//   'Health & Wellness',
//   'Baby & Kids',
//   'Hardware & Tools',
//   'Arts & Crafts',
//   'Sports & Outdoors',
//   'Books & Stationery',
//   'Other'
// ]

// function slugify(text: string): string {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, '')
//     .replace(/[\s_-]+/g, '-')
//     .replace(/^-+|-+$/g, '')
// }

// export function Step1BusinessProfile() {
//   const { data, updateData, setCurrentStep } = useOnboarding()
//   const [showSaved, setShowSaved] = useState(false)
//   const [slugError, setSlugError] = useState('')

//   const maxDescLength = 150
//   const charCount = data.businessDescription.length

//   useEffect(() => {
//     if (data.businessName) {
//       const newSlug = slugify(data.businessName)

//       if (RESERVED_SLUGS.includes(newSlug)) {
//         setSlugError(`This name is taken. Try: ${newSlug}2.duka.co.ke`)
//         updateData({ businessSlug: `${newSlug}2` })
//       } else {
//         setSlugError('')
//         updateData({ businessSlug: newSlug })
//       }
//     } else {
//       updateData({ businessSlug: '' })
//       setSlugError('')
//     }
//   }, [data.businessName])

//   useEffect(() => {
//     if (data.businessName || data.businessCategory || data.businessDescription) {
//       setShowSaved(true)
//       const timer = setTimeout(() => setShowSaved(false), 2000)
//       return () => clearTimeout(timer)
//     }
//   }, [data.businessName, data.businessCategory, data.businessDescription])

//   const canProceed = data.businessName.trim() !== '' && data.businessCategory !== '' && !slugError

//   const handleNext = () => {
//     if (canProceed) {
//       updateData({ storeUrl: `${data.businessSlug}.duka.co.ke` })
//       setCurrentStep(2)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Business name */}
//       <div className="space-y-2">
//         <Label htmlFor="businessName" className="text-base font-medium">
//           Business Name <span className="text-destructive">*</span>
//         </Label>
//         <Input
//           id="businessName"
//           type="text"
//           placeholder="e.g., Mama Grace Fashions"
//           value={data.businessName}
//           onChange={(e) => updateData({ businessName: e.target.value })}
//           className="h-12 text-base"
//         />

//         {/* Subdomain Preview */}
//         {data.businessSlug && (
//           <div className="mt-3">
//             {slugError ? (
//               <div className="flex items-start gap-2 text-sm text-destructive">
//                 <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
//                 <p>{slugError}</p>
//               </div>
//             ) : (
//               <p className="text-sm text-muted-foreground">
//                 Your store will be at:{' '}
//                 <span className="font-medium text-primary">
//                   {data.businessSlug}.duka.co.ke
//                 </span>
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Business Category */}
//       <div className="space-y-2">
//         <Label htmlFor="category" className="text-base font-medium">
//           Business Category <span className="text-destructive">*</span>
//         </Label>
//         <Select
//           value={data.businessCategory}
//           onValueChange={(value) => updateData({ businessCategory: value })}
//         >
//           <SelectTrigger id="category" className="h-12 text-base">
//             <SelectValue placeholder="Select a category" />
//           </SelectTrigger>
//           <SelectContent>
//             {CATEGORIES.map((category) => (
//               <SelectItem key={category} value={category}>
//                 {category}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Description */}
//       <div className="space-y-2">
//         <Label htmlFor="description" className="text-base font-medium">
//           Short Description <span className="text-muted-foreground text-sm font-normal">(Optional)</span>
//         </Label>

//         {data.businessCategory && (
//           <AIDescriptionGenerator
//             context={{
//               name: data.businessName,
//               category: data.businessCategory
//             }}
//             onGenerate={(description) => updateData({ businessDescription: description })}
//           />
//         )}

//         <Textarea
//           id="description"
//           placeholder="Tell customers what makes your business special"
//           value={data.businessDescription}
//           onChange={(e) => {
//             if (e.target.value.length <= maxDescLength) {
//               updateData({ businessDescription: e.target.value })
//             }
//           }}
//           className="min-h-24 resize-none text-base"
//           maxLength={maxDescLength}
//         />
//         <div className="flex justify-between text-sm">
//           <span className="text-muted-foreground">Help customers understand your business</span>
//           <span className={charCount > maxDescLength * 0.9 ? 'text-amber-600 font-medium' : 'text-muted-foreground'}>
//             {charCount}/{maxDescLength}
//           </span>
//         </div>
//       </div>
//       </div>

//       <StepNavigation
//         onNext={handleNext}
//         canProceed={canProceed}
//         hideBack
//       />
//     </div >
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { useOnboarding } from '../onboarding-context'
import { StepNavigation } from './step-navigation'
import { SavedIndicator } from './saved-indicator'
import { AIDescriptionGenerator } from '@/components/ai-description-generator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertCircle } from 'lucide-react'

const RESERVED_SLUGS = ['duka', 'admin', 'test', 'shop']

const CATEGORIES = [
  'Fashion & Clothing',
  'Beauty & Personal Care',
  'Food & Beverages',
  'Home & Living',
  'Electronics & Accessories',
  'Agriculture & Farming',
  'Health & Wellness',
  'Baby & Kids',
  'Hardware & Tools',
  'Arts & Crafts',
  'Sports & Outdoors',
  'Books & Stationery',
  'Other',
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function Step1BusinessProfile() {
  const { data, updateData, setCurrentStep } = useOnboarding()
  const [showSaved, setShowSaved] = useState(false)
  const [slugError, setSlugError] = useState('')

  const maxDescLength = 150
  const charCount = data.businessDescription.length

  useEffect(() => {
    if (data.businessName) {
      const newSlug = slugify(data.businessName)
      if (RESERVED_SLUGS.includes(newSlug)) {
        setSlugError(`This name is taken. Try: ${newSlug}2.duka.co.ke`)
        updateData({ businessSlug: `${newSlug}2` })
      } else {
        setSlugError('')
        updateData({ businessSlug: newSlug })
      }
    } else {
      updateData({ businessSlug: '' })
      setSlugError('')
    }
  }, [data.businessName])

  useEffect(() => {
    if (data.businessName || data.businessCategory || data.businessDescription) {
      setShowSaved(true)
      const timer = setTimeout(() => setShowSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [data.businessName, data.businessCategory, data.businessDescription])

  const canProceed =
    data.businessName.trim() !== '' &&
    data.businessCategory !== '' &&
    !slugError

  const handleNext = () => {
    if (canProceed) {
      updateData({ storeUrl: `${data.businessSlug}.duka.co.ke` })
      setCurrentStep(2)
    }
  }

  return (
    <div className="space-y-6">
      <SavedIndicator show={showSaved} />

      {/* Business Name */}
      <div className="space-y-2">
        <Label htmlFor="businessName" className="text-base font-medium">
          Business Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="businessName"
          type="text"
          placeholder="e.g., Mama Grace Fashions"
          value={data.businessName}
          onChange={(e) => updateData({ businessName: e.target.value })}
          className="h-12 text-base"
        />
        {data.businessSlug && (
          <div className="mt-3">
            {slugError ? (
              <div className="flex items-start gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>{slugError}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Your store will be at:{' '}
                <span className="font-medium text-primary">
                  {data.businessSlug}.duka.co.ke
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Business Category */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-base font-medium">
          Business Category <span className="text-destructive">*</span>
        </Label>
        <Select
          value={data.businessCategory}
          onValueChange={(value) => updateData({ businessCategory: value })}
        >
          <SelectTrigger id="category" className="h-12 text-base">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base font-medium">
          Short Description{' '}
          <span className="text-muted-foreground text-sm font-normal">(Optional)</span>
        </Label>
        {data.businessCategory && (
          <AIDescriptionGenerator
            context={{
              name: data.businessName,
              category: data.businessCategory,
            }}
            onGenerate={(description) => updateData({ businessDescription: description })}
          />
        )}
        <Textarea
          id="description"
          placeholder="Tell customers what makes your business special"
          value={data.businessDescription}
          onChange={(e) => {
            if (e.target.value.length <= maxDescLength) {
              updateData({ businessDescription: e.target.value })
            }
          }}
          className="min-h-24 resize-none text-base"
          maxLength={maxDescLength}
        />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Help customers understand your business
          </span>
          <span
            className={
              charCount > maxDescLength * 0.9
                ? 'text-amber-600 font-medium'
                : 'text-muted-foreground'
            }
          >
            {charCount}/{maxDescLength}
          </span>
        </div>
      </div>

      <StepNavigation onNext={handleNext} canProceed={canProceed} hideBack />
    </div>
  )
}