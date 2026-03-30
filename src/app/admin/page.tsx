'use client'

import { useEffect, useRef, useState } from 'react'

type Photo = { id: string; caption: string; uploadedAt: string; contentType: string }
type Update = { id: string; title: string; body: string; createdAt: string }
type Screen = 'checking' | 'login' | 'dashboard'
type Tab = 'photos' | 'updates' | 'litter'

const gold = '#c9a227'
const dark = '#0a0a0a'
const card = '#1a1a1a'
const border = '#2a2a2a'

export default function AdminPage() {
  const [screen, setScreen] = useState<Screen>('login')
  const [tab, setTab] = useState<Tab>('photos')

  // Login
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Photos
  const [photos, setPhotos] = useState<Photo[]>([])
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoCaption, setPhotoCaption] = useState('')
  const [photoPreview, setPhotoPreview] = useState('')
  const [photoUploading, setPhotoUploading] = useState(false)
  const [photoError, setPhotoError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // Litter Photos
  const [litterPhotos, setLitterPhotos] = useState<Photo[]>([])
  const [litterPhotoFile, setLitterPhotoFile] = useState<File | null>(null)
  const [litterPhotoCaption, setLitterPhotoCaption] = useState('')
  const [litterPhotoPreview, setLitterPhotoPreview] = useState('')
  const [litterPhotoUploading, setLitterPhotoUploading] = useState(false)
  const [litterPhotoError, setLitterPhotoError] = useState('')
  const litterFileRef = useRef<HTMLInputElement>(null)

  // Litter Updates
  const [litterUpdates, setLitterUpdates] = useState<Update[]>([])
  const [litterUpdateTitle, setLitterUpdateTitle] = useState('')
  const [litterUpdateBody, setLitterUpdateBody] = useState('')
  const [litterUpdatePosting, setLitterUpdatePosting] = useState(false)
  const [litterUpdateError, setLitterUpdateError] = useState('')

  // Updates
  const [updates, setUpdates] = useState<Update[]>([])
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateBody, setUpdateBody] = useState('')
  const [updatePosting, setUpdatePosting] = useState(false)
  const [updateError, setUpdateError] = useState('')

  useEffect(() => {
    fetch('/api/admin/verify')
      .then(r => { if (r.ok) { loadData(); setScreen('dashboard') } })
      .catch(() => {})
  }, [])

  async function loadData() {
    const [p, u, lp, lu] = await Promise.all([
      fetch('/api/admin/photos').then(r => r.json()),
      fetch('/api/admin/updates').then(r => r.json()),
      fetch('/api/admin/litter-photos').then(r => r.json()),
      fetch('/api/admin/litter-updates').then(r => r.json()),
    ])
    setPhotos(Array.isArray(p) ? p : [])
    setUpdates(Array.isArray(u) ? u : [])
    setLitterPhotos(Array.isArray(lp) ? lp : [])
    setLitterUpdates(Array.isArray(lu) ? lu : [])
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) { loadData(); setScreen('dashboard') }
      else setLoginError('Incorrect password. Try: CCRkennels2026!')
    } catch {
      setLoginError('Connection error — please try again.')
    }
    setLoginLoading(false)
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setScreen('login')
    setPassword('')
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setPhotoFile(file)
    setPhotoError('')
    if (file) {
      const url = URL.createObjectURL(file)
      setPhotoPreview(url)
    } else {
      setPhotoPreview('')
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!photoFile) { setPhotoError('Please select a photo.'); return }
    setPhotoUploading(true)
    setPhotoError('')
    const fd = new FormData()
    fd.append('photo', photoFile)
    fd.append('caption', photoCaption)
    const res = await fetch('/api/admin/photos', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.ok) {
      setPhotoFile(null)
      setPhotoCaption('')
      setPhotoPreview('')
      if (fileRef.current) fileRef.current.value = ''
      loadData()
    } else {
      setPhotoError(data.error || 'Upload failed.')
    }
    setPhotoUploading(false)
  }

  async function deletePhoto(id: string) {
    if (!confirm('Delete this photo?')) return
    await fetch(`/api/admin/photos/${id}`, { method: 'DELETE' })
    setPhotos(p => p.filter(x => x.id !== id))
  }

  async function handlePostUpdate(e: React.FormEvent) {
    e.preventDefault()
    setUpdatePosting(true)
    setUpdateError('')
    const res = await fetch('/api/admin/updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: updateTitle, body: updateBody }),
    })
    const data = await res.json()
    if (data.ok) {
      setUpdateTitle('')
      setUpdateBody('')
      loadData()
    } else {
      setUpdateError(data.error || 'Failed to post update.')
    }
    setUpdatePosting(false)
  }

  async function deleteUpdate(id: string) {
    if (!confirm('Delete this update?')) return
    await fetch(`/api/admin/updates/${id}`, { method: 'DELETE' })
    setUpdates(u => u.filter(x => x.id !== id))
  }

  function handleLitterFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setLitterPhotoFile(file)
    setLitterPhotoError('')
    if (file) {
      setLitterPhotoPreview(URL.createObjectURL(file))
    } else {
      setLitterPhotoPreview('')
    }
  }

  async function handleLitterUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!litterPhotoFile) { setLitterPhotoError('Please select a photo.'); return }
    setLitterPhotoUploading(true)
    setLitterPhotoError('')
    const fd = new FormData()
    fd.append('photo', litterPhotoFile)
    fd.append('caption', litterPhotoCaption)
    const res = await fetch('/api/admin/litter-photos', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.ok) {
      setLitterPhotoFile(null)
      setLitterPhotoCaption('')
      setLitterPhotoPreview('')
      if (litterFileRef.current) litterFileRef.current.value = ''
      loadData()
    } else {
      setLitterPhotoError(data.error || 'Upload failed.')
    }
    setLitterPhotoUploading(false)
  }

  async function rewatermarkLitterPhotos() {
    if (!confirm('Re-apply watermark to all litter photos? This may take a moment.')) return
    setLitterPhotoError('')
    setLitterPhotoUploading(true)
    try {
      const res = await fetch('/api/admin/litter-photos/rewatermark', { method: 'POST' })
      const data = await res.json()
      if (data.ok) {
        alert(`Watermark applied to ${data.processed}/${data.total} photos.${data.errors?.length ? '\nErrors: ' + data.errors.join(', ') : ''}`)
        loadData()
      } else {
        setLitterPhotoError('Re-watermark failed.')
      }
    } catch { setLitterPhotoError('Re-watermark request failed.') }
    setLitterPhotoUploading(false)
  }

  async function deleteLitterPhoto(id: string) {
    if (!confirm('Delete this litter photo?')) return
    await fetch(`/api/admin/litter-photos/${id}`, { method: 'DELETE' })
    setLitterPhotos(p => p.filter(x => x.id !== id))
  }

  async function handleLitterPostUpdate(e: React.FormEvent) {
    e.preventDefault()
    setLitterUpdatePosting(true)
    setLitterUpdateError('')
    const res = await fetch('/api/admin/litter-updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: litterUpdateTitle, body: litterUpdateBody }),
    })
    const data = await res.json()
    if (data.ok) {
      setLitterUpdateTitle('')
      setLitterUpdateBody('')
      loadData()
    } else {
      setLitterUpdateError(data.error || 'Failed to post update.')
    }
    setLitterUpdatePosting(false)
  }

  async function deleteLitterUpdate(id: string) {
    if (!confirm('Delete this litter update?')) return
    await fetch(`/api/admin/litter-updates/${id}`, { method: 'DELETE' })
    setLitterUpdates(u => u.filter(x => x.id !== id))
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', background: dark, border: `1px solid ${border}`,
    borderRadius: '4px', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box',
  }
  const btnGold: React.CSSProperties = {
    background: gold, color: '#000', border: 'none', borderRadius: '4px',
    padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
  }
  const btnRed: React.CSSProperties = {
    background: 'transparent', color: '#cf6f6f', border: '1px solid #4a2a2a',
    borderRadius: '4px', padding: '5px 12px', cursor: 'pointer', fontSize: '0.8rem',
  }


  if (screen === 'login') {
    return (
      <div style={{ minHeight: '100vh', background: dark, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '8px', padding: '40px', width: '100%', maxWidth: '380px' }}>
          <h1 style={{ fontFamily: 'Cinzel, serif', color: gold, fontSize: '1.4rem', textAlign: 'center', marginBottom: '8px' }}>CCR Kennels</h1>
          <p style={{ color: '#666', fontSize: '0.85rem', textAlign: 'center', marginBottom: '28px' }}>Admin Panel</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={inputStyle}
              autoFocus
            />
            {loginError && <p style={{ color: '#cf6f6f', fontSize: '0.85rem', margin: 0 }}>{loginError}</p>}
            <button type="submit" style={btnGold} disabled={loginLoading}>
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: dark, color: '#fff', fontFamily: 'Raleway, sans-serif' }}>
      {/* Header */}
      <div style={{ background: card, borderBottom: `1px solid ${border}`, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', color: gold, fontSize: '1.1rem', margin: 0 }}>CCR Kennels — Admin</h1>
        <button onClick={handleLogout} style={{ background: 'transparent', border: `1px solid ${border}`, color: '#888', borderRadius: '4px', padding: '6px 16px', cursor: 'pointer', fontSize: '0.85rem' }}>
          Log Out
        </button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: `1px solid ${border}`, display: 'flex', padding: '0 24px' }}>
        {([
          { key: 'photos', label: `Photos (${photos.length})` },
          { key: 'updates', label: `Updates (${updates.length})` },
          { key: 'litter', label: `Spring 2026 Litter` },
        ] as { key: Tab; label: string }[]).map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: '14px 20px',
            fontSize: '0.95rem', fontWeight: 600,
            color: tab === key ? gold : '#666',
            borderBottom: tab === key ? `2px solid ${gold}` : '2px solid transparent',
          }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '28px 24px' }}>

        {/* ── PHOTOS TAB ── */}
        {tab === 'photos' && (
          <>
            {/* Upload form */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '8px', padding: '24px', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', color: gold, fontSize: '1rem', marginBottom: '18px' }}>Upload New Photo</h2>
              <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 220px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Photo (JPG / PNG, max 5MB)</label>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ ...inputStyle, padding: '8px' }} />
                  </div>
                  <div style={{ flex: '2 1 260px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Caption</label>
                    <input
                      type="text"
                      placeholder="e.g. Liberty and her 8-week-old pups"
                      value={photoCaption}
                      onChange={e => setPhotoCaption(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
                {photoPreview && (
                  <img src={photoPreview} alt="preview" style={{ maxHeight: '180px', maxWidth: '100%', borderRadius: '4px', objectFit: 'cover' }} />
                )}
                {photoError && <p style={{ color: '#cf6f6f', fontSize: '0.85rem', margin: 0 }}>{photoError}</p>}
                <button type="submit" style={{ ...btnGold, alignSelf: 'flex-start' }} disabled={photoUploading}>
                  {photoUploading ? 'Uploading...' : 'Upload Photo'}
                </button>
              </form>
            </div>

            {/* Photo list */}
            {photos.length === 0 ? (
              <p style={{ color: '#555', textAlign: 'center', padding: '40px 0' }}>No photos uploaded yet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {photos.map(p => (
                  <div key={p.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: '6px', overflow: 'hidden' }}>
                    <img
                      src={`/api/photos/${p.id}`}
                      alt={p.caption}
                      style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: '10px 12px' }}>
                      <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '0 0 4px' }}>{p.caption || <em style={{ color: '#555' }}>No caption</em>}</p>
                      <p style={{ fontSize: '0.75rem', color: '#555', margin: '0 0 10px' }}>
                        {new Date(p.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <button onClick={() => deletePhoto(p.id)} style={btnRed}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── LITTER TAB ── */}
        {tab === 'litter' && (
          <>
            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '24px' }}>
              Manage photos and updates for the <strong style={{ color: gold }}>Spring 2026 Litter</strong> page at{' '}
              <a href="/spring-litter-2026.html" target="_blank" style={{ color: gold }}>/spring-litter-2026.html</a>.
            </p>

            {/* Litter Photo Upload */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '8px', padding: '24px', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', color: gold, fontSize: '1rem', marginBottom: '18px' }}>Upload Litter Photo</h2>
              <form onSubmit={handleLitterUpload} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 220px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Photo (JPG / PNG, max 5MB)</label>
                    <input ref={litterFileRef} type="file" accept="image/*" onChange={handleLitterFileChange} style={{ ...inputStyle, padding: '8px' }} />
                  </div>
                  <div style={{ flex: '2 1 260px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Caption</label>
                    <input
                      type="text"
                      placeholder="e.g. Week 3 — eyes just opened!"
                      value={litterPhotoCaption}
                      onChange={e => setLitterPhotoCaption(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
                {litterPhotoPreview && (
                  <img src={litterPhotoPreview} alt="preview" style={{ maxHeight: '180px', maxWidth: '100%', borderRadius: '4px', objectFit: 'cover' }} />
                )}
                {litterPhotoError && <p style={{ color: '#cf6f6f', fontSize: '0.85rem', margin: 0 }}>{litterPhotoError}</p>}
                <button type="submit" style={{ ...btnGold, alignSelf: 'flex-start' }} disabled={litterPhotoUploading}>
                  {litterPhotoUploading ? 'Uploading...' : 'Upload Photo'}
                </button>
              </form>
            </div>

            {litterPhotos.length > 0 && (
              <button onClick={rewatermarkLitterPhotos} disabled={litterPhotoUploading} style={{ ...btnGold, marginBottom: '16px' }}>
                {litterPhotoUploading ? 'Processing...' : 'Re-Watermark All Photos'}
              </button>
            )}

            {/* Litter Photo Grid */}
            {litterPhotos.length === 0 ? (
              <p style={{ color: '#555', textAlign: 'center', padding: '20px 0 32px' }}>No litter photos uploaded yet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                {litterPhotos.map(p => (
                  <div key={p.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: '6px', overflow: 'hidden' }}>
                    <img
                      src={`/api/litter-photos/${p.id}`}
                      alt={p.caption}
                      style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: '10px 12px' }}>
                      <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '0 0 4px' }}>{p.caption || <em style={{ color: '#555' }}>No caption</em>}</p>
                      <p style={{ fontSize: '0.75rem', color: '#555', margin: '0 0 10px' }}>
                        {new Date(p.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <button onClick={() => deleteLitterPhoto(p.id)} style={btnRed}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Litter Update Post */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '8px', padding: '24px', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', color: gold, fontSize: '1rem', marginBottom: '18px' }}>Post Litter Update</h2>
              <form onSubmit={handleLitterPostUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Puppies are 4 weeks old — reservations open!"
                    value={litterUpdateTitle}
                    onChange={e => setLitterUpdateTitle(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Message</label>
                  <textarea
                    placeholder="Share an update about the litter..."
                    value={litterUpdateBody}
                    onChange={e => setLitterUpdateBody(e.target.value)}
                    required
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                  />
                </div>
                {litterUpdateError && <p style={{ color: '#cf6f6f', fontSize: '0.85rem', margin: 0 }}>{litterUpdateError}</p>}
                <button type="submit" style={{ ...btnGold, alignSelf: 'flex-start' }} disabled={litterUpdatePosting}>
                  {litterUpdatePosting ? 'Posting...' : 'Post Update'}
                </button>
              </form>
            </div>

            {/* Litter Updates List */}
            {litterUpdates.length === 0 ? (
              <p style={{ color: '#555', textAlign: 'center', padding: '40px 0' }}>No litter updates posted yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {litterUpdates.map(u => (
                  <div key={u.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: '6px', padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                      <h3 style={{ fontFamily: 'Cinzel, serif', color: gold, fontSize: '0.95rem', margin: 0 }}>{u.title}</h3>
                      <button onClick={() => deleteLitterUpdate(u.id)} style={btnRed}>Delete</button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#555', margin: '0 0 8px' }}>
                      {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#aaa', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{u.body}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── UPDATES TAB ── */}
        {tab === 'updates' && (
          <>
            {/* Post form */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '8px', padding: '24px', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', color: gold, fontSize: '1rem', marginBottom: '18px' }}>Post New Update</h2>
              <form onSubmit={handlePostUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Title</label>
                  <input
                    type="text"
                    placeholder="e.g. New Litter Born — Spring 2026!"
                    value={updateTitle}
                    onChange={e => setUpdateTitle(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Message</label>
                  <textarea
                    placeholder="Share the news with visitors..."
                    value={updateBody}
                    onChange={e => setUpdateBody(e.target.value)}
                    required
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                  />
                </div>
                {updateError && <p style={{ color: '#cf6f6f', fontSize: '0.85rem', margin: 0 }}>{updateError}</p>}
                <button type="submit" style={{ ...btnGold, alignSelf: 'flex-start' }} disabled={updatePosting}>
                  {updatePosting ? 'Posting...' : 'Post Update'}
                </button>
              </form>
            </div>

            {/* Updates list */}
            {updates.length === 0 ? (
              <p style={{ color: '#555', textAlign: 'center', padding: '40px 0' }}>No updates posted yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {updates.map(u => (
                  <div key={u.id} style={{ background: card, border: `1px solid ${border}`, borderRadius: '6px', padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                      <h3 style={{ fontFamily: 'Cinzel, serif', color: gold, fontSize: '0.95rem', margin: 0 }}>{u.title}</h3>
                      <button onClick={() => deleteUpdate(u.id)} style={btnRed}>Delete</button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#555', margin: '0 0 8px' }}>
                      {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#aaa', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{u.body}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
