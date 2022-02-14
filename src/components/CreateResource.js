import React, { useState } from 'react'
function CreateResource({toggleModal}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    window.contract.add_resources({title:title, url:url, description:description})
    setShowNotification(!showNotification)
    alert(`resource info: ${title} ${url} ${description}`)
  }
console.log(`its ${toggleModal}`);
  return (
    <div>
      {toggleModal == true && (
        <div className='addresource'>
          <form onSubmit={handleSubmit}>
            <label>
              Enter resource title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Enter resource url:
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
            <label>
              Enter resource description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <input type="submit" className='submit' />
          </form>
        </div>
      )}
      
      {showNotification && <Notification />}
    </div>
    
  )
}
function Notification() {
  return (
    <aside>
      <footer>
        <div>✔ Succeeded </div> 
        <div>Added new resource Just now</div>
      </footer>
    </aside>
  )
}
export default CreateResource