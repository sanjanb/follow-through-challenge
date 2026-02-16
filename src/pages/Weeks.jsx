import { useState } from 'react'
import { useChallenge } from '../context/ChallengeContext'
import { Lock, CheckCircle, Circle, Target, Zap, Rocket, Crown } from 'lucide-react'

const Weeks = () => {
  const { state, updateWeek, checkWeekUnlock } = useChallenge()
  const [reflection, setReflection] = useState({
    changed: state.weeks[4]?.reflection?.changed || '',
    next: state.weeks[4]?.reflection?.next || ''
  })

  const weekConfigs = [
    {
      id: 1,
      title: 'Foundation',
      icon: Target,
      description: 'Prove you can show up when it\'s boring.',
      color: 'blue',
      tasks: [
        'Complete all 7 Daily Baseline items ×7 days',
        'Write: "What do I actually want to finish this week?" (1 sentence)',
        'Identify #1 distraction → delete/block it for 7 days',
        'Do 1 thing that scares you slightly'
      ],
      inputs: ['distraction']
    },
    {
      id: 2,
      title: 'Discipline',
      icon: Zap,
      description: 'Push through the "this is boring" wall.',
      color: 'yellow',
      tasks: [
        'Maintain all 7 Daily Baseline items',
        'Upgrade: Phone-free time → 90 min/day',
        'Finish one backlog item (under 90 min)',
        'Have one difficult conversation',
        'Learn 30 min in your field'
      ],
      inputs: ['backlog']
    },
    {
      id: 3,
      title: 'Momentum',
      icon: Rocket,
      description: 'See tangible evidence you\'re changing.',
      color: 'green',
      tasks: [
        'Maintain all 7 Daily Baseline items + 90-min phone-free',
        'Finish what you started in Week 2',
        'Cut one energy vampire (person/app/habit)',
        'Create/share something (output > consumption)',
        'List 3 concrete wins from Days 1–21'
      ],
      inputs: ['vampire']
    },
    {
      id: 4,
      title: 'Integration',
      icon: Crown,
      description: 'Lock in your new baseline—no backsliding.',
      color: 'purple',
      tasks: [
        'Maintain all 7 Daily Baseline items',
        'Review all 28 days in writing → "What actually changed?"',
        'Identify your ONE sticky habit',
        'Schedule your next 28-day challenge',
        'Tell one person what you completed'
      ],
      inputs: [],
      reflections: ['changed', 'next']
    }
  ]

  const handleTaskToggle = (weekId, taskIndex) => {
    const week = state.weeks[weekId]
    if (!week.unlocked) return

    const newTasks = [...week.tasks]
    newTasks[taskIndex] = !newTasks[taskIndex]

    updateWeek(weekId, {
      tasks: newTasks,
      completed: newTasks.every(task => task)
    })

    checkWeekUnlock()
  }

  const handleInputChange = (weekId, field, value) => {
    updateWeek(weekId, { [field]: value })
  }

  const handleReflectionChange = (field, value) => {
    const newReflection = { ...reflection, [field]: value }
    setReflection(newReflection)
    updateWeek(4, { reflection: newReflection })
  }

  const unlockWeek = (weekId) => {
    updateWeek(weekId, { unlocked: true })
  }

  const getWeekColor = (color) => {
    const colors = {
      blue: 'border-blue-200 bg-blue-50',
      yellow: 'border-yellow-200 bg-yellow-50',
      green: 'border-green-200 bg-green-50',
      purple: 'border-purple-200 bg-purple-50'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Challenges</h1>
        <p className="text-gray-600">Progressive challenges that unlock only when you prove yourself worthy</p>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Target className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <div className="font-semibold text-blue-800">How it works:</div>
              <div className="text-blue-700 text-sm">Complete Week 1 to unlock Week 2, and so on. Each week builds on the last.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weeks */}
      {weekConfigs.map((config) => {
        const week = state.weeks[config.id]
        const isLocked = !week.unlocked
        const isCompleted = week.completed

        return (
          <div
            key={config.id}
            className={`bg-white rounded-2xl shadow-soft p-6 md:p-8 border-l-4 ${
              isLocked ? 'border-gray-300 bg-gray-50' : getWeekColor(config.color)
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <config.icon className={`w-8 h-8 ${isLocked ? 'text-gray-400' : 'text-gray-700'}`} />
                <div>
                  <h2 className={`text-2xl font-bold ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>
                    Week {config.id}: {config.title}
                  </h2>
                  <p className={`text-sm ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                    {config.description}
                  </p>
                </div>
              </div>

              {isLocked ? (
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-500 font-medium">Locked</span>
                </div>
              ) : isCompleted ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Completed</span>
                </div>
              ) : (
                <div className="text-gray-600 font-medium">In Progress</div>
              )}
            </div>

            {isLocked ? (
              <div className="text-center py-8">
                <button
                  onClick={() => unlockWeek(config.id)}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Unlock Week {config.id}
                </button>
                <p className="text-sm text-gray-500 mt-2">Complete the previous week first</p>
              </div>
            ) : (
              <div className="space-y-4">
                {config.tasks.map((task, index) => {
                  const isTaskCompleted = week.tasks[index]
                  return (
                    <div
                      key={index}
                      onClick={() => handleTaskToggle(config.id, index)}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isTaskCompleted
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {isTaskCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isTaskCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                          {task}
                        </p>
                      </div>
                    </div>
                  )
                })}

                {/* Input fields */}
                {config.inputs.map((field) => (
                  <div key={field} className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                      {field === 'distraction' && 'Biggest distraction removed:'}
                      {field === 'backlog' && 'Backlog item finished:'}
                      {field === 'vampire' && 'Energy vampire cut:'}
                    </label>
                    <input
                      type="text"
                      value={week[field] || ''}
                      onChange={(e) => handleInputChange(config.id, field, e.target.value)}
                      placeholder={
                        field === 'distraction' ? 'e.g., Instagram, News app, YouTube' :
                        field === 'backlog' ? 'e.g., replied to overdue email, organized desk' :
                        'e.g., doomscrolling Twitter, negative friend'
                      }
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0"
                    />
                  </div>
                ))}

                {/* Reflection fields for Week 4 */}
                {config.reflections && (
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        What changed most?
                      </label>
                      <textarea
                        value={reflection.changed}
                        onChange={(e) => handleReflectionChange('changed', e.target.value)}
                        placeholder="Be specific: 'I stopped checking email before noon'"
                        rows={3}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 resize-none"
                      />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        What's my next 28-day focus?
                      </label>
                      <textarea
                        value={reflection.next}
                        onChange={(e) => handleReflectionChange('next', e.target.value)}
                        placeholder="Keep it tiny: 'Drink water before coffee'"
                        rows={3}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Weeks