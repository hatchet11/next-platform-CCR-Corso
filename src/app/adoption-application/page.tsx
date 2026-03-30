'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { SignaturePadRef } from '../../components/SignaturePad';

const SignaturePad = dynamic(() => import('../../components/SignaturePad'), { ssr: false });

const s = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    fontFamily: "'Raleway', sans-serif",
    color: '#fff',
    padding: '80px 20px 60px',
  } as React.CSSProperties,
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  } as React.CSSProperties,
  header: {
    textAlign: 'center' as const,
    marginBottom: '48px',
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: '2rem',
    color: '#c9a227',
    letterSpacing: '0.1em',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#aaa',
    fontSize: '0.95rem',
  },
  section: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    padding: '28px',
    marginBottom: '24px',
  } as React.CSSProperties,
  sectionTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: '1.05rem',
    color: '#c9a227',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #2a2a2a',
    letterSpacing: '0.05em',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  } as React.CSSProperties,
  grid1: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
  } as React.CSSProperties,
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontSize: '0.85rem',
    color: '#c9a227',
    fontWeight: '600',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },
  input: {
    background: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#fff',
    padding: '10px 14px',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
  } as React.CSSProperties,
  textarea: {
    background: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#fff',
    padding: '10px 14px',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    resize: 'vertical' as const,
    minHeight: '90px',
  } as React.CSSProperties,
  select: {
    background: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#fff',
    padding: '10px 14px',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
  } as React.CSSProperties,
  terms: {
    background: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '4px',
    padding: '16px',
    fontSize: '0.85rem',
    color: '#aaa',
    lineHeight: '1.7',
    maxHeight: '200px',
    overflowY: 'auto' as const,
    marginBottom: '16px',
  },
  checkRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginTop: '12px',
  },
  sigRow: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  clearBtn: {
    background: 'transparent',
    border: '1px solid #555',
    color: '#aaa',
    padding: '6px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    width: 'fit-content',
  } as React.CSSProperties,
  submitBtn: {
    background: 'linear-gradient(135deg, #c9a227, #a8861a)',
    border: 'none',
    color: '#000',
    padding: '14px 40px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '700',
    fontFamily: "'Cinzel', serif",
    letterSpacing: '0.05em',
    width: '100%',
    marginTop: '8px',
  } as React.CSSProperties,
  success: {
    background: '#1a2a1a',
    border: '1px solid #2a4a2a',
    borderRadius: '8px',
    padding: '32px',
    textAlign: 'center' as const,
    color: '#6fcf6f',
  },
  error: {
    background: '#2a1a1a',
    border: '1px solid #4a2a2a',
    borderRadius: '4px',
    padding: '12px 16px',
    color: '#cf6f6f',
    fontSize: '0.9rem',
    marginBottom: '16px',
  },
};

