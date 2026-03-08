'use client'

import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const SECTIONS = ['Personal Info', 'Housing & Lifestyle', 'Dog Experience', 'Puppy Preferences', 'Agreements', 'Signature']

export default function AdoptionApplication() {
  const [step, setStep]           = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]       = useState<Record<string, string>>({})
  const formRef                   = useRef<HTMLFormElement>(null)

  // Signature canvas
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const drawing     = useRef(false)
  const lastPos     = useRef<{x:number;y:number}|null>(null)
  const [hasSig, setHasSig] = useState(false)
  const [sigData, setSigData] = useState('')
  const [today, setToday]    = useState('')

  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }))
  }, [])

  // Canvas drawing helpers
  function getPos(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.strokeStyle = '#c9a227'
    ctx.lineWidth   = 2.5
    ctx.lineCap     = 'round'
    ctx.lineJoin    = 'round'

    const onDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      drawing.current = true
      lastPos.current = getPos(e, canvas)
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!drawing.current || !lastPos.current) return
      e.preventDefault()
      const pos = getPos(e, canvas)
      ctx.beginPath()
      ctx.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      lastPos.current = pos
      setHasSig(true)
    }
    const onUp = () => {
      drawing.current = false
      lastPos.current = null
      setSigData(canvas.toDataURL())
    }

    canvas.addEventListener('mousedown',  onDown,  { passive: false })
    canvas.addEventListener('mousemove',  onMove,  { passive: false })
    canvas.addEventListener('mouseup',    onUp)
    canvas.addEventListener('mouseleave', onUp)
    canvas.addEventListener('touchstart', onDown,  { passive: false })
    canvas.addEventListener('touchmove',  onMove,  { passive: false })
    canvas.addEventListener('touchend',   onUp)
    return () => {
      canvas.removeEventListener('mousedown',  onDown)
      canvas.removeEventListener('mousemove',  onMove)
      canvas.removeEventListener('mouseup',    onUp)
      canvas.removeEventListener('mouseleave', onUp)
      canvas.removeEventListener('touchstart', onDown)
      canvas.removeEventListener('touchmove',  onMove)
      canvas.removeEventListener('touchend',   onUp)
    }
  }, [])

  function clearSig() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
    setHasSig(false)
    setSigData('')
  }

  function validateStep(s: number): boolean {
    const form = formRef.current
    if (!form) return true
    const errs: Record<string, string> = {}

    const req = (name: string, label: string) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
      if (!el || !el.value.trim()) errs[name] = `${label} is required`
    }

    if (s === 0) {
      req('firstName',   'First name')
      req('lastName',    'Last name')
      req('dateOfBirth', 'Date of birth')
      req('address',     'Address')
      req('city',        'City')
      req('state',       'State')
      req('zip',         'ZIP code')
      req('phone',       'Phone number')
      req('email',       'Email')
    }
    if (s === 1) {
      req('homeType',       'Housing type')
      req('fencedYard',     'Fenced yard')
      req('adultCount',     'Number of adults')
      req('hoursAlonePerDay','Hours alone per day')
      req('dogSleepLocation','Where the dog will sleep')
    }
    if (s === 2) {
      req('ownedLargeBreed', 'Large breed experience')
      req('exercisePlan',    'Exercise plan')
      req('whyCaneCorso',    'Why a Cane Corso')
    }
    if (s === 3) {
      req('sexPreference', 'Sex preference')
      req('purpose',       'Primary purpose')
    }
    if (s === 4) {
      const boxes = ['agreeSpayNeuter','agreeNoChaining','agreeVetCare','agreeReturn','agreeResponsibility']
      boxes.forEach(b => {
        const el = form.elements.namedItem(b) as HTMLInputElement | null
        if (!el?.checked) errs[b] = 'You must agree to this condition'
      })
    }
    if (s === 5) {
      if (!hasSig) errs['signature'] = 'Please draw your signature'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function next() {
    if (validateStep(step)) setStep(s => Math.min(s + 1, SECTIONS.length - 1))
  }
  function back() { setStep(s => Math.max(s - 1, 0)) }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validateStep(step)) return
    const form = e.currentTarget
    const data = new FormData(form)
    if (sigData) data.set('signature', sigData)

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
    })
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const err = (name: string) => errors[name]
    ? <span style={{ color:'#e74c3c', fontSize:'0.8rem', display:'block', marginTop:'0.25rem' }}>{errors[name]}</span>
    : null

  if (submitted) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'6rem 1rem 2rem', background:'var(--primary-black)' }}>
          <div style={{ textAlign:'center', maxWidth:'560px' }}>
            <div style={{ fontSize:'4rem', marginBottom:'1.5rem' }}>🐾</div>
            <h1 style={{ fontFamily:'Cinzel,serif', color:'var(--accent-gold)', marginBottom:'1rem', fontSize:'2rem' }}>Application Submitted!</h1>
            <p style={{ color:'var(--text-muted)', lineHeight:'1.8', marginBottom:'2rem' }}>
              Thank you for applying to adopt a CCR Kennels Cane Corso. We have received your application
              and will review it carefully. You can expect to hear from us at <strong style={{color:'var(--text-light)'}}>ccrkennels2022@gmail.com</strong> within 48–72 hours.
            </p>
            <a href="/" className="cta-btn" style={{ display:'inline-block', padding:'0.9rem 2.5rem', background:'var(--accent-gold)', color:'#000', fontFamily:'Cinzel,serif', fontWeight:700, textDecoration:'none', borderRadius:'4px', letterSpacing:'0.05em' }}>
              Return Home
            </a>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight:'100vh', background:'var(--primary-black)', padding:'6rem 1rem 4rem' }}>
        <div style={{ maxWidth:'820px', margin:'0 auto' }}>

          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span style={{ fontFamily:'Cinzel,serif', color:'var(--accent-gold)', fontSize:'0.85rem', letterSpacing:'0.2em', textTransform:'uppercase' }}>CCR Kennels</span>
            <h1 style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(1.8rem,4vw,2.8rem)', margin:'0.5rem 0 1rem', color:'var(--text-light)' }}>
              Adoption Application
            </h1>
            <p style={{ color:'var(--text-muted)', maxWidth:'600px', margin:'0 auto', lineHeight:'1.8' }}>
              Complete this form to begin your journey to welcoming a CCR Kennels Cane Corso into your family.
              All fields marked with <span style={{color:'var(--accent-gold)'}}>*</span> are required.
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom:'2.5rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem' }}>
              {SECTIONS.map((s, i) => (
                <div key={i} style={{ flex:1, textAlign:'center' }}>
                  <div style={{
                    width:'32px', height:'32px', borderRadius:'50%', margin:'0 auto 0.4rem',
                    background: i < step ? 'var(--accent-gold)' : i === step ? 'var(--accent-gold)' : 'rgba(201,162,39,0.15)',
                    border: `2px solid ${i <= step ? 'var(--accent-gold)' : 'rgba(201,162,39,0.2)'}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.8rem', fontWeight:700,
                    color: i <= step ? '#000' : 'rgba(201,162,39,0.4)',
                    transition:'all 0.3s'
                  }}>{i < step ? '✓' : i + 1}</div>
                  <div style={{ fontSize:'0.65rem', color: i <= step ? 'var(--accent-gold)' : 'var(--text-muted)', letterSpacing:'0.05em', display:'none' }} className="step-label">{s}</div>
                </div>
              ))}
            </div>
            <div style={{ height:'3px', background:'rgba(201,162,39,0.15)', borderRadius:'2px', position:'relative' }}>
              <div style={{ height:'100%', background:'var(--accent-gold)', borderRadius:'2px', width:`${(step/(SECTIONS.length-1))*100}%`, transition:'width 0.4s ease' }} />
            </div>
            <div style={{ textAlign:'center', marginTop:'0.75rem', color:'var(--accent-gold)', fontSize:'0.85rem', fontFamily:'Cinzel,serif' }}>
              Step {step + 1} of {SECTIONS.length}: {SECTIONS[step]}
            </div>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            id="adoptionForm"
            name="adoption-application"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="adoption-application" />
            <input type="hidden" name="signature" value={sigData} />
            <p style={{ display:'none' }}><label>Do not fill: <input name="bot-field" /></label></p>

            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(201,162,39,0.15)', borderRadius:'12px', padding:'clamp(1.5rem,4vw,2.5rem)' }}>

              {/* ── STEP 0: Personal Info ── */}
              {step === 0 && (
                <div>
                  <h2 style={sh}>Personal Information</h2>
                  <div style={row}>
                    <Field label="First Name *" name="firstName" required err={err('firstName')} />
                    <Field label="Last Name *" name="lastName" required err={err('lastName')} />
                  </div>
                  <div style={row}>
                    <Field label="Date of Birth *" name="dateOfBirth" type="date" required err={err('dateOfBirth')} />
                    <Field label="Occupation" name="occupation" err={err('occupation')} />
                  </div>
                  <Field label="Street Address *" name="address" required err={err('address')} />
                  <div style={row}>
                    <Field label="City *" name="city" required err={err('city')} />
                    <Field label="State *" name="state" placeholder="IL" required err={err('state')} />
                    <Field label="ZIP *" name="zip" required err={err('zip')} />
                  </div>
                  <div style={row}>
                    <Field label="Phone Number *" name="phone" type="tel" required err={err('phone')} />
                    <Field label="Email Address *" name="email" type="email" required err={err('email')} />
                  </div>
                  <Field label="Secondary Contact (name & relationship)" name="secondaryContact" err={err('secondaryContact')} />
                </div>
              )}

              {/* ── STEP 1: Housing & Lifestyle ── */}
              {step === 1 && (
                <div>
                  <h2 style={sh}>Housing &amp; Lifestyle</h2>
                  <SelectField label="Type of Home *" name="homeType" required err={err('homeType')} options={[
                    ['own-house','Own – House'],['rent-house','Rent – House'],
                    ['own-condo','Own – Condo/Townhouse'],['rent-condo','Rent – Condo/Townhouse'],
                    ['apartment','Apartment'],['other','Other'],
                  ]} />
                  <Field label="If renting, does your landlord allow large breed dogs (90–130 lbs)? Please specify." name="landlordApproval" placeholder="N/A if you own" err={err('landlordApproval')} />
                  <SelectField label="Do you have a fenced yard? *" name="fencedYard" required err={err('fencedYard')} options={[
                    ['yes-full','Yes – fully fenced'],['yes-partial','Yes – partially fenced'],['no','No fenced yard'],
                  ]} />
                  <Field label="If fenced, fence height and type (e.g. 6ft wood privacy)" name="fenceDetails" err={err('fenceDetails')} />
                  <div style={row}>
                    <Field label="Number of adults in household *" name="adultCount" type="number" required err={err('adultCount')} />
                    <Field label="Number of children in household" name="childCount" type="number" err={err('childCount')} />
                  </div>
                  <Field label="Ages of any children" name="childAges" placeholder="e.g. 5, 9, 14 – or N/A" err={err('childAges')} />
                  <SelectField label="How many hours per day would the dog be left alone? *" name="hoursAlonePerDay" required err={err('hoursAlonePerDay')} options={[
                    ['0-2','0–2 hours'],['2-4','2–4 hours'],['4-6','4–6 hours'],['6-8','6–8 hours'],['8+','More than 8 hours'],
                  ]} />
                  <SelectField label="Where will the dog sleep? *" name="dogSleepLocation" required err={err('dogSleepLocation')} options={[
                    ['bedroom','In the bedroom (on/near bed)'],['crate-bedroom','Crate in bedroom'],
                    ['crate-other','Crate in another room'],['indoor-free','Free roam indoors'],['outdoor','Outdoors'],['other','Other'],
                  ]} />
                  <SelectField label="Where will the dog spend most of the day?" name="dogDayLocation" options={[
                    ['indoor-free','Free roam indoors'],['crate','In a crate'],['yard','In the yard'],['other','Other'],
                  ]} />
                  <TextareaField label="Describe your daily routine and how a dog fits into it" name="dailyRoutine" rows={3} err={err('dailyRoutine')} />
                </div>
              )}

              {/* ── STEP 2: Dog Experience ── */}
              {step === 2 && (
                <div>
                  <h2 style={sh}>Experience with Dogs</h2>
                  <SelectField label="Have you previously owned a Cane Corso?" name="ownedCaneCorso" options={[
                    ['yes','Yes'],['no','No'],
                  ]} />
                  <SelectField label="Have you owned large breed dogs (50 lbs+)? *" name="ownedLargeBreed" required err={err('ownedLargeBreed')} options={[
                    ['yes','Yes – extensive experience'],['some','Yes – some experience'],['no','No – first large breed'],
                  ]} />
                  <Field label="List any previous dog breeds you have owned" name="previousBreeds" placeholder="e.g. German Shepherd, Rottweiler, Labrador" err={err('previousBreeds')} />
                  <TextareaField label="Current pets (include type, breed, age, and sex)" name="currentPets" placeholder="e.g. 1 neutered male Labrador, age 4; 1 spayed female cat, age 2 – or 'None'" rows={3} err={err('currentPets')} />
                  <SelectField label="Are your current pets spayed/neutered?" name="petsSterilized" options={[
                    ['all','All are spayed/neutered'],['some','Some are'],['no','No'],['none','No current pets'],
                  ]} />
                  <Field label="Veterinarian Name & Clinic" name="vetName" placeholder="Dr. Smith – Centralia Animal Clinic" err={err('vetName')} />
                  <Field label="Veterinarian Phone Number" name="vetPhone" type="tel" err={err('vetPhone')} />
                  <TextareaField label="Exercise plan for the dog (Cane Corsos need 1–2 hrs daily) *" name="exercisePlan" required rows={3} placeholder="e.g. Morning and evening walks, backyard play, weekend hikes..." err={err('exercisePlan')} />
                  <TextareaField label="Why do you want a Cane Corso specifically? *" name="whyCaneCorso" required rows={4} placeholder="Tell us why this breed is the right fit for your lifestyle..." err={err('whyCaneCorso')} />
                  <TextareaField label="Any additional information you'd like us to know" name="additionalInfo" rows={3} err={err('additionalInfo')} />
                </div>
              )}

              {/* ── STEP 3: Puppy Preferences ── */}
              {step === 3 && (
                <div>
                  <h2 style={sh}>Puppy Preferences</h2>
                  <SelectField label="Sex preference *" name="sexPreference" required err={err('sexPreference')} options={[
                    ['male','Male'],['female','Female'],['no-pref','No preference'],
                  ]} />
                  <SelectField label="Color preference" name="colorPreference" options={[
                    ['no-pref','No preference'],['black','Black'],['gray','Gray/Blue'],
                    ['fawn','Fawn'],['brindle','Brindle'],['chocolate','Chocolate'],['other','Other'],
                  ]} />
                  <SelectField label="Ear preference" name="earPreference" options={[
                    ['natural','Natural ears'],['cropped','Cropped ears'],['no-pref','No preference'],
                  ]} />
                  <SelectField label="Primary purpose *" name="purpose" required err={err('purpose')} options={[
                    ['companion','Family companion/pet'],['protection','Personal/family protection'],
                    ['show','Show/conformation'],['working','Working/sport (IPO, weight pull, etc.)'],
                    ['breeding','Future breeding (approved program only)'],['multi','Multiple purposes'],
                  ]} />
                  <SelectField label="When are you hoping to get your puppy?" name="timeline" options={[
                    ['asap','As soon as possible'],['3months','Within 3 months'],
                    ['6months','Within 6 months'],['1year','Within a year'],['flexible','Flexible'],
                  ]} />
                  <TextareaField label="Anything specific you're looking for in a puppy (temperament, drive, energy level, etc.)" name="puppyDetails" rows={3} />
                </div>
              )}

              {/* ── STEP 4: Agreements ── */}
              {step === 4 && (
                <div>
                  <h2 style={sh}>Agreements &amp; Acknowledgments</h2>
                  <p style={{ color:'var(--text-muted)', marginBottom:'1.5rem', fontSize:'0.9rem', lineHeight:'1.8' }}>
                    Please read and agree to each of the following conditions. All are required to submit your application.
                  </p>
                  <CheckField name="agreeSpayNeuter" err={err('agreeSpayNeuter')} label={
                    <>I agree to spay or neuter my puppy by 18 months of age unless a separate breeding agreement is signed with CCR Kennels.</>
                  } />
                  <CheckField name="agreeNoChaining" err={err('agreeNoChaining')} label={
                    <>I agree never to chain, tether, or leave this dog as a permanent outdoor/guard dog. The dog will be kept as a house/family member.</>
                  } />
                  <CheckField name="agreeVetCare" err={err('agreeVetCare')} label={
                    <>I agree to maintain regular veterinary care including vaccinations, annual wellness exams, and prompt medical attention when needed.</>
                  } />
                  <CheckField name="agreeReturn" err={err('agreeReturn')} label={
                    <>I agree that if I am ever unable to keep this dog for any reason, I will contact CCR Kennels FIRST and give them the right of first refusal before rehoming or surrendering to a shelter.</>
                  } />
                  <CheckField name="agreeResponsibility" err={err('agreeResponsibility')} label={
                    <>I understand that a Cane Corso is a large, powerful, and intelligent breed that requires experienced, consistent ownership. I accept full responsibility for the care, training, and socialization of this animal.</>
                  } />
                </div>
              )}

              {/* ── STEP 5: Signature ── */}
              {step === 5 && (
                <div>
                  <h2 style={sh}>Electronic Signature</h2>
                  <p style={{ color:'var(--text-muted)', marginBottom:'1.5rem', fontSize:'0.9rem', lineHeight:'1.8' }}>
                    By signing below, you certify that all information provided in this application is accurate and complete, and that you agree to the conditions stated above.
                  </p>

                  {/* Signature pad */}
                  <div style={{ marginBottom:'1.5rem' }}>
                    <label style={lbl}>
                      Draw Your Signature *
                      <span style={{ fontSize:'0.75rem', color:'var(--text-muted)', marginLeft:'0.5rem', fontWeight:400 }}>(use mouse or finger on touch screen)</span>
                    </label>
                    <div style={{ position:'relative', border:`2px solid ${hasSig ? 'var(--accent-gold)' : 'rgba(201,162,39,0.3)'}`, borderRadius:'8px', overflow:'hidden', background:'rgba(255,255,255,0.02)', cursor:'crosshair' }}>
                      <canvas
                        ref={canvasRef}
                        width={760}
                        height={160}
                        style={{ display:'block', width:'100%', height:'160px', touchAction:'none' }}
                      />
                      <button
                        type="button"
                        onClick={clearSig}
                        style={{ position:'absolute', top:'8px', right:'8px', background:'rgba(0,0,0,0.6)', border:'1px solid rgba(201,162,39,0.3)', color:'var(--text-muted)', padding:'4px 10px', borderRadius:'4px', fontSize:'0.75rem', cursor:'pointer' }}
                      >
                        Clear
                      </button>
                      {!hasSig && (
                        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none', color:'rgba(201,162,39,0.2)', fontFamily:'Cinzel,serif', fontSize:'1.1rem', letterSpacing:'0.1em' }}>
                          Sign here
                        </div>
                      )}
                    </div>
                    {err('signature')}
                  </div>

                  {/* Date */}
                  <div style={{ marginBottom:'1.5rem' }}>
                    <label style={lbl}>Date</label>
                    <input
                      type="text"
                      name="signatureDate"
                      readOnly
                      value={today}
                      style={{ ...inp, background:'rgba(255,255,255,0.03)', cursor:'default', color:'var(--accent-gold)' }}
                    />
                  </div>

                  {/* Declaration */}
                  <div style={{ background:'rgba(201,162,39,0.05)', border:'1px solid rgba(201,162,39,0.2)', borderRadius:'8px', padding:'1.25rem', marginTop:'1.5rem' }}>
                    <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', lineHeight:'1.8', margin:0 }}>
                      <strong style={{color:'var(--text-light)'}}>Legal Notice:</strong> This electronic signature is legally binding under the Electronic Signatures in Global and National Commerce Act (ESIGN) and the Uniform Electronic Transactions Act (UETA). By drawing your signature above, you agree that it constitutes your legal signature on this adoption application and all agreements contained herein.
                    </p>
                  </div>
                </div>
              )}

            </div>{/* end card */}

            {/* Navigation buttons */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'1.5rem', gap:'1rem' }}>
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                style={{ padding:'0.85rem 2rem', background:'transparent', border:'1px solid rgba(201,162,39,0.4)', color:'var(--accent-gold)', borderRadius:'4px', fontFamily:'Cinzel,serif', fontSize:'0.9rem', cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.3 : 1, letterSpacing:'0.05em', transition:'all 0.3s' }}
              >
                ← Back
              </button>

              {step < SECTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  style={{ padding:'0.85rem 2.5rem', background:'var(--accent-gold)', color:'#000', border:'none', borderRadius:'4px', fontFamily:'Cinzel,serif', fontSize:'0.95rem', fontWeight:700, cursor:'pointer', letterSpacing:'0.05em', transition:'all 0.3s' }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  style={{ padding:'0.85rem 2.5rem', background:'var(--accent-gold)', color:'#000', border:'none', borderRadius:'4px', fontFamily:'Cinzel,serif', fontSize:'0.95rem', fontWeight:700, cursor:'pointer', letterSpacing:'0.05em', transition:'all 0.3s', display:'flex', alignItems:'center', gap:'0.5rem' }}
                >
                  Submit Application 🐾
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

// ── Shared styles ────────────────────────────────────────────────
const sh: React.CSSProperties = {
  fontFamily: 'Cinzel,serif', color:'var(--accent-gold)', fontSize:'1.3rem',
  marginBottom:'1.5rem', paddingBottom:'0.75rem',
  borderBottom:'1px solid rgba(201,162,39,0.2)',
}
const row: React.CSSProperties = { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'1rem' }
const lbl: React.CSSProperties = { display:'block', color:'var(--text-muted)', fontSize:'0.85rem', marginBottom:'0.4rem', letterSpacing:'0.05em' }
const inp: React.CSSProperties = {
  width:'100%', padding:'0.75rem 1rem',
  background:'rgba(255,255,255,0.05)', border:'1px solid rgba(201,162,39,0.25)',
  borderRadius:'6px', color:'var(--text-light)', fontSize:'0.95rem',
  fontFamily:'Raleway,sans-serif', outline:'none',
}

// ── Sub-components ───────────────────────────────────────────────
function Field({ label, name, type='text', required=false, placeholder='', err }: {
  label:string; name:string; type?:string; required?:boolean; placeholder?:string; err?: React.ReactNode
}) {
  return (
    <div style={{ marginBottom:'1.25rem' }}>
      <label htmlFor={name} style={lbl}>{label}</label>
      <input
        id={name} name={name} type={type} required={required} placeholder={placeholder}
        style={{ ...inp, borderColor: err ? '#e74c3c' : 'rgba(201,162,39,0.25)' }}
      />
      {err}
    </div>
  )
}

function SelectField({ label, name, required=false, options, err }: {
  label:string; name:string; required?:boolean; options:[string,string][]; err?: React.ReactNode
}) {
  return (
    <div style={{ marginBottom:'1.25rem' }}>
      <label htmlFor={name} style={lbl}>{label}</label>
      <select
        id={name} name={name} required={required}
        style={{ ...inp, cursor:'pointer', borderColor: err ? '#e74c3c' : 'rgba(201,162,39,0.25)' }}
      >
        <option value="">Select…</option>
        {options.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      {err}
    </div>
  )
}

function TextareaField({ label, name, required=false, rows=4, placeholder='', err }: {
  label:string; name:string; required?:boolean; rows?:number; placeholder?:string; err?: React.ReactNode
}) {
  return (
    <div style={{ marginBottom:'1.25rem' }}>
      <label htmlFor={name} style={lbl}>{label}</label>
      <textarea
        id={name} name={name} required={required} rows={rows} placeholder={placeholder}
        style={{ ...inp, resize:'vertical', minHeight:`${rows * 1.6}rem`, borderColor: err ? '#e74c3c' : 'rgba(201,162,39,0.25)' }}
      />
      {err}
    </div>
  )
}

function CheckField({ name, label, err }: { name:string; label:React.ReactNode; err?: React.ReactNode }) {
  return (
    <div style={{ marginBottom:'1.25rem', padding:'1rem', background:'rgba(255,255,255,0.02)', border:`1px solid ${err ? '#e74c3c' : 'rgba(201,162,39,0.15)'}`, borderRadius:'8px' }}>
      <label style={{ display:'flex', gap:'0.75rem', cursor:'pointer', alignItems:'flex-start' }}>
        <input type="checkbox" name={name} value="agreed" style={{ marginTop:'3px', accentColor:'var(--accent-gold)', width:'16px', height:'16px', flexShrink:0 }} />
        <span style={{ color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.7' }}>{label}</span>
      </label>
      {err}
    </div>
  )
}
