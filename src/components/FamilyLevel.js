// src/components/FamilyLevel.js

import React from 'react';
import { FamilyTreeNode } from './FamilyTreeNode';

export const FamilyLevel = ({
  relations,
  title,
  familyMembers,
  className = "",
  onMemberClick,
  onToggleVisibility,
  hiddenMembers
}) => {
  const members = relations.flatMap(relation => familyMembers[relation] || []);
  // Filter out hidden members for rendering
  const visibleMembers = members.filter(member => !hiddenMembers.has(member.id));

  if (visibleMembers.length === 0) return null;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {members.map(member => ( // Iterate over all members to allow visibility toggle
          <FamilyTreeNode
            key={member.id}
            member={member}
            onClick={onMemberClick}
            onToggleVisibility={onToggleVisibility}
            isVisible={!hiddenMembers.has(member.id)}
          />
        ))}
      </div>
    </div>
  );
};