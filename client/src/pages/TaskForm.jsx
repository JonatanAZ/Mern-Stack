import { Formik, Form } from 'formik'
import { useTasks } from '../context/TaskProvider'
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

function TaskForm(){

    const {createTask, getTask, updateTask} = useTasks()
    const params= useParams()
    const navigate= useNavigate()
    const [task, setTask]= useState({
        title: '',
        description: ''
    })

    useEffect(()=>{
        const loadTask= async()=>{
            if(params.id){
                const task= await getTask(params.id)
                setTask({
                    title: task.title,
                    description: task.description
                })
            }
        }
        loadTask()
    },[])

    return (
        <div className='mx-auto'>

            <Formik
                initialValues={task}
                enableReinitialize={true}
                onSubmit={async(values, actions)=>{
                    if(params.id){
                        await updateTask(params.id, values)
                        navigate('/')
                    }else{
                        await createTask(values)
                    }
                    actions.resetForm()
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting })=> (
                    <Form
                        className='bg-slate-300 max-w-sm rounded-md p-4'
                        onSubmit={handleSubmit}
                    >
                        <h1 className='text-xl font-bold uppercase text-center'>{params.id ? 'Edit task': 'New Task'}</h1>
                        <label className='block' htmlFor="">title</label>
                        <input 
                            type="text" 
                            name='title'
                            placeholder='Write a title'
                            className='px-2 py-1 rounded-sm w-full'
                            onChange={handleChange}
                            value={values.title} />

                        <label className='block' htmlFor="">description</label>
                        <textarea 
                            className='px-2 py-1 rounded-sm w-full'
                            name="description" 
                            rows="3"
                            placeholder='Write a description'
                            onChange={handleChange}
                            value={values.description}>

                        </textarea>
                        <button className='block bg-indigo-500 px-2 py-1 text-white w-full rounded-md' type='submit' disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save'}              
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default TaskForm;