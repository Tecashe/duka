'use client'

import { useState } from 'react'
import { TemplatePreviewModal } from '@/components/template-preview-modal'
import { mockStores } from '@/lib/stores'
import { Template } from '@/lib/stores'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Check, AlertTriangle, Upload, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function StoreSettingsPage() {
  const { toast } = useToast()
  const [copiedUrl, setCopiedUrl] = useState(false)

  // Section 1- Store Details
  const [storeDetails, setStoreDetails] = useState({
    name: 'Mama Grace Fashions',
    description: 'Affordable, quality fashion for every Kenyan woman. Based in Nairobi.',
    category: 'fashion'
  })
  const [detailsSaving, setDetailsSaving] = useState(false)
  const [detailsSaved, setDetailsSaved] = useState(false)

  // Section 2 - Logo
  const [logo, setLogo] = useState<string | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoSaving, setLogoSaving] = useState(false)

  // Section 3 - Template
  const [currentTemplate, setCurrentTemplate] = useState<Template>('vibrant')
  const [templateModalOpen, setTemplateModalOpen] = useState(false)

  // Section 4 - M-Pesa
  const [mpesaDetails, setMpesaDetails] = useState({
    type: 'till' as 'till' | 'paybill',
    number: '123456',
    connected: true
  })
  const [mpesaEditing, setMpesaEditing] = useState(false)
  const [mpesaConfirmOpen, setMpesaConfirmOpen] = useState(false)
  const [newMpesaDetails, setNewMpesaDetails] = useState({
    type: 'till' as 'till' | 'paybill',
    number: ''
  })

  // Section 5 - Delivery
  const [deliverySettings, setDeliverySettings] = useState({
    offerDelivery: true,
    deliveryFee: '200',
    deliveryArea: 'We deliver within Nairobi CBD and surroundings. Call us to confirm your area.',
    offerPickup: true,
    pickupLocation: 'Ngong Road, Westlands, Nairobi',
    pickupInstructions: 'Call us when you arrive. Open Mon–Sat 8am–6pm.'
  })
  const [deliverySaving, setDeliverySaving] = useState(false)
  const [deliverySaved, setDeliverySaved] = useState(false)

  // Section 6 - Notifications
  const [notifications, setNotifications] = useState({
    emailNewOrder: true,
    emailBuyerConfirmation: true,
    notifyStatusUpdate: false
  })
  const [notificationsSaving, setNotificationsSaving] = useState(false)
  const [notificationsSaved, setNotificationsSaved] = useState(false)

  const handleCopyUrl = () => {
    navigator.clipboard.writeText('mamagracefashions.duka.co.ke')
    setCopiedUrl(true)
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  const handleSaveStoreDetails = async () => {
    setDetailsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDetailsSaving(false)
    setDetailsSaved(true)
    setTimeout(() => setDetailsSaved(false), 3000)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveLogo = async () => {
    setLogoSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLogo(logoPreview)
    setLogoPreview(null)
    setLogoSaving(false)
    toast({
      title: 'Logo updated',
      description: 'Your store logo has been updated.',
    })
  }

  const handleRemoveLogo = () => {
    setLogo(null)
    setLogoPreview(null)
  }

  const handleApplyTemplate = () => {
    setCurrentTemplate(selectedTemplate)
    setTemplateModalOpen(false)
    toast({
      title: 'Template updated!',
      description: `Your store now uses the ${selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} template.`,
    })
  }

  const handleUpdateMpesa = () => {
    setMpesaConfirmOpen(true)
  }

  const handleConfirmMpesa = async () => {
    setMpesaConfirmOpen(false)
    setMpesaEditing(false)
    setMpesaDetails({
      ...newMpesaDetails,
      connected: true
    })
    toast({
      title: 'M-Pesa updated',
      description: 'Test your store to confirm payments work.',
      variant: 'default',
    })
  }

  const handleSaveDelivery = async () => {
    setDeliverySaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDeliverySaving(false)
    setDeliverySaved(true)
    setTimeout(() => setDeliverySaved(false), 3000)
  }

  const handleSaveNotifications = async () => {
    setNotificationsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setNotificationsSaving(false)
    setNotificationsSaved(true)
    setTimeout(() => setNotificationsSaved(false), 3000)
  }

  const templates = [
    { id: 'minimal', name: 'Minimal', description: 'Clean & simple design' },
    { id: 'bold', name: 'Bold', description: 'Eye-catching & modern' },
    { id: 'vibrant', name: 'Vibrant', description: 'Colorful & energetic' }
  ]

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-12">
      {/* Section 1 - Store Details */}
      <Card>
        <CardHeader>
          <CardTitle>Store Details</CardTitle>
          <CardDescription>Basic information about your store</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input
              id="store-name"
              value={storeDetails.name}
              onChange={(e) => setStoreDetails({ ...storeDetails, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="store-description">Store Description</Label>
            <Textarea
              id="store-description"
              value={storeDetails.description}
              onChange={(e) => setStoreDetails({ ...storeDetails, description: e.target.value })}
              maxLength={200}
              rows={3}
            />
            <p className="text-xs text-muted-foreground text-right">
              {storeDetails.description.length}/200 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Business Category</Label>
            <Select value={storeDetails.category} onValueChange={(value) => setStoreDetails({ ...storeDetails, category: value })}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fashion">Fashion & Clothing</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="food">Food & Beverages</SelectItem>
                <SelectItem value="home">Home & Living</SelectItem>
                <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Store URL</Label>
            <div className="flex gap-2">
              <Input
                value="mamagracefashions.duka.co.ke"
                readOnly
                className="bg-muted"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyUrl}
              >
                {copiedUrl ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={handleSaveStoreDetails}
              disabled={detailsSaving}
            >
              {detailsSaving ? 'Saving...' : 'Save Store Details'}
            </Button>
            {detailsSaved && (
              <span className="text-sm text-primary flex items-center gap-1">
                <Check className="h-4 w-4" />
                Store details updated
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 2 - Store Logo */}
      <Card>
        <CardHeader>
          <CardTitle>Store Logo</CardTitle>
          <CardDescription>Upload a logo to personalize your store</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-semibold overflow-hidden">
              {(logoPreview || logo) ? (
                <img src={logoPreview || logo || ''} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                'MG'
              )}
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm text-muted-foreground">Square image, at least 200×200px</p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </label>
                </Button>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                {(logo || logoPreview) && (
                  <Button variant="ghost" size="sm" onClick={handleRemoveLogo}>
                    <X className="h-4 w-4 mr-2" />
                    Remove Logo
                  </Button>
                )}
              </div>
            </div>
          </div>

          {logoPreview && (
            <Button onClick={handleSaveLogo} disabled={logoSaving}>
              {logoSaving ? 'Saving...' : 'Save Logo'}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Section 3 - Store Template */}
      <Card>
        <CardHeader>
          <CardTitle>Store Template</CardTitle>
          <CardDescription>Choose how your store looks to customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-16 rounded border-2 border-border bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center text-xs font-medium">
              {currentTemplate.charAt(0).toUpperCase() + currentTemplate.slice(1)}
            </div>
            <div>
              <p className="font-medium">Current: {currentTemplate.charAt(0).toUpperCase() + currentTemplate.slice(1)}</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setTemplateModalOpen(true)}>
                Change Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4 - M-Pesa Settings */}
      <Card className="border-accent/50 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-accent" />
            M-Pesa Settings
          </CardTitle>
          <CardDescription>This is where buyers send payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!mpesaEditing ? (
            <>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div>
                  <p className="font-medium">
                    {mpesaDetails.type === 'till' ? 'Till Number' : 'Paybill Number'}: {mpesaDetails.number}
                  </p>
                  {mpesaDetails.connected && (
                    <p className="text-sm text-primary flex items-center gap-1 mt-1">
                      <Check className="h-4 w-4" />
                      Connected
                    </p>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  setMpesaEditing(true)
                  setNewMpesaDetails({ type: mpesaDetails.type, number: mpesaDetails.number })
                }}>
                  Edit M-Pesa Details
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Changing your M-Pesa number means buyers will pay to the new number immediately. Make sure this is correct — incorrect numbers mean lost payments.
                </AlertDescription>
              </Alert>

              <RadioGroup
                value={newMpesaDetails.type}
                onValueChange={(value: 'till' | 'paybill') => setNewMpesaDetails({ ...newMpesaDetails, type: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="till" id="till" />
                  <Label htmlFor="till">Till Number</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paybill" id="paybill" />
                  <Label htmlFor="paybill">Paybill Number</Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="mpesa-number">
                  {newMpesaDetails.type === 'till' ? 'Till Number' : 'Paybill Number'}
                </Label>
                <Input
                  id="mpesa-number"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={newMpesaDetails.number}
                  onChange={(e) => setNewMpesaDetails({ ...newMpesaDetails, number: e.target.value.replace(/\D/g, '') })}
                  placeholder="Enter number"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setMpesaEditing(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleUpdateMpesa} disabled={!newMpesaDetails.number || newMpesaDetails.number.length < 5}>
                  Update M-Pesa Number
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 5 - Delivery Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Settings</CardTitle>
          <CardDescription>Configure how customers receive their orders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="offer-delivery">Offer Delivery</Label>
              <p className="text-sm text-muted-foreground">Allow customers to request delivery</p>
            </div>
            <Switch
              id="offer-delivery"
              checked={deliverySettings.offerDelivery}
              onCheckedChange={(checked) => setDeliverySettings({ ...deliverySettings, offerDelivery: checked })}
            />
          </div>

          {deliverySettings.offerDelivery && (
            <div className="space-y-4 pl-4 border-l-2 border-primary/20">
              <div className="space-y-2">
                <Label htmlFor="delivery-fee">Delivery Fee</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">KES</span>
                  <Input
                    id="delivery-fee"
                    type="text"
                    inputMode="numeric"
                    value={deliverySettings.deliveryFee}
                    onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryFee: e.target.value.replace(/\D/g, '') })}
                    className="max-w-[150px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery-area">Delivery Area</Label>
                <Textarea
                  id="delivery-area"
                  value={deliverySettings.deliveryArea}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryArea: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="offer-pickup">Offer Pickup</Label>
              <p className="text-sm text-muted-foreground">Allow customers to pick up orders</p>
            </div>
            <Switch
              id="offer-pickup"
              checked={deliverySettings.offerPickup}
              onCheckedChange={(checked) => setDeliverySettings({ ...deliverySettings, offerPickup: checked })}
            />
          </div>

          {deliverySettings.offerPickup && (
            <div className="space-y-4 pl-4 border-l-2 border-primary/20">
              <div className="space-y-2">
                <Label htmlFor="pickup-location">Pickup Location</Label>
                <Input
                  id="pickup-location"
                  value={deliverySettings.pickupLocation}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, pickupLocation: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickup-instructions">Pickup Instructions</Label>
                <Textarea
                  id="pickup-instructions"
                  value={deliverySettings.pickupInstructions}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, pickupInstructions: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSaveDelivery} disabled={deliverySaving}>
              {deliverySaving ? 'Saving...' : 'Save Delivery Settings'}
            </Button>
            {deliverySaved && (
              <span className="text-sm text-primary flex items-center gap-1">
                <Check className="h-4 w-4" />
                Settings updated
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 6 - Order Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Order Notifications</CardTitle>
          <CardDescription>Manage how you and your customers receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-new-order">Email me for every new order</Label>
              <p className="text-sm text-muted-foreground">gracefashions@gmail.com</p>
            </div>
            <Switch
              id="email-new-order"
              checked={notifications.emailNewOrder}
              onCheckedChange={(checked) => setNotifications({ ...notifications, emailNewOrder: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-buyer">Send buyer a confirmation email after payment</Label>
              <p className="text-sm text-muted-foreground">Helps build trust with customers</p>
            </div>
            <Switch
              id="email-buyer"
              checked={notifications.emailBuyerConfirmation}
              onCheckedChange={(checked) => setNotifications({ ...notifications, emailBuyerConfirmation: checked })}
            />
          </div>

          <div className="flex items-center justify-between opacity-50">
            <div className="space-y-0.5">
              <Label htmlFor="notify-status">Notify buyer when I update order status</Label>
              <p className="text-sm text-muted-foreground">Coming soon: WhatsApp notifications</p>
            </div>
            <Switch
              id="notify-status"
              checked={notifications.notifyStatusUpdate}
              disabled
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSaveNotifications} disabled={notificationsSaving}>
              {notificationsSaving ? 'Saving...' : 'Save Notification Settings'}
            </Button>
            {notificationsSaved && (
              <span className="text-sm text-primary flex items-center gap-1">
                <Check className="h-4 w-4" />
                Settings updated
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Template Selection Modal with Live Previews */}
      <TemplatePreviewModal
        open={templateModalOpen}
        onOpenChange={setTemplateModalOpen}
        currentTemplate={currentTemplate}
        onApply={(template) => {
          setCurrentTemplate(template)
          toast({
            title: 'Template updated',
            description: `Your store is now using the ${template} template.`,
          })
        }}
        storeData={mockStores.mamagrace}
      />

      {/* M-Pesa Confirmation Dialog */}
      <Dialog open={mpesaConfirmOpen} onOpenChange={setMpesaConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm M-Pesa Number Change</DialogTitle>
            <DialogDescription>
              You are changing your payment number to {newMpesaDetails.type === 'till' ? 'Till' : 'Paybill'} {newMpesaDetails.number}.
              All new orders will be paid to this number. This cannot be undone without contacting support.
              Confirm?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMpesaConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmMpesa}>
              Confirm Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
