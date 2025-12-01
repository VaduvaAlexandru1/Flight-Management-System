import { Link } from 'react-router-dom'

const AdminPanel = () => {
  return (
    <>
      <div>
        <Link to="/flights/add">Add flight</Link>
      </div>
      <div>Here you will see the flights</div>
    </>
  )
}

export default AdminPanel
