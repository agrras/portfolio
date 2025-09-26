import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars, Sparkles, GradientTexture } from "@react-three/drei";
import profilePic from "./profile.jpg";
/* ────────────────────────────────────────────────────────────────────────────
   NAV + DATA
   ──────────────────────────────────────────────────────────────────────────── */
const nav = [
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "coursework", label: "Coursework" },
  { id: "teaching", label: "Teaching" },
  { id: "projects", label: "Projects" },
  { id: "leadership", label: "Leadership" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
];

const data = {
  name: "Rashi Agrawal",
  role: "Software Engineer • Distributed Systems • Cloud-Native • ML",
  blurb:
      "Software engineer with 4+ years in full-stack development, distributed systems, and cloud-native architecture. Skilled in designing scalable microservices and leading agile teams to deliver production-grade software. Proficient in Spring Boot, Kubernetes, and AWS. Currently deepening machine learning expertise to build intelligent, data-driven applications.",
  location: "Philadelphia, PA, USA",
  email: "agrras@seas.upenn.edu",
  linkedin: "https://www.linkedin.com/in/agrawalrashi",
  resumeUrl: "#", // replace with your PDF link
  picture: profilePic, // put your image at public/profile.jpg
};

/* ────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ──────────────────────────────────────────────────────────────────────────── */
const fade = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const revealUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

/* ────────────────────────────────────────────────────────────────────────────
   SECTION + UI PARTS
   ──────────────────────────────────────────────────────────────────────────── */
function Section({ id, title, children }) {
  return (
      <section id={id} className="scroll-mt-28 py-14 lg:py-20">
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{title}</h2>
          <div className="mt-6 text-neutral-200 grid gap-4">{children}</div>
        </motion.div>
      </section>
  );
}

