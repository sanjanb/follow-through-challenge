import { useState } from "react";
import { useChallenge } from "../context/ChallengeContext";
import {
  Lock,
  CheckCircle,
  Circle,
  Target,
  Zap,
  Rocket,
  Crown,
  ChevronRight,
} from "lucide-react";

const Weeks = () => {
  const { state, updateWeek, checkWeekUnlock } = useChallenge();
  const [reflection, setReflection] = useState({
    changed: state.weeks[4]?.reflection?.changed || "",
    next: state.weeks[4]?.reflection?.next || "",
  });

  const weekConfigs = [
    {
      id: 1,
      title: "Foundation",
      icon: Target,
      description: "Prove you can show up when it's boring.",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      dateRange: "Days 1–7",
      tasks: [
        "Complete all 7 Daily Baseline items ×7 days",
        'Write: "What do I actually want to finish this week?" (1 sentence)',
        "Identify #1 distraction → delete/block it for 7 days",
        "Do 1 thing that scares you slightly",
      ],
      inputs: ["distraction"],
    },
    {
      id: 2,
      title: "Discipline",
      icon: Zap,
      description: 'Push through the "this is boring" wall.',
      color: "yellow",
      gradient: "from-yellow-500 to-amber-500",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      dateRange: "Days 8–14",
      tasks: [
        "Maintain all 7 Daily Baseline items",
        "Upgrade: Phone-free time → 90 min/day",
        "Finish one backlog item (under 90 min)",
        "Have one difficult conversation",
        "Learn 30 min in your field",
      ],
      inputs: ["backlog"],
    },
    {
      id: 3,
      title: "Momentum",
      icon: Rocket,
      description: "See tangible evidence you're changing.",
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
      border: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      dateRange: "Days 15–21",
      tasks: [
        "Maintain all 7 Daily Baseline items + 90-min phone-free",
        "Finish what you started in Week 2",
        "Cut one energy vampire (person/app/habit)",
        "Create/share something (output > consumption)",
        "List 3 concrete wins from Days 1–21",
      ],
      inputs: ["vampire"],
    },
    {
      id: 4,
      title: "Integration",
      icon: Crown,
      description: "Lock in your new baseline—no backsliding.",
      color: "purple",
      gradient: "from-purple-500 to-violet-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      dateRange: "Days 22–28",
      tasks: [
        "Maintain all 7 Daily Baseline items",
        'Review all 28 days in writing → "What actually changed?"',
        "Identify your ONE sticky habit",
        "Schedule your next 28-day challenge",
        "Tell one person what you completed",
      ],
      inputs: [],
      reflections: ["changed", "next"],
    },
  ];

  const handleTaskToggle = (weekId, taskIndex) => {
    const week = state.weeks[weekId];
    if (!week.unlocked) return;

    const newTasks = [...week.tasks];
    newTasks[taskIndex] = !newTasks[taskIndex];

    updateWeek(weekId, {
      tasks: newTasks,
      completed: newTasks.every((task) => task),
    });

    checkWeekUnlock();
  };

  const handleInputChange = (weekId, field, value) => {
    updateWeek(weekId, { [field]: value });
  };

  const handleReflectionChange = (field, value) => {
    const newReflection = { ...reflection, [field]: value };
    setReflection(newReflection);
    updateWeek(4, { reflection: newReflection });
  };

  const unlockWeek = (weekId) => {
    updateWeek(weekId, { unlocked: true });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Weekly Challenges
        </h1>
        <p className="text-gray-500 mb-4">
          Progressive challenges that unlock only when you prove yourself worthy
        </p>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start space-x-2">
            <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-blue-800 text-sm">How it works:</div>
              <div className="text-blue-700 text-sm">
                Complete Week 1 to unlock Week 2, and so on. Each week builds on the last.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weeks */}
      {weekConfigs.map((config) => {
        const week = state.weeks[config.id];
        const isLocked = !week.unlocked;
        const isCompleted = week.completed;
        const Icon = config.icon;
        const completedTasks = week.tasks.filter(Boolean).length;
        const totalTasks = config.tasks.length;
        const taskProgress = Math.round((completedTasks / totalTasks) * 100);

        return (
          <div
            key={config.id}
            className={`bg-white rounded-2xl shadow-soft overflow-hidden ${
              isLocked ? "opacity-80" : ""
            }`}
          >
            {/* Week Header */}
            <div className={`p-6 md:p-8 ${isLocked ? "bg-gray-50" : config.bg} border-b ${isLocked ? "border-gray-200" : config.border}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${isLocked ? "bg-gray-200" : config.iconBg} rounded-xl flex items-center justify-center`}>
                    {isLocked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : (
                      <Icon className={`w-6 h-6 ${config.iconColor}`} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className={`text-xl font-bold ${isLocked ? "text-gray-400" : "text-gray-900"}`}>
                        Week {config.id}: {config.title}
                      </h2>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isLocked ? "bg-gray-200 text-gray-500" : "bg-white/60 text-gray-600"}`}>
                        {config.dateRange}
                      </span>
                      <span className={`text-sm ${isLocked ? "text-gray-400" : "text-gray-600"}`}>
                        {config.description}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {isLocked ? (
                    <span className="text-gray-400 text-sm font-medium">Locked</span>
                  ) : isCompleted ? (
                    <span className="text-green-600 text-sm font-medium">✓ Complete</span>
                  ) : (
                    <span className="text-gray-600 text-sm font-medium">{completedTasks}/{totalTasks} tasks</span>
                  )}
                </div>
              </div>

              {/* Task progress bar (only when unlocked) */}
              {!isLocked && (
                <div className="mt-4">
                  <div className="w-full bg-white/60 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${config.gradient} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${taskProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Week Content */}
            <div className="p-6 md:p-8">
              {isLocked ? (
                /* Blurred preview + unlock button */
                <div className="relative">
                  <div className="space-y-3 filter blur-sm pointer-events-none select-none">
                    {config.tasks.map((task, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 bg-gray-50"
                      >
                        <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-400 text-sm">{task}</p>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl">
                    <Lock className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium mb-4 text-center px-4">
                      Complete Week {config.id - 1} to unlock this challenge
                    </p>
                    <button
                      onClick={() => unlockWeek(config.id)}
                      className={`flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r ${config.gradient} text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5`}
                    >
                      <span>Unlock Week {config.id}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {config.tasks.map((task, index) => {
                    const isTaskCompleted = week.tasks[index];
                    return (
                      <div
                        key={index}
                        onClick={() => handleTaskToggle(config.id, index)}
                        className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          isTaskCompleted
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50 hover:border-primary-200 hover:bg-primary-50"
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {isTaskCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                        <p
                          className={`font-medium text-sm leading-relaxed ${
                            isTaskCompleted ? "text-green-800 line-through opacity-70" : "text-gray-800"
                          }`}
                        >
                          {task}
                        </p>
                      </div>
                    );
                  })}

                  {/* Input fields */}
                  {config.inputs.map((field) => (
                    <div key={field} className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field === "distraction" && "📵 Biggest distraction removed:"}
                        {field === "backlog" && "✅ Backlog item finished:"}
                        {field === "vampire" && "⚡ Energy vampire cut:"}
                      </label>
                      <input
                        type="text"
                        value={week[field] || ""}
                        onChange={(e) =>
                          handleInputChange(config.id, field, e.target.value)
                        }
                        placeholder={
                          field === "distraction"
                            ? "e.g., Instagram, News app, YouTube"
                            : field === "backlog"
                            ? "e.g., replied to overdue email, organized desk"
                            : "e.g., doomscrolling Twitter, negative friend"
                        }
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-400 focus:ring-0 transition-colors text-sm"
                      />
                    </div>
                  ))}

                  {/* Reflection fields for Week 4 */}
                  {config.reflections && (
                    <div className="mt-4 space-y-4">
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          🔄 What changed most?
                        </label>
                        <textarea
                          value={reflection.changed}
                          onChange={(e) =>
                            handleReflectionChange("changed", e.target.value)
                          }
                          placeholder="Be specific: 'I stopped checking email before noon'"
                          rows={3}
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-400 focus:ring-0 resize-none transition-colors text-sm"
                        />
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          🎯 What's my next 28-day focus?
                        </label>
                        <textarea
                          value={reflection.next}
                          onChange={(e) =>
                            handleReflectionChange("next", e.target.value)
                          }
                          placeholder="Keep it tiny: 'Drink water before coffee'"
                          rows={3}
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-400 focus:ring-0 resize-none transition-colors text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Weeks;
