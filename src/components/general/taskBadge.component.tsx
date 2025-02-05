import React from 'react';
import { BadgePadding, BadgeContainer, ProgressBorder } from '../../styles/general/taskBadge.style';

interface TaskBadgeProps {
  completedTasks: number;
  totalTasks: number;
}

const TaskBadge: React.FC<TaskBadgeProps> = ({ completedTasks, totalTasks }) => {
  // Calculate percentage (0-100)
  const percentage = Math.floor((completedTasks / totalTasks) * 100);
  
  return (
    <BadgePadding>
      <BadgeContainer>
        <ProgressBorder progress={percentage} />
        {completedTasks} / {totalTasks}
      </BadgeContainer>
    </BadgePadding>
  );
};

export default TaskBadge; 