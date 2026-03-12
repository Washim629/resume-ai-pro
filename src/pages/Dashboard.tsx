import { motion } from "framer-motion";
import { BarChart3, FileText, Briefcase, Github, TrendingUp, Clock } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ScoreCard from "@/components/analyzer/ScoreCard";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const scoreHistory = [
  { date: "Jan", score: 45 },
  { date: "Feb", score: 52 },
  { date: "Mar", score: 58 },
  { date: "Apr", score: 63 },
  { date: "May", score: 72 },
  { date: "Jun", score: 78 },
];

const recentActivity = [
  { icon: BarChart3, text: "Resume analyzed — scored 78/100", time: "2 hours ago" },
  { icon: FileText, text: "Resume v3 saved", time: "1 day ago" },
  { icon: Briefcase, text: "Saved 'React Developer at WebAgency'", time: "2 days ago" },
  { icon: Github, text: "GitHub profile analyzed", time: "3 days ago" },
];

const Dashboard = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground text-lg">Track your progress and manage your career toolkit</p>
          </motion.div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <ScoreCard score={78} label="Latest ATS Score" description="Your most recent resume analysis" />
            <ScoreCard score={91} label="Best Match" description="React Developer at WebAgency" />
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Saved Jobs</span>
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">Across 3 platforms</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Resume Versions</span>
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">Last updated 2 hours ago</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-lg">Score Progress</h2>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={scoreHistory}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(168, 80%, 36%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(168, 80%, 36%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(168, 80%, 36%)"
                    strokeWidth={2}
                    fill="url(#scoreGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center gap-2 mb-6">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-lg">Recent Activity</h2>
              </div>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">{item.text}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
