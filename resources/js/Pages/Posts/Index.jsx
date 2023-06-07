import InputError from '@/Components/InputError'
import Post from '@/Components/Post'
import PrimaryButton from '@/Components/PrimaryButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm, Head } from '@inertiajs/react'

import React from 'react'

 const Index = ({auth, posts}) => {
  const {data, setData, post, processing, reset, errors} = useForm({
    title: '',
    body: ''
  })

  const submit = (e) => {
    e.preventDefault()
    // console.log(data);
    post(route('posts.store'), {onSuccess: () => reset() } )
  }



  return (
    <AuthenticatedLayout auth={auth}>
        <Head title='Posts'></Head>
        <div className='max-w-2xl mx-auto p-4 sm:p-6 lg:p-8'>
            <form onSubmit={submit}>
                <input  value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        type="text" 
                        className='mb-3 block w-full border-gray-300 focus:border-indigo-300'
                        placeholder='Title'/>
                <InputError message={errors.title} className='mt-2'></InputError>
                <textarea   value={data.body}
                            onChange={e => setData('body', e.target.value)}
                            className='mb-3 block w-full border-gray-300 focus:border-indigo-300'
                            placeholder='Body'
                ></textarea>
                <InputError message={errors.body} className='mt-2'></InputError>
                <PrimaryButton className='mt-4 text-white'
                    disabled={processing}>
                        Save
                </PrimaryButton>
            </form>
            <div className='mt-6 bg-white shadow-sm rounded-ls divide-y'>
              {
                posts.map( post => 
                  <Post key={post.id} post={post}></Post>  
                )
              }

            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default Index
