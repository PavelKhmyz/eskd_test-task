import { Button, Form, Input } from 'antd';
import { type ChangeEvent, useState } from 'react';
import { validatePhone, validateStringByLength } from '../shared/utils/validators.ts';
import { useNotify } from '../shared/providers/NotificationProvider.tsx';

interface IFormValues {
  name: string;
  phone: string;
  message: string;
}

export const ContactForm = () => {
  const [ form ] = Form.useForm();
  const [ isSubmitted, setIsSubmitted ] = useState<boolean>(false);
  const notify = useNotify();

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const phoneOnly = value.replace(/[^\d+()-]/g, "");

    form.setFieldValue('phone', phoneOnly);
  }
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    form.setFieldValue('name', value);
  }
  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    form.setFieldValue('message', value);
  }

  const sendForm = async (body: IFormValues) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      return response.status === 200 || response.status === 201;
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const handleSubmit = async () => {
    const { name, phone, message }: IFormValues = form.getFieldsValue();
    const cleanPhone = phone.replace(/[\s-()]/g, '')

    const isValidName = validateStringByLength(name, 2);
    const isValidMessage = validateStringByLength(message, 2);
    const isValidPhone = validatePhone(cleanPhone);

    if (!isValidName) {
      form.setFields([
        {
          name: 'name',
          errors: ['Имя должно содержать 2 и более символов']
        }
      ])
    }
    if (!isValidMessage) {
      form.setFields([
        {
          name: 'message',
          errors: ['Сообщение должно содержать 2 и более символов']
        }
      ])
    }
    if (!isValidMessage) {
      form.setFields([
        {
          name: 'phone',
          errors: ['Принимаются номера с кодом +375 или 80']
        }
      ])
    }

    if (isValidName && isValidMessage && isValidPhone) {
      setIsSubmitted(true)
      const body = {
        name,
        message,
        phone: cleanPhone,
      };
      const isSuccess = await sendForm(body);

      if (isSuccess) {
        setIsSubmitted(false)
        notify('success', 'Успех', 'Ваша заявка успешно отправлена!');
        form.resetFields()
      } else {
        setIsSubmitted(false)
        notify('error', 'Ошибка', 'Что-то пошло не так');
      }
    }
  };

  return (
    <div className='max-w-md rounded-lg sm:rounded-none sm:h-screen bg-white p-6 flex flex-col justify-center items-center gap-8 shadow-sm border border-gray-200'>
      <h2 className='text-3xl font-bold text-gray-800'>Оставьте сообщение</h2>
      <Form
        form={form}
        autoComplete='off'
        initialValues={{ name: '', phone: '', message: '' }}
        labelAlign='left'
        labelCol={{ span: 8 }}
      >
        <Form.Item
          label='Имя'
          name='name'
          rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
          validateTrigger='onSubmit'
        >
          <Input
            placeholder='Ваше имя'
            onChange={handleChangeName}
          />
        </Form.Item>

        <Form.Item
          label='Телефон'
          name='phone'
          rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}
          validateTrigger='onSubmit'
        >
          <Input
            placeholder='+375 (29) 999-99-99'
            onChange={handleChangePhone}
          />
        </Form.Item>

        <Form.Item
          label='Сообщение'
          name='message'
          rules={[{ required: true, message: 'Пожалуйста, введите сообщение' }]}
          validateTrigger='onSubmit'
        >
          <Input.TextArea
            rows={4}
            placeholder='Ваше сообщение'
            autoSize
            onChange={handleChangeMessage}
          />
        </Form.Item>

        <Form.Item className='text-center !mb-0'>
          <Button type='primary' onClick={handleSubmit} disabled={isSubmitted} className='w-full'>
            {isSubmitted ? 'Отправляется...' : 'Отправить'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
