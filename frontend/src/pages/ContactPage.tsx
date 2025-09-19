import { ContactForm } from '../widgets/ContactForm.tsx';

export const ContactPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center p-6 md:p-16 bg-gray-800 bg-[url(/welcome.svg)]'>
      <ContactForm />
    </div>
  )
}
