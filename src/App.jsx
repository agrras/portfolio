import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Stage, Stars } from "@react-three/drei";

// ──────────────────────────────────────────────────────────────────────────────
// Single‑file React portfolio component
// Drop this into a fresh Vite React app as src/App.jsx (or pages/index.jsx in Next.js)
// Tailwind: run `npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
// Add the Tailwind directives to index.css: @tailwind base; @tailwind components; @tailwind utilities;
// Enable GitHub Pages via `npm run build` + `gh-pages` or GitHub Actions (see instructions in chat).
// ──────────────────────────────────────────────────────────────────────────────

const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const data = {
  name: "Rashi Agrawal",
  role: "Software Engineer • Distributed Systems • ML-inclined",
  blurb:
      "Software engineer with 4+ years of full‑stack and cloud‑native experience. I design reliable microservices, data pipelines, and delightful UIs—and I’m deepening ML skills to build intelligent, data‑driven products.",
  location: "Philadelphia, PA, USA",
  email: "agrras@seas.upenn.edu",
  phone: "+1 445-225-9110",
  linkedin: "https://www.linkedin.com/in/agrawalrashi",
  resumeUrl: "#", // replace with a public link to your PDF (e.g., GitHub repo raw URL)
  skills: [
    "Java",
    "C/C++",
    "Python",
    "Rust",
    "JavaScript/TypeScript",
    "React/Redux",
    "Node.js",
    "Spring Boot",
    "Kubernetes",
    "Docker",
    "AWS",
    "RabbitMQ",
    "Elasticsearch",
    "SQL / NoSQL",
    "CI/CD",
    "PyTorch",
    "TensorFlow",
  ],
  experience: [
    {
      company: "Gentherm",
      title: "Engineering Intern",
      location: "Novi, MI, USA",
      period: "May 2025 – Aug 2025",
      bullets: [
        "Built an Android app (XML + Hasura GraphQL) replacing Excel macros; cut setup time by 99%.",
        "Deployed on a Kia EV9 demoing WellSense; streamed seat‑specific programs to 4 ESP32s via Bluetooth, with USB control + custom heater signals.",
        "Functionality currently under discussion for patenting.",
      ],
    },
    {
      company: "Goldman Sachs",
      title: "Associate, WCSI Alum",
      location: "Bengaluru, India",
      period: "Jul 2020 – Aug 2024",
      bullets: [
        "Led a team of 4 to build a record‑retention tool on DataLake; 80% faster retrieval and improved compliance.",
        "Integrated vendor workpaper system via REST, reducing legacy dependency by 75%; added SSO for security.",
        "Managed a 7‑dev team delivering an agile‑auditing platform; 25% project turnaround improvement.",
      ],
    },
    {
      company: "Goldman Sachs",
      title: "Summer Analyst Intern (2019 & 2020)",
      location: "Bengaluru, India",
      period: "May 2019 – Jun 2020",
      bullets: [
        "Built a scalable messaging library with RabbitMQ and Java patterns; ↓ latency by 80%.",
        "Migrated infra for 30+ apps to Kubernetes/Docker; outages ↓ 99%.",
        "Upgraded Elasticsearch v2→v7 with Terraform, indexing ~1TB of data.",
      ],
    },
  ],
  projects: [
    {
      name: "PennOS",
      caption: "UNIX‑like OS (C)",
      details:
          "Implements a basic priority scheduler, FAT filesystem, and user shell with threads, interrupts, and process lifecycle handling.",
      link: "#",
    },
    {
      name: "BookFlix",
      caption: "Book ↔ Movie comparison platform",
      details:
          "Search books/movies, compare adaptations & reviews (Amazon/IMDb), analytics dashboard. React, Node.js, SQL, Bing Search integration.",
      link: "#",
    },
  ],
  education: [
    {
      school: "University of Pennsylvania",
      degree: "MSE, Computer & Information Science (GPA 3.95)",
      period: "May 2026",
      details:
          "Coursework: ML, DSA, Databases, OS, Distributed Systems. TA: Operating Systems (CIS 5480, Fall ’25); Algorithms (MCIT 5960, ’24–’25).",
    },
    {
      school: "Birla Institute of Technology, Mesra",
      degree: "B.E., Computer Science (GPA 9.17/10, Rank 2/130)",
      period: "Jul 2020",
      details: "Chairman, IEEE Student Branch.",
    },
  ],
};

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Section({ id, title, children }) {
  return (
      <section id={id} className="scroll-mt-24 py-14 lg:py-20">
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
          <div className="mt-6">{children}</div>
        </motion.div>
      </section>
  );
}

function Chip({ children }) {
  return (
      <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm leading-6 bg-white/60 backdrop-blur shadow-sm">
      {children}
    </span>
  );
}

function Card({ heading, sub, right, children }) {
  return (
      <div className="group rounded-2xl border bg-white/70 backdrop-blur p-6 shadow-sm hover:shadow-xl transition-all duration-300 will-change-transform hover:-translate-y-0.5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold">{heading}</h3>
            {sub && <p className="text-sm text-neutral-600 mt-0.5">{sub}</p>}
          </div>
          {right && <span className="text-sm text-neutral-600 whitespace-nowrap">{right}</span>}
        </div>
        {children && <div className="mt-3 text-[15px] leading-7 text-neutral-800">{children}</div>}
      </div>
  );
}

