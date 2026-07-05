// src/app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* HERO / MEET HAYFA */}
      <section className="about-hero">
        <div className="container about-hero-inner">
          {/* Left copy */}
          <div className="about-copy">
            <h1 className="about-title">Meet Hayfa</h1>
            <p className="about-lead">
              Hayfa means elegance. We craft leather pieces that blend cultural roots,
              careful craftsmanship, and a clean modern finish.
            </p>
          </div>

          {/* Image + Mission */}
          <div className="about-hero-grid">
            {/* Satu foto besar saja */}
            <div className="about-photo-large">
              <img
                src="/uploads/inspire1.jpg"
                alt="A woman reading in traditional dress, representing Hayfa's heritage."
              />
            </div>

            {/* Our Mission card – sama tinggi dengan foto */}
            <article className="about-mission-card">
              <h2>Our Mission</h2>
              <p>
                Hayfa was born from a desire to preserve the quiet beauty of traditional craftsmanship while bringing it into the modern world.
              </p>
              <p>
                Each piece begins with stories passed down through generations — the artistry of Middle Eastern women, the patience of hand-finished leatherwork, and the cultural motifs that shaped our identity.
              </p>
              <p>
                We design slowly and intentionally. Shapes are inspired by heritage silhouettes, while textures and metal accents echo the jewelry and garments worn in our childhood homes. Every detail is chosen to honor where we come from.
              </p>
              <p>
                As Hayfa grows, our mission remains simple: to create pieces that feel meaningful to own, respectful to wear, and timeless enough to accompany every chapter of your life.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="container">
          {/* Banner ditengah & diperpanjang */}
          <div className="values-banner">
            <h2>Our Values</h2>
            <p>
              The principles that guide how we design, build, and ship every Hayfa product.
            </p>
          </div>

          <div className="values-grid">
            <article className="value-card">
              <h3>Transparent</h3>
              <p>
                We keep our process open to the team – from sourcing to pricing – so decisions
                stay grounded and traceable.
              </p>
            </article>

            <article className="value-card">
              <h3>Client Care</h3>
              <p>
                We design from the user&apos;s point of view: clear product details, intuitive
                flows, and a calm shopping experience.
              </p>
            </article>

            <article className="value-card">
              <h3>Craft &amp; Detail</h3>
              <p>
                From stitching lines to page layouts, we pay attention to small things that make
                the overall experience feel refined.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
