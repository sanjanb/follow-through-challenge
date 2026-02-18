import { useState, useEffect } from "react";
import { useChallenge } from "../context/ChallengeContext";
import {
  CheckCircle,
  Circle,
  Calendar,
  TrendingUp,
  Award,
  Sun,
  Droplets,
  Activity,
  BookOpen,
  Sparkles,
  PenTool,
  Moon,
  Lightbulb,
  Flame,
  PartyPopper,
} from "lucide-react";

const MOODS = [
  { emoji: "😞", label: "Rough", value: 1 },
  { emoji: "😐", label: "Okay", value: 2 },
  { emoji: "🙂", label: "Good", value: 3 },
  { emoji: "😊", label: "Great", value: 4 },
  { emoji: "🤩", label: "Amazing", value: 5 },
];

const Tracker = () => {
  const { state, updateDay, getStats } = useChallenge();
  const [currentDay, setCurrentDay] = useState(0);
  const [todayCommitment, setTodayCommitment] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const stats = getStats();

  const baselineItems = [
    {
      id: "morning",
      name: "Morning Routine",
      icon: Sun,
      desc: "Wake up, make bed, basic hygiene",
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-l-amber-400",
    },
    {
      id: "hydration",
      name: "Hydration",
      icon: Droplets,
      desc: "Drink water throughout the day",
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-l-blue-400",
    },
    {
      id: "movement",
      name: "Movement",
      icon: Activity,
      desc: "Exercise or physical activity",
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-l-green-400",
    },
    {
      id: "learning",
      name: "Learning",
      icon: BookOpen,
      desc: "Read, study, or skill practice",
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-l-purple-400",
    },
    {
      id: "cleaning",
      name: "Cleaning",
      icon: Sparkles,
      desc: "Tidy your living space",
      color: "text-pink-500",
      bg: "bg-pink-50",
      border: "border-l-pink-400",
    },
    {
      id: "planning",
      name: "Planning",
      icon: PenTool,
      desc: "Review day, plan tomorrow",
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      border: "border-l-indigo-400",
    },
    {
      id: "sleep",
      name: "Sleep",
      icon: Moon,
      desc: "7-9 hours of quality sleep",
      color: "text-slate-500",
      bg: "bg-slate-50",
      border: "border-l-slate-400",
    },
  ];

  useEffect(() => {
    const startDate = new Date(state.startDate);
    const today = new Date();
    const dayDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    setCurrentDay(Math.min(Math.max(dayDiff, 0), 27));

    if (state.days[currentDay]) {
      setTodayCommitment(state.days[currentDay].win || "");
    }
  }, [state.startDate, currentDay]);

  const completedCount = state.days[currentDay]?.items?.filter(Boolean).length || 0;
  const progressPercent = (completedCount / 7) * 100;

  const getProgressBarColor = () => {
    if (progressPercent === 100) return "from-green-400 to-green-500";
    if (progressPercent >= 50) return "from-yellow-400 to-yellow-500";
    return "from-primary-500 to-primary-600";
  };

  const handleBaselineToggle = (itemIndex) => {
    const currentItems = state.days[currentDay]?.items || Array(7).fill(false);
    const newItems = [...currentItems];
    newItems[itemIndex] = !newItems[itemIndex];

    updateDay(currentDay, {
      items: newItems,
      completed: newItems.every((item) => item),
    });

    // Trigger celebration when all 7 completed
    if (newItems.every((item) => item)) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handleCommitmentChange = (value) => {
    setTodayCommitment(value);
    updateDay(currentDay, { win: value });
  };

  const handleMoodSelect = (value) => {
    updateDay(currentDay, { mood: String(value) });
  };

  const currentMood = state.days[currentDay]?.mood ? parseInt(state.days[currentDay].mood) : null;

  // Format today's date
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="space-y-6">
      {/* Celebration Banner */}
      {showCelebration && (
        <div className="animate-celebrate bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl p-4 text-center shadow-large">
          <div className="flex items-center justify-center space-x-3">
            <PartyPopper className="w-6 h-6" />
            <span className="text-xl font-bold">🎉 Perfect Day! All 7 habits completed!</span>
            <PartyPopper className="w-6 h-6" />
          </div>
          <p className="text-green-100 text-sm mt-1">You're building something incredible. Keep it up!</p>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Daily Tracker
            </h1>
            <p className="text-gray-500 text-sm">{dateStr}</p>
            <p className="text-gray-600 mt-1">
              Day <span className="font-bold text-primary-600">{currentDay + 1}</span> of 28 · Track your baseline habits
            </p>
          </div>
          <div className="text-right">
            <div
              className={`text-3xl font-bold ${
                completedCount === 7
                  ? "text-green-600"
                  : completedCount >= 4
                  ? "text-yellow-600"
                  : "text-gray-400"
              }`}
            >
              {completedCount}/7
            </div>
            <div className="text-sm text-gray-500">Completed Today</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
          <div
            className={`bg-gradient-to-r ${getProgressBarColor()} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>0%</span>
          <span className={completedCount === 7 ? "text-green-600 font-semibold" : ""}>
            {Math.round(progressPercent)}%
          </span>
          <span>100%</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { icon: Calendar, value: stats.completedDays, label: "Days Completed", color: "text-primary-600", bg: "bg-primary-50" },
          { icon: Flame, value: stats.streak, label: "Current Streak", color: "text-orange-600", bg: "bg-orange-50" },
          { icon: Award, value: stats.bestStreak, label: "Best Streak", color: "text-yellow-600", bg: "bg-yellow-50" },
          { icon: TrendingUp, value: `${stats.completionRate}%`, label: "Completion Rate", color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-soft p-4 text-center">
              <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Today's Baseline */}
      <div className="bg-white rounded-2xl shadow-soft p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
          Today's Baseline
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {baselineItems.map((item, index) => {
            const isCompleted = state.days[currentDay]?.items?.[index] || false;
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleBaselineToggle(index)}
                className={`flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl border-2 border-l-4 cursor-pointer transition-all touch-manipulation ${
                  isCompleted
                    ? `border-green-200 bg-green-50 ${item.border}`
                    : `border-gray-200 bg-gray-50 hover:border-primary-200 hover:bg-primary-50 active:bg-primary-100 ${item.border}`
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 md:w-6 md:h-6 text-gray-300" />
                  )}
                </div>
                <div className={`w-8 h-8 ${isCompleted ? "bg-green-100" : item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${isCompleted ? "text-green-600" : item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold truncate text-sm md:text-base ${
                      isCompleted ? "text-green-800" : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`text-xs md:text-sm ${
                      isCompleted ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
                {isCompleted && (
                  <div className="flex-shrink-0 text-green-500 text-xs font-medium">✓ Done</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mood Tracker */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Today's Mood</h2>
        <p className="text-gray-500 text-sm mb-5">How are you feeling today?</p>
        <div className="flex justify-between gap-2">
          {MOODS.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              className={`flex-1 flex flex-col items-center py-3 px-1 rounded-xl border-2 transition-all ${
                currentMood === mood.value
                  ? "border-primary-400 bg-primary-50 shadow-sm scale-105"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs text-gray-600 font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Win */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Today's Win</h2>
        <p className="text-gray-500 text-sm mb-5">
          What specific accomplishment are you most proud of today? (Even small
          wins count!)
        </p>

        <textarea
          value={todayCommitment}
          onChange={(e) => handleCommitmentChange(e.target.value)}
          placeholder="e.g., Finished reading a chapter, helped a colleague, cooked a healthy meal..."
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:ring-0 resize-none transition-colors text-gray-800 placeholder-gray-400"
          rows={4}
        />

        <div className="mt-3 text-sm text-gray-400 flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-primary-400" />
          <span>
            Tip: Specific, measurable accomplishments build momentum and
            self-trust.
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              const allCompleted =
                state.days[currentDay]?.items?.every((item) => item) || false;
              const newItems = Array(7).fill(!allCompleted);
              updateDay(currentDay, {
                items: newItems,
                completed: !allCompleted,
              });
              if (!allCompleted) {
                setShowCelebration(true);
                setTimeout(() => setShowCelebration(false), 3000);
              }
            }}
            className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all font-medium shadow-sm hover:shadow-md"
          >
            <CheckCircle className="w-5 h-5" />
            <span>
              {state.days[currentDay]?.items?.every((item) => item)
                ? "Mark All Incomplete"
                : "Mark All Complete"}
            </span>
          </button>

          <button
            onClick={() => {
              if (
                window.confirm("Reset today's progress? This cannot be undone.")
              ) {
                updateDay(currentDay, {
                  items: Array(7).fill(false),
                  win: "",
                  completed: false,
                });
                setTodayCommitment("");
              }
            }}
            className="flex items-center justify-center space-x-2 p-4 bg-white border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all font-medium"
          >
            <Circle className="w-5 h-5" />
            <span>Reset Today</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
