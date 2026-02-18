import { useChallenge } from "../context/ChallengeContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Award,
  Target,
  Calendar,
  CheckCircle,
  Flame,
  Trophy,
  Lock,
  Rocket,
  Zap,
  Star,
  Crown,
  HardHat,
} from "lucide-react";

const ACHIEVEMENT_ICONS = {
  Target,
  HardHat: Trophy,
  Flame,
  Zap,
  Award,
  Rocket,
  Star,
  Crown,
  Trophy,
};

const Progress = () => {
  const { getStats, getBaselineStats, getAchievements, state } = useChallenge();
  const stats = getStats();
  const baselineStats = getBaselineStats();
  const achievements = getAchievements();

  // Prepare chart data
  const progressData = Array.from({ length: 28 }, (_, i) => {
    const day = state.days[i];
    const completed = day ? day.items.filter(Boolean).length : 0;
    return {
      day: i + 1,
      completed,
      percentage: Math.round((completed / 7) * 100),
    };
  });

  const getBarColor = (completed) => {
    if (completed === 7) return "#10b981"; // green
    if (completed >= 4) return "#f59e0b"; // yellow
    if (completed >= 1) return "#f97316"; // orange
    return "#e5e7eb"; // gray for untouched
  };

  const baselineData = Object.entries(baselineStats).map(([key, s]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    completed: s.completed,
    total: s.total,
    rate: s.rate,
  }));

  const weekData = Array.from({ length: 4 }, (_, i) => {
    const startDay = i * 7;
    const endDay = Math.min((i + 1) * 7, 28);
    const weekDays = state.days.slice(startDay, endDay);
    const completedDays = weekDays.filter((day) => day && day.completed).length;
    return {
      week: `W${i + 1}`,
      completed: completedDays,
      total: 7,
      percentage: Math.round((completedDays / 7) * 100),
    };
  });

  const totalHabits = state.days.reduce(
    (sum, day) => sum + day.items.filter(Boolean).length,
    0
  );

  const keyStats = [
    { icon: Calendar, value: stats.completedDays, label: "Days Completed", color: "text-primary-600", bg: "bg-primary-50", suffix: "/28" },
    { icon: Flame, value: stats.streak, label: "Current Streak", color: "text-orange-600", bg: "bg-orange-50", suffix: " days" },
    { icon: Award, value: stats.bestStreak, label: "Best Streak", color: "text-yellow-600", bg: "bg-yellow-50", suffix: " days" },
    { icon: CheckCircle, value: `${stats.completionRate}%`, label: "Completion Rate", color: "text-green-600", bg: "bg-green-50", suffix: "" },
    { icon: Target, value: totalHabits, label: "Total Habits Done", color: "text-purple-600", bg: "bg-purple-50", suffix: "" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Progress Dashboard
        </h1>
        <p className="text-gray-500">Visualize your transformation journey</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {keyStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-soft p-4 text-center hover:shadow-medium transition-shadow">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
                {stat.suffix && <span className="text-sm text-gray-400">{stat.suffix}</span>}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Daily Progress Chart */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Daily Progress</h2>
        <p className="text-gray-500 text-sm mb-6">Habits completed per day (color = performance level)</p>

        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 7]} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value) => [`${value}/7 habits`, "Completed"]}
                labelFormatter={(label) => `Day ${label}`}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
              />
              <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                {progressData.map((entry, index) => (
                  <Cell key={index} fill={getBarColor(entry.completed)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { color: "bg-green-500", label: "Perfect Day (7/7)" },
            { color: "bg-yellow-500", label: "Good (4-6/7)" },
            { color: "bg-orange-500", label: "Partial (1-3/7)" },
            { color: "bg-gray-200", label: "Not started" },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <div className={`w-3 h-3 ${item.color} rounded`} />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Weekly Trend</h2>
        <p className="text-gray-500 text-sm mb-6">Perfect days per week</p>

        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 7]} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`${value}/7 days`, "Completed"]}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: "#2563eb", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {weekData.map((week) => (
            <div key={week.week} className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">Week {week.week.replace("W", "")}</span>
                <span className="text-sm text-gray-500">
                  {week.completed}/{week.total} days ({week.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${week.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Baseline Performance */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Baseline Performance</h2>
        <p className="text-gray-500 text-sm mb-6">
          How consistently you're hitting each daily habit
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {baselineData.map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                <span className={`text-lg font-bold ${item.rate >= 70 ? "text-green-600" : item.rate >= 40 ? "text-yellow-600" : "text-red-500"}`}>
                  {item.rate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    item.rate >= 70 ? "bg-green-500" : item.rate >= 40 ? "bg-yellow-500" : "bg-red-400"
                  }`}
                  style={{ width: `${item.rate}%` }}
                />
              </div>
              <div className="text-xs text-gray-400">{item.completed}/{item.total} days</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements — all shown */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Achievements</h2>
        <p className="text-gray-500 text-sm mb-6">
          {achievements.filter((a) => a.unlocked).length}/{achievements.length} unlocked
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked
                  ? "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50"
                  : "border-gray-200 bg-gray-50 opacity-60"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    achievement.unlocked ? "bg-green-100" : "bg-gray-200"
                  }`}
                >
                  {achievement.unlocked ? (
                    <Trophy className="w-5 h-5 text-green-600" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-sm ${
                      achievement.unlocked ? "text-green-800" : "text-gray-500"
                    }`}
                  >
                    {achievement.title}
                  </h3>
                  <p
                    className={`text-xs mt-0.5 ${
                      achievement.unlocked ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <div className="text-green-500 text-lg">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
