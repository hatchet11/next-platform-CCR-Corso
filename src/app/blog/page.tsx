import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog | CCR Kennels — Cane Corso Tips & Guides',
  description:
    'Expert tips on Cane Corso puppy care, health testing, training, and more from CCR Kennels — a veteran-owned breeder in Southern Illinois.',
  alternates: { canonical: 'https://www.ccrcorsos.com/blog' },
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <>
      <div className="bg-pattern" />
      <nav className="navbar scrolled" style={{ position: 'relative', background: 'var(--overlay-dark)' }}>
        <Link href="/" className="logo">
          <img src="/images/logo.webp" alt="CCR Kennels Logo" width={50} height={38} />
          <div className="logo-text">
            <span>CCR Kennels</span>
            <span>Italian Cane Corso</span>
          </div>
        </Link>
        <Link href="/" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}>
          <i className="fas fa-arrow-left" /> Back to Home
        </Link>
      </nav>

      <main className="blog-listing-page">
        <div className="section-header" style={{ padding: '4rem 5% 2rem' }}>
          <span className="section-label">Resources</span>
          <h1>Cane Corso Tips &amp; Guides</h1>
          <p>Expert advice on puppy care, health, training, and life with a Cane Corso.</p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <div className="blog-card-content">
                <time className="blog-card-date">
                  {new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="blog-read-more">
                  Read Article <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
