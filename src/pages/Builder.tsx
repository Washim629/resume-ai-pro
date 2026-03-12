import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageLayout from "@/components/layout/PageLayout";

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

const Builder = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1", company: "", role: "", duration: "", description: "" },
  ]);
  const [education, setEducation] = useState<Education[]>([
    { id: "1", institution: "", degree: "", year: "" },
  ]);

  const addExperience = () =>
    setExperiences([...experiences, { id: Date.now().toString(), company: "", role: "", duration: "", description: "" }]);

  const removeExperience = (id: string) =>
    setExperiences(experiences.filter((e) => e.id !== id));

  const updateExperience = (id: string, field: keyof Experience, value: string) =>
    setExperiences(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const addEducation = () =>
    setEducation([...education, { id: Date.now().toString(), institution: "", degree: "", year: "" }]);

  const removeEducation = (id: string) =>
    setEducation(education.filter((e) => e.id !== id));

  const updateEducation = (id: string, field: keyof Education, value: string) =>
    setEducation(education.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Resume Builder</h1>
            <p className="text-muted-foreground text-lg">Build a professional, ATS-friendly resume step by step</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-8">
              {/* Personal Info */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl border border-border bg-card space-y-4">
                <h2 className="font-semibold text-lg">Personal Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" /></div>
                  <div><Label>Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" /></div>
                  <div className="sm:col-span-2"><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" /></div>
                </div>
                <div><Label>Professional Summary</Label><Textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Brief summary of your professional background..." rows={3} /></div>
              </motion.div>

              {/* Experience */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-xl border border-border bg-card space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">Experience</h2>
                  <Button variant="ghost" size="sm" onClick={addExperience}><Plus className="h-4 w-4 mr-1" />Add</Button>
                </div>
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-3 p-4 rounded-lg border border-border">
                    <div className="flex justify-end">
                      {experiences.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="Company" />
                      <Input value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} placeholder="Job Title" />
                      <Input value={exp.duration} onChange={(e) => updateExperience(exp.id, "duration", e.target.value)} placeholder="Jan 2023 - Present" className="sm:col-span-2" />
                    </div>
                    <Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} placeholder="Describe your responsibilities and achievements..." rows={3} />
                  </div>
                ))}
              </motion.div>

              {/* Education */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-xl border border-border bg-card space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">Education</h2>
                  <Button variant="ghost" size="sm" onClick={addEducation}><Plus className="h-4 w-4 mr-1" />Add</Button>
                </div>
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-3 p-4 rounded-lg border border-border">
                    <div className="flex justify-end">
                      {education.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} placeholder="University" />
                      <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="Degree" />
                      <Input value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} placeholder="2020 - 2024" className="sm:col-span-2" />
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Skills */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-xl border border-border bg-card space-y-4">
                <h2 className="font-semibold text-lg">Skills</h2>
                <Textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, TypeScript, Python, Machine Learning, AWS..." rows={3} />
              </motion.div>
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="p-8 rounded-xl border border-border bg-card min-h-[600px]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg">Preview</h2>
                  <Button size="sm" className="gap-2">
                    <Download className="h-4 w-4" /> Export PDF
                  </Button>
                </div>

                <div className="space-y-6 text-sm">
                  <div className="text-center border-b border-border pb-4">
                    <h3 className="text-xl font-bold">{name || "Your Name"}</h3>
                    <p className="text-muted-foreground text-xs mt-1">
                      {[email, phone].filter(Boolean).join(" · ") || "email@example.com · +1 234 567 890"}
                    </p>
                  </div>

                  {summary && (
                    <div>
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-1">Summary</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{summary}</p>
                    </div>
                  )}

                  {experiences.some((e) => e.company || e.role) && (
                    <div>
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-2">Experience</h4>
                      {experiences.filter((e) => e.company || e.role).map((exp) => (
                        <div key={exp.id} className="mb-3">
                          <div className="flex justify-between">
                            <span className="font-medium text-xs">{exp.role || "Role"}</span>
                            <span className="text-xs text-muted-foreground">{exp.duration}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{exp.company}</p>
                          {exp.description && <p className="text-xs mt-1 leading-relaxed">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {education.some((e) => e.institution || e.degree) && (
                    <div>
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-2">Education</h4>
                      {education.filter((e) => e.institution || e.degree).map((edu) => (
                        <div key={edu.id} className="mb-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-xs">{edu.degree || "Degree"}</span>
                            <span className="text-xs text-muted-foreground">{edu.year}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{edu.institution}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {skills && (
                    <div>
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.split(",").map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {!name && !summary && !skills && (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <FileText className="h-10 w-10 mb-3 opacity-30" />
                      <p className="text-sm">Start filling the form to see your resume preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Builder;
