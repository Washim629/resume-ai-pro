import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/layout/PageLayout";
import ResumeUpload from "@/components/upload/ResumeUpload";
import ATSScoreRing from "@/components/analyzer/ATSScoreRing";
import ScoreCard from "@/components/analyzer/ScoreCard";

// Mock analysis data
const mockAnalysis = {
  score: 72,
  breakdown: [
    { label: "Keyword Match", score: 65, description: "Missing some industry-specific keywords" },
    { label: "Formatting", score: 88, description: "Clean formatting, ATS-readable" },
    { label: "Sections", score: 70, description: "Missing certifications section" },
    { label: "Readability", score: 78, description: "Good readability, could improve bullet points" },
    { label: "Impact", score: 60, description: "Add more measurable achievements" },
  ],
  suggestions: [
    { type: "improvement", text: "Add quantified achievements to your experience section (e.g., 'Increased sales by 25%')" },
    { type: "warning", text: "Missing 'certifications' section — many ATS systems check for this" },
    { type: "improvement", text: "Use stronger action verbs: 'Spearheaded', 'Orchestrated' instead of 'Helped', 'Worked on'" },
    { type: "success", text: "Good use of skills section with relevant technologies" },
    { type: "warning", text: "Resume exceeds recommended 1-page length for entry-level candidates" },
  ],
};

const Analyzer = () => {
  const [analyzed, setAnalyzed] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [showJobMatch, setShowJobMatch] = useState(false);

  const handleFileSelect = (_file: File) => {
    // Simulate analysis
    setTimeout(() => setAnalyzed(true), 800);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Resume Analyzer</h1>
            <p className="text-muted-foreground text-lg">Upload your resume to get an ATS score and actionable feedback</p>
          </motion.div>

          <ResumeUpload onFileSelect={handleFileSelect} />

          {analyzed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 space-y-8"
            >
              {/* Score ring */}
              <div className="flex justify-center">
                <ATSScoreRing score={mockAnalysis.score} />
              </div>

              {/* Breakdown */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Score Breakdown</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockAnalysis.breakdown.map((item) => (
                    <ScoreCard key={item.label} {...item} />
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <h2 className="text-xl font-semibold mb-4">AI Suggestions</h2>
                <div className="space-y-3">
                  {mockAnalysis.suggestions.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card"
                    >
                      {s.type === "improvement" && <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />}
                      {s.type === "warning" && <AlertTriangle className="h-5 w-5 text-chart-fair shrink-0 mt-0.5" />}
                      {s.type === "success" && <CheckCircle className="h-5 w-5 text-chart-good shrink-0 mt-0.5" />}
                      <p className="text-sm">{s.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Job Description Analyzer */}
              <div className="border border-border rounded-xl p-6 bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Job Description Match</h2>
                </div>
                <Textarea
                  placeholder="Paste a job description here to see how your resume matches..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={5}
                  className="mb-4"
                />
                <Button
                  onClick={() => setShowJobMatch(true)}
                  disabled={!jobDescription.trim()}
                >
                  Analyze Match
                </Button>

                {showJobMatch && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-4"
                  >
                    <div className="grid sm:grid-cols-3 gap-4">
                      <ScoreCard score={68} label="Keyword Match" />
                      <ScoreCard score={45} label="Skills Match" />
                      <ScoreCard score={72} label="Experience Fit" />
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm font-medium mb-2">Missing Keywords:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Docker", "Kubernetes", "CI/CD", "Agile", "REST APIs"].map((kw) => (
                          <span key={kw} className="px-2.5 py-1 rounded-full text-xs bg-destructive/10 text-destructive font-medium">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Analyzer;
