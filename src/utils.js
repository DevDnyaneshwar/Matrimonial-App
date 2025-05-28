// src/utils.js

export const getRelationColor = (relation) => {
  const colors = {
    'Father': 'bg-blue-100 border-blue-300 text-blue-800',
    'Mother': 'bg-pink-100 border-pink-300 text-pink-800',
    'Brother': 'bg-green-100 border-green-300 text-green-800',
    'Sister': 'bg-purple-100 border-purple-300 text-purple-800',
    'Uncle': 'bg-yellow-100 border-yellow-300 text-yellow-800',
    'Aunt': 'bg-orange-100 border-orange-300 text-orange-800',
    'Grandfather': 'bg-gray-100 border-gray-300 text-gray-800',
    'Grandmother': 'bg-rose-100 border-rose-300 text-rose-800',
    'default': 'bg-indigo-100 border-indigo-300 text-indigo-800'
  };
  return colors[relation] || colors.default;
};

export const groupFamilyMembersByRelation = (members) => {
  return members.reduce((acc, member) => {
    const relation = member.relation.toLowerCase();
    if (!acc[relation]) acc[relation] = [];
    acc[relation].push(member);
    return acc;
  }, {});
};