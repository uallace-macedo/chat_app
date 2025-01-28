import { EyeIcon, EyeOffIcon, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../../components/AuthImagePattern/AuthImagePattern';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const { isSigninUp, signup } = useAuthStore();
  const { register, handleSubmit } = useForm();

  const onSubmitData = async (data) => {
    const isValid = validateForm(data);
    if(!isValid) return;

    await signup(data);
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const validateForm = (data) => {
    let hasEmptyField = false;
  
    for(const [k,v] of Object.entries(data)) {
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
    
    if(data.password.length < 8) { 
      toast.error('A senha precisa ter pelo menos 8 caracteres.');
      return false;
    }

    return true;
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2 pt-[46px] sm:pt-0'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>

            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Crie sua conta</h1>
              <p className='text-base-content/60'>Comece com sua conta gratuita</p>
            </div>

            <form onSubmit={handleSubmit(onSubmitData)} className='space-y-6' noValidate>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Nome Completo</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className='size-5 text-base-content/40' />
                  </div>
                  <input type="text" className={`input input-bordered w-full pl-10`} placeholder='John Sts' {...register('fullName')} />
                </div>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Email</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='size-5 text-base-content/40' />
                  </div>
                  <input type="email" className={`input input-bordered w-full pl-10`} placeholder='johnsts@email.com' {...register('email')} />
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
                  <input type={passwordVisible ? 'text' : 'password'} className={`input input-bordered w-full px-10`} placeholder='Digite sua senha' {...register('password')} />
                  <div className='cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center' onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <EyeOffIcon className='size-5 text-base-content/40' /> : <EyeIcon className='size-5 text-base-content/40' />}
                  </div>
                </div>
              </div>

              <button type='submit' className='btn btn-primary w-full' disabled={isSigninUp}>
                { isSigninUp ? (
                  <>
                    <Loader2 className='size-5 animate-spin' />
                    Carregando...
                  </>
                ) : (
                  "Criar conta"
                ) }
              </button>
            </form>

            <div className='text-center mt-3'>
              <p className='text-base-content/60'>
                Já possui uma conta? {" "}
                <Link to='/login' className='link link-primary'>
                  Faça login
                </Link>
              </p>
            </div>
            
          </div>
        </div>
      </div>
      
      <AuthImagePattern 
        title='Entre em nossa comunidade'
        subtitle='Conecte-se com amigos, compartilhe momentos e mantenha contato com quem você ama.'
      />
    </div>
  )
}

export default SignupPage;