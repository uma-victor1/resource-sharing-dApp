import 'regenerator-runtime/runtime'
import { useEffect, useState } from 'react'
import ListResources from './components/ListResources'
import CreateResource from './components/CreateResource'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const [resources, setResources] = useState([])
  const [toggleModal, setToggleModal] = useState(false)
  function addResource() {
    setToggleModal(!toggleModal)
  }

  useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        // window.contract is set by initContract in index.js
        window.contract.list_resources().then((resources) => {
          const resourceList = [...resources]
          setResources(resourceList)
          console.log(resourceList);
        })
      }
    },
    [resources],
  )

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main style={{ textAlign: 'center', marginTop: '2.5em' }}>
        <h1>Welcome to resource sharing dApp</h1>
        <p style={{ textAlign: 'center' }}>
          Click the button below to sign in:
        </p>
        <p>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    )
  }
  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <header>
        <div className="logo"></div>
        <button className="link" style={{ float: 'right' }} onClick={logout}>
          Sign out <span className="id">{window.accountId}</span>
        </button>
      </header>
      <button onClick={addResource}>Add a resource</button>
      <main>
        <CreateResource toggleModal={toggleModal} />
        <section className='resources'>
          {resources.map((resource, id) => {
            return (
              <div key={id}>
                <ListResources resource={resource} />
              </div>
            )
          })}
        </section>
      </main>
    </>
  )
}
