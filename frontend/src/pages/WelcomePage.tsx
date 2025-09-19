import { Button } from 'antd';

export const WelcomePage = () => {
  return (
    <div className='flex h-screen'>
      <div className='px-6 sm:px-16 w-full md:w-2/3 flex flex-col justify-center items-start bg-white'>
        <h1 className='text-5xl font-bold text-gray-800 mb-6'>
          Добро пожаловать!
        </h1>
        <p className='text-gray-500 mb-10'>
          Рады видеть вас! Добро пожаловать в наш сервис. Нажмите «Далее», чтобы начать знакомство.
        </p>
        <Button type='primary' size='large' href='/contact' className='w-[200px]'>
          Далее
        </Button>
      </div>
      <div className='hidden md:flex w-1/3 bg-gray-800 items-center justify-center bg-[url(/welcome.svg)]' />
    </div>
  )
}
