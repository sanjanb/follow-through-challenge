import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <blockquote className="text-lg italic mb-4 opacity-90">
            "You don't need more discipline. You need fewer decisions."
          </blockquote>
          <p className="text-gray-400 text-sm">
            © {currentYear} • Your self-trust rebuilding system
          </p>
          <div className="flex items-center justify-center mt-4 text-gray-500 text-sm">
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