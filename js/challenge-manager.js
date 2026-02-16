/**
 * 28-Day Follow-Through Challenge - State Management
 * Professional JavaScript module for data persistence and UI updates
 */

class ChallengeManager {
  constructor() {
    this.storageKey = "followThroughChallenge_v2";
    this.state = this.loadState();
    this.listeners = [];
  }

  // Initialize default state
  getDefaultState() {
    return {
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
    };
  }

  // Load state from localStorage
  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate old data if needed
        return this.migrateState(parsed);
      }
    } catch (error) {
      console.warn("Failed to load state:", error);
    }
    return this.getDefaultState();
  }

  // Migrate old state format to new
  migrateState(oldState) {
    if (!oldState.version || oldState.version < "2.0") {
      console.log("Migrating state to v2.0...");
      const newState = this.getDefaultState();

      // Migrate days data
      if (oldState.days) {
        oldState.days.forEach((day, index) => {
          if (index < 28) {
            newState.days[index] = {
              items: day.items || Array(7).fill(false),
              mood: day.mood || "",
              win: day.win || "",
              completed: day.items ? day.items.every((item) => item) : false,
            };
          }
        });
      }

      // Migrate weeks data
      if (oldState.weeks) {
        Object.keys(oldState.weeks).forEach((weekNum) => {
          const week = oldState.weeks[weekNum];
          if (newState.weeks[weekNum]) {
            newState.weeks[weekNum] = {
              unlocked: week.unlocked !== false,
              tasks: week.tasks || Array(5).fill(false),
              distraction: week.distraction || "",
              backlog: week.backlog || "",
              vampire: week.vampire || "",
              reflection: week.reflection || { changed: "", next: "" },
              completed: week.tasks ? week.tasks.every((task) => task) : false,
            };
          }
        });
      }

      // Migrate unlocked weeks
      if (oldState.unlockedWeeks) {
        oldState.unlockedWeeks.forEach((week) => {
          if (newState.weeks[week]) {
            newState.weeks[week].unlocked = true;
          }
        });
      }

      return newState;
    }

    return oldState;
  }

  // Save state to localStorage
  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      this.notifyListeners("saved");
    } catch (error) {
      console.error("Failed to save state:", error);
      this.notifyListeners("save-error", error);
    }
  }

  // Update state and save
  updateState(updates) {
    this.state = { ...this.state, ...updates };
    this.saveState();
    this.notifyListeners("updated", updates);
  }

  // Update specific day data
  updateDay(dayIndex, updates) {
    if (dayIndex >= 0 && dayIndex < 28) {
      this.state.days[dayIndex] = { ...this.state.days[dayIndex], ...updates };
      this.saveState();
      this.notifyListeners("day-updated", { dayIndex, updates });
    }
  }

  // Update specific week data
  updateWeek(weekNum, updates) {
    if (this.state.weeks[weekNum]) {
      this.state.weeks[weekNum] = { ...this.state.weeks[weekNum], ...updates };
      this.saveState();
      this.notifyListeners("week-updated", { weekNum, updates });
    }
  }

  // Get computed stats
  getStats() {
    const days = this.state.days;
    const weeks = this.state.weeks;

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
  }

  // Get baseline performance stats
  getBaselineStats() {
    const days = this.state.days;
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
  }

  // Get achievements
  getAchievements() {
    const stats = this.getStats();
    const weeks = this.state.weeks;

    const achievements = [
      {
        id: "first-day",
        title: "First Steps",
        description: "Completed your first day",
        icon: "🎯",
        unlocked: stats.completedDays >= 1,
      },
      {
        id: "week-one",
        title: "Foundation Builder",
        description: "Completed Week 1 challenges",
        icon: "🏗️",
        unlocked: weeks[1].completed,
      },
      {
        id: "three-day-streak",
        title: "Momentum Builder",
        description: "Maintained a 3-day streak",
        icon: "🔥",
        unlocked: stats.bestStreak >= 3,
      },
      {
        id: "week-two",
        title: "Discipline Master",
        description: "Completed Week 2 challenges",
        icon: "⚡",
        unlocked: weeks[2].completed,
      },
      {
        id: "seven-day-streak",
        title: "Consistency Champion",
        description: "Maintained a 7-day streak",
        icon: "💪",
        unlocked: stats.bestStreak >= 7,
      },
      {
        id: "week-three",
        title: "Momentum Keeper",
        description: "Completed Week 3 challenges",
        icon: "🚀",
        unlocked: weeks[3].completed,
      },
      {
        id: "halfway",
        title: "Halfway Hero",
        description: "Reached Day 14",
        icon: "🎯",
        unlocked: stats.completedDays >= 14,
      },
      {
        id: "week-four",
        title: "Integration Expert",
        description: "Completed Week 4 challenges",
        icon: "👑",
        unlocked: weeks[4].completed,
      },
      {
        id: "perfect-week",
        title: "Perfect Week",
        description: "Completed all 7 days in a week",
        icon: "⭐",
        unlocked: Object.values(this.state.days.slice(0, 28)).some(
          (day) => day && day.items && day.items.filter(Boolean).length === 7,
        ),
      },
      {
        id: "full-challenge",
        title: "Challenge Complete",
        description: "Finished all 28 days",
        icon: "🏆",
        unlocked: stats.completedDays >= 28,
      },
    ];

    return achievements;
  }

  // Check if week should unlock
  checkWeekUnlock() {
    const days = this.state.days;
    const weeks = this.state.weeks;

    // Week 2 unlocks after Day 7 completed AND Week 1 tasks done
    if (!weeks[2].unlocked) {
      const week1Done = weeks[1].tasks.every((task) => task);
      const day7Done = days[6].completed;
      if (week1Done && day7Done) {
        this.updateWeek(2, { unlocked: true });
        this.notifyListeners("week-unlocked", 2);
      }
    }

    // Week 3 unlocks after Day 14 completed AND Week 2 tasks done
    if (!weeks[3].unlocked) {
      const week2Done = weeks[2].tasks.every((task) => task);
      const day14Done = days[13].completed;
      if (week2Done && day14Done) {
        this.updateWeek(3, { unlocked: true });
        this.notifyListeners("week-unlocked", 3);
      }
    }

    // Week 4 unlocks after Day 21 completed AND Week 3 tasks done
    if (!weeks[4].unlocked) {
      const week3Done = weeks[3].tasks.every((task) => task);
      const day21Done = days[20].completed;
      if (week3Done && day21Done) {
        this.updateWeek(4, { unlocked: true });
        this.notifyListeners("week-unlocked", 4);
      }
    }
  }

  // Reset challenge
  resetChallenge() {
    if (
      confirm(
        "⚠️ RESET WARNING:\nThis will erase ALL your progress.\nAre you absolutely sure?",
      )
    ) {
      this.state = this.getDefaultState();
      this.saveState();
      this.notifyListeners("reset");
      return true;
    }
    return false;
  }

  // Event listener system
  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  notifyListeners(event, data) {
    this.listeners.forEach((callback) => callback(event, data));
  }
}

// Utility functions
const Utils = {
  // Format date for display
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  // Get day of week
  getDayOfWeek: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  },

  // Debounce function for input handling
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Show notification
  showNotification: (message, type = "info", duration = 3000) => {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} fade-in`;
    notification.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()" style="margin-left: auto; background: none; border: none; font-size: 1.2rem; cursor: pointer;">×</button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, duration);
    }

    return notification;
  },

  // Animate element
  animate: (element, animation) => {
    element.classList.add(animation);
    element.addEventListener(
      "animationend",
      () => {
        element.classList.remove(animation);
      },
      { once: true },
    );
  },
};

// Initialize global challenge manager
window.ChallengeManager = ChallengeManager;
window.Utils = Utils;
