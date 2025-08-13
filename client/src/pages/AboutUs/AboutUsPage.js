// client/src/pages/AboutUs/AboutUsPage.js

import React from 'react';
// We are importing a selection of icons from react-icons/io5
// to provide clear visual cues for different sections.
import { IoGlobeOutline, IoPeopleOutline, IoShirtOutline } from 'react-icons/io5';

// Mock data for team members
const teamMembers = [
  {
    name: 'Jane Doe',
    title: 'CEO & Founder',
    imageUrl: 'https://placehold.co/150x150/e2e8f0/4a5568?text=Jane',
  },
  {
    name: 'John Smith',
    title: 'Chief Technology Officer',
    imageUrl: 'https://placehold.co/150x150/e2e8f0/4a5568?text=John',
  },
  {
    name: 'Emily Davis',
    title: 'Head of Marketing',
    imageUrl: 'https://placehold.co/150x150/e2e8f0/4a5568?text=Emily',
  },
];

const AboutUsPage = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          About Us
        </h1>
        <div className="bg-white rounded-lg shadow-xl p-8 space-y-12">
          {/* Mission Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <IoGlobeOutline className="text-indigo-600" />
              <span>Our Mission</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to be the premier destination for football enthusiasts worldwide. We strive to provide the most accurate and up-to-date information on leagues, players, and fixtures, while also offering a curated selection of high-quality merchandise for fans to show their support.
            </p>
          </section>

          <hr className="my-8 border-t border-gray-200" />

          {/* History Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <IoShirtOutline className="text-indigo-600" />
              <span>Our Story</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2020 by a group of lifelong football fans, RealSoccer began as a small blog dedicated to tracking local league results. Over the years, it has grown into a comprehensive platform, expanding to cover global leagues and offering a popular online store. Our journey has been driven by a passion for the beautiful game and a commitment to serving the fan community.
            </p>
          </section>
          
          <hr className="my-8 border-t border-gray-200" />

          {/* Team Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <IoPeopleOutline className="text-indigo-600" />
              <span>Our Team</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 font-medium">{member.title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
