import React, { createContext, useContext, useReducer, useEffect } from "react";

// Challenge Context
const ChallengeContext = createContext();

// Challenge Reducer
const challengeReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_STATE":
      return action.payload;
    case "UPDATE_DAY":
      const newState = { ...state };
      newState.days[action.dayIndex] = {
        ...newState.days[action.dayIndex],
        ...action.updates,
      };
      return newState;
    case "UPDATE_WEEK":
      const weekState = { ...state };
      weekState.weeks[action.weekNum] = {
        ...weekState.weeks[action.weekNum],
        ...action.updates,
      };
      return weekState;
    case "RESET_CHALLENGE":
      return getDefaultState();
    default:
      return state;
  }
};

// Default state
const getDefaultState = () => ({
  version: "2.0",
  startDate: new Date().toISOString().split("T")[0],
  currentDay: 1,
  days: Array(28)
    .fill()
    .map(() => ({
      items: Array(7).fill(false),
      mood: "",
      win: "",
      completed: false,
    })),
  weeks: {
    1: {
      unlocked: true,
      tasks: Array(4).fill(false),
      distraction: "",
      completed: false,
    },
    2: {
      unlocked: false,
      tasks: Array(5).fill(false),
      backlog: "",
      completed: false,
    },
    3: {
      unlocked: false,
      tasks: Array(5).fill(false),
      vampire: "",
      completed: false,
    },
    4: {
      unlocked: false,
      tasks: Array(5).fill(false),
      reflection: { changed: "", next: "" },
      completed: false,
    },
  },
  settings: {
    notifications: true,
    theme: "light",
    autoSave: true,
  },
});

