'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Check, 
  Menu, 
  X, 
  Smartphone, 
  Package, 
  Zap, 
  Link as LinkIcon,
  BarChart3,
  Shield,
  Star
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-border'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">D</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground">Duka</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button asChild variant="outline" size="lg" className="h-11 px-5 font-medium border-2">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="lg" className="h-11 px-6 font-medium shadow-sm">
                <Link href="/register">{scrolled ? 'Get Started — Free' : 'Start Free Trial'}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-border animate-in slide-in-from-top-2 duration-200">
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                How it Works
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                FAQ
              </a>
              <Link
                href="/login"
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Login
              </Link>
              <div className="px-4 pt-2">
                <Button asChild size="lg" className="w-full h-12 font-medium">
                  <Link href="/register">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-medium text-primary">Built for Kenyan businesses 🇰🇪</span>
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground text-balance leading-tight">
                  Your Online Store, Live in 10 Minutes
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Accept M-Pesa payments. Share your link. Sell to anyone in Kenya — no tech skills needed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-medium shadow-lg hover:shadow-xl transition-all">
                  <Link href="/register">Start Free Trial</Link>
                </Button>
                <Button asChild variant="link" size="lg" className="w-full sm:w-auto h-14 text-base font-medium">
                  <Link href="/store">See a Demo Store →</Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">Trusted by 500+ Kenyan businesses</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <span>No credit card required</span>
                <span className="hidden sm:inline">·</span>
                <span>Cancel anytime</span>
              </div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="relative">
              <div className="relative mx-auto w-[280px] h-[580px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden">
                  {/* Phone UI Content */}
                  <div className="p-4 space-y-4">
                    {/* Store Header */}
                    <div className="text-center space-y-2 pb-4 border-b border-border">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <span className="text-lg font-bold text-primary">MG</span>
                      </div>
                      <h3 className="font-semibold text-sm">Mama Grace Fashions</h3>
                      <p className="text-xs text-muted-foreground">Quality African wear</p>
                    </div>

                    {/* Product Cards */}
                    <div className="space-y-3">
                      <div className="border border-border rounded-lg overflow-hidden bg-card">
                        <div className="w-full h-32 bg-accent/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-accent">AD</span>
                        </div>
                        <div className="p-3 space-y-1">
                          <p className="text-xs font-medium">Ankara Dress</p>
                          <p className="text-sm font-bold text-primary">KES 2,800</p>
                        </div>
                      </div>

                      <div className="border border-border rounded-lg overflow-hidden bg-card">
                        <div className="w-full h-32 bg-primary/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">KB</span>
                        </div>
                        <div className="p-3 space-y-1">
                          <p className="text-xs font-medium">Kitenge Blazer</p>
                          <p className="text-sm font-bold text-primary">KES 4,500</p>
                        </div>
                      </div>
                    </div>

                    {/* M-Pesa Button */}
                    <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium">
                      Pay with M-Pesa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-3">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Simple by design</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                From signup to first sale in three steps
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
              {/* Connector Lines (Desktop) */}
              <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-border" style={{ left: '20%', right: '20%' }} />

              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                    1
                  </div>
                  <div className="text-4xl">🏪</div>
                  <h3 className="text-xl font-semibold">Create your store</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Add your business name, pick a template, connect your M-Pesa Till or Paybill. Done in under 5 minutes.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                    2
                  </div>
                  <div className="text-4xl">📦</div>
                  <h3 className="text-xl font-semibold">Add your products</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Upload photos from your phone, set prices in KES. Your store goes live instantly.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                    3
                  </div>
                  <div className="text-4xl">💰</div>
                  <h3 className="text-xl font-semibold">Start receiving orders</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Share your store link on WhatsApp. Buyers pay via M-Pesa. You get notified instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                Everything you need. Nothing you don't.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature 1 */}
              <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                <CardHeader className="space-y-4">
                  <div className="text-4xl">📱</div>
                  <CardTitle className="text-xl font-semibold">M-Pesa Built In</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Accept Till and Paybill payments natively. No third-party gateway fees.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                <CardHeader className="space-y-4">
                  <div className="text-4xl">⚡</div>
                  <CardTitle className="text-xl font-semibold">Instant Order Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Get notified by email the moment a buyer pays. Never miss an order.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                <CardHeader className="space-y-4">
                  <div className="text-4xl">🔗</div>
                  <CardTitle className="text-xl font-semibold">Your Own Store Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Share businessname.duka.co.ke on WhatsApp, Instagram, anywhere.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                <CardHeader className="space-y-4">
                  <div className="text-4xl">📊</div>
                  <CardTitle className="text-xl font-semibold">Simple Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    See your orders, revenue, and products at a glance. No training needed.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                <CardHeader className="space-y-4">
                  <div className="text-4xl">📷</div>
                  <CardTitle className="text-xl font-semibold">Mobile-First</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Manage your entire store from your Android phone. No laptop required.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                <CardHeader className="space-y-4">
                  <div className="text-4xl">🔒</div>
                  <CardTitle className="text-xl font-semibold">Secure & Reliable</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    SSL on every store. Your data and your customers' data protected.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                Kenyan businesses love Duka
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="border-2">
                <CardHeader className="space-y-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed text-foreground">
                    "I set up my store in the evening and got my first order the next morning. My customers love how easy M-Pesa checkout is."
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">Wanjiru K.</p>
                    <p className="text-sm text-muted-foreground">Fashion seller, Nairobi</p>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card className="border-2">
                <CardHeader className="space-y-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed text-foreground">
                    "I used to take orders on WhatsApp and chase payments manually. Now everything is automatic. I save hours every week."
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">Otieno J.</p>
                    <p className="text-sm text-muted-foreground">Food products, Kisumu</p>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 3 */}
              <Card className="border-2">
                <CardHeader className="space-y-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed text-foreground">
                    "The dashboard is so simple even my mother can use it. We run our boutique from our phones now."
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">Aisha M.</p>
                    <p className="text-sm text-muted-foreground">Clothing & Accessories, Mombasa</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                One simple plan. No surprises.
              </h2>
            </div>

            <div className="max-w-lg mx-auto">
              <Card className="border-2 border-primary/20 shadow-2xl">
                <CardHeader className="text-center space-y-6 pb-8">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold">Starter</CardTitle>
                    <CardDescription className="text-base">
                      Start with a 14-day free trial — only KES 200 activation fee
                    </CardDescription>
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold tracking-tight text-foreground">KES 3,000</span>
                    <span className="text-xl text-muted-foreground">/ month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {[
                      'Your own store link (businessname.duka.co.ke)',
                      'Unlimited products',
                      'M-Pesa payments (Till & Paybill)',
                      'Order management dashboard',
                      'Email order notifications',
                      'Mobile-optimized storefront',
                      '3 store templates',
                      'Basic analytics',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-base text-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild size="lg" className="w-full h-14 text-base font-medium shadow-lg hover:shadow-xl transition-all mt-8">
                    <Link href="/register">Start Your Free Trial</Link>
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    No credit card. Pay with M-Pesa. Cancel anytime.
                  </p>
                </CardContent>
              </Card>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Need WhatsApp notifications or a custom domain? Coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                Common questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border-2 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Do my customers need to download anything?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  No. Your store works in any browser. Buyers just open your link and pay with M-Pesa as they normally would.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border-2 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What M-Pesa accounts does Duka support?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  We support both Till Numbers and Paybill Numbers. Payments go directly into your M-Pesa — we never hold your money.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border-2 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What happens when my trial ends?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  You'll receive an M-Pesa payment request for KES 3,000. Pay it and your store stays active. If unpaid within 3 days, your store is paused but never deleted.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border-2 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can I manage my store from my phone?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes — the dashboard is designed primarily for Android phones. You can add products, check orders, and update statuses entirely from your phone.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border-2 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What if a buyer pays the wrong amount?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Our system detects payment mismatches. You'll be notified and can resolve it directly with your buyer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card border-2 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can I use my own domain name?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Custom domains (like www.yourbusiness.co.ke) are coming soon as an upgrade. For now, every store gets a free businessname.duka.co.ke link.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Ready to take your business online?
              </h2>
              <p className="text-lg sm:text-xl text-primary-foreground/90">
                Join 500+ Kenyan businesses already selling on Duka.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-base font-medium shadow-xl hover:shadow-2xl transition-all">
                <Link href="/register">Start Free Trial — KES 200 activation</Link>
              </Button>
              <p className="text-sm text-primary-foreground/80">
                Your store will be live in under 10 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Tagline */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">D</span>
                </div>
                <span className="text-xl font-semibold tracking-tight text-foreground">Duka</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                The simplest way to sell online in Kenya
              </p>
              <p className="text-sm text-muted-foreground">
                Built in Nairobi 🇰🇪
              </p>
            </div>

            {/* Links Column 1 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-foreground">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <Link href="/store" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Demo Store
                  </Link>
                </li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-foreground">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Duka. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