export default function AdoptionApplication() {
  const sigRef = useRef<SignaturePadRef>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    fullName: '', dob: '', phone: '', email: '',
    address: '', city: '', state: '', zip: '',
    ownsRents: '', dwellingType: '', fencedYard: '', fenceHeight: '',
    landlordAllows: '', landlordName: '', landlordPhone: '',
    numAdults: '', hasChildren: '', childrenAges: '',
    otherPets: '', otherPetsDetails: '',
    ownedDogBefore: '', previousDogs: '', ownedLargeBreed: '', familiarWithCorso: '',
    preferredSex: '', preferredColor: '', puppyPurpose: '',
    vetName: '', vetPhone: '', refName: '', refPhone: '',
    heardAboutUs: '', whyCorso: '', additionalInfo: '',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!agreed) { setError('Please agree to the terms before submitting.'); return; }
    if (!sigRef.current || sigRef.current.isEmpty()) { setError('Please provide your electronic signature.'); return; }
    const signature = sigRef.current.getSignature();
    setSubmitting(true);
    try {
      const res = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'Adoption Application',
          signerName: form.fullName,
          signerDate: new Date().toLocaleDateString(),
          signature,
          fields: {
            'Full Name': form.fullName,
            'Date of Birth': form.dob,
            'Phone': form.phone,
            'Email': form.email,
            'Address': form.address,
            'City': form.city,
            'State': form.state,
            'ZIP': form.zip,
            'Owns or Rents': form.ownsRents,
            'Dwelling Type': form.dwellingType,
            'Fenced Yard': form.fencedYard,
            'Fence Height': form.fenceHeight,
            'Landlord Allows Large Dogs': form.landlordAllows,
            'Landlord Name': form.landlordName,
            'Landlord Phone': form.landlordPhone,
            'Number of Adults in Household': form.numAdults,
            'Children in Household': form.hasChildren,
            'Ages of Children': form.childrenAges,
            'Other Pets': form.otherPets,
            'Other Pets Details': form.otherPetsDetails,
            'Owned a Dog Before': form.ownedDogBefore,
            'Previous Dogs Info': form.previousDogs,
            'Owned Large Breed': form.ownedLargeBreed,
            'Familiar with Cane Corso': form.familiarWithCorso,
            'Preferred Sex': form.preferredSex,
            'Preferred Color': form.preferredColor,
            'Puppy Purpose': form.puppyPurpose,
            'Veterinarian Name': form.vetName,
            'Veterinarian Phone': form.vetPhone,
            'Personal Reference Name': form.refName,
            'Personal Reference Phone': form.refPhone,
            'How Did You Hear About Us': form.heardAboutUs,
            'Why a Cane Corso': form.whyCorso,
            'Additional Information': form.additionalInfo,
          },
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError('Submission failed. Please try again or email us directly at ccrkennels2022@gmail.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div style={s.page}>
          <div style={s.container}>
            <div style={s.success}>
              <h2 style={{ fontFamily: "'Cinzel', serif", color: '#c9a227', marginBottom: '12px' }}>Application Submitted</h2>
              <p>Thank you, {form.fullName}! Your adoption application has been received. We will review it and respond within 24–48 hours.</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={s.page}>
        <div style={s.container}>
          <div style={s.header}>
            <h1 style={s.title}>Adoption Application</h1>
            <p style={s.subtitle}>CCR Kennels — Italian Cane Corso Breeder &nbsp;|&nbsp; Centralia, IL</p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Personal Information */}
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Personal Information</h2>
              <div style={{ ...s.grid2, marginBottom: '16px' }}>
                <div style={s.field}>
                  <label style={s.label}>Full Name *</label>
                  <input style={s.input} required value={form.fullName} onChange={set('fullName')} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Date of Birth *</label>
                  <input style={s.input} type="date" required value={form.dob} onChange={set('dob')} />
                </div>
              </div>
              <div style={{ ...s.grid2, marginBottom: '16px' }}>
                <div style={s.field}>
                  <label style={s.label}>Phone *</label>
                  <input style={s.input} type="tel" required value={form.phone} onChange={set('phone')} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Email *</label>
                  <input style={s.input} type="email" required value={form.email} onChange={set('email')} />
                </div>
              </div>
              <div style={{ ...s.grid1, marginBottom: '16px' }}>
                <div style={s.field}>
                  <label style={s.label}>Street Address *</label>
                  <input style={s.input} required value={form.address} onChange={set('address')} />
                </div>
              </div>
              <div style={s.grid2}>
                <div style={s.field}>
                  <label style={s.label}>City *</label>
                  <input style={s.input} required value={form.city} onChange={set('city')} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={s.field}>
                    <label style={s.label}>State *</label>
                    <input style={s.input} required value={form.state} onChange={set('state')} maxLength={2} placeholder="IL" />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>ZIP *</label>
                    <input style={s.input} required value={form.zip} onChange={set('zip')} />
                  </div>
                </div>
              </div>
            </div>

            {/* Housing */}
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Housing Situation</h2>
              <div style={{ ...s.grid2, marginBottom: '16px' }}>
                <div style={s.field}>
                  <label style={s.label}>Do you own or rent? *</label>
                  <select style={s.select} required value={form.ownsRents} onChange={set('ownsRents')}>
                    <option value="">Select...</option>
                    <option>Own</option>
                    <option>Rent</option>
                  </select>
                </div>
                <div style={s.field}>
                  <label style={s.label}>Dwelling Type *</label>
                  <select style={s.select} required value={form.dwellingType} onChange={set('dwellingType')}>
                    <option value="">Select...</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                    <option>Townhouse</option>
                    <option>Mobile Home</option>
                    <option>Farm/Rural</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div style={{ ...s.grid2, marginBottom: '16px' }}>
                <div style={s.field}>
                  <label style={s.label}>Fenced Yard? *</label>
                  <select style={s.select} required value={form.fencedYard} onChange={set('fencedYard')}>
                    <option value="">Select...</option>
                    <option>Yes</option>
                    <option>No</option>
                    <option>Partial</option>
                  </select>
                </div>
                <div style={s.field}>
                  <label style={s.label}>If yes, fence height?</label>
                  <input style={s.input} value={form.fenceHeight} onChange={set('fenceHeight')} placeholder="e.g. 6 ft privacy" />
                </div>
              </div>
              <div style={{ ...s.grid2 }}>
                <div style={s.field}>
                  <label style={s.label}>If renting, landlord allows large dogs?</label>
                  <select style={s.select} value={form.landlordAllows} onChange={set('landlordAllows')}>
                    <option value="">Select...</option>
                    <option>Yes</option>
                    <option>No</option>
                    <option>N/A - I own</option>
                  </select>
                </div>
              </div>
              {form.ownsRents === 'Rent' && (
                <div style={{ ...s.grid2, marginTop: '16px' }}>
                  <div style={s.field}>
                    <label style={s.label}>Landlord Name</label>
                    <input style={s.input} value={form.landlordName} onChange={set('landlordName')} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Landlord Phone</label>
                    <input style={s.input} type="tel" value={form.landlordPhone} onChange={set('landlordPhone')} />
                  </div>
                </div>
              )}
            </div>

            {/* Household */}
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Household Members</h2>
              <div style={{ ...s.grid2, marginBottom: '16px' }}>
                <div style={s.field}>
                  <label style={s.label}>Number of Adults *</label>
                  <input style={s.input} type="number" min="1" required value={form.numAdults} onChange={set('numAdults')} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Children in Household? *</label>
                  <select style={s.select} required value={form.hasChildren} onChange={set('hasChildren')}>
                    <option value="">Select...</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
              {form.hasChildren === 'Yes' && (
                <div style={s.field}>
                  <label style={s.label}>Ages of Children</label>
                  <input style={s.input} value={form.childrenAges} onChange={set('childrenAges')} placeholder="e.g. 4, 7, 12" />
                </div>
              )}
            </div>

            {/* Other Pets */}
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Other Pets</h2>
              <div style={{ ...s.grid2, marginBottom: '16px' }}>
                <div style={s.field}>
                  <label style={s.label}>Do you have other pets? *</label>
                  <select style={s.select} required value={form.otherPets} onChange={set('otherPets')}>
                    <option value="">Select...</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
              {form.otherPets === 'Yes' && (
                <div style={s.field}>
                  <label style={s.label}>Please list your pets (species, breed, age, spayed/neutered)</label>
                  <textarea style={s.textarea} value={form.otherPetsDetails} onChange={set('otherPetsDetails')} placeholder="e.g. Dog - German Shepherd - 3 yrs - Spayed" />
                </div>
              )}
            </div>

            {/* Experience */}
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Experience with Dogs</h2>
              <div style={{ ...s.grid2, marginBottom: '16px' }}>
                <div style={s.field}>
                  <label style={s.label}>Owned a dog before? *</label>
                  <select style={s.select} required value={form.ownedDogBefore} onChange={set('ownedDogBefore')}>
                    <option value="">Select...</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div style={s.field}>
                  <label style={s.label}>Owned a large breed dog?</label>
                  <select style={s.select} value={form.ownedLargeBreed} onChange={set('ownedLargeBreed')}>
                    <option value="">Select...</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
              {form.ownedDogBefore === 'Yes' && (
                <div style={{ ...s.field, marginBottom: '16px' }}>
                  <label style={s.label}>Tell us about your previous dogs</label>
                  <textarea style={s.textarea} value={form.previousDogs} onChange={set('previousDogs')} placeholder="Breed(s), what happened to them, etc." />
                </div>
              )}
              <div style={s.field}>
                <label style={s.label}>Are you familiar with the Cane Corso breed? *</label>
                <select style={s.select} required value={form.familiarWithCorso} onChange={set('familiarWithCorso')}>
                  <option value="">Select...</option>
                  <option>Yes, very familiar</option>
                  <option>Somewhat familiar</option>
                  <option>No, still learning</option>
                </select>
              </div>
            </div>

            {/* Puppy Preferences */}
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Puppy Preferences</h2>
              <div style={{ ...s.grid2, marginBottom: '16px' }}>
                <div style={s.field}>
                  <label style={s.label}>Preferred Sex *</label>
                  <select style={s.select} required value={form.preferredSex} onChange={set('preferredSex')}>
                    <option value="">Select...</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>No Preference</option>
                  </select>
                </div>
                <div style={s.field}>
                  <label style={s.label}>Preferred Color *</label>
                  <select style={s.select} required value={form.preferredColor} onChange={set('preferredColor')}>
                    <option value="">Select...</option>
                    <option>Black</option>
                    <option>Grey / Blue</option>
                    <option>Fawn</option>
                    <option>Brindle</option>
                    <option>Black Brindle</option>
                    <option>No Preference</option>
                  </select>
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Intended Purpose *</label>
                <select style={s.select} required value={form.puppyPurpose} onChange={set('puppyPurpose')}>
                  <option value="">Select...</option>
                  <option>Family / Companion Pet</option>
                  <option>Personal Protection</option>
                  <option>Show / Conformation</option>
                  <option>Sport / IPO / Schutzhund</option>
                  <option>Service / Therapy</option>
                  <option>Breeding</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* References */}
            <div style={s.section}>
              <h2 style={s.sectionTitle}>References</h2>
              <div style={{ ...s.grid2, marginBottom: '16px' }}>
                <div style={s.field}>
                  <label style={s.label}>Veterinarian Name</label>
                  <input style={s.input} value={form.vetName} onChange={set('vetName')} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Veterinarian Phone</label>
                  <input style={s.input} type="tel" value={form.vetPhone} onChange={set('vetPhone')} />
                </div>
              </div>
              <div style={s.grid2}>
                <div style={s.field}>
                  <label style={s.label}>Personal Reference Name</label>
                  <input style={s.input} value={form.refName} onChange={set('refName')} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Personal Reference Phone</label>
                  <input style={s.input} type="tel" value={form.refPhone} onChange={set('refPhone')} />
                </div>
              </div>
            </div>

            {/* Additional */}
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Additional Information</h2>
              <div style={{ ...s.field, marginBottom: '16px' }}>
                <label style={s.label}>How did you hear about CCR Kennels?</label>
                <select style={s.select} value={form.heardAboutUs} onChange={set('heardAboutUs')}>
                  <option value="">Select...</option>
                  <option>Google Search</option>
                  <option>Facebook</option>
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>Word of Mouth / Referral</option>
                  <option>AKC Marketplace</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{ ...s.field, marginBottom: '16px' }}>
                <label style={s.label}>Why do you want a Cane Corso? *</label>
                <textarea style={s.textarea} required value={form.whyCorso} onChange={set('whyCorso')} placeholder="Tell us about your lifestyle and why a Cane Corso is the right fit for you..." />
              </div>
              <div style={s.field}>
                <label style={s.label}>Anything else you would like us to know?</label>
                <textarea style={s.textarea} value={form.additionalInfo} onChange={set('additionalInfo')} />
              </div>
            </div>

            {/* Agreement & Signature */}
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Agreement & Electronic Signature</h2>
              <div style={s.terms}>
                <p><strong>By submitting this application, I certify that:</strong></p>
                <br />
                <p>1. All information provided in this application is true and accurate to the best of my knowledge.</p>
                <p>2. I understand that submission of this application does not guarantee placement of a puppy.</p>
                <p>3. I understand that CCR Kennels reserves the right to deny any application at their discretion.</p>
                <p>4. I agree to provide a suitable, loving, and safe home for a CCR Kennels puppy.</p>
                <p>5. I understand that a non-refundable $500 security deposit is required to reserve a puppy after application approval.</p>
                <p>6. I agree to cooperate with CCR Kennels and provide any additional information requested during the review process.</p>
                <p>7. I agree that CCR Kennels may contact my references for verification purposes.</p>
              </div>
              <div style={s.checkRow}>
                <input type="checkbox" id="agree" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: '3px', accentColor: '#c9a227' }} />
                <label htmlFor="agree" style={{ color: '#ccc', fontSize: '0.9rem', cursor: 'pointer' }}>
                  I have read and agree to the terms above, and I certify all information is accurate. *
                </label>
              </div>

              <div style={{ marginTop: '24px' }}>
                <p style={{ ...s.label, marginBottom: '10px', display: 'block' }}>Electronic Signature *</p>
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '12px' }}>Sign in the box below using your mouse or touchscreen.</p>
                <div style={s.sigRow}>
                  <SignaturePad ref={sigRef} />
                  <button type="button" style={s.clearBtn} onClick={() => sigRef.current?.clear()}>Clear Signature</button>
                </div>
              </div>

              <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '16px' }}>
                Submission Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              {error && <div style={s.error}>{error}</div>}

              <button type="submit" style={s.submitBtn} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
