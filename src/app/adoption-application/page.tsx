'use client'

import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const STEPS = [
  { label: 'Personal Info',       icon: '👤' },
  { label: 'Housing & Lifestyle', icon: '🏠' },
  { label: 'Dog Experience',      icon: '🐕' },
  { label: 'Puppy Preferences',   icon: '🐾' },
  { label: 'Agreements',          icon: '📋' },
  { label: 'Signature',           icon: '✍️' },
]

export default function AdoptionApplication() {
  const [step, setStep]           = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]       = useState<Record<string, string>>({})
  const formRef                   = useRef<HTMLFormElement>(null)
  const canvasRef                 = useRef<HTMLCanvasElement>(null)
  const drawing                   = useRef(false)
  const lastPos                   = useRef<{ x: number; y: number } | null>(null)
  const [hasSig, setHasSig]       = useState(false)
  const [sigData, setSigData]     = useState('')
  const [today, setToday]         = useState('')

  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.strokeStyle = '#c9a227'
    ctx.lineWidth   = 2.5
    ctx.lineCap     = 'round'
    ctx.lineJoin    = 'round'

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      if ('touches' in e) return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY }
      return { x: ((e as MouseEvent).clientX - rect.left) * scaleX, y: ((e as MouseEvent).clientY - rect.top) * scaleY }
    }
    const onDown = (e: MouseEvent | TouchEvent) => { e.preventDefault(); drawing.current = true; lastPos.current = getPos(e) }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!drawing.current || !lastPos.current) return
      e.preventDefault()
      const pos = getPos(e)
      ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y); ctx.lineTo(pos.x, pos.y); ctx.stroke()
      lastPos.current = pos; setHasSig(true)
    }
    const onUp = () => { drawing.current = false; lastPos.current = null; setSigData(canvas.toDataURL()) }

    canvas.addEventListener('mousedown', onDown, { passive: false })
    canvas.addEventListener('mousemove', onMove, { passive: false })
    canvas.addEventListener('mouseup', onUp)
    canvas.addEventListener('mouseleave', onUp)
    canvas.addEventListener('touchstart', onDown, { passive: false })
    canvas.addEventListener('touchmove', onMove, { passive: false })
    canvas.addEventListener('touchend', onUp)
    return () => {
      canvas.removeEventListener('mousedown', onDown); canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseup', onUp); canvas.removeEventListener('mouseleave', onUp)
      canvas.removeEventListener('touchstart', onDown); canvas.removeEventListener('touchmove', onMove)
      canvas.removeEventListener('touchend', onUp)
    }
  }, [])

  function clearSig() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
    setHasSig(false); setSigData('')
  }

  function validate(s: number) {
    const form = formRef.current
    if (!form) return true
    const errs: Record<string, string> = {}
    const req = (name: string, label: string) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
      if (!el || !el.value.trim()) errs[name] = `${label} is required`
    }
    if (s === 0) { req('firstName','First name'); req('lastName','Last name'); req('dateOfBirth','Date of birth'); req('address','Address'); req('city','City'); req('state','State'); req('zip','ZIP'); req('phone','Phone'); req('email','Email') }
    if (s === 1) { req('homeType','Housing type'); req('fencedYard','Fenced yard'); req('adultCount','Number of adults'); req('hoursAlonePerDay','Hours alone per day'); req('dogSleepLocation','Where the dog will sleep') }
    if (s === 2) { req('ownedLargeBreed','Large breed experience'); req('exercisePlan','Exercise plan'); req('whyCaneCorso','Why a Cane Corso') }
    if (s === 3) { req('sexPreference','Sex preference'); req('purpose','Primary purpose') }
    if (s === 4) { ['agreeSpayNeuter','agreeNoChaining','agreeVetCare','agreeReturn','agreeResponsibility'].forEach(b => { const el = form.elements.namedItem(b) as HTMLInputElement | null; if (!el?.checked) errs[b] = 'Required' }) }
    if (s === 5 && !hasSig) errs['signature'] = 'Please draw your signature'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function next() { if (validate(step)) { setStep(s => Math.min(s + 1, STEPS.length - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) } }
  function back() { setStep(s => Math.max(s - 1, 0)); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate(step)) return
    const form = e.currentTarget
    const data = new FormData(form)
    if (sigData) data.set('signature', sigData)
    await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data as unknown as Record<string, string>).toString() })
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const E = (name: string) => errors[name]
    ? <span style={{ color: '#e05252', fontSize: '0.78rem', display: 'block', marginTop: '0.3rem' }}>{errors[name]}</span>
    : null

  if (submitted) return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: 'var(--primary-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '560px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(201,162,39,0.1)', border: '2px solid rgba(201,162,39,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1.5rem' }}>🐾</div>
          <h1 style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '2rem' }}>Application Submitted!</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Thank you for applying to adopt a CCR Kennels Cane Corso. We have received your application and will review it carefully. Expect to hear from us at <strong style={{ color: 'var(--text-light)' }}>ccrkennels2022@gmail.com</strong> within 48–72 hours.
          </p>
          <a href="/" style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: 'var(--accent-gold)', color: '#000', fontFamily: 'Cinzel,serif', fontWeight: 700, textDecoration: 'none', borderRadius: '4px', letterSpacing: '0.05em' }}>
            Return Home
          </a>
        </div>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: 'var(--primary-black)', padding: '6rem 1rem 4rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* ── Header ── */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>CCR Kennels of Southern Illinois</span>
            <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', margin: '0.5rem 0 1rem', color: 'var(--text-light)' }}>
              Puppy Adoption Application
            </h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', lineHeight: '1.8', fontSize: '0.95rem' }}>
              Complete all sections below to begin your journey to welcoming a CCR Kennels Cane Corso into your family. Fields marked <span style={{ color: 'var(--accent-gold)' }}>*</span> are required.
            </p>
          </div>

          {/* ── Step indicators ── */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`, gap: '0.5rem', marginBottom: '2.5rem' }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 0.4rem',
                  background: i < step ? 'var(--accent-gold)' : i === step ? 'rgba(201,162,39,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `2px solid ${i <= step ? 'var(--accent-gold)' : 'rgba(201,162,39,0.15)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: i < step ? '1rem' : '0.85rem',
                  color: i < step ? '#000' : i === step ? 'var(--accent-gold)' : '#444',
                  transition: 'all 0.3s', fontWeight: 700,
                }}>
                  {i < step ? '✓' : s.icon}
                </div>
                <div style={{ fontSize: '0.65rem', color: i === step ? 'var(--accent-gold)' : '#444', letterSpacing: '0.04em', fontFamily: 'Cinzel,serif' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* progress bar */}
          <div style={{ height: '2px', background: 'rgba(201,162,39,0.1)', borderRadius: '2px', marginBottom: '2rem' }}>
            <div style={{ height: '100%', background: 'var(--accent-gold)', borderRadius: '2px', width: `${(step / (STEPS.length - 1)) * 100}%`, transition: 'width 0.4s ease' }} />
          </div>

          {/* ── Form ── */}
          <form ref={formRef} name="adoption-application" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="adoption-application" />
            <input type="hidden" name="signature" value={sigData} />
            <p style={{ display: 'none' }}><label>Do not fill: <input name="bot-field" /></label></p>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,162,39,0.12)', borderRadius: '12px', padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.5rem' }}>

              {/* step header */}
              <h2 style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '1.1rem', marginBottom: '1.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(201,162,39,0.2)', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{STEPS[step].icon}</span>
                Step {step + 1} of {STEPS.length} — {STEPS[step].label}
              </h2>

              {/* ── STEP 0: Personal Info ── */}
              {step === 0 && <>
                <InfoBox>We conduct a thorough review of each application to ensure our Cane Corsos are placed in the right homes. All information is kept confidential.</InfoBox>
                <Row>
                  <Field label="First Name *" name="firstName" err={E('firstName')} />
                  <Field label="Last Name *" name="lastName" err={E('lastName')} />
                </Row>
                <Row>
                  <Field label="Date of Birth *" name="dateOfBirth" type="date" err={E('dateOfBirth')} />
                  <Field label="Occupation" name="occupation" />
                </Row>
                <Field label="Street Address *" name="address" err={E('address')} />
                <Row>
                  <Field label="City *" name="city" err={E('city')} />
                  <Field label="State *" name="state" placeholder="IL" err={E('state')} />
                  <Field label="ZIP *" name="zip" err={E('zip')} />
                </Row>
                <Row>
                  <Field label="Phone Number *" name="phone" type="tel" err={E('phone')} />
                  <Field label="Email Address *" name="email" type="email" err={E('email')} />
                </Row>
                <Field label="Secondary Contact (name & relationship)" name="secondaryContact" />
              </>}

              {/* ── STEP 1: Housing ── */}
              {step === 1 && <>
                <InfoBox>Cane Corsos are large, active dogs (90–130 lbs). A secure environment and committed daily routine are essential for this breed.</InfoBox>
                <Select label="Type of Home *" name="homeType" err={E('homeType')} options={[['own-house','Own – House'],['rent-house','Rent – House'],['own-condo','Own – Condo/Townhouse'],['rent-condo','Rent – Condo/Townhouse'],['apartment','Apartment'],['other','Other']]} />
                <Field label="If renting, does your landlord allow large breed dogs (90–130 lbs)?" name="landlordApproval" placeholder="N/A if you own" />
                <Select label="Do you have a fenced yard? *" name="fencedYard" err={E('fencedYard')} options={[['yes-full','Yes – fully fenced'],['yes-partial','Yes – partially fenced'],['no','No fenced yard']]} />
                <Field label="If fenced, fence height and type" name="fenceDetails" placeholder="e.g. 6ft wood privacy fence" />
                <Row>
                  <Field label="Adults in household *" name="adultCount" type="number" err={E('adultCount')} />
                  <Field label="Children in household" name="childCount" type="number" />
                </Row>
                <Field label="Ages of any children" name="childAges" placeholder="e.g. 5, 9, 14 – or N/A" />
                <Select label="Hours left alone per day *" name="hoursAlonePerDay" err={E('hoursAlonePerDay')} options={[['0-2','0–2 hours'],['2-4','2–4 hours'],['4-6','4–6 hours'],['6-8','6–8 hours'],['8+','More than 8 hours']]} />
                <Select label="Where will the dog sleep? *" name="dogSleepLocation" err={E('dogSleepLocation')} options={[['bedroom','In the bedroom (on/near bed)'],['crate-bedroom','Crate in bedroom'],['crate-other','Crate in another room'],['indoor-free','Free roam indoors'],['outdoor','Outdoors'],['other','Other']]} />
                <Select label="Where will the dog spend most of the day?" name="dogDayLocation" options={[['indoor-free','Free roam indoors'],['crate','In a crate'],['yard','In the yard'],['other','Other']]} />
                <Textarea label="Describe your daily routine and how a dog fits into it" name="dailyRoutine" rows={3} />
              </>}

              {/* ── STEP 2: Dog Experience ── */}
              {step === 2 && <>
                <InfoBox>Cane Corsos require experienced, confident owners. Please be honest — this helps us match the right puppy temperament to your lifestyle.</InfoBox>
                <Select label="Have you previously owned a Cane Corso?" name="ownedCaneCorso" options={[['yes','Yes'],['no','No']]} />
                <Select label="Have you owned large breed dogs (50 lbs+)? *" name="ownedLargeBreed" err={E('ownedLargeBreed')} options={[['yes','Yes – extensive experience'],['some','Yes – some experience'],['no','No – first large breed']]} />
                <Field label="Previous dog breeds you have owned" name="previousBreeds" placeholder="e.g. German Shepherd, Rottweiler, Labrador" />
                <Textarea label="Current pets (type, breed, age, sex)" name="currentPets" placeholder="e.g. 1 neutered male Labrador age 4; 1 spayed female cat age 2 – or 'None'" rows={3} />
                <Select label="Are your current pets spayed/neutered?" name="petsSterilized" options={[['all','All spayed/neutered'],['some','Some are'],['no','No'],['none','No current pets']]} />
                <Row>
                  <Field label="Veterinarian Name & Clinic" name="vetName" placeholder="Dr. Smith – Animal Clinic" />
                  <Field label="Veterinarian Phone" name="vetPhone" type="tel" />
                </Row>
                <Textarea label="Exercise plan for the dog (1–2 hrs daily required) *" name="exercisePlan" err={E('exercisePlan')} rows={3} placeholder="e.g. Morning and evening walks, backyard play, weekend hikes..." />
                <Textarea label="Why do you want a Cane Corso specifically? *" name="whyCaneCorso" err={E('whyCaneCorso')} rows={4} placeholder="Tell us why this breed is the right fit for your lifestyle..." />
                <Textarea label="Any additional information you'd like us to know" name="additionalInfo" rows={3} />
              </>}

              {/* ── STEP 3: Puppy Preferences ── */}
              {step === 3 && <>
                <InfoBox>Let us know your preferences. We will do our best to match you with the right puppy — temperament and fit always come first.</InfoBox>
                <Row>
                  <Select label="Sex preference *" name="sexPreference" err={E('sexPreference')} options={[['male','Male'],['female','Female'],['no-pref','No preference']]} />
                  <Select label="Color preference" name="colorPreference" options={[['no-pref','No preference'],['black','Black'],['gray','Gray/Blue'],['fawn','Fawn'],['brindle','Brindle'],['chocolate','Chocolate'],['other','Other']]} />
                </Row>
                <Row>
                  <Select label="Ear preference" name="earPreference" options={[['natural','Natural ears'],['cropped','Cropped ears'],['no-pref','No preference']]} />
                  <Select label="Primary purpose *" name="purpose" err={E('purpose')} options={[['companion','Family companion/pet'],['protection','Personal/family protection'],['show','Show/conformation'],['working','Working/sport'],['breeding','Future breeding (approved only)']]} />
                </Row>
                <Select label="Desired timeline" name="timeline" options={[['asap','As soon as possible'],['3months','Within 3 months'],['6months','Within 6 months'],['1year','Within a year'],['flexible','Flexible']]} />
                <Textarea label="Anything specific you're looking for in a puppy (temperament, drive, energy level, etc.)" name="puppyDetails" rows={3} />
              </>}

              {/* ── STEP 4: Agreements ── */}
              {step === 4 && <>
                <InfoBox>Please read and agree to each condition. All five are required to complete your application.</InfoBox>
                {[
                  { name: 'agreeSpayNeuter', text: 'I agree to spay or neuter my puppy by 18 months of age unless a separate breeding agreement is signed with CCR Kennels.' },
                  { name: 'agreeNoChaining', text: 'I agree never to chain, tether, or leave this dog as a permanent outdoor or guard dog. The dog will be kept as a house and family member.' },
                  { name: 'agreeVetCare',    text: 'I agree to maintain regular veterinary care including vaccinations, annual wellness exams, and prompt medical attention when needed.' },
                  { name: 'agreeReturn',     text: 'I agree that if I am ever unable to keep this dog, I will contact CCR Kennels FIRST and give them right of first refusal before rehoming or surrendering to a shelter.' },
                  { name: 'agreeResponsibility', text: 'I understand a Cane Corso is a large, powerful, intelligent breed requiring experienced, consistent ownership. I accept full responsibility for the care, training, and socialization of this animal.' },
                ].map(({ name, text }, i) => (
                  <div key={name} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: errors[name] ? 'rgba(224,82,82,0.05)' : 'rgba(255,255,255,0.02)', border: `1px solid ${errors[name] ? 'rgba(224,82,82,0.4)' : 'rgba(201,162,39,0.12)'}`, borderRadius: '10px', padding: '1.1rem 1.25rem', marginBottom: '0.75rem' }}>
                    <div style={{ minWidth: '26px', height: '26px', borderRadius: '50%', background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', color: 'var(--accent-gold)', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>{i + 1}</div>
                    <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', alignItems: 'flex-start', flex: 1 }}>
                      <input type="checkbox" name={name} value="agreed" style={{ marginTop: '3px', accentColor: 'var(--accent-gold)', width: '16px', height: '16px', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.7' }}>{text}</span>
                    </label>
                    {E(name)}
                  </div>
                ))}
              </>}

              {/* ── STEP 5: Signature ── */}
              {step === 5 && <>
                <InfoBox>By signing below you certify all information is accurate and complete, and that you agree to all conditions stated above.</InfoBox>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={LBL}>
                    Draw Your Signature *
                    <span style={{ fontSize: '0.75rem', color: '#555', marginLeft: '0.5rem', fontWeight: 400 }}>use mouse or finger</span>
                  </label>
                  <div style={{ position: 'relative', border: `2px solid ${hasSig ? 'var(--accent-gold)' : errors['signature'] ? 'rgba(224,82,82,0.6)' : 'rgba(201,162,39,0.2)'}`, borderRadius: '10px', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', cursor: 'crosshair', transition: 'border-color 0.3s' }}>
                    <canvas ref={canvasRef} width={800} height={160} style={{ display: 'block', width: '100%', height: '160px', touchAction: 'none' }} />
                    <button type="button" onClick={clearSig} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(201,162,39,0.3)', color: '#888', padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer', fontFamily: 'Raleway,sans-serif' }}>Clear</button>
                    {!hasSig && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', color: 'rgba(201,162,39,0.15)', fontFamily: 'Cinzel,serif', fontSize: '1.1rem', letterSpacing: '0.1em' }}>Sign here</div>}
                  </div>
                  {E('signature')}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={LBL}>Date</label>
                  <input type="text" name="signatureDate" readOnly value={today} style={{ ...INP, background: 'rgba(201,162,39,0.04)', color: 'var(--accent-gold)', cursor: 'default' }} />
                </div>

                <div style={{ background: 'rgba(201,162,39,0.05)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '10px', padding: '1.25rem' }}>
                  <div style={{ fontFamily: 'Cinzel,serif', color: 'var(--accent-gold)', fontSize: '0.82rem', marginBottom: '0.4rem', letterSpacing: '0.06em' }}>LEGAL NOTICE</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.8', margin: 0 }}>
                    This electronic signature is legally binding under the Electronic Signatures in Global and National Commerce Act (ESIGN) and the Uniform Electronic Transactions Act (UETA). By drawing your signature above, you agree it constitutes your legal signature on this adoption application and all agreements contained herein.
                  </p>
                </div>
              </>}

            </div>

            {/* ── Navigation ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <button type="button" onClick={back} disabled={step === 0} style={{ padding: '0.85rem 2rem', background: 'transparent', border: '1px solid rgba(201,162,39,0.3)', color: step === 0 ? '#333' : 'var(--accent-gold)', borderRadius: '6px', fontFamily: 'Cinzel,serif', fontSize: '0.88rem', cursor: step === 0 ? 'default' : 'pointer', letterSpacing: '0.05em', transition: 'all 0.3s' }}>
                ← Back
              </button>
              <div style={{ color: '#444', fontSize: '0.78rem', fontFamily: 'Cinzel,serif' }}>{step + 1} / {STEPS.length}</div>
              {step < STEPS.length - 1
                ? <button type="button" onClick={next} style={{ padding: '0.85rem 2.5rem', background: 'var(--accent-gold)', color: '#000', border: 'none', borderRadius: '6px', fontFamily: 'Cinzel,serif', fontSize: '0.92rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em', transition: 'all 0.3s' }}>Continue →</button>
                : <>
                    <div data-netlify-recaptcha="true" style={{ marginBottom: '1rem' }} />
                    <button type="submit" style={{ padding: '0.85rem 2.5rem', background: 'var(--accent-gold)', color: '#000', border: 'none', borderRadius: '6px', fontFamily: 'Cinzel,serif', fontSize: '0.92rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Submit Application 🐾</button>
                  </>
              }
            </div>
          </form>

        </div>
      </div>
      <Footer />
    </>
  )
}

/* ── Shared styles ── */
const LBL: React.CSSProperties = { display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.4rem', letterSpacing: '0.05em' }
const INP: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '6px', color: 'var(--text-light)', fontSize: '0.92rem', fontFamily: 'Raleway,sans-serif', outline: 'none' }

/* ── Sub-components ── */
function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(201,162,39,0.05)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
      <span style={{ color: 'var(--accent-gold)', fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>ℹ️</span>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.7', margin: 0 }}>{children}</p>
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem' }}>{children}</div>
}

function Field({ label, name, type = 'text', placeholder = '', err }: { label: string; name: string; type?: string; placeholder?: string; err?: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label htmlFor={name} style={LBL}>{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} style={{ ...INP, borderColor: err ? 'rgba(224,82,82,0.5)' : 'rgba(201,162,39,0.2)' }} />
      {err}
    </div>
  )
}

function Select({ label, name, options, err }: { label: string; name: string; options: [string, string][]; err?: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label htmlFor={name} style={LBL}>{label}</label>
      <select id={name} name={name} style={{ ...INP, cursor: 'pointer', borderColor: err ? 'rgba(224,82,82,0.5)' : 'rgba(201,162,39,0.2)' }}>
        <option value="">Select…</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      {err}
    </div>
  )
}

function Textarea({ label, name, rows = 4, placeholder = '', err }: { label: string; name: string; rows?: number; placeholder?: string; err?: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label htmlFor={name} style={LBL}>{label}</label>
      <textarea id={name} name={name} rows={rows} placeholder={placeholder} style={{ ...INP, resize: 'vertical', minHeight: `${rows * 1.6}rem`, borderColor: err ? 'rgba(224,82,82,0.5)' : 'rgba(201,162,39,0.2)' }} />
      {err}
    </div>
  )
}
