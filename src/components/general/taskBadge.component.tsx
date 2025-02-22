import React from 'react';
import { BadgePadding, BadgeContainer, ProgressBorder } from '../../styles/general/taskBadge.style';
import { useUser } from '../../context/user.context';

interface TaskBadgeProps {
  totalTasks: number;
  pageIdentifier: string;
}

const TaskBadge: React.FC<TaskBadgeProps> = ({ totalTasks, pageIdentifier }) => {
  const { user } = useUser();
  
  // First deduplicate tasks by taking the latest entry for each taskId
  const uniqueTasks = user?.points.reduce((acc, current) => {
    acc[current.taskId] = current;
    return acc;
  }, {} as { [key: string]: typeof user.points[0] });

  const completedTasks = Object.values(uniqueTasks || {}).filter(task => {
    const matchesPage = task.taskId.includes(pageIdentifier);
    const hasPoints = task.collectedPoints > 0;
    return matchesPage && hasPoints;
  }).length || 0;

  // Ensure completedTasks is not negative and doesn't exceed totalTasks
  const validCompletedTasks = Math.max(0, Math.min(completedTasks, totalTasks));
  
  // Calculate percentage (0-100)
  const percentage = totalTasks > 0 ? Math.floor((validCompletedTasks / totalTasks) * 100) : 0;
  
  return (
    <BadgePadding>
      <BadgeContainer>
        <ProgressBorder progress={percentage} />
        {validCompletedTasks} / {totalTasks}
      </BadgeContainer>
    </BadgePadding>
  );
};

export default TaskBadge; 