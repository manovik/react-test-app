import React from 'react';
import './post-add-form.css';

const PostAddForm = ({onAdd}) => {

  return ( 
    <div className="bottom-panel d-flex">
      <input 
        className="form-control new-post-label" 
        type="text" 
        placeholder="О чем расскажем?"
      />
      <button 
        className="btn btn-outline-secondary"
        type="submit"
        onClick={() => onAdd(document.querySelector('.form-control.new-post-label').value)}>
        Добавить
      </button>
    </div>
  )
}

export default PostAddForm;