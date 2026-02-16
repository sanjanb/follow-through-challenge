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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Award,
  Target,
  Calendar,
  CheckCircle,
  Flame,
} from "lucide-react";

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
      percentage: (completed / 7) * 100,
      status:
        completed === 7 ? "Perfect" : completed > 0 ? "Partial" : "Missed",
    };
  });

  const baselineData = Object.entries(baselineStats).map(([key, stats]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    completed: stats.completed,
    total: stats.total,
    rate: stats.rate,
  }));

  const weekData = Array.from({ length: 4 }, (_, i) => {
    const startDay = i * 7;
    const endDay = Math.min((i + 1) * 7, 28);
    const weekDays = state.days.slice(startDay, endDay);
    const completedDays = weekDays.filter((day) => day && day.completed).length;

    return {
      week: i + 1,
      completed: completedDays,
      total: 7,
      percentage: (completedDays / 7) * 100,
    };
  });

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Progress Dashboard
        </h1>
        <p className="text-gray-600">Visualize your transformation journey</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-6 text-center">
          <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-primary-600">
            {stats.completedDays}
          </div>
          <div className="text-sm text-gray-600">Days Completed</div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6 text-center">
          <Flame className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-orange-600">
            {stats.streak}
          </div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6 text-center">
          <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-yellow-600">
            {stats.bestStreak}
          </div>
          <div className="text-sm text-gray-600">Best Streak</div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6 text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-green-600">
            {stats.completionRate}%
          </div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Daily Progress
        </h2>
        <p className="text-gray-600 mb-6">Your baseline completion over time</p>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [`${value}/7 items`, "Completed"]}
                labelFormatter={(label) => `Day ${label}`}
              />
              <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Perfect Day (7/7)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Partial (1-6/7)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Missed (0/7)</span>
          </div>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Weekly Overview
        </h2>
        <p className="text-gray-600 mb-6">
          Progress through each week of the challenge
        </p>

        <div className="space-y-4">
          {weekData.map((week) => (
            <div key={week.week} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">
                  Week {week.week}
                </span>
                <span className="text-sm text-gray-600">
                  {week.completed}/{week.total} days (
                  {Math.round(week.percentage)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${week.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Baseline Performance */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Baseline Performance
        </h2>
        <p className="text-gray-600 mb-6">
          How consistently you're hitting your daily targets
        </p>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={baselineData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip
                formatter={(value) => [`${value}%`, "Completion Rate"]}
              />
              <Bar dataKey="rate" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {baselineData.map((item) => (
            <div key={item.name} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">{item.name}</span>
                <span className="text-2xl font-bold text-primary-600">
                  {item.rate}%
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {item.completed}/{item.total} days completed
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
        <p className="text-gray-600 mb-6">Milestones you've reached</p>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`text-2xl ${achievement.unlocked ? "text-green-600" : "text-gray-400"}`}
                  >
                    {achievement.unlocked ? "🏆" : "🔒"}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${achievement.unlocked ? "text-green-800" : "text-gray-600"}`}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      className={`text-sm ${achievement.unlocked ? "text-green-600" : "text-gray-500"}`}
                    >
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No achievements yet. Keep going! 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
