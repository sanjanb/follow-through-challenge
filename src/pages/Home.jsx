import { Link } from "react-router-dom";
import { useChallenge } from "../context/ChallengeContext";
import {
  Target,
  Calendar,
  TrendingUp,
  ArrowRight,
  Star,
  Sun,
  Droplets,
  Activity,
  BookOpen,
  Sparkles,
  PenTool,
  Moon,
  Zap,
  CheckCircle,
  Flame,
} from "lucide-react";

const Home = () => {
  const { getStats } = useChallenge();
  const stats = getStats();

  const features = [
    {
      icon: Target,
      title: "Daily Baseline",
      description:
        "7 essential habits to build your foundation: morning routine, hydration, movement, learning, cleaning, planning, and sleep.",
      step: "01",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Calendar,
      title: "Weekly Challenges",
      description:
        "Progressive challenges that unlock only when you prove yourself worthy. Each week builds on the last.",
      step: "02",
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Visual analytics and achievements to keep you motivated throughout your 28-day transformation journey.",
      step: "03",
      color: "from-green-500 to-green-600",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  const quickStats = [
    {
      label: "Days Completed",
      value: stats.completedDays,
      suffix: "/28",
      icon: Calendar,
      color: "text-primary-600",
      bg: "bg-primary-50",
      iconColor: "text-primary-500",
    },
    {
      label: "Current Streak",
      value: stats.streak,
      suffix: " days",
      icon: Flame,
      color: "text-orange-600",
      bg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      suffix: "",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      iconColor: "text-green-500",
    },
  ];

  const baselineItems = [
    { icon: Sun, name: "Morning Routine", desc: "Start your day intentionally", color: "text-amber-500", bg: "bg-amber-50" },
    { icon: Droplets, name: "Hydration", desc: "Stay properly hydrated", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Activity, name: "Movement", desc: "Physical activity daily", color: "text-green-500", bg: "bg-green-50" },
    { icon: BookOpen, name: "Learning", desc: "Continuous improvement", color: "text-purple-500", bg: "bg-purple-50" },
    { icon: Sparkles, name: "Cleaning", desc: "Maintain your space", color: "text-pink-500", bg: "bg-pink-50" },
    { icon: PenTool, name: "Planning", desc: "Prepare for tomorrow", color: "text-indigo-500", bg: "bg-indigo-50" },
    { icon: Moon, name: "Sleep", desc: "Quality rest matters", color: "text-slate-500", bg: "bg-slate-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-100 rounded-full opacity-30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-3xl" />
          </div>

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>28 Days · 7 Habits · 1 You</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              28-Day{" "}
              <span className="gradient-text">Follow-Through</span>{" "}
              Challenge
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Transform your life by building unbreakable habits. This isn't about
              motivation—it's about proving to yourself that you finish what you
              start.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Link
                to="/tracker"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-medium hover:shadow-large hover:-translate-y-0.5 text-base md:text-lg"
              >
                Start Tracking Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/progress"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-primary-200 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all text-base md:text-lg"
              >
                View Progress
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats — always visible */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-soft p-6 text-center hover:shadow-medium transition-shadow"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
                {stat.suffix && (
                  <span className="text-lg text-gray-400">{stat.suffix}</span>
                )}
              </div>
              <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
            </div>
          );
        })}
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A systematic approach to building self-trust through consistent
            action and progressive challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200" />

          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center relative">
                <div className="relative inline-block mb-4">
                  <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto shadow-sm`}>
                    <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily Baseline */}
      <section className="bg-white rounded-2xl shadow-soft p-4 md:p-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
            Your Daily Baseline
          </h2>
          <p className="text-gray-600 text-sm md:text-base px-4">
            7 non-negotiable habits that form your foundation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {baselineItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-4 md:py-6 px-4">
        <div className="relative rounded-2xl p-6 md:p-12 text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #2563eb 100%)", backgroundSize: "200% auto", animation: "gradientShift 6s ease infinite" }}>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              Ready to Prove Yourself?
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
              28 days from now, you'll be someone who finishes what they start.
            </p>
            <Link
              to="/tracker"
              className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-medium hover:shadow-large hover:-translate-y-0.5 text-base md:text-lg"
            >
              Begin Your Challenge
              <Star className="ml-2 w-5 h-5 fill-current" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