function Navbar() {
  return (
      <div className="sticky top-0 z-40 backdrop-blur border-b bg-white/70">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight">{data.name}</a>
          <nav className="hidden md:flex gap-5 text-sm">
            {nav.map(item => (
                <a key={item.id} href={`#${item.id}`} className="text-neutral-600 hover:text-neutral-900">
                  {item.label}
                </a>
            ))}
          </nav>
          <div className="flex gap-2">
            <a href={`mailto:${data.email}`} className="rounded-xl border px-3 py-1.5 text-sm hover:bg-neutral-50">Email</a>
            <a href={data.linkedin} target="_blank" className="rounded-xl border px-3 py-1.5 text-sm hover:bg-neutral-50" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
  );
}

function FloatingTorus(props) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.25;
      ref.current.rotation.y = t * 0.35;
    }
  });
  return (
      <Float floatIntensity={1.5} rotationIntensity={0.6} speed={1.2}>
        <mesh ref={ref} {...props} castShadow receiveShadow>
          <torusKnotGeometry args={[1, 0.35, 220, 32]} />
          <meshStandardMaterial metalness={0.6} roughness={0.25} />
        </mesh>
      </Float>
  );
}

function Hero3D() {
  return (
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-white" />
        <div className="absolute inset-0 -z-10">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} shadows>
            <ambientLight intensity={0.7} />
            <directionalLight position={[4, 6, 5]} intensity={1.0} castShadow />
            <Stars radius={80} depth={40} count={2500} factor={4} saturation={0} fade />
            <Stage intensity={0.4} environment={null} shadows="contact">
              <FloatingTorus position={[0, 0.15, 0]} />
            </Stage>
            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
          </Canvas>
        </div>
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-10">
          <motion.div variants={fade} initial="hidden" animate="show">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              {data.name}
            </span>
            </h1>
            <p className="mt-3 text-lg text-neutral-700">{data.role}</p>
            <p className="mt-4 max-w-2xl text-neutral-800 leading-7 bg-white/60 backdrop-blur-sm rounded-2xl p-3 inline-block shadow-sm">
              {data.blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                  href={data.resumeUrl}
                  className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
              >
                View Résumé
              </a>
              <a
                  href="#projects"
                  className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800"
              >
                View Work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
  );
}

function Skills() {
  const chunks = useMemo(() => {
    const out = [];
    for (let i = 0; i < data.skills.length; i += 8) out.push(data.skills.slice(i, i + 8));
    return out;
  }, []);
  return (
      <div className="grid gap-3">
        {chunks.map((row, idx) => (
            <div key={idx} className="flex flex-wrap gap-2">
              {row.map((s) => (
                  <Chip key={s}>{s}</Chip>
              ))}
            </div>
        ))}
      </div>
  );
}

function Experience() {
  return (
      <div className="grid gap-4">
        {data.experience.map((e) => (
            <Card
                key={e.company + e.title}
                heading={`${e.title} · ${e.company}`}
                sub={`${e.location}`}
                right={e.period}
            >
              <ul className="list-disc ml-5 mt-2 space-y-1">
                {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                ))}
              </ul>
            </Card>
        ))}
      </div>
  );
}

function Projects() {
  return (
      <div className="grid md:grid-cols-2 gap-4">
        {data.projects.map((p) => (
            <div key={p.name} className="rounded-2xl border bg-white/70 backdrop-blur p-6 shadow-sm">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                  <p className="text-sm text-neutral-600">{p.caption}</p>
                </div>
                {p.link !== "#" && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="text-sm text-indigo-700 hover:underline">
                      Visit ↗
                    </a>
                )}
              </div>
              <p className="mt-3 text-[15px] leading-7 text-neutral-800">{p.details}</p>
            </div>
        ))}
      </div>
  );
}

function Education() {
  return (
      <div className="grid gap-4">
        {data.education.map((ed) => (
            <Card key={ed.school} heading={ed.school} sub={ed.degree} right={ed.period}>
              <p className="mt-2">{ed.details}</p>
            </Card>
        ))}
      </div>
  );
}

function Footer() {
  return (
      <footer id="contact" className="border-t mt-12">
        <div className="mx-auto max-w-5xl px-4 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-semibold">Let’s build something reliable & beautiful.</p>
            <p className="text-neutral-600 mt-1">Based in {data.location}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${data.email}`} className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50">
              {data.email}
            </a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50">
              LinkedIn Profile
            </a>
            <a href="https://github.com/new" target="_blank" rel="noreferrer" className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800">
              Deploy to GitHub Pages
            </a>
          </div>
        </div>
      </footer>
  );
}

export default function Portfolio() {
  return (
      <div className="min-h-screen bg-white text-neutral-900">
        <Navbar />
        <Hero3D />
        <main className="mx-auto max-w-5xl px-4">
          <Section id="about" title="About">
            <p>
              I focus on dependable systems and thoughtful UX. Recent work spans Android + GraphQL for automotive demos,
              audit platforms at enterprise scale, and infra upgrades (Kubernetes, Terraform, Elasticsearch). I enjoy turning
              gnarly constraints into elegant products.
            </p>
          </Section>
          <Section id="skills" title="Skills">
            <Skills />
          </Section>
          <Section id="experience" title="Experience">
            <Experience />
          </Section>
          <Section id="projects" title="Projects">
            <Projects />
          </Section>
          <Section id="education" title="Education">
            <Education />
          </Section>
        </main>
        <Footer />
      </div>
  );
}
