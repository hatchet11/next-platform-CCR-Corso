import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return {
    title: `${post.title} | CCR Kennels`,
    description: post.description,
    alternates: { canonical: `https://www.ccrcorsos.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.ccrcorsos.com/blog/${slug}`,
      siteName: 'CCR Kennels',
      type: 'article',
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

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
        <Link href="/blog" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}>
          <i className="fas fa-arrow-left" /> All Articles
        </Link>
      </nav>

      <main className="blog-post-page">
        <div className="blog-post-container">
          <header className="blog-post-header">
            <time className="blog-card-date">
              {new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1>{post.title}</h1>
            <p className="blog-post-description">{post.description}</p>
          </header>
          <div
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
          <div className="blog-post-footer">
            <Link href="/blog" className="btn btn-primary">
              <i className="fas fa-arrow-left" /> Back to All Articles
            </Link>
            <Link href="/#contact" className="btn btn-secondary">
              Contact CCR Kennels
            </Link>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-bottom" style={{ maxWidth: '100%', padding: '1.5rem 5%' }}>
          <p>&copy; 2024 CCR Kennels, LLC. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/">Home</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
