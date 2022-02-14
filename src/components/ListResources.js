import React, { useState } from 'react'
const ONE_NEAR = 1_000_000_000_000_000_000_000_000
function ListResources({ resource }) {
  console.log(resource);
  const [donationAmount, setDonationAmount] = useState(0)
  const [showDonateNotification, setShowDonateNotification] = useState(false)
  function donate(e) {
    e.preventDefault()
    console.log(donationAmount)
    window.contract.add_donation({ id: resource.id, amount: donationAmount * 1 })
    setShowDonateNotification(!showDonateNotification)
  }
  return (
    <div className="project">
      <h2>{resource.title}</h2>{' '}
      <span className="creator">{resource.creator}</span>
      <h3>description:</h3>
      <p>{resource.description}</p>
      <h4>Link:<a href={resource.url}>{resource.url}</a></h4>
      <h4>Votes: {resource.total_votes}</h4>
      <button
        onClick={() => {
          window.contract.add_vote({ id: resource.id })
        }}
      >
        Vote
      </button>
      <h4>total donations: {resource.total_donations / ONE_NEAR} NEAR</h4>
      <form onSubmit={donate}>
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        ></input>
        <button onClick={donate}>Donate</button>
      </form>
      {showDonateNotification && <DonateNotification />}
    </div>
  )
}
function DonateNotification() {
  return (
    <aside>
      <footer>
        <div>✔ Succeeded </div>
        <div>Donation was successful</div>
      </footer>
    </aside>
  )
}
export default ListResources