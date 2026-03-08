const services = [
  {
    icon: 'fas fa-file-certificate',
    title: 'AKC Registration',
    desc: 'All our puppies come with full AKC registration papers, documented pedigree, and champion bloodline certification.',
  },
  {
    icon: 'fas fa-dna',
    title: 'DNA Health Testing',
    desc: 'Comprehensive genetic health screening on all breeding dogs to ensure your puppy is free from hereditary conditions.',
  },
  {
    icon: 'fas fa-stethoscope',
    title: 'Veterinary Care',
    desc: 'Complete vet checks, age-appropriate vaccinations, and deworming protocols before your puppy comes home.',
  },
  {
    icon: 'fas fa-shield-virus',
    title: '2-Year Health Guarantee',
    desc: 'Our comprehensive health warranty covers genetic conditions for two full years, giving you peace of mind.',
  },
  {
    icon: 'fas fa-cut',
    title: 'Dew Claws & Tail Docking',
    desc: 'Professional dew claw removal and tail docking performed by our veterinarian at the appropriate age.',
  },
  {
    icon: 'fas fa-headset',
    title: 'Lifelong Breeder Support',
    desc: "We're here for you and your Corso for life. Training tips, health advice, and ongoing guidance whenever you need it.",
  },
  {
    icon: 'fas fa-plane',
    title: 'Nationwide Shipping',
    desc: 'Safe, comfortable puppy transport to anywhere in the United States with experienced pet shipping services.',
  },
  {
    icon: 'fas fa-gift',
    title: 'Puppy Care Package',
    desc: 'Each puppy goes home with a gift bag including food, toys, blanket with littermate scent, and care instructions.',
  },
]

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="section-header">
        <span className="section-label">What We Offer</span>
        <h2>Our Services</h2>
        <p>
          Every CCR Kennels puppy comes with comprehensive care and support to ensure a healthy,
          happy start to life.
        </p>
      </div>
      <div className="services-grid">
        {services.map((s) => (
          <div className="service-card" key={s.title}>
            <div className="service-icon">
              <i className={s.icon} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
