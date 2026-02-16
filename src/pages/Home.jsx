import { Link } from "react-router-dom";
import { useChallenge } from "../context/ChallengeContext";
import {
  Target,
  Calendar,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Sun,
  Droplets,
  Activity,
  BookOpen,
  Sparkles,
  PenTool,
  Moon,
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
    },
    {
      icon: Calendar,
      title: "Weekly Challenges",
      description:
        "Progressive challenges that unlock only when you prove yourself worthy. Each week builds on the last.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Visual analytics and achievements to keep you motivated throughout your 28-day transformation journey.",
    },
  ];

  const quickStats = [
    { label: "Days Completed", value: stats.completedDays, total: 28 },
    { label: "Current Streak", value: stats.streak, total: null },
    {
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      total: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            28-Day <span className="text-primary-600">Follow-Through</span>{" "}
            Challenge
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your life by building unbreakable habits. This isn't about
            motivation—it's about proving to yourself that you finish what you
            start.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tracker"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-medium"
            >
              Start Tracking Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/progress"
              className="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              View Progress
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      {stats.completedDays > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-soft p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stat.value}
                {stat.total && (
                  <span className="text-lg text-gray-500">/{stat.total}</span>
                )}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </section>
      )}

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Baseline */}
      <section className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Daily Baseline
          </h2>
          <p className="text-gray-600">
            7 non-negotiable habits that form your foundation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Sun,
              name: "Morning Routine",
              desc: "Start your day intentionally",
            },
            {
              icon: Droplets,
              name: "Hydration",
              desc: "Stay properly hydrated",
            },
            {
              icon: Activity,
              name: "Movement",
              desc: "Physical activity daily",
            },
            {
              icon: BookOpen,
              name: "Learning",
              desc: "Continuous improvement",
            },
            { icon: Sparkles, name: "Cleaning", desc: "Maintain your space" },
            { icon: PenTool, name: "Planning", desc: "Prepare for tomorrow" },
            { icon: Moon, name: "Sleep", desc: "Quality rest matters" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 text-primary-600">
                <item.icon className="w-full h-full" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Prove Yourself?</h2>
          <p className="text-xl mb-8 opacity-90">
            28 days from now, you'll be someone who finishes what they start.
          </p>
          <Link
            to="/tracker"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-medium"
          >
            Begin Your Challenge
            <Star className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
