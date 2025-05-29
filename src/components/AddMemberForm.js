// src/components/AddMemberForm.js
import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react'; // Added X for close button

const AddMemberForm = ({ isOpen, onClose, onAddMember, currentUserId }) => {
  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    age: '',
    profession: '',
    education: '',
    location: '',
    photo: '/api/placeholder/100/100', // Default placeholder
    isLinked: false,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.relation || !formData.age) {
      alert('Please fill in Name, Relation, and Age.');
      return;
    }

    const newMember = {
      id: Date.now(), // Simple unique ID
      userId: currentUserId, // Link to the currently selected user
      ...formData,
      age: parseInt(formData.age), // Ensure age is a number
    };

    onAddMember(newMember);
    setFormData({ // Reset form
      name: '',
      relation: '',
      age: '',
      profession: '',
      education: '',
      location: '',
      photo: '/api/placeholder/100/100',
      isLinked: false,
    });
    onClose(); // Close modal after adding
  };

  const relations = [
    "Father", "Mother", "Brother", "Sister", "Uncle", "Aunt",
    "Grandfather", "Grandmother", "Cousin", "Other"
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <PlusCircle className="w-6 h-6 mr-2 text-purple-600" /> Add New Family Member
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
              <select
                id="relation"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Relation</option>
                {relations.map(rel => (
                  <option key={rel} value={rel}>{rel}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
              <input
                type="text"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isLinked"
                name="isLinked"
                checked={formData.isLinked}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isLinked" className="ml-2 block text-sm text-gray-900">
                Has Matrimonial Profile
              </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center"
              >
                <PlusCircle className="w-5 h-5 mr-2" /> Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMemberForm;
