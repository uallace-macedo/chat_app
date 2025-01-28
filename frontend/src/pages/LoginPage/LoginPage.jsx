import { Mail, MessageSquare, Lock, EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthImagePattern from '../../components/AuthImagePattern/AuthImagePattern';

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const { register, handleSubmit } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmitData = async (data) => {
    const isValid = validateForm(data);
    if(!isValid) return;

    await login(data);
  }
  
  const validateForm = (data) => {
    let hasEmptyField = false;
  
    for(const [_,v] of Object.entries(data)) {
      if(!v) hasEmptyField = true;
    }
  
    if(hasEmptyField) { 
      toast.error('Todos os campos são obrigatórios.'); 
      return false;
    }

    if(!/\S+@\S+\.\S+/.test(data.email)) { 
      toast.error('Formato de email inválido!');
      return false;
    }

    return true;
  }

  return (
    <div className='h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>

          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Bem-vindo(a) de volta!</h1>
              <p className='text-base-content/60'>Entre em sua conta</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmitData)} className='space-y-6' noValidate>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input type="email" 
                  className='input input-bordered w-full pl-10'
                  placeholder='seuemail@email.com'
                  {...register('email')}
                />
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Senha</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input type={passwordVisible ? 'text' : 'password'} 
                  className='input input-bordered w-full px-10'
                  placeholder='********'
                  {...register('password')}
                />
                <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOffIcon className='size-5 text-base-content/40' /> : <EyeIcon className='size-5 text-base-content/40' />}
                </div>
              </div>
            </div>
            
            <button type='submit' className='btn btn-primary w-full'>
            { isLoggingIn ? (
              <>
                <Loader2 className='size-5 animate-spin' />
                Carregando...
              </>
            ) : (
              "Login"
            ) }
            </button>
          </form>
        </div>
        <div className='text-center mt-3'>
          <p className='text-base-content/60'>
            Não possui uma conta? {" "}
            <Link to='/signup' className='link link-primary'>
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
      <AuthImagePattern title={'Bem-vindo(a) de volta!'} subtitle={'Faça login para continuar suas conversas e acompanhar suas mensagens'}/>
    </div>
  )
}

export default LoginPage;