import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Dropdown from './Dropdown'
import PrimaryButton from '@/Components/PrimaryButton'
import InputError from './InputError'
import { useForm, usePage } from '@inertiajs/react'

dayjs.extend(relativeTime)

const Post = ({post}) => {

    const {auth} = usePage().props
    const [editing, setEditing] = useState(false)
    const {data, setData, patch, proccesing, reset, errors} = useForm({
        title: post.title,
        body: post.body
    })

    const submit = (e) => {
        e.preventDefault()
        patch(route('posts.update', post.id), {onSuccess: () => setEditing(false)})
    }

  return (
    <div className="rounded overflow-hidden shadow-lg mt-2">
        <div className="px-6 py-2 flex justify-end">
            {
                post.user.id === auth.user.id &&
                <Dropdown>
                    <Dropdown.Trigger>
                        <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <button 
                            className='w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-indigo-800'
                            onClick={()=> setEditing(true)}>
                            Edit
                        </button>
                    </Dropdown.Content>
                </Dropdown>
            }
        </div>

        <div className="px-6 py-2">

            { editing
                ?   <form onSubmit={submit}>
                        <input  
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            type="text" 
                            className='mb-3 block w-full border-gray-300 focus:border-indigo-300'
                            autoFocus/>
                        <InputError message={errors.title} className='mt-2'></InputError>
                        <textarea   value={data.body}
                                    onChange={e => setData('body', e.target.value)}
                                    className='mb-3 block w-full border-gray-300 focus:border-indigo-300'
                                    autoFocus
                        ></textarea>
                        <InputError message={errors.body} className='mt-2'></InputError>
                        <div className='space-x-2'>
                            <PrimaryButton className='mt-4'>Save</PrimaryButton>
                            <button className='mt-4 inline-flex items-center px-4 py-2 bg-red-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150' onClick={()=>setEditing(false) && reset()}>Cancel</button>
                        </div>
                    </form>
                : 
                    (
                        <>
                            <div className="font-bold text-xl mb-2">{post.title}</div>
                            <p className="text-gray-700 text-base">{post.body}</p>
                        </>
                    )

            }
        </div>
        <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{post.user.name}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{dayjs(post.created_at).fromNow()}</span>
            {post.created_at !== post.updated_at && <small>&middot; edited</small>}
        </div>
        
    </div>
  )
}

export default Post