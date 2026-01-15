// Badge Display Component - Show achievements
import { motion } from 'framer-motion';
import { AVAILABLE_BADGES, getRarityColor } from '../types/achievements';
import type { Achievement } from '../types';

interface BadgeDisplayProps {
  achievements: Achievement[];
  showAll?: boolean;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  achievements,
  showAll = false 
}) => {
  const earnedBadgeIds = new Set(achievements.map(a => a.badgeId));
  
  const displayBadges = showAll 
    ? AVAILABLE_BADGES 
    : AVAILABLE_BADGES.filter(b => earnedBadgeIds.has(b.id));

  if (displayBadges.length === 0) {
    return (
      <div className="no-badges">
        <p className="text-gray-500">Complete adventures to earn badges!</p>
      </div>
    );
  }

  return (
    <div className="badge-display">
      <div className="badges-grid">
        {displayBadges.map((badge, index) => {
          const isEarned = earnedBadgeIds.has(badge.id);
          const achievement = achievements.find(a => a.badgeId === badge.id);

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`badge-card ${isEarned ? 'earned' : 'locked'}`}
              style={{
                borderColor: isEarned ? getRarityColor(badge.rarity) : '#e0e0e0'
              }}
              whileHover={isEarned ? { scale: 1.05 } : {}}
            >
              <div 
                className="badge-rarity"
                style={{ backgroundColor: getRarityColor(badge.rarity) }}
              >
                {badge.rarity}
              </div>
              
              <div className="badge-emoji">
                {isEarned ? badge.emoji : '🔒'}
              </div>
              
              <div className="badge-name">{badge.name}</div>
              
              <div className="badge-description">
                {badge.description}
              </div>

              {isEarned && achievement && (
                <div className="badge-earned-date">
                  {new Date(achievement.earnedAt).toLocaleDateString()}
                </div>
              )}

              {!isEarned && (
                <div className="badge-requirement">
                  {badge.requirement.type}: {badge.requirement.count}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeDisplay;
