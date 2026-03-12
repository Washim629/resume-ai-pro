import { motion } from "framer-motion";

interface ScoreCardProps {
  score: number;
  label: string;
  description?: string;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-chart-excellent";
  if (score >= 60) return "text-chart-good";
  if (score >= 40) return "text-chart-fair";
  return "text-chart-poor";
};

const getScoreBg = (score: number) => {
  if (score >= 80) return "bg-chart-excellent";
  if (score >= 60) return "bg-chart-good";
  if (score >= 40) return "bg-chart-fair";
  return "bg-chart-poor";
};

const ScoreCard = ({ score, label, description }: ScoreCardProps) => {
  return (
    <div className="p-5 rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className={`h-full rounded-full ${getScoreBg(score)}`}
        />
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
};

export default ScoreCard;
