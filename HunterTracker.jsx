import React, { useState } from 'react';
import { Trophy, Zap, Target, Heart, Eye, Dumbbell, Award, CheckCircle, Lock, Star, Clock, Calendar, Flame, Shield, Swords } from 'lucide-react';

export default function HunterTracker() {
  const [hunterData, setHunterData] = useState({
    name: "Md Zahirul Islam",
    level: 1,
    xp: 0,
    stats: {
      strength: 1,
      agility: 1,
      endurance: 1,
      vitality: 1,
      sense: 1
    },
    completedQuests: [],
    achievements: [],
    unlockedSkills: [],
    weeklyQuestsCompleted: [],
    hiddenQuestsFound: []
  });

  const [activeTab, setActiveTab] = useState('quests');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);
  const [showSkillUnlock, setShowSkillUnlock] = useState(null);

  const XP_PER_LEVEL = 500;
  
  const ranks = [
    { name: "E-RANK", minLevel: 1, maxLevel: 5, title: "The Weakest Hunter", color: "text-gray-400" },
    { name: "D-RANK", minLevel: 6, maxLevel: 10, title: "Novice Hunter", color: "text-green-400" },
    { name: "C-RANK", minLevel: 11, maxLevel: 15, title: "Competent Hunter", color: "text-blue-400" },
    { name: "B-RANK", minLevel: 16, maxLevel: 20, title: "Veteran Hunter", color: "text-purple-400" },
    { name: "A-RANK", minLevel: 21, maxLevel: 25, title: "Elite Hunter", color: "text-yellow-400" },
    { name: "S-RANK", minLevel: 26, maxLevel: 30, title: "Master Hunter", color: "text-red-400" },
    { name: "NATIONAL", minLevel: 31, maxLevel: 999, title: "Shadow Monarch", color: "text-pink-400" }
  ];

  const dailyQuests = [
    {
      id: 'monday',
      name: "WARRIOR'S TRIAL",
      day: "Monday",
      type: "Upper Body",
      icon: "💪",
      xp: 100,
      stats: { strength: 2 },
      exercises: [
        "Push-ups: 3x10",
        "Pike Push-ups: 3x8",
        "Tricep Dips: 3x10",
        "Plank Shoulder Taps: 3x20",
        "Diamond Push-ups: 3x8",
        "Superman Hold: 3x20sec",
        "Boss: Diamond Push-ups to failure + 1min plank"
      ]
    },
    {
      id: 'tuesday',
      name: "SPEED DUNGEON",
      day: "Tuesday",
      type: "Cardio & Core",
      icon: "⚡",
      xp: 100,
      stats: { agility: 2, endurance: 1 },
      exercises: [
        "High Knees: 5x30sec",
        "Burpees: 4x8",
        "Mountain Climbers: 4x20",
        "Bicycle Crunches: 4x20",
        "Leg Raises: 4x12",
        "Boss: 100 Jumping Jacks + Plank to failure"
      ]
    },
    {
      id: 'wednesday',
      name: "IRON LEGS RAID",
      day: "Wednesday",
      type: "Lower Body",
      icon: "🦵",
      xp: 100,
      stats: { strength: 2, vitality: 1 },
      exercises: [
        "Bodyweight Squats: 4x20",
        "Lunges: 4x16 total",
        "Jump Squats: 4x12",
        "Glute Bridges: 4x15",
        "Wall Sit: 4x45sec",
        "Calf Raises: 4x20",
        "Boss: Single Leg Glute Bridges 10 each x2 + 1min squat hold"
      ]
    },
    {
      id: 'thursday',
      name: "RECOVERY SHRINE",
      day: "Thursday",
      type: "Active Rest",
      icon: "🧘",
      xp: 100,
      stats: { vitality: 2, sense: 1 },
      exercises: [
        "Light Walk: 10min",
        "Cat-Cow: 10 reps",
        "Child's Pose: 1min",
        "Pigeon Pose: 45sec each",
        "Hamstring Stretch: 45sec each",
        "Quad Stretch: 30sec each",
        "Breathing Meditation: 5min"
      ]
    },
    {
      id: 'friday',
      name: "SHADOW MONARCH'S CHALLENGE",
      day: "Friday",
      type: "Full Body Chaos",
      icon: "👤",
      xp: 100,
      stats: { strength: 1, agility: 1, endurance: 1, vitality: 1, sense: 1 },
      exercises: [
        "4 ROUNDS:",
        "Burpees: 10",
        "Push-ups: 12",
        "Jump Lunges: 16",
        "Plank to Down Dog: 10",
        "Squat Jumps: 15",
        "Bicycle Crunches: 30",
        "High Knees: 30sec",
        "Superman: 15",
        "FINAL BOSS: Max push-ups + Max squats + Plank to failure"
      ]
    }
  ];

  const weeklyQuests = [
    {
      id: 'week_1_2',
      name: "E-RANK WEEKLY",
      weeks: "1-2",
      xp: 500,
      requirements: [
        "Complete all 5 Daily Quests",
        "10min stretching on rest days",
        "Drink 3L water daily for 7 days"
      ]
    },
    {
      id: 'week_3_4',
      name: "D-RANK WEEKLY",
      weeks: "3-4",
      xp: 500,
      requirements: [
        "Complete all 5 Daily Quests",
        "Beat previous week's push-up record",
        "No junk food for 5 days"
      ]
    },
    {
      id: 'week_5_6',
      name: "C-RANK WEEKLY",
      weeks: "5-6",
      xp: 500,
      requirements: [
        "Complete all 5 Daily Quests",
        "Hold plank for 2 minutes straight",
        "Complete a hidden quest"
      ]
    },
    {
      id: 'week_7_8',
      name: "B-RANK WEEKLY",
      weeks: "7-8",
      xp: 500,
      requirements: [
        "Complete all 5 Daily Quests",
        "Do 50 perfect push-ups in one session",
        "Try an advanced exercise variation"
      ]
    }
  ];

  const hiddenQuests = [
    { id: 'secret_training', name: "Secret Training", desc: "Work out twice in one day", xp: 500 },
    { id: 'overachiever', name: "Overachiever", desc: "Do 50% more reps than required", xp: 300 },
    { id: 'early_bird', name: "Early Bird", desc: "Complete quest before 7 AM", xp: 200 },
    { id: 'night_warrior', name: "Night Warrior", desc: "Complete quest after 10 PM", xp: 200 },
    { id: 'perfect_form', name: "Perfect Form Master", desc: "Complete 10 quests with perfect form", xp: 400 }
  ];

  const achievements = [
    { id: 'first_step', name: "First Step", desc: "Complete your first Daily Quest", xp: 200, statBonus: null },
    { id: 'dedication', name: "Dedication", desc: "Complete 5 Daily Quests in a row", xp: 200, statBonus: { vitality: 5 } },
    { id: 'early_riser', name: "Early Riser", desc: "Work out before 8 AM", xp: 100, statBonus: null },
    { id: 'night_owl', name: "Night Owl", desc: "Work out after 8 PM", xp: 100, statBonus: null },
    { id: 'iron_will', name: "Iron Will", desc: "Complete 10 Daily Quests", xp: 300, statBonus: { endurance: 5 } },
    { id: 'push_warrior', name: "Push-up Warrior", desc: "Do 100 push-ups in one day", xp: 300, statBonus: { strength: 10 } },
    { id: 'speed_demon', name: "Speed Demon", desc: "Complete Speed Dungeon in under 25min", xp: 300, statBonus: { agility: 10 } },
    { id: 'plank_master', name: "Plank Master", desc: "Hold plank for 3 minutes", xp: 300, statBonus: { endurance: 10 } },
    { id: 'perfect_week', name: "Perfect Week", desc: "Complete all 5 quests in one week", xp: 500, statBonus: { strength: 5, agility: 5, endurance: 5, vitality: 5, sense: 5 } },
    { id: 'the_grind', name: "The Grind", desc: "Complete 20 Daily Quests total", xp: 400, statBonus: null },
    { id: 'rank_d', name: "Rank Up! D-RANK", desc: "Reach Level 6", xp: 500, statBonus: null },
    { id: 'rank_c', name: "Double Rank Up! C-RANK", desc: "Reach Level 11", xp: 1000, statBonus: null },
    { id: 'rank_b', name: "Elite Hunter B-RANK", desc: "Reach Level 16", xp: 1500, statBonus: null },
    { id: 'rank_a', name: "Master A-RANK", desc: "Reach Level 21", xp: 2000, statBonus: null },
    { id: 'rank_s', name: "ARISE - S-RANK", desc: "Reach Level 26", xp: 2500, statBonus: null },
    { id: 'shadow_soldier', name: "Shadow Soldier", desc: "Complete 50 Daily Quests", xp: 1000, statBonus: { strength: 10, agility: 10, endurance: 10, vitality: 10, sense: 10 } },
    { id: 'monster_hunter', name: "Monster Hunter", desc: "Complete all Weekly Quests for a month", xp: 1000, statBonus: null }
  ];

  const skillTree = [
    { level: 5, name: "Power Strike", desc: "One-arm push-ups unlocked", icon: "🔥" },
    { level: 5, name: "Swift Steps", desc: "Sprint intervals unlocked", icon: "💨" },
    { level: 5, name: "Core Blast", desc: "Advanced planks unlocked", icon: "💪" },
    { level: 10, name: "Explosive Power", desc: "Clap push-ups unlocked", icon: "💥" },
    { level: 10, name: "Air Walk", desc: "Jump lunge variations unlocked", icon: "🦅" },
    { level: 10, name: "Iron Body", desc: "L-sit practice unlocked", icon: "🛡️" },
    { level: 15, name: "Shadow Clone", desc: "Pistol squats unlocked", icon: "👥" },
    { level: 15, name: "Lightning Speed", desc: "HIIT sprints unlocked", icon: "⚡" },
    { level: 15, name: "Diamond Defense", desc: "Advanced core circuits unlocked", icon: "💎" },
    { level: 20, name: "Monarch's Authority", desc: "Handstand practice unlocked", icon: "👑" },
    { level: 20, name: "Ruler's Reach", desc: "Advanced techniques unlocked", icon: "🎯" },
    { level: 20, name: "Power Overwhelming", desc: "Max rep challenges unlocked", icon: "⭐" }
  ];

  const getCurrentRank = () => {
    return ranks.find(r => hunterData.level >= r.minLevel && hunterData.level <= r.maxLevel);
  };

  const completeQuest = (quest, bonus = 0) => {
    const today = new Date().toDateString();
    const alreadyCompleted = hunterData.completedQuests.some(
      q => q.id === quest.id && q.date === today
    );

    if (alreadyCompleted) {
      alert("Quest already completed today!");
      return;
    }

    let totalXP = quest.xp + bonus;
    let newXP = hunterData.xp + totalXP;
    let newLevel = hunterData.level;
    let leveledUp = false;

    while (newXP >= XP_PER_LEVEL) {
      newXP -= XP_PER_LEVEL;
      newLevel++;
      leveledUp = true;
      
      const newSkills = skillTree.filter(s => s.level === newLevel && !hunterData.unlockedSkills.includes(s.name));
      newSkills.forEach(skill => {
        setShowSkillUnlock(skill);
        setTimeout(() => setShowSkillUnlock(null), 4000);
      });
    }

    const newStats = { ...hunterData.stats };
    Object.keys(quest.stats).forEach(stat => {
      newStats[stat] += quest.stats[stat];
    });

    const newCompletedQuests = [
      ...hunterData.completedQuests,
      { ...quest, date: today, bonus }
    ];

    const newUnlockedSkills = [...hunterData.unlockedSkills];
    skillTree.filter(s => s.level <= newLevel).forEach(skill => {
      if (!newUnlockedSkills.includes(skill.name)) {
        newUnlockedSkills.push(skill.name);
      }
    });

    setHunterData({
      ...hunterData,
      xp: newXP,
      level: newLevel,
      stats: newStats,
      completedQuests: newCompletedQuests,
      unlockedSkills: newUnlockedSkills
    });

    checkAchievements(newCompletedQuests, newLevel, newStats);

    if (leveledUp) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  };

  const completeWeeklyQuest = (quest) => {
    if (hunterData.weeklyQuestsCompleted.includes(quest.id)) {
      alert("Weekly Quest already completed!");
      return;
    }

    let newXP = hunterData.xp + quest.xp;
    let newLevel = hunterData.level;

    while (newXP >= XP_PER_LEVEL) {
      newXP -= XP_PER_LEVEL;
      newLevel++;
    }

    setHunterData({
      ...hunterData,
      xp: newXP,
      level: newLevel,
      weeklyQuestsCompleted: [...hunterData.weeklyQuestsCompleted, quest.id]
    });

    checkAchievements(hunterData.completedQuests, newLevel, hunterData.stats);
  };

  const completeHiddenQuest = (quest) => {
    if (hunterData.hiddenQuestsFound.includes(quest.id)) {
      alert("Hidden Quest already completed!");
      return;
    }

    let newXP = hunterData.xp + quest.xp;
    let newLevel = hunterData.level;

    while (newXP >= XP_PER_LEVEL) {
      newXP -= XP_PER_LEVEL;
      newLevel++;
    }

    setHunterData({
      ...hunterData,
      xp: newXP,
      level: newLevel,
      hiddenQuestsFound: [...hunterData.hiddenQuestsFound, quest.id]
    });

    setShowAchievement({ name: "Hidden Quest!", desc: quest.name, xp: quest.xp });
    setTimeout(() => setShowAchievement(null), 4000);
  };

  const checkAchievements = (completedQuests, level) => {
    const totalQuests = completedQuests.length;
    const unlockedAchievements = [...hunterData.achievements];

    achievements.forEach(achievement => {
      if (unlockedAchievements.includes(achievement.id)) return;

      let shouldUnlock = false;

      if (achievement.id === 'first_step') shouldUnlock = totalQuests >= 1;
      if (achievement.id === 'dedication') shouldUnlock = totalQuests >= 5;
      if (achievement.id === 'iron_will') shouldUnlock = totalQuests >= 10;
      if (achievement.id === 'the_grind') shouldUnlock = totalQuests >= 20;
      if (achievement.id === 'shadow_soldier') shouldUnlock = totalQuests >= 50;
      if (achievement.id === 'rank_d') shouldUnlock = level >= 6;
      if (achievement.id === 'rank_c') shouldUnlock = level >= 11;
      if (achievement.id === 'rank_b') shouldUnlock = level >= 16;
      if (achievement.id === 'rank_a') shouldUnlock = level >= 21;
      if (achievement.id === 'rank_s') shouldUnlock = level >= 26;

      if (shouldUnlock) {
        unlockAchievement(achievement);
      }
    });
  };

  const unlockAchievement = (achievement) => {
    const newStats = { ...hunterData.stats };
    if (achievement.statBonus) {
      Object.keys(achievement.statBonus).forEach(stat => {
        newStats[stat] += achievement.statBonus[stat];
      });
    }

    setHunterData(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement.id],
      xp: prev.xp + achievement.xp,
      stats: newStats
    }));

    setShowAchievement(achievement);
    setTimeout(() => setShowAchievement(null), 4000);
  };

  const getTodayCompletedQuests = () => {
    const today = new Date().toDateString();
    return hunterData.completedQuests.filter(q => q.date === today);
  };

  const getThisWeekCompletedQuests = () => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    return hunterData.completedQuests.filter(q => new Date(q.date) >= weekStart);
  };

  const xpPercentage = (hunterData.xp / XP_PER_LEVEL) * 100;
  const currentRank = getCurrentRank();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 animate-pulse">
          <div className="text-center">
            <div className="text-9xl mb-4 animate-bounce">⚡</div>
            <div className="text-7xl font-bold text-yellow-400 mb-4">LEVEL UP!</div>
            <div className="text-4xl mb-2">Level {hunterData.level}</div>
            <div className="text-xl text-gray-400">New power awakens within you...</div>
          </div>
        </div>
      )}

      {showAchievement && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-600 to-yellow-400 p-6 rounded-lg shadow-2xl z-50 animate-bounce max-w-sm">
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10" />
            <div>
              <div className="font-bold text-lg">Achievement Unlocked!</div>
              <div className="text-sm">{showAchievement.name}</div>
              <div className="text-xs">{showAchievement.desc}</div>
              <div className="text-xs font-bold mt-1">+{showAchievement.xp} XP</div>
            </div>
          </div>
        </div>
      )}

      {showSkillUnlock && (
        <div className="fixed top-20 right-4 bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-lg shadow-2xl z-50 animate-bounce max-w-sm">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{showSkillUnlock.icon}</div>
            <div>
              <div className="font-bold text-lg">Skill Unlocked!</div>
              <div className="text-sm">{showSkillUnlock.name}</div>
              <div className="text-xs">{showSkillUnlock.desc}</div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg p-6 mb-6 border-2 border-purple-500 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm text-gray-400">HUNTER NAME</div>
              <div className="text-3xl font-bold">{hunterData.name}</div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${currentRank.color}`}>
                {currentRank.name}
              </div>
              <div className="text-sm text-gray-400">{currentRank.title}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-lg font-bold">Level {hunterData.level}</span>
              <span className="text-sm text-gray-400">{hunterData.xp} / {XP_PER_LEVEL} XP</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full transition-all duration-500 shadow-lg"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="text-center bg-gray-800 bg-opacity-50 p-2 rounded">
              <Dumbbell className="w-6 h-6 mx-auto mb-1 text-red-400" />
              <div className="text-xs text-gray-400">STRENGTH</div>
              <div className="text-2xl font-bold">{hunterData.stats.strength}</div>
            </div>
            <div className="text-center bg-gray-800 bg-opacity-50 p-2 rounded">
              <Zap className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
              <div className="text-xs text-gray-400">AGILITY</div>
              <div className="text-2xl font-bold">{hunterData.stats.agility}</div>
            </div>
            <div className="text-center bg-gray-800 bg-opacity-50 p-2 rounded">
              <Target className="w-6 h-6 mx-auto mb-1 text-green-400" />
              <div className="text-xs text-gray-400">ENDURANCE</div>
              <div className="text-2xl font-bold">{hunterData.stats.endurance}</div>
            </div>
            <div className="text-center bg-gray-800 bg-opacity-50 p-2 rounded">
              <Heart className="w-6 h-6 mx-auto mb-1 text-pink-400" />
              <div className="text-xs text-gray-400">VITALITY</div>
              <div className="text-2xl font-bold">{hunterData.stats.vitality}</div>
            </div>
            <div className="text-center bg-gray-800 bg-opacity-50 p-2 rounded">
              <Eye className="w-6 h-6 mx-auto mb-1 text-blue-400" />
              <div className="text-xs text-gray-400">SENSE</div>
              <div className="text-2xl font-bold">{hunterData.stats.sense}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['quests', 'weekly', 'hidden', 'skills', 'achievements'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {tab === 'quests' && '⚔️ DAILY QUESTS'}
              {tab === 'weekly' && '📅 WEEKLY'}
              {tab === 'hidden' && '🔍 HIDDEN'}
              {tab === 'skills' && '⭐ SKILLS'}
              {tab === 'achievements' && '🏆 ACHIEVEMENTS'}
            </button>
          ))}
        </div>

        {activeTab === 'quests' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">⚔️ DAILY QUESTS</h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">{getTodayCompletedQues
