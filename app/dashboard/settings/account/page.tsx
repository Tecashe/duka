'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Check, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from 'lucide-react'

export default function AccountSettingsPage() {
  // Section 1 - Personal Details
  const [personalDetails, setPersonalDetails] = useState({
    fullName: 'Grace Wanjiku',
    email: 'gracefashions@gmail.com',
    phone: '0712 345 678'
  })
  const [detailsSaving, setDetailsSaving] = useState(false)
  const [detailsSaved, setDetailsSaved] = useState(false)

  // Section 2 - Change Password
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)

  // Section 3 - Subscription
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [billingOpen, setBillingOpen] = useState(false)

  const handleSavePersonalDetails = async () => {
    setDetailsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDetailsSaving(false)
    setDetailsSaved(true)
    setTimeout(() => setDetailsSaved(false), 3000)
  }

  const handleUpdatePassword = async () => {
    setPasswordSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setPasswordSaving(false)
    setPasswordSaved(true)
    setPasswordData({ current: '', new: '', confirm: '' })
    setTimeout(() => setPasswordSaved(false), 3000)
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { label: '', progress: 0, color: 'bg-muted' }
    if (password.length < 8) return { label: 'Weak', progress: 33, color: 'bg-destructive' }
    if (password.length < 12) return { label: 'Fair', progress: 66, color: 'bg-accent' }
    return { label: 'Strong', progress: 100, color: 'bg-primary' }
  }

  const passwordStrength = getPasswordStrength(passwordData.new)
  const passwordsMatch = passwordData.new === passwordData.confirm && passwordData.new.length > 0
  const passwordsNoMatch = passwordData.confirm.length > 0 && !passwordsMatch

  const billingHistory = [
    { date: 'Feb 17 2026', description: 'Trial Activation', amount: 200, receipt: 'RGT34GF', status: 'Confirmed' },
    { date: 'Jan 15 2026', description: 'Monthly Renewal', amount: 3000, receipt: 'HGT77KL', status: 'Confirmed' },
    { date: 'Dec 15 2025', description: 'Monthly Renewal', amount: 3000, receipt: 'PLK22MN', status: 'Confirmed' },
  ]

  const trialDaysRemaining = 12
  const trialTotalDays = 14
  const trialProgress = (trialDaysRemaining / trialTotalDays) * 100

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-12">
      {/* Section 1 - Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              value={personalDetails.fullName}
              onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={personalDetails.email}
              onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={personalDetails.phone}
              onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Used for account recovery</p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSavePersonalDetails} disabled={detailsSaving}>
              {detailsSaving ? 'Saving...' : 'Save Personal Details'}
            </Button>
            {detailsSaved && (
              <span className="text-sm text-primary flex items-center gap-1">
                <Check className="h-4 w-4" />
                Details updated
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 2 - Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                placeholder="Minimum 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwordData.new.length > 0 && (
              <div className="space-y-1">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${passwordStrength.color}`}
                    style={{ width: `${passwordStrength.progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{passwordStrength.label}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwordsNoMatch && (
              <p className="text-sm text-destructive">Passwords do not match</p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={handleUpdatePassword}
              disabled={passwordSaving || !passwordData.current || !passwordsMatch || passwordData.new.length < 8}
            >
              {passwordSaving ? 'Updating...' : 'Update Password'}
            </Button>
            {passwordSaved && (
              <span className="text-sm text-primary flex items-center gap-1">
                <Check className="h-4 w-4" />
                Password updated
              </span>
            )}
          </div>
          {passwordSaved && (
            <p className="text-sm text-muted-foreground">
              You'll use your new password next time you log in.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Section 3 - Subscription & Billing */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
          <CardDescription>Manage your plan and payment history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Plan */}
          <div className="p-4 border-2 border-primary/20 rounded-lg bg-primary/5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">Starter Plan</h3>
                <p className="text-2xl font-bold text-primary">KES 3,000<span className="text-base font-normal text-muted-foreground">/month</span></p>
              </div>
              <Badge className="bg-primary">Active</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Trial Progress</span>
                <span className="font-medium">{trialDaysRemaining} days remaining</span>
              </div>
              <Progress value={trialProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">Next billing: Feb 28, 2026</p>
            </div>
          </div>

          {/* Billing History */}
          <div className="space-y-3">
            <h3 className="font-semibold">Billing History</h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">Date</th>
                      <th className="text-left p-3 text-sm font-medium">Description</th>
                      <th className="text-left p-3 text-sm font-medium">Amount</th>
                      <th className="text-left p-3 text-sm font-medium">Receipt</th>
                      <th className="text-left p-3 text-sm font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((payment, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3 text-sm">{payment.date}</td>
                        <td className="p-3 text-sm">{payment.description}</td>
                        <td className="p-3 text-sm font-medium">KES {payment.amount.toLocaleString()}</td>
                        <td className="p-3 text-sm font-mono text-muted-foreground">{payment.receipt}</td>
                        <td className="p-3">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {payment.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* How Billing Works */}
          <Collapsible open={billingOpen} onOpenChange={setBillingOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <span className="font-medium text-sm">How billing works</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${billingOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-2">
                <p>
                  On Day 15 of your trial, you'll receive an M-Pesa payment request for KES 3,000. 
                  Pay it to keep your store active.
                </p>
                <p>
                  If unpaid within 3 days, your store will be paused (not deleted). You can reactivate 
                  anytime by completing the payment.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Danger Zone */}
          <div className="pt-6 space-y-4 border-t">
            <h3 className="font-semibold text-destructive">Danger Zone</h3>
            
            <div className="flex items-center justify-between p-4 border border-accent/30 rounded-lg bg-accent/5">
              <div className="space-y-1">
                <p className="font-medium">Pause My Store</p>
                <p className="text-sm text-muted-foreground">
                  Hide your store but keep all data
                </p>
              </div>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" onClick={() => setPauseDialogOpen(true)}>
                Pause Store
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg bg-destructive/5">
              <div className="space-y-1">
                <p className="font-medium">Cancel Subscription</p>
                <p className="text-sm text-muted-foreground">
                  Deactivate at end of billing period
                </p>
              </div>
              <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => setCancelDialogOpen(true)}>
                Cancel Subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pause Store Dialog */}
      <Dialog open={pauseDialogOpen} onOpenChange={setPauseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Pause Your Store
            </DialogTitle>
            <DialogDescription>
              Pausing hides your store from buyers but keeps all your data. You can reactivate anytime by paying your subscription.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPauseDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" className="bg-accent hover:bg-accent/90" onClick={() => setPauseDialogOpen(false)}>
              Pause Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Cancel Subscription
            </DialogTitle>
            <DialogDescription>
              Cancelling will deactivate your store at the end of your current billing period. Your data is kept for 90 days.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Subscription
            </Button>
            <Button variant="destructive" onClick={() => setCancelDialogOpen(false)}>
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
