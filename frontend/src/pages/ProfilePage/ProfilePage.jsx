import { useAuthStore } from '../../store/useAuthStore';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const { register, handleSubmit } = useForm();
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  }

  return (
    <div className="h-screen pt-16">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-4">

          <div className="text-center">
            <h1 className="text-2xl font-semibold">Perfil</h1>
            <p className="mt-2">Suas informações</p>
          </div>

          { /* avatar upload sec*/ }

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img 
                src={selectedImage || authUser.profilePic || '/avatar.png'}
                alt='Perfil'
                className="size-32 rounded-full object-cover border-4"
              />
              <label htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                  ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}
                `}
              >
                <Camera className='size-5 text-base-200' />
                <input
                  {...register("image")}
                  type='file'
                  id='avatar-upload'
                  className='hidden'
                  disabled={isUpdatingProfile}
                  onChange={e => handleImageUpload(e)}
                />
              </label>
            </div>
            <p>
              {isUpdatingProfile ? 'Selecione uma imagem' : 'Clique na câmera para atualizar sua foto'}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className='size-4' />
                Nome Completo
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border-collapse'>{authUser?.fullName}</p>
            </div>
            
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Mail className='size-4' />
                Email
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border-collapse'>{authUser?.email}</p>
            </div>
          </div>

          <div className='bg-base-300 rounded-xl p-6'>
            <h2 className='text-lg font-medium mb-4'>Informações da conta</h2>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                <span>Membro desde</span>
                <span>{authUser.createdAt?.split('T')[0]}</span>
              </div>
              <div className='flex items-center justify-between py-2'>
                <span>Status da conta</span>
                <span className='text-green-500'>Ativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;

{/* 
  <div className="h-screen pt-20">
    <div className="max-w-2xl mx-auto p-4 py-8 bg-base-300 rounded-xl p-6 space-y-8 text-center">
      <h1 className="text-2xl font-semibold">Perfil</h1>
      <p className="mt-2">Suas informações</p>
    </div>
  </div>  

*/}