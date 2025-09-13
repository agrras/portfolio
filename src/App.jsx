import { useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Stars,
  Sparkles,
  GradientTexture,
} from "@react-three/drei";

/* ────────────────────────────────────────────────────────────────────────────
   Data (edit freely)
   ──────────────────────────────────────────────────────────────────────────── */
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
      "Software engineer with 4+ years of full-stack and cloud-native experience. I design reliable microservices, data pipelines, and delightful UIs—and I’m deepening ML skills to build intelligent, data-driven products.",
  location: "Philadelphia, PA, USA",
  email: "agrras@seas.upenn.edu",
  phone: "+1 445-225-9110",
  linkedin: "https://www.linkedin.com/in/agrawalrashi",
  resumeUrl: "#",
  skills: [
    "Java","C/C++","Python","Rust","JavaScript/TypeScript","React/Redux","Node.js",
    "Spring Boot","Kubernetes","Docker","AWS","RabbitMQ","Elasticsearch","SQL / NoSQL",
    "CI/CD","PyTorch","TensorFlow",
  ],
  experience: [
    {
      company: "Gentherm",
      title: "Engineering Intern",
      location: "Novi, MI, USA",
      period: "May 2025 – Aug 2025",
      bullets: [
        "Built an Android app (XML + Hasura GraphQL) replacing Excel macros; cut setup time by 99%.",
        "Deployed on a Kia EV9 demoing WellSense; streamed seat-specific programs to 4 ESP32s via Bluetooth, with USB control + custom heater signals.",
        "Functionality currently under discussion for patenting.",
      ],
    },
    {
      company: "Goldman Sachs",
      title: "Associate, WCSI Alum",
      location: "Bengaluru, India",
      period: "Jul 2020 – Aug 2024",
      bullets: [
        "Led a team of 4 to build a record-retention tool on DataLake; 80% faster retrieval and improved compliance.",
        "Integrated vendor workpaper system via REST, reducing legacy dependency by 75%; added SSO for security.",
        "Managed a 7-dev team delivering an agile-auditing platform; 25% project turnaround improvement.",
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
      caption: "UNIX-like OS (C)",
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

/* ────────────────────────────────────────────────────────────────────────────
   Motion helper
   ──────────────────────────────────────────────────────────────────────────── */
const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ────────────────────────────────────────────────────────────────────────────
   UI primitives
   ──────────────────────────────────────────────────────────────────────────── */
function Section({ id, title, children }) {
  return (
      <section id={id} className="scroll-mt-24 py-14 lg:py-20">
        <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          <div className="mt-6">{children}</div>
        </motion.div>
      </section>
  );
}

function Chip({ children }) {
  return (
      <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-sm leading-6 bg-white/5 text-neutral-200 backdrop-blur shadow-sm">
      {children}
    </span>
  );
}

function Card({ heading, sub, right, children }) {
  return (
      <div className="group rounded-2xl border border-white/10 bg-white/5 text-neutral-100 backdrop-blur p-6 shadow-sm hover:shadow-xl transition-all duration-300 will-change-transform hover:-translate-y-0.5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold">{heading}</h3>
            {sub && <p className="text-sm text-neutral-300 mt-0.5">{sub}</p>}
          </div>
          {right && (
              <span className="text-sm text-neutral-400 whitespace-nowrap">
            {right}
          </span>
          )}
        </div>
        {children && (
            <div className="mt-3 text-[15px] leading-7 text-neutral-200">
              {children}
            </div>
        )}
      </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Navbar (dark)
   ──────────────────────────────────────────────────────────────────────────── */
function Navbar() {
  return (
      <div className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-[#0b1020]/70">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between text-neutral-100">
          <a href="#" className="font-semibold tracking-tight">
            {data.name}
          </a>
          <nav className="hidden md:flex gap-5 text-sm">
            {nav.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-neutral-300 hover:text-white"
                >
                  {item.label}
                </a>
            ))}
          </nav>
          <div className="flex gap-2">
            <a
                href={`mailto:${data.email}`}
                className="rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10"
            >
              Email
            </a>
            <a
                href={data.linkedin}
                target="_blank"
                className="rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10"
                rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Milky Way band (subtle gradient plane)
   ──────────────────────────────────────────────────────────────────────────── */
function MilkyWayBand() {
  return (
      <mesh
          position={[0, 0.3, -1.2]}
          rotation={[0.1, -0.35, 0.2]}
          renderOrder={-10}
      >
        <planeGeometry args={[14, 6]} />
        <meshBasicMaterial transparent opacity={0.24}>
          <GradientTexture
              stops={[0, 0.45, 0.75, 1]}
              colors={["#000000", "#27306b", "#5a3b86", "#000000"]}
          />
        </meshBasicMaterial>
      </mesh>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Hero (Dark, subtle Hogwarts x Milky Way)
   ──────────────────────────────────────────────────────────────────────────── */
function HeroCosmos() {
  const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
      <div className="relative min-h-[460px] md:min-h-[560px]">
        {!prefersReduced && (
            <Canvas
                camera={{ position: [0, 0, 5.2], fov: 45 }}
                gl={{ antialias: true, alpha: false }}
                style={{ position: "absolute", inset: 0 }}
            >
              {/* Deep night background */}
              <color attach="background" args={["#0b1020"]} />

              {/* Low-key lighting */}
              <ambientLight intensity={0.35} />
              <directionalLight position={[3, 5, 6]} intensity={0.6} />

              {/* Milky Way + very light star drift */}
              <MilkyWayBand />
              <Stars radius={180} depth={120} count={1800} factor={3.0} fade speed={0.12} />
              <Sparkles
                  count={60}
                  scale={[12, 5, 5]}
                  size={1.2}
                  speed={0.08}
                  noise={0.15}
                  opacity={0.35}
              />

              {/* Gentle camera drift */}
              <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.15}
              />
              <Environment preset="night" />
            </Canvas>
        )}

        {/* Foreground content */}
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-10 relative z-10">
          <motion.div variants={fade} initial="hidden" animate="show">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-violet-300">
              {data.name}
            </span>
            </h1>
            <p className="mt-3 text-lg text-neutral-300">{data.role}</p>
            <p className="mt-4 max-w-2xl text-neutral-200/90 leading-7 bg-white/5 backdrop-blur-sm rounded-2xl p-3 inline-block shadow-sm">
              {data.blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                  href={data.resumeUrl}
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
              >
                View Résumé
              </a>
              <a
                  href="#projects"
                  className="rounded-xl bg_white/10 text-white px-4 py-2 text-sm hover:bg-white/20"
              >
                View Work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Sections
   ──────────────────────────────────────────────────────────────────────────── */
function Skills() {
  const chunks = useMemo(() => {
    const out = [];
    for (let i = 0; i < data.skills.length; i += 8)
      out.push(data.skills.slice(i, i + 8));
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
            <div
                key={p.name}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-sm"
            >
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.name}
                  </h3>
                  <p className="text-sm text-neutral-300">{p.caption}</p>
                </div>
                {p.link !== "#" && (
                    <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-indigo-300 hover:underline"
                    >
                      Visit ↗
                    </a>
                )}
              </div>
              <p className="mt-3 text-[15px] leading-7 text-neutral-200">
                {p.details}
              </p>
            </div>
        ))}
      </div>
  );
}

function Education() {
  return (
      <div className="grid gap-4">
        {data.education.map((ed) => (
            <Card
                key={ed.school}
                heading={ed.school}
                sub={ed.degree}
                right={ed.period}
            >
              <p className="mt-2">{ed.details}</p>
            </Card>
        ))}
      </div>
  );
}

function Footer() {
  return (
      <footer id="contact" className="border-t border-white/10 mt-12">
        <div className="mx-auto max-w-5xl px-4 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-semibold">
              Let’s build something reliable & beautiful.
            </p>
            <p className="text-neutral-400 mt-1">Based in {data.location}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
                href={`mailto:${data.email}`}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
            >
              {data.email}
            </a>
            <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
            >
              LinkedIn Profile
            </a>
            <a
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-white/10 text-white px-4 py-2 text-sm hover:bg-white/20"
            >
              Deploy to GitHub Pages
            </a>
          </div>
        </div>
      </footer>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   App (dark theme)
   ──────────────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  return (
      <div className="min-h-screen bg-[#0b1020] text-neutral-100">
        <Navbar />
        <HeroCosmos />
        <main className="mx-auto max-w-5xl px-4">
          <Section id="about" title="About">
            <p>
              I focus on dependable systems and thoughtful UX. Recent work spans
              Android + GraphQL for automotive demos, audit platforms at
              enterprise scale, and infra upgrades (Kubernetes, Terraform,
              Elasticsearch). I enjoy turning gnarly constraints into elegant
              products.
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