// Challenge Provider Component
export const ChallengeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(challengeReducer, getDefaultState());

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("followThroughChallenge_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD_STATE", payload: parsed });
      } catch (error) {
        console.warn("Failed to load state:", error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("followThroughChallenge_v2", JSON.stringify(state));
  }, [state]);

  // Actions
  const updateDay = (dayIndex, updates) => {
    dispatch({ type: "UPDATE_DAY", dayIndex, updates });
  };

  const updateWeek = (weekNum, updates) => {
    dispatch({ type: "UPDATE_WEEK", weekNum, updates });
  };

  const resetChallenge = () => {
    if (
      window.confirm(
        "⚠️ RESET WARNING:\nThis will erase ALL your progress.\nAre you absolutely sure?",
      )
    ) {
      dispatch({ type: "RESET_CHALLENGE" });
      return true;
    }
    return false;
  };

  // Computed values
  const getStats = () => {
    const days = state.days;
    const weeks = state.weeks;

    // Days completed
    const completedDays = days.filter((day) => day.completed).length;

    // Current streak
    let streak = 0;
    for (let i = 0; i < 28; i++) {
      if (days[i].completed) {
        streak++;
      } else {
        break;
      }
    }

    // Best streak
    let bestStreak = 0;
    let currentStreak = 0;
    for (let i = 0; i < 28; i++) {
      if (days[i].completed) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    // Total wins logged
    const totalWins = days.filter((day) => day.win.trim() !== "").length;

    // Average mood
    const moods = days
      .map((day) => parseInt(day.mood))
      .filter((mood) => !isNaN(mood) && mood >= 1 && mood <= 10);
    const avgMood =
      moods.length > 0
        ? (moods.reduce((a, b) => a + b, 0) / moods.length).toFixed(1)
        : "-";

    // Completion rate
    const totalItems = 28 * 7;
    const completedItems = days.reduce(
      (sum, day) => sum + day.items.filter((item) => item).length,
      0,
    );
    const completionRate = Math.round((completedItems / totalItems) * 100);

    // Week completion
    const completedWeeks = Object.values(weeks).filter(
      (week) => week.completed,
    ).length;

    return {
      completedDays,
      totalDays: 28,
      streak,
      bestStreak,
      totalWins,
      avgMood,
      completionRate,
      completedWeeks,
      totalWeeks: 4,
    };
  };

  const getBaselineStats = () => {
    const days = state.days;
    const baselineNames = [
      "morning",
      "hydration",
      "movement",
      "learning",
      "cleaning",
      "planning",
      "sleep",
    ];

    const stats = {};

    baselineNames.forEach((name, index) => {
      let completed = 0;
      let total = 0;

      days.forEach((day) => {
        if (day.items && day.items[index] !== undefined) {
          total++;
          if (day.items[index]) completed++;
        }
      });

      const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

      stats[name] = { completed, total, rate };
    });

    return stats;
  };

  const getAchievements = () => {
    const stats = getStats();
    const weeks = state.weeks;

    const achievements = [
      {
        id: "first-day",
        title: "First Steps",
        description: "Completed your first day",
        icon: "Target",
        unlocked: stats.completedDays >= 1,
      },
      {
        id: "week-one",
        title: "Foundation Builder",
        description: "Completed Week 1 challenges",
        icon: "HardHat",
        unlocked: weeks[1].completed,
      },
      {
        id: "three-day-streak",
        title: "Momentum Builder",
        description: "Maintained a 3-day streak",
        icon: "Flame",
        unlocked: stats.bestStreak >= 3,
      },
      {
        id: "week-two",
        title: "Discipline Master",
        description: "Completed Week 2 challenges",
        icon: "Zap",
        unlocked: weeks[2].completed,
      },
      {
        id: "seven-day-streak",
        title: "Consistency Champion",
        description: "Maintained a 7-day streak",
        icon: "Award",
        unlocked: stats.bestStreak >= 7,
      },
      {
        id: "week-three",
        title: "Momentum Keeper",
        description: "Completed Week 3 challenges",
        icon: "Rocket",
        unlocked: weeks[3].completed,
      },
      {
        id: "halfway",
        title: "Halfway Hero",
        description: "Reached Day 14",
        icon: "Target",
        unlocked: stats.completedDays >= 14,
      },
      {
        id: "week-four",
        title: "Integration Expert",
        description: "Completed Week 4 challenges",
        icon: "Crown",
        unlocked: weeks[4].completed,
      },
      {
        id: "perfect-week",
        title: "Perfect Week",
        description: "Completed all 7 days in a week",
        icon: "Star",
        unlocked: Object.values(state.days.slice(0, 28)).some(
          (day) => day && day.items && day.items.filter(Boolean).length === 7,
        ),
      },
      {
        id: "full-challenge",
        title: "Challenge Complete",
        description: "Finished all 28 days",
        icon: "Trophy",
        unlocked: stats.completedDays >= 28,
      },
    ];

    return achievements;
  };

  const checkWeekUnlock = () => {
    const days = state.days;
    const weeks = state.weeks;

    // Week 2 unlocks after Day 7 completed AND Week 1 tasks done
    if (!weeks[2].unlocked) {
      const week1Done = weeks[1].tasks.every((task) => task);
      const day7Done = days[6].completed;
      if (week1Done && day7Done) {
        updateWeek(2, { unlocked: true });
      }
    }

    // Week 3 unlocks after Day 14 completed AND Week 2 tasks done
    if (!weeks[3].unlocked) {
      const week2Done = weeks[2].tasks.every((task) => task);
      const day14Done = days[13].completed;
      if (week2Done && day14Done) {
        updateWeek(3, { unlocked: true });
      }
    }

    // Week 4 unlocks after Day 21 completed AND Week 3 tasks done
    if (!weeks[4].unlocked) {
      const week3Done = weeks[3].tasks.every((task) => task);
      const day21Done = days[20].completed;
      if (week3Done && day21Done) {
        updateWeek(4, { unlocked: true });
      }
    }
  };

  const value = {
    state,
    updateDay,
    updateWeek,
    resetChallenge,
    getStats,
    getBaselineStats,
    getAchievements,
    checkWeekUnlock,
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
};

// Custom hook to use challenge context
export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error("useChallenge must be used within a ChallengeProvider");
  }
  return context;
};
