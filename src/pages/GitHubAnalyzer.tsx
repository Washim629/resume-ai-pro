import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Code2, Activity, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";
import ATSScoreRing from "@/components/analyzer/ATSScoreRing";

const mockGitHub = {
  username: "johndoe",
  avatar: "",
  repos: 42,
  stars: 156,
  forks: 38,
  contributions: 847,
  languages: [
    { name: "TypeScript", pct: 35 },
    { name: "Python", pct: 25 },
    { name: "JavaScript", pct: 20 },
    { name: "Go", pct: 12 },
    { name: "Other", pct: 8 },
  ],
  topRepos: [
    { name: "ai-chatbot", stars: 45, forks: 12, language: "TypeScript", description: "Full-stack AI chatbot with streaming" },
    { name: "ml-pipeline", stars: 32, forks: 8, language: "Python", description: "End-to-end ML pipeline with feature store" },
    { name: "react-components", stars: 28, forks: 6, language: "TypeScript", description: "Reusable React component library" },
  ],
  bulletPoints: [
    "Built and maintained 42+ open-source repositories with 156 total stars",
    "Developed a full-stack AI chatbot with real-time streaming, garnering 45 stars on GitHub",
    "Created an end-to-end ML pipeline with feature store capabilities used by 8 contributors",
    "Demonstrated expertise in TypeScript, Python, and Go through diverse project portfolio",
  ],
  score: 78,
};

const langColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  Python: "bg-yellow-500",
  JavaScript: "bg-amber-400",
  Go: "bg-cyan-500",
  Other: "bg-muted-foreground",
};

const GitHubAnalyzer = () => {
  const [username, setUsername] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (username.trim()) {
      setTimeout(() => setAnalyzed(true), 600);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">GitHub Analyzer</h1>
            <p className="text-muted-foreground text-lg">Analyze your GitHub profile and generate resume-ready insights</p>
          </motion.div>

          {/* Search */}
          <div className="flex gap-3 max-w-md mx-auto mb-12">
            <div className="relative flex-1">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username..."
                className="pl-10"
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
            </div>
            <Button onClick={handleAnalyze} disabled={!username.trim()}>
              <Search className="h-4 w-4 mr-2" />Analyze
            </Button>
          </div>

          {analyzed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Code2, label: "Repositories", value: mockGitHub.repos },
                  { icon: Star, label: "Total Stars", value: mockGitHub.stars },
                  { icon: GitFork, label: "Total Forks", value: mockGitHub.forks },
                  { icon: Activity, label: "Contributions", value: mockGitHub.contributions },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl border border-border bg-card text-center">
                    <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Developer Score */}
                <div className="p-6 rounded-xl border border-border bg-card flex flex-col items-center">
                  <h2 className="font-semibold text-lg mb-4">Developer Score</h2>
                  <ATSScoreRing score={mockGitHub.score} />
                </div>

                {/* Languages */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h2 className="font-semibold text-lg mb-4">Languages</h2>
                  <div className="flex h-4 rounded-full overflow-hidden mb-4">
                    {mockGitHub.languages.map((lang) => (
                      <div key={lang.name} className={`${langColors[lang.name] || "bg-muted"}`} style={{ width: `${lang.pct}%` }} />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {mockGitHub.languages.map((lang) => (
                      <div key={lang.name} className="flex items-center gap-2 text-sm">
                        <div className={`h-3 w-3 rounded-full ${langColors[lang.name] || "bg-muted"}`} />
                        <span>{lang.name}</span>
                        <span className="text-muted-foreground">{lang.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Repos */}
              <div>
                <h2 className="font-semibold text-lg mb-4">Top Repositories</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {mockGitHub.topRepos.map((repo) => (
                    <div key={repo.name} className="p-4 rounded-xl border border-border bg-card">
                      <h3 className="font-medium text-sm mb-1">{repo.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{repo.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className="h-3 w-3" />{repo.stars}</span>
                        <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{repo.forks}</span>
                        <span>{repo.language}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated Bullet Points */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="font-semibold text-lg mb-4">Generated Resume Bullet Points</h2>
                <ul className="space-y-3">
                  {mockGitHub.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {bp}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="mt-4">Copy to Resume Builder</Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default GitHubAnalyzer;
