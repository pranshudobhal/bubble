import { useNavigate } from 'react-router';
import { LockClosedIcon } from '@heroicons/react/solid';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './authenticationSlice';

export function Login() {
  const { token, status, error } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userNameOrEmail, setUserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    if (userNameOrEmail && password !== '') {
      await dispatch(loginUser({ userNameOrEmail, password }));
    }
  };

  useEffect(() => {
    token && navigate('/');
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to Bubble</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <span onClick={() => navigate('/signup')} className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 inline-block">
              create your free account
            </span>
          </p>
        </div>
        <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
          {status === 'error' && (
            <div>
              <p className="max-w-full bg-red-500 bg-opacity-25 rounded-md py-3 px-6 text-red-600 font-bold text-md my-6 flex items-center justify-start">
                <ExclamationCircleIcon className="h-6 w-6 mr-2" />
                {error}
              </p>
            </div>
          )}
          <div>
            <label htmlFor="userNameOrEmail" className="block text-sm text-gray-800 dark:text-gray-200">
              Username or email
            </label>
            <input
              id="userNameOrEmail"
              name="userNameOrEmail"
              type="text"
              value={userNameOrEmail}
              onChange={(e) => setUserNameOrEmail(() => e.target.value)}
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">
                Password
              </label>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(() => e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              onClick={() => loginHandler()}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              {status === 'loading' ? 'Logging In' : 'Login'}
            </button>
          </div>
          <div className="my-3 text-center">
            <span
              onClick={() => {
                setUserNameOrEmail('test@gmail.com');
                setPassword('test');
              }}
              className="cursor-pointer text-md font-medium rounded-md text-indigo-500 hover:text-indigo-700"
            >
              Use guest credentials
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
