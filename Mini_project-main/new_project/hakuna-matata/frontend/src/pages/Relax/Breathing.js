import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Breathing = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [phase, setPhase] = useState('Ready');
  const [phaseTime, setPhaseTime] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [circleScale, setCircleScale] = useState(0.5);
  const [pattern, setPattern] = useState('relax');
  const [sessionComplete, setSessionComplete] = useState(false);
  
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  // Breathing patterns configuration
  const patterns = {
    relax: {
      name: 'Relaxing Breath',
      inhale: 4,
      hold: 4,
      exhale: 6,
      description: 'Perfect for calming down (4-4-6)'
    },
    box: {
      name: 'Box Breathing',
      inhale: 4,
      holdInhale: 4,
      exhale: 4,
      holdExhale: 4,
      description: 'Classic box pattern (4-4-4-4)'
    },
    deep: {
      name: 'Deep Breathing',
      inhale: 5,
      hold: 5,
      exhale: 5,
      description: 'Slow and deep (5-5-5)'
    }
  };

  const currentPattern = patterns[pattern];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup intervals
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Main breathing timer
  useEffect(() => {
    if (!isActive || isPaused) return;

    let currentPhase = 'inhale';
    let phaseCounter = 0;
    let cycleCount = 0;

    const getPhaseConfig = () => {
      if (pattern === 'box') {
        switch (currentPhase) {
          case 'inhale':
            return { duration: currentPattern.inhale, next: 'hold1', displayText: 'Breathe In' };
          case 'hold1':
            return { duration: currentPattern.holdInhale, next: 'exhale', displayText: 'Hold' };
          case 'exhale':
            return { duration: currentPattern.exhale, next: 'hold2', displayText: 'Breathe Out' };
          case 'hold2':
            return { duration: currentPattern.holdExhale, next: 'inhale', displayText: 'Hold' };
          default:
            return { duration: currentPattern.inhale, next: 'hold1', displayText: 'Breathe In' };
        }
      } else {
        switch (currentPhase) {
          case 'inhale':
            return { duration: currentPattern.inhale, next: 'hold', displayText: 'Breathe In' };
          case 'hold':
            return { duration: currentPattern.hold, next: 'exhale', displayText: 'Hold' };
          case 'exhale':
            return { duration: currentPattern.exhale, next: 'inhale', displayText: 'Breathe Out' };
          default:
            return { duration: currentPattern.inhale, next: 'hold', displayText: 'Breathe In' };
        }
      }
    };

    const phaseConfig = getPhaseConfig();
    setPhase(phaseConfig.displayText);
    setPhaseTime(phaseConfig.duration);

    let countDown = phaseConfig.duration;

    intervalRef.current = setInterval(() => {
      countDown--;
      setPhaseTime(Math.max(0, countDown));
      setTotalSeconds((prev) => prev + 1);

      // Calculate circle scale based on phase
      if (currentPhase === 'inhale') {
        setCircleScale(0.5 + (phaseConfig.duration - countDown) / phaseConfig.duration * 0.5);
      } else if (currentPhase === 'hold') {
        setCircleScale(1);
      } else if (currentPhase === 'exhale') {
        setCircleScale(1 - (phaseConfig.duration - countDown) / phaseConfig.duration * 0.5);
      }

      // Move to next phase
      if (countDown <= 0) {
        currentPhase = phaseConfig.next;
        
        // Check if cycle completed
        if (currentPhase === 'inhale') {
          cycleCount++;
          setCompletedCycles(cycleCount);
        }

        // Get next phase config
        const nextPhaseConfig = getPhaseConfig();
        setPhase(nextPhaseConfig.displayText);
        setPhaseTime(nextPhaseConfig.duration);
        countDown = nextPhaseConfig.duration;
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, pattern]);

  const startBreathing = () => {
    setIsActive(true);
    setIsPaused(false);
    setSessionComplete(false);
  };

  const pauseBreathing = () => {
    setIsPaused(true);
  };

  const resumeBreathing = () => {
    setIsPaused(false);
  };

  const stopBreathing = () => {
    setIsActive(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (completedCycles > 0) {
      setSessionComplete(true);
    }
  };

  const resetSession = () => {
    setIsActive(false);
    setIsPaused(false);
    setPhase('Ready');
    setPhaseTime(0);
    setTotalSeconds(0);
    setCompletedCycles(0);
    setCircleScale(0.5);
    setSessionComplete(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Breathing Exercise</h1>
            <p className="text-gray-600 mt-2">Take a moment to breathe and relax</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ← Back
          </button>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Breathing Animation */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              
              {/* Breathing Circle Animation */}
              <div className="flex justify-center mb-8">
                <div className="relative w-80 h-80">
                  {/* Outer circle */}
                  <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                  
                  {/* Breathing circle */}
                  <div 
                    className="absolute inset-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full transition-transform duration-100 ease-in-out shadow-lg"
                    style={{
                      transform: `scale(${circleScale})`,
                      opacity: 0.7 + circleScale * 0.3
                    }}
                  ></div>
                  
                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold text-blue-700 mb-4">
                      {phaseTime}
                    </div>
                    <div className="text-2xl font-semibold text-gray-700 text-center">
                      {phase}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase Indicator */}
              <div className="text-center mb-8">
                <div className="inline-block bg-blue-100 px-6 py-3 rounded-full">
                  <p className="text-lg font-semibold text-blue-700">
                    {currentPattern.name}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    {currentPattern.description}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4 flex-wrap mb-8">
                {!isActive ? (
                  <button
                    onClick={startBreathing}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition"
                  >
                    ▶ Start
                  </button>
                ) : (
                  <>
                    {!isPaused ? (
                      <button
                        onClick={pauseBreathing}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition"
                      >
                        ⏸ Pause
                      </button>
                    ) : (
                      <button
                        onClick={resumeBreathing}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition"
                      >
                        ▶ Resume
                      </button>
                    )}
                    <button
                      onClick={stopBreathing}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition"
                    >
                      ⏹ Stop
                    </button>
                  </>
                )}
                <button
                  onClick={resetSession}
                  className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  🔄 Reset
                </button>
              </div>

              {/* Session Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {completedCycles}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Cycles Completed</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-600">
                    {formatTime(totalSeconds)}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Session Time</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {phaseTime}s
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Current Phase</p>
                </div>
              </div>
            </div>

            {/* Completion Message */}
            {sessionComplete && (
              <div className="bg-green-100 border-2 border-green-400 rounded-lg p-6 mt-6">
                <div className="text-2xl font-bold text-green-700 mb-2">
                  ✨ Great Job!
                </div>
                <p className="text-green-700">
                  You completed {completedCycles} breathing cycles. Well done on taking time for your mental health!
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Pattern Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Breathing Patterns</h3>
              <div className="space-y-3">
                {Object.entries(patterns).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => {
                      if (!isActive) setPattern(key);
                    }}
                    disabled={isActive}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      pattern === key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${isActive ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="font-semibold text-gray-900">{config.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{config.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Tips for Success</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Find a quiet, comfortable place</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Sit upright with good posture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Close your eyes while breathing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Follow the circle's movement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Breathe through your nose if possible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>Do this 5-10 minutes daily</span>
                </li>
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">Benefits</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ Reduces anxiety and stress</li>
                <li>✓ Lowers heart rate and blood pressure</li>
                <li>✓ Improves focus and clarity</li>
                <li>✓ Promotes better sleep</li>
                <li>✓ Enhances emotional regulation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breathing;