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
} from "lucide-react";

const Tracker = () => {
  const { state, updateDay, getStats } = useChallenge();
  const [currentDay, setCurrentDay] = useState(0);
  const [todayCommitment, setTodayCommitment] = useState("");

  const stats = getStats();

  const baselineItems = [
    {
      id: "morning",
      name: "Morning Routine",
      icon: Sun,
      desc: "Wake up, make bed, basic hygiene",
    },
    {
      id: "hydration",
      name: "Hydration",
      icon: Droplets,
      desc: "Drink water throughout the day",
    },
    {
      id: "movement",
      name: "Movement",
      icon: Activity,
      desc: "Exercise or physical activity",
    },
    {
      id: "learning",
      name: "Learning",
      icon: BookOpen,
      desc: "Read, study, or skill practice",
    },
    {
      id: "cleaning",
      name: "Cleaning",
      icon: Sparkles,
      desc: "Tidy your living space",
    },
    {
      id: "planning",
      name: "Planning",
      icon: PenTool,
      desc: "Review day, plan tomorrow",
    },
    {
      id: "sleep",
      name: "Sleep",
      icon: Moon,
      desc: "7-9 hours of quality sleep",
    },
  ];

  useEffect(() => {
    // Set current day based on challenge start
    const startDate = new Date(state.startDate);
    const today = new Date();
    const dayDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    setCurrentDay(Math.min(Math.max(dayDiff, 0), 27));

    // Load today's commitment
    if (state.days[currentDay]) {
      setTodayCommitment(state.days[currentDay].win || "");
    }
  }, [state.startDate, currentDay]);

  const handleBaselineToggle = (itemIndex) => {
    const currentItems = state.days[currentDay]?.items || Array(7).fill(false);
    const newItems = [...currentItems];
    newItems[itemIndex] = !newItems[itemIndex];

    updateDay(currentDay, {
      items: newItems,
      completed: newItems.every((item) => item),
    });
  };

  const handleCommitmentChange = (value) => {
    setTodayCommitment(value);
    updateDay(currentDay, { win: value });
  };

  const getProgressColor = (completed, total) => {
    const percentage = (completed / total) * 100;
    if (percentage === 100) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-gray-400";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Daily Tracker
            </h1>
            <p className="text-gray-600">
              Day {currentDay + 1} of 28 • Track your baseline habits
            </p>
          </div>
          <div className="text-right">
            <div
              className={`text-2xl font-bold ${getProgressColor(
                state.days[currentDay]?.items?.filter(Boolean).length || 0,
                7,
              )}`}
            >
              {state.days[currentDay]?.items?.filter(Boolean).length || 0}/7
            </div>
            <div className="text-sm text-gray-500">Completed Today</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((state.days[currentDay]?.items?.filter(Boolean).length || 0) / 7) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-6 text-center">
          <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary-600">
            {stats.completedDays}
          </div>
          <div className="text-sm text-gray-600">Days Completed</div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6 text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">
            {stats.streak}
          </div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6 text-center">
          <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-600">
            {stats.bestStreak}
          </div>
          <div className="text-sm text-gray-600">Best Streak</div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6 text-center">
          <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">
            {stats.completionRate}%
          </div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
      </div>

      {/* Today's Baseline */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Today's Baseline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {baselineItems.map((item, index) => {
            const isCompleted = state.days[currentDay]?.items?.[index] || false;
            return (
              <div
                key={item.id}
                onClick={() => handleBaselineToggle(index)}
                className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isCompleted
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50 hover:border-primary-300 hover:bg-primary-50"
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-5 h-5 text-primary-600" />
                    <h3
                      className={`font-semibold ${isCompleted ? "text-green-800" : "text-gray-900"}`}
                    >
                      {item.name}
                    </h3>
                  </div>
                  <p
                    className={`text-sm ${isCompleted ? "text-green-600" : "text-gray-600"}`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Commitment */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Win</h2>
        <p className="text-gray-600 mb-6">
          What specific accomplishment are you most proud of today? (Even small
          wins count!)
        </p>

        <textarea
          value={todayCommitment}
          onChange={(e) => handleCommitmentChange(e.target.value)}
          placeholder="e.g., Finished reading a chapter, helped a colleague, cooked a healthy meal..."
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 resize-none"
          rows={4}
        />

        <div className="mt-4 text-sm text-gray-500 flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-primary-500" />
          <span>Tip: Specific, measurable accomplishments build momentum and self-trust.</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>

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
            }}
            className="flex items-center justify-center space-x-2 p-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
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
            className="flex items-center justify-center space-x-2 p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
