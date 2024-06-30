'use client'
import { useState } from 'react';
import Navbar from '@/components/navbar';
import Link from 'next/link';

export default function HamburgerMenu({
  accountType = 'student',
  userName = 'User'
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log('HamburgerMenu');
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex-col">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleMenu}></div>
          <div className="relative flex flex-col bg-gray-800 text-white w-64 h-full p-4">
            <button onClick={toggleMenu} className="self-end mb-4 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <Navbar accountType={accountType} className='flex-col p-2 gap-3 mb-5'/>
            <Link className="font-medium hover:border-white border border-transparent rounded-md p-2" href="/profile">
              {userName.length > 15 ? `${userName.substring(0, 15)}...` : userName}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}