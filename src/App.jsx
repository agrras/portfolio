import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars, Sparkles, GradientTexture } from "@react-three/drei";

/* ────────────────────────────────────────────────────────────────────────────
   NAV + DATA
   ──────────────────────────────────────────────────────────────────────────── */
const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "coursework", label: "Coursework" },
  { id: "teaching", label: "Teaching" },
  { id: "leadership", label: "Leadership & Awards" },
  { id: "education", label: "Education" },
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
  resumeUrl: "#",
};

/* ────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ──────────────────────────────────────────────────────────────────────────── */
const fade = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const revealUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ────────────────────────────────────────────────────────────────────────────
   SECTION + UI PARTS
   ──────────────────────────────────────────────────────────────────────────── */
function Section({ id, title, children }) {
  return (
      <section id={id} className="scroll-mt-24 py-14 lg:py-20">
        <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <div className="mt-6 text-neutral-200 grid gap-4">{children}</div>
        </motion.div>
      </section>
  );
}

function AnimatedCard({ heading, sub, right, children }) {
  return (
      <motion.div
          variants={revealUp}
          whileHover={{
            scale: 1.05,
            rotateX: 2,
            rotateY: -2,
            boxShadow: "0 15px 40px rgba(100,100,255,0.30)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="rounded-2xl border border-white/10 bg-white/5 text-neutral-100 backdrop-blur p-6 shadow-md hover:ring-2 hover:ring-violet-400/20"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold">{heading}</h3>
            {sub && <p className="text-sm text-neutral-300 mt-0.5">{sub}</p>}
          </div>
          {right && (
              <span className="text-sm text-neutral-400 whitespace-nowrap">{right}</span>
          )}
        </div>
        {children && (
            <div className="mt-3 text-[15px] leading-7 text-neutral-200">{children}</div>
        )}
      </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   NAVBAR
   ──────────────────────────────────────────────────────────────────────────── */
function Navbar() {
  return (
      <div className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-[#0b1020]/80">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between text-neutral-100">
          <a href="#" className="font-semibold tracking-tight">
            {data.name}
          </a>
          <nav className="hidden md:flex gap-5 text-sm">
            {nav.map((item) => (
                <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      color: "#fff",
                      textShadow: "0 0 8px rgba(180,180,255,0.8)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-neutral-300 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </motion.a>
            ))}
          </nav>
          <div className="flex gap-2">
            <a
                href={`mailto:${data.email}`}
                className="rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10 transition-all"
            >
              Email
            </a>
            <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10 transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   COSMIC HERO
   ──────────────────────────────────────────────────────────────────────────── */
function MilkyWayBand() {
  return (
      <mesh
          position={[0, 0.3, -1.2]}
          rotation={[0.1, -0.35, 0.2]}
          renderOrder={-10}
      >
        <planeGeometry args={[14, 6]} />
        <meshBasicMaterial transparent opacity={0.28}>
          <GradientTexture
              stops={[0, 0.4, 0.7, 1]}
              colors={["#000000", "#1e1b4b", "#312e81", "#000000"]}
          />
        </meshBasicMaterial>
      </mesh>
  );
}

function ShootingStar() {
  return (
      <motion.mesh
          initial={{ x: -10, y: 5, opacity: 0 }}
          animate={{ x: 10, y: -5, opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 5 }}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="white" />
      </motion.mesh>
  );
}

function Hero3D() {
  return (
      <div className="relative min-h-[460px] md:min-h-[560px]">
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{ antialias: true, alpha: false }}
            style={{ position: "absolute", inset: 0 }}
        >
          <color attach="background" args={["#0b1020"]} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 5, 6]} intensity={0.8} />
          <MilkyWayBand />
          <Stars radius={280} depth={160} count={6000} factor={4.2} fade speed={0.09} />
          <Sparkles
              count={280}
              scale={[14, 6, 6]}
              size={1.8}
              speed={0.15}
              noise={0.25}
              opacity={0.45}
          />
          <Sparkles
              count={60}
              scale={[16, 7, 6]}
              size={2.2}
              speed={0.22}
              opacity={0.3}
          />
          <ShootingStar />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
          <Environment preset="night" />
        </Canvas>

        <div className="mx-auto max-w-5xl px-4 pt-16 pb-10 relative z-10">
          <motion.div variants={fade} initial="hidden" animate="show">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <motion.span
                  initial={{ textShadow: "0 0 0px rgba(180,180,255,0.0)" }}
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(180,180,255,0)",
                      "0 0 16px rgba(180,180,255,0.6)",
                      "0 0 6px rgba(180,180,255,0.3)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-violet-300"
              >
                {data.name}
              </motion.span>
            </h1>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="mt-3 text-lg text-neutral-300"
            >
              {data.role}
            </motion.p>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="mt-4 max-w-2xl text-neutral-200/90 leading-7 bg-white/5 backdrop-blur-sm rounded-2xl p-3 inline-block shadow-sm"
            >
              {data.blurb}
            </motion.p>
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 0 16px rgba(180,180,255,0.4)" }}
                  href={data.resumeUrl}
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10 transition-all"
              >
                View Résumé
              </motion.a>
              <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 0 16px rgba(180,180,255,0.4)" }}
                  href="#projects"
                  className="rounded-xl bg-white/10 text-white px-4 py-2 text-sm hover:bg-white/20 transition-all"
              >
                View Work
              </motion.a>
            </div>
          </motion.div>
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
            <a
                href={`mailto:${data.email}`}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10 transition-all"
            >
              {data.email}
            </a>
            <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10 transition-all"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </footer>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   APP
   ──────────────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  return (
      <div className="min-h-screen bg-[#0b1020] text-neutral-100">
        <Navbar />
        <Hero3D />

        <main className="mx-auto max-w-5xl px-4">
          {/* About */}
          <Section id="about" title="About">
            <p>{data.blurb}</p>
          </Section>

          {/* Skills (staggered reveal + glow on hover) */}
          <Section id="skills" title="Skills">
            <motion.div
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-wrap gap-2"
            >
              {[
                "Java","C/C++","Python","Rust","SQL/NoSQL","JavaScript","TypeScript","HTML/CSS",
                "RabbitMQ","Spring Boot","Hibernate","React/Redux","Node.js","Spark","Elasticsearch",
                "Git","Kubernetes","CI/CD","DevOps","AWS","Docker","Machine Learning","PyTorch",
                "Tensorflow","MySQL","MongoDB","PostgreSQL",
              ].map((skill) => (
                  <motion.span
                      key={skill}
                      variants={revealUp}
                      whileHover={{ scale: 1.1, y: -2, boxShadow: "0 0 18px rgba(152,135,255,0.55)" }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-neutral-200 backdrop-blur shadow-sm hover:ring-2 hover:ring-violet-400/30 transition-all"
                  >
                    {skill}
                  </motion.span>
              ))}
            </motion.div>
          </Section>

          {/* Experience */}
          <Section id="experience" title="Experience">
            <motion.div
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-4"
            >
              <AnimatedCard
                  heading="Engineering Intern"
                  sub="Gentherm · Novi, MI, USA"
                  right="May 2025 – Aug 2025"
              >
                <ul className="list-disc ml-5 space-y-1">
                  <li>Designed Android app with Hasura GraphQL replacing Excel macros (99% faster setup).</li>
                  <li>Demoed WellSense on a Kia EV9; streamed seat-specific programs to 4 ESP32 controllers via Bluetooth with USB control.</li>
                  <li>Functionality currently under discussion for patenting.</li>
                </ul>
              </AnimatedCard>

              <AnimatedCard
                  heading="Associate, WCSI Alum"
                  sub="Goldman Sachs · Bengaluru, India"
                  right="Jul 2020 – Aug 2024"
              >
                <ul className="list-disc ml-5 space-y-1">
                  <li>Led record-retention tool on DataLake; 80% faster retrieval and better compliance.</li>
                  <li>Integrated vendor workpaper system via REST; reduced legacy dependency by 75% and added SSO.</li>
                  <li>Managed 7-developer team delivering an agile auditing platform; 25% faster turnaround.</li>
                </ul>
              </AnimatedCard>

              <AnimatedCard
                  heading="Summer Analyst Intern"
                  sub="Goldman Sachs · Bengaluru, India"
                  right="Jan 2020 – Jun 2020"
              >
                <ul className="list-disc ml-5 space-y-1">
                  <li>Built messaging library with RabbitMQ + Java; 80% latency reduction across apps.</li>
                  <li>Migrated infra for 30+ apps to Kubernetes/Docker; ~99% fewer outages.</li>
                  <li>Upgraded Elasticsearch v2→v7 using Terraform; handled ~1TB of data indexing.</li>
                </ul>
              </AnimatedCard>

              <AnimatedCard
                  heading="Summer Analyst Intern (Offer)"
                  sub="Goldman Sachs · Bengaluru, India"
                  right="May 2019 – Jul 2019"
              >
                <ul className="list-disc ml-5 space-y-1">
                  <li>Built React-Redux + Spring Boot service to centralize reference data and refresh procedures.</li>
                  <li>Created a template microservice pattern used for future services.</li>
                </ul>
              </AnimatedCard>
            </motion.div>
          </Section>

          {/* Projects */}
          <Section id="projects" title="Projects">
            <motion.div
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid md:grid-cols-2 gap-4"
            >
              {[
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
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                          <motion.span
                              key={tag}
                              whileHover={{ scale: 1.05 }}
                              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-neutral-200"
                          >
                            {tag}
                          </motion.span>
                      ))}
                    </div>
                  </AnimatedCard>
              ))}
            </motion.div>
          </Section>

          {/* Coursework */}
          <Section id="coursework" title="Coursework">
            <motion.div
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid sm:grid-cols-2 md:grid-cols-3 gap-2"
            >
              {[
                "Machine Learning",
                "Data Structures & Algorithms",
                "Databases",
                "Operating Systems",
                "Distributed Systems",
                "Software Engineering",
              ].map((c) => (
                  <motion.div
                      key={c}
                      variants={revealUp}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200"
                  >
                    {c}
                  </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* Teaching */}
          <Section id="teaching" title="Teaching">
            <motion.div
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-4"
            >
              <AnimatedCard
                  heading="Teaching Assistant — Operating Systems (CIS 5480)"
                  sub="University of Pennsylvania"
                  right="Fall ‘25"
              >
                <p>Led recitations on processes, scheduling, concurrency, and filesystems. Mentored students on C systems projects.</p>
              </AnimatedCard>
              <AnimatedCard
                  heading="Teaching Assistant — Algorithms (MCIT 5960)"
                  sub="University of Pennsylvania"
                  right="Fall ‘24 · Spring ‘25 · Summer ‘25"
              >
                <p>Ran office hours, graded assignments, and supported students in algorithm design, complexity analysis, and data structures.</p>
              </AnimatedCard>
            </motion.div>
          </Section>

          {/* Leadership & Awards */}
          <Section id="leadership" title="Leadership & Awards">
            <motion.div
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid md:grid-cols-2 gap-4"
            >
              <AnimatedCard heading="IEEE Student Branch — Chairman, Former Secretary" sub="BIT Mesra" right="Undergrad">
                <p>Led student chapter events and technical workshops; coordinated talks, hackathons, and mentorship activities.</p>
              </AnimatedCard>
              <AnimatedCard heading="Academic Achievement" sub="BIT Mesra" right="Rank 2 / 130">
                <p>Graduated with GPA 9.17/10; placed second in class among 130 students.</p>
              </AnimatedCard>
            </motion.div>
          </Section>

          {/* Education */}
          <Section id="education" title="Education">
            <motion.div
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-4"
            >
              <AnimatedCard
                  heading="University of Pennsylvania"
                  sub="MSE, Computer & Information Science — GPA 3.95"
                  right="May 2026"
              >
                <p>Coursework: Machine Learning, Data Structures and Algorithms, Databases, Operating Systems, Distributed Systems, Engineering Economics, Entrepreneurship</p>
                  <p>Teaching Assistant: Operating Systems (Fall ’25); Algorithms (Fall '24, Spring, Summer '25).</p>
              </AnimatedCard>

              <AnimatedCard
                  heading="Birla Institute of Technology, Mesra"
                  sub="B.E., Computer Science — GPA 9.17/10 (Rank 2/130)"
                  right="Jul 2020"
              >
                <p>Chairman, IEEE Student Branch.</p>
              </AnimatedCard>
            </motion.div>
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