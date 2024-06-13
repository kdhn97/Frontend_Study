'use client'
import { signIn } from 'next-auth/react'

const Login = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email = event.currentTarget.elements["email"].value;
    const password =  event.currentTarget.elements["password"].value;   
    await signIn("credentials", {
      username: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
  }
  return (
    <>
    <main className='flex flex-col bg-gray-100 items-center p-10'>
      <h1 className='text-4xl font-semibold'>로그인</h1>
      <form className="p-12 md:p-24" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm text-gray-800 dark:text-gray-200'
            >
              이메일: 
            </label>
          <div className='mt-1'>
            <input
              id='email'            
              name='email'
              type='email'           
              required
              autoFocus={true}
              className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
            />
          </div>
          </div>
          <div className='mt-4'>
          <label
              htmlFor='password'
              className='block text-sm text-gray-800 dark:text-gray-200'
          >
              비밀번호: 
          </label>
          <div className='mt-1'>
              <input
              type='password'
              id='password'
              name='password'        
              className='mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
          </div>
          </div>
          <div className='mt-6'>
          <button
              className='w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
          >
              로그인
          </button>
          </div>
      </form>
    </main>           
  </>
  )
}

export default Login