import { Heart, Target, Github, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-gray-200" style={{ background: "linear-gradient(to bottom, #1e293b, #0f172a)" }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">28-Day Challenge</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your self-trust rebuilding system. Build unbreakable habits and prove to yourself that you finish what you start.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/tracker", label: "Daily Tracker" },
                { to: "/weeks", label: "Weekly Challenges" },
                { to: "/progress", label: "Progress" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div>
            <h3 className="text-white font-semibold mb-3">Daily Reminder</h3>
            <blockquote className="text-gray-300 text-sm italic leading-relaxed border-l-2 border-primary-500 pl-3">
              "You don't need more discipline. You need fewer decisions."
            </blockquote>
            <p className="text-gray-500 text-xs mt-3">
              Consistency beats intensity every time.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {currentYear} 28-Day Follow-Through Challenge
          </p>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
            <span>for personal growth</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer