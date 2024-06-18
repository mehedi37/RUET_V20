'use client'
import { useState } from 'react'
import Link from 'next/link'
import EyeButton from '@/components/eyeButton'

export default function Login() {
  let [accountType, setAccountType] = useState('student')
  function handleAccountTypeChange(e) {
    setAccountType(e.target.value)
  }

  let [loginStatus, setLoginStatus] = useState(null)
  let [loginMessage, setLoginMessage] = useState('')
  let [isLoading, setIsLoading] = useState(false)

  function formSubmit (e) {
    setIsLoading(true)
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setIsLoading(false)
      if (data.status === 200) {
        setLoginStatus('success')
      } else {
        setLoginStatus('error')
        setLoginMessage([data.error.message, 'Details: ' + data.error.Details])
      }
      console.log('Response:', data)
      setTimeout(() => {
        setLoginStatus(null)
        setLoginMessage(null)
      }, 5000)
    })
    .catch(error => {
      console.error('Error:', error)
      setLoginStatus('error')
      setIsLoading(false)
      setTimeout(() => {
        setLoginStatus(null)
        setLoginMessage(null)
      }, 5000)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
            Welcome Again
          </h2>
        </div>
        {loginStatus === 'success' ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!
              Click here to &nbsp;
              <Link href="/dashboard" className="underline">Dashboard</Link>
            </strong>
          </div>
        ) : loginStatus === 'error' ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! <br/>

              {
              loginMessage.length > 0 &&
              loginMessage.map((msg, index) => (
                <span key={index}>{msg}<br/></span>
              ))
              }

            </strong>
          </div>
        ) : null}
        <form className="mt-8 space-y-6" action="#" method="POST"
          onSubmit={formSubmit}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="accountType" className="sr-only">Account Type</label>
              <select id="accountType" name="accountType"
              value={accountType}
              className="block w-full py-3 px-3 border text-gray-500 rounded-t-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleAccountTypeChange}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            {accountType === 'student' && (
            <div>
              <label htmlFor="roll" className="sr-only">Roll</label>
              <input id="roll" name="roll" min={0} type="number" autoComplete="roll" required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Roll" />
            </div>
            )}

            {accountType === 'teacher' && (
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            )}

            <div className='flex'>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-bl-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
              <EyeButton passwordID="password" />
            </div>
          </div>
          <div>
            <button
            disabled={isLoading}
            type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
        <small className="block text-center text-gray-500">
          Don&apos;t have an account?&nbsp;
          <Link href="/registration" className="underline text-blue-500">Register</Link>
        </small>
      </div>
    </div>
  );
};