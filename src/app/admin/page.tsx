'use client'

import { useEffect, useRef, useState } from 'react'

type Photo = { id: string; caption: string; uploadedAt: string; contentType: string }
type Update = { id: string; title: string; body: string; createdAt: string }
type Screen = 'checking' | 'login' | 'dashboard'
type Tab = 'photos' | 'updates'

const gold = '#c9a227'
const dark = '#0a0a0a'
const card = '#1a1a1a'
const border = '#2a2a2a'

export default function AdminPage() {
  const [screen, setScreen] = useState<Screen>('checking')
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

  // Updates
  const [updates, setUpdates] = useState<Update[]>([])
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateBody, setUpdateBody] = useState('')
  const [updatePosting, setUpdatePosting] = useState(false)
  const [updateError, setUpdateError] = useState('')

  useEffect(() => {
    fetch('/api/admin/verify').then(r => {
      if (r.ok) { loadData(); setScreen('dashboard') }
      else setScreen('login')
    })
  }, [])

  async function loadData() {
    const [p, u] = await Promise.all([
      fetch('/api/admin/photos').then(r => r.json()),
      fetch('/api/admin/updates').then(r => r.json()),
    ])
    setPhotos(Array.isArray(p) ? p : [])
    setUpdates(Array.isArray(u) ? u : [])
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) { loadData(); setScreen('dashboard') }
    else setLoginError('Incorrect password.')
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

  if (screen === 'checking') {
    return (
      <div style={{ minHeight: '100vh', background: dark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#555' }}>Loading...</p>
      </div>
    )
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
        {(['photos', 'updates'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: '14px 20px',
            fontSize: '0.95rem', fontWeight: 600,
            color: tab === t ? gold : '#666',
            borderBottom: tab === t ? `2px solid ${gold}` : '2px solid transparent',
            textTransform: 'capitalize',
          }}>
            {t === 'photos' ? `Photos (${photos.length})` : `Updates (${updates.length})`}
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
