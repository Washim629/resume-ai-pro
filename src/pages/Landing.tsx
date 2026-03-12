import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, FileText, Briefcase, Github, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const features = [
  {
    icon: BarChart3,
    title: "ATS Score Checker",
    description: "Get your resume scored against ATS systems with detailed breakdowns and improvement tips.",
    path: "/analyzer",
  },
  {
    icon: Sparkles,
    title: "AI Resume Feedback",
    description: "Receive intelligent suggestions to strengthen your bullet points, skills, and impact statements.",
    path: "/analyzer",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Build professional, ATS-friendly resumes with guided forms and beautiful templates.",
    path: "/builder",
  },
  {
    icon: Briefcase,
    title: "Job Search & Match",
    description: "Find jobs and see how your resume matches each job description with keyword analysis.",
    path: "/jobs",
  },
  {
    icon: Github,
    title: "GitHub Analyzer",
    description: "Analyze your GitHub profile to generate developer scores and resume-ready bullet points.",
    path: "/github",
  },
  {
    icon: TrendingUp,
    title: "Progress Dashboard",
    description: "Track your improvement over time with score history, saved jobs, and resume versions.",
    path: "/dashboard",
  },
];

const stats = [
  { value: "50K+", label: "Resumes Analyzed" },
  { value: "85%", label: "Avg Score Improvement" },
  { value: "12K+", label: "Jobs Matched" },
  { value: "4.9★", label: "User Rating" },
];

const Landing = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(168,80%,36%,0.06),transparent_50%)]" />
        <div className="container mx-auto px-4 py-24 md:py-36 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-6">
              <Zap className="h-3.5 w-3.5 text-primary" />
              AI-powered resume optimization
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Land your dream job with an{" "}
              <span className="text-gradient">AI-optimized</span> resume
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Analyze, improve, and build ATS-friendly resumes. Match with jobs and stand out from the competition.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analyzer">
                <Button variant="hero" size="lg" className="gap-2 text-base px-8">
                  Analyze Your Resume <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/builder">
                <Button variant="hero-outline" size="lg" className="text-base px-8">
                  Build a Resume
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to{" "}
            <span className="text-gradient">get hired</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete toolkit for students and job seekers to craft the perfect application.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <Link to={feature.path}>
                <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative rounded-2xl border border-border bg-card p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(168,80%,36%,0.05),transparent_70%)]" />
          <div className="relative">
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to optimize your career?</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join thousands of students who improved their resumes and landed their dream jobs.
            </p>
            <Link to="/analyzer">
              <Button variant="hero" size="lg" className="gap-2 text-base px-8">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <FileText className="h-3 w-3 text-primary-foreground" />
              </div>
              ResumeAI
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 ResumeAI. Built for students, by students.
            </p>
          </div>
        </div>
      </footer>
    </PageLayout>
  );
};

export default Landing;
