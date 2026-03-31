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

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `https://www.ccrcorsos.com/blog/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.ccrcorsos.com/blog/${slug}`,
    },
    author: {
      '@type': 'Person',
      name: 'Cody Rose',
      jobTitle: 'Owner & Breeder at CCR Kennels',
      sameAs: ['https://marketplace.akc.org/breeder/cody-rose-172424'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'CCR Kennels',
      url: 'https://www.ccrcorsos.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.ccrcorsos.com/images/logo.jpg',
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    image: 'https://www.ccrcorsos.com/images/logo.jpg',
    articleSection: 'Cane Corso',
    inLanguage: 'en-US',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.blog-post-description'],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ccrcorsos.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.ccrcorsos.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.ccrcorsos.com/blog/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
            <p style={{ fontSize: '0.85rem', color: '#c9a227', marginTop: '0.5rem', fontStyle: 'italic' }}>
              By Cody Rose — Owner &amp; Breeder, CCR Kennels
            </p>
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
        <div style={{ textAlign: 'center', padding: '0.75rem', borderTop: '1px solid #1a1a1a', fontSize: '0.78rem', color: '#555' }}>
          Site design by Hatchet — for web design inquiries please email <a href="mailto:hatchet412@proton.me" style={{ color: '#c9a227', textDecoration: 'none' }}>hatchet412@proton.me</a>
        </div>
      </footer>
    </>
  )
}