function AnimatedCard({ heading, sub, right, children }) {
  return (
      <motion.div
          variants={revealUp}
          whileHover={{ scale: 1.02, rotateX: 1.5, rotateY: -1.5 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="rounded-2xl border border-white/10 bg-white/5 text-neutral-100 backdrop-blur p-6 shadow-md hover:ring-2 hover:ring-violet-400/20 hover:shadow-[0_0_24px_rgba(152,135,255,0.18)]"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold">{heading}</h3>
            {sub && <p className="text-sm text-neutral-300 mt-0.5">{sub}</p>}
          </div>
          {right && <span className="text-sm text-neutral-400 whitespace-nowrap">{right}</span>}
        </div>
        {children && <div className="mt-3 text-[15px] leading-7 text-neutral-200">{children}</div>}
      </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   NAVBAR
   ──────────────────────────────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(nav[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
      <div className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-[#0b1020]/80">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between text-neutral-100">
          <a href="#" className="font-semibold tracking-tight">{data.name}</a>
          <nav className="hidden md:flex gap-5 text-sm">
            {nav.map((item) => (
                <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={classNames("text-neutral-300 hover:text-white transition-colors duration-300", active === item.id && "text-white font-semibold")}
                >
                  {item.label}
                </motion.a>
            ))}
          </nav>
          <div className="hidden md:flex gap-2">
            <a href={`mailto:${data.email}`} className="rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10 transition-all">Email</a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10 transition-all">LinkedIn</a>
          </div>
          <button className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/10" onClick={() => setOpen((s) => !s)} aria-expanded={open} aria-controls="mobile-menu">
            {open ? "Close" : "Menu"}
          </button>
        </div>
        {open && (
            <div id="mobile-menu" className="md:hidden px-4 pb-3 flex flex-col gap-2">
              {nav.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className={classNames("rounded-lg px-3 py-2 text-sm border border-white/10 bg-white/5", active === item.id ? "text-white" : "text-neutral-300")} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
              ))}
              <div className="flex gap-2 pt-2">
                <a href={`mailto:${data.email}`} className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm bg-white/5">Email</a>
                <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm bg-white/5">LinkedIn</a>
              </div>
            </div>
        )}
      </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   COSMIC HERO + Picture
   ──────────────────────────────────────────────────────────────────────────── */
function MilkyWayBand() {
  return (
      <mesh position={[0, 0.3, -1.2]} rotation={[0.1, -0.35, 0.2]} renderOrder={-10}>
        <planeGeometry args={[14, 6]} />
        <meshBasicMaterial transparent opacity={0.28}>
          <GradientTexture stops={[0, 0.4, 0.7, 1]} colors={["#000000", "#1e1b4b", "#312e81", "#000000"]} />
        </meshBasicMaterial>
      </mesh>
  );
}

function Hero3D() {
  const shouldReduce = useReducedMotion();
  return (
      <div className="relative min-h-[460px] md:min-h-[560px]">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: false }} style={{ position: "absolute", inset: 0 }}>
          <color attach="background" args={["#0b1020"]} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 5, 6]} intensity={0.8} />
          <MilkyWayBand />
          {!shouldReduce && (
              <>
                <Stars radius={280} depth={160} count={6000} factor={4.2} fade speed={0.09} />
                <Sparkles count={220} scale={[14, 6, 6]} size={1.6} speed={0.15} opacity={0.45} />
              </>
          )}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={!shouldReduce} autoRotateSpeed={0.25} />
          <Environment preset="night" />
        </Canvas>

        <div className="mx-auto max-w-5xl px-4 pt-16 pb-10 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <motion.div variants={fade} initial="hidden" animate="show" className="flex-1">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-violet-300">{data.name}</span>
            </h1>
            <p className="mt-3 text-lg text-neutral-300">{data.role}</p>
            <p className="mt-4 max-w-2xl text-neutral-200/90 leading-7 bg-white/5 backdrop-blur-sm rounded-2xl p-3 inline-block shadow-sm">{data.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {/*<a href={data.resumeUrl} className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10 transition-all">View Résumé</a>*/}
              <a href="#projects" className="rounded-xl bg-white/10 text-white px-4 py-2 text-sm hover:bg-white/20 transition-all">View Projects</a>
            </div>
          </motion.div>
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-violet-400/40 shadow-lg">
            <img src={data.picture} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   FOOTER
   ──────────────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
      <footer id="contact" className="border-t border-white/10 mt-12 text-neutral-300">
        <div className="mx-auto max-w-5xl px-4 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-semibold">Let’s build something reliable & beautiful.</p>
            <p className="text-neutral-400 mt-1">Based in {data.location}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${data.email}`} className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10 transition-all">{data.email}</a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10 transition-all">LinkedIn Profile</a>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 pb-8 text-xs text-neutral-400">
          © 2025 {data.name}. All rights reserved.
        </div>
      </footer>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   APP
   ──────────────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
      <div className="min-h-screen bg-[#0b1020] text-neutral-100">
        <Navbar />
        <Hero3D />

        <main className="mx-auto max-w-5xl px-4">
          {/* Education */}
          <Section id="education" title="Education">
            <div className="grid gap-4">
              <AnimatedCard heading="University of Pennsylvania" sub="MSE, Computer & Information Science — GPA 3.95" right="May 2026">
                <p>Coursework: Machine Learning, Data Structures and Algorithms, Databases, Operating Systems, Distributed Systems, Engineering Economics, Entrepreneurship</p>
                <p>Teaching Assistant: Operating Systems (Fall ’25); Algorithms (Fall '24, Spring, Summer '25).</p>
              </AnimatedCard>
              <AnimatedCard heading="Birla Institute of Technology, Mesra" sub="B.E., Computer Science — GPA 9.17/10 (Rank 2/130)" right="Jul 2020">
                <p>Chairman, IEEE Student Branch.</p>
              </AnimatedCard>
            </div>
          </Section>

          {/* Experience */}
          <Section id="experience" title="Experience">
            <div className="grid gap-4">
              <AnimatedCard heading="Engineering Intern" sub="Gentherm · Novi, MI, USA" right="May 2025 – Aug 2025">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Designed Android app with Hasura GraphQL replacing Excel macros (99% faster setup).</li>
                  <li>Demoed WellSense on a Kia EV9; streamed seat-specific programs to 4 ESP32 controllers via Bluetooth with USB control.</li>
                  <li>Functionality currently under discussion for patenting.</li>
                </ul>
              </AnimatedCard>
              <AnimatedCard heading="Associate, WCSI Alum" sub="Goldman Sachs · Bengaluru, India" right="Jul 2020 – Aug 2024">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Led record-retention tool on DataLake; 80% faster retrieval and better compliance.</li>
                  <li>Integrated vendor workpaper system via REST; reduced legacy dependency by 75% and added SSO.</li>
                  <li>Managed 7-developer team delivering an agile auditing platform; 25% faster turnaround.</li>
                </ul>
              </AnimatedCard>
              <AnimatedCard heading="Summer Analyst Intern" sub="Goldman Sachs · Bengaluru, India" right="Jan 2020 – Jun 2020">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Built messaging library with RabbitMQ + Java; 80% latency reduction across apps.</li>
                  <li>Migrated infra for 30+ apps to Kubernetes/Docker; ~99% fewer outages.</li>
                  <li>Upgraded Elasticsearch v2→v7 using Terraform; handled ~1TB of data indexing.</li>
                </ul>
              </AnimatedCard>
              <AnimatedCard heading="Summer Analyst Intern (Offer)" sub="Goldman Sachs · Bengaluru, India" right="May 2019 – Jul 2019">
                <ul className="list-disc ml-5 space-y-1">
                  <li>Built React-Redux + Spring Boot service to centralize reference data and refresh procedures.</li>
                  <li>Created a template microservice pattern used for future services.</li>
                </ul>
              </AnimatedCard>
            </div>
          </Section>

          {/* Skills (hover-only glow + haptics) */}
          <Section id="skills" title="Skills">
            <div className="flex flex-wrap gap-2">
              {[
                "Java","C/C++","Python","Rust","SQL/NoSQL","JavaScript","TypeScript","HTML/CSS",
                "RabbitMQ","Spring Boot","Hibernate","React/Redux","Node.js","Spark","Elasticsearch",
                "Git","Kubernetes","CI/CD","DevOps","AWS","Docker","Machine Learning","PyTorch",
                "Tensorflow","MySQL","MongoDB","PostgreSQL",
              ].map((skill) => (
                  <motion.span
                      key={skill}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-neutral-200 backdrop-blur transition-all hover:ring-2 hover:ring-violet-400/30 hover:shadow-[0_0_18px_rgba(152,135,255,0.22)]"
                  >
                    {skill}
                  </motion.span>
              ))}
            </div>
          </Section>

          {/* Coursework (added items; hover-only glow + haptics) */}
          <Section id="coursework" title="Coursework">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "Machine Learning",
                "Data Structures & Algorithms",
                "Databases",
                "Operating Systems",
                "Distributed Systems",
                "Software Engineering",
                "Big Data",
                "Engineering Entrepreneurship",
                "Engineering Economics",
              ].map((c) => (
                  <motion.div
                      key={c}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200 transition-all hover:shadow-[0_0_18px_rgba(152,135,255,0.22)]"
                  >
                    {c}
                  </motion.div>
              ))}
            </div>
          </Section>

          {/* Teaching */}
          <Section id="teaching" title="Teaching">
            <div className="grid gap-4">
              <AnimatedCard heading="Teaching Assistant — Operating Systems (CIS 5480)" sub="University of Pennsylvania" right="Fall ‘25">
                <p>Led recitations on processes, scheduling, concurrency, and filesystems. Mentored students on C systems projects.</p>
              </AnimatedCard>
              <AnimatedCard heading="Teaching Assistant — Algorithms (MCIT 5960)" sub="University of Pennsylvania" right="Fall ‘24 · Spring ‘25 · Summer ‘25">
                <p>Ran office hours, graded assignments, and supported students in algorithm design, complexity analysis, and data structures.</p>
              </AnimatedCard>
            </div>
          </Section>

          {/* Projects (includes CIS 5450 Big Data project, shortened) */}
          <Section id="projects" title="Projects">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: "Smart Used-Car Pricing Engine",
                  sub: "CIS 5450 — Big Data Analytics",
                  right: "Mar 2025",
                  details:
                      "Used-car pricing engine (Kaggle, Python) predicting fair market prices from real listings.",
                  bullets: [
                    "Cleaning & feature engineering",
                    "EDA, PCA",
                    "Multiple regression models",
                    "Tuning & evaluation (R², errors)",
                    "Null-hypothesis tests",
                  ],
                  tags: ["Python", "Pandas", "scikit-learn", "PCA", "Kaggle", "Regression"],
                },
                {
                  name: "PennOS — UNIX-like Operating System",
                  sub: "CIS 5480",
                  right: "Jan 2025",
                  details:
                      "UNIX-like OS implementing a basic priority scheduler, FAT file system, and a user shell with threads, interrupts, and process lifecycle handling (C).",
                  tags: ["C", "OS", "FAT", "Threads"],
                },
                {
                  name: "BookFlix — Book & Movie Comparison",
                  sub: "CIS 5500",
                  right: "Dec 2024",
                  details:
                      "Compare books vs movies, filter attributes, and analytics dashboard. React, Node.js, SQL, Bing Search integration.",
                  tags: ["React", "Node.js", "SQL", "Bing API"],
                },
                {
                  name: "Distributed k-NN vs Random Forest (Poker)",
                  sub: "Team of two · Apache Spark",
                  right: "2024",
                  details:
                      "Implemented k-NN and compared with Random Forest on Poker dataset using Spark in-memory processing. Parallelized across 5 worker nodes to cut execution time by 50% with 95% accuracy.",
                  tags: ["Spark", "Python", "Pandas", "ML"],
                },
                {
                  name: "Website Design & Hosting",
                  sub: "Freelance client site",
                  right: "2023",
                  details:
                      "Responsive app with Bootstrap: appointment scheduling, automated email notifications, integrated payments — ~40% increase in appointments.",
                  tags: ["Bootstrap", "Email", "Payments", "Scheduling"],
                },
              ].map((p) => (
                  <AnimatedCard key={p.name} heading={p.name} sub={p.sub} right={p.right}>
                    <p>{p.details}</p>
                    {p.bullets && (
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                          {p.bullets.map((b) => (
                              <li key={b}>{b}</li>
                          ))}
                        </ul>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                          <span
                              key={tag}
                              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-neutral-200 hover:shadow-[0_0_14px_rgba(152,135,255,0.22)]"
                          >
                      {tag}
                    </span>
                      ))}
                    </div>
                  </AnimatedCard>
              ))}
            </div>
          </Section>

          {/* Leadership & Awards */}
          <Section id="leadership" title="Leadership & Awards">
            <div className="grid md:grid-cols-2 gap-4">
              <AnimatedCard heading="IEEE Student Branch — Chairman, Former Secretary" sub="BIT Mesra" right="Undergrad">
                <p>Led student chapter events and technical workshops; coordinated talks, hackathons, and mentorship activities.</p>
              </AnimatedCard>
              <AnimatedCard heading="Academic Achievement" sub="BIT Mesra" right="Rank 2 / 130">
                <p>Graduated with GPA 9.17/10; placed second in class among 130 students.</p>
              </AnimatedCard>
            </div>
          </Section>

          {/* Hobbies */}
          <Section id="hobbies" title="Hobbies">
            <AnimatedCard heading="When I’m not coding" sub="Things that recharge me">
              <ul className="list-disc ml-5 space-y-1">
                <li>📚 Reading: sci-fi, fantasy, and non-fiction.</li>
                <li>🍜 Trying new food: always hunting for good food & tea.</li>
                <li>🪄 Potterhead: trivia, house debates, cozy re-reads and binge-watch.</li>
              </ul>
            </AnimatedCard>
          </Section>
        </main>

        <Footer />
      </div>
  );
}
