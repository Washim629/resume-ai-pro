import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";

const mockJobs = [
  { id: "1", title: "Frontend Developer", company: "TechCorp", location: "Remote", platform: "LinkedIn", match: 82, skills: ["React", "TypeScript", "CSS"], posted: "2 days ago" },
  { id: "2", title: "Full Stack Engineer", company: "StartupXYZ", location: "Bangalore", platform: "Naukri", match: 75, skills: ["Node.js", "React", "PostgreSQL"], posted: "1 day ago" },
  { id: "3", title: "Software Engineer", company: "BigTech Inc", location: "Hyderabad", platform: "Indeed", match: 68, skills: ["Python", "AWS", "Docker"], posted: "3 days ago" },
  { id: "4", title: "React Developer", company: "WebAgency", location: "Remote", platform: "LinkedIn", match: 91, skills: ["React", "Next.js", "Tailwind"], posted: "Today" },
  { id: "5", title: "Backend Engineer", company: "DataFlow", location: "Mumbai", platform: "Naukri", match: 58, skills: ["Java", "Spring Boot", "MongoDB"], posted: "5 days ago" },
];

const Jobs = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = mockJobs.filter(
    (j) =>
      (!query || j.title.toLowerCase().includes(query.toLowerCase()) || j.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()))) &&
      (!location || j.location.toLowerCase().includes(location.toLowerCase()))
  );

  const getMatchColor = (match: number) => {
    if (match >= 80) return "text-chart-excellent bg-chart-excellent/10";
    if (match >= 60) return "text-chart-good bg-chart-good/10";
    return "text-chart-fair bg-chart-fair/10";
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Job Search</h1>
            <p className="text-muted-foreground text-lg">Find jobs that match your resume and skills</p>
          </motion.div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Role, skills, or company..." className="pl-10" />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location..." className="pl-10" />
            </div>
            <Button className="shrink-0">Search</Button>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {filtered.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{job.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getMatchColor(job.match)}`}>
                        {job.match}% match
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                      <span>{job.posted}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-muted">{job.platform}</span>
                    <Button variant="ghost" size="icon" onClick={() => toggleSave(job.id)}>
                      <Bookmark className={`h-4 w-4 ${savedJobs.has(job.id) ? "fill-primary text-primary" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Jobs;
