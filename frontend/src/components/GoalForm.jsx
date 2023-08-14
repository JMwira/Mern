import {useState} from 'react'
import { UseSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { createGoal } from '../features/goals/goalSlice';

function GoalForm() {
    const [text, setText] = useState('');
    const Dispatch = useDispatch();
    const handleSubmit = e=>{
        e.preventDefault();
        Dispatch(createGoal({text}))
        setText("");
    }
    const onChange = e=>{
        setText(e.target.value)
    }
  return (
   <section className="form">
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="Text">Goal</label>
            <input type="text" name='text' id='text' value={text} onChange={onChange} />
        </div>
        <div className="form-group">
            <button type='submit' className="btn btn-block">Add goal</button>
        </div>
    </form>
   </section>
  )
}

export default GoalForm
