import { Link } from 'react-router-dom'

function Sidebar () {
    const logout=()=>{
        if(window.confirm("Are you sure you want to logout")){
            localStorage.removeItem("md-token")
            window.location.href="/md-login"
        }
    }
  return (
    <>
      <ul
        className='navbar-nav bg-secondarys sidebar sidebar-dark accordion'
        id='accordionSidebar'
      >
        <Link to='/'>
          <a
            className='sidebar-brand d-flex align-items-center justify-content-center'
            x
          >
            <div className='sidebar-brand-text mx-3 '>
              {' '}
              <h4>
                <b className='text-white'>ADMIN</b>
              </h4>
            </div>
          </a>
        </Link>
        <hr className=' my-0' />
        <li className='nav-item active'>
          <Link className='nav-link' to='/admin'>
            <i class='bi bi-grid-1x2-fill text-white'></i>
            <span className=''>Dashboard</span>{' '}
          </Link>
        </li>

        <Link to='/admin/contentPage'>
          <li className='nav-item'>
            <span className='nav-link '>
              <i class='bi bi-file-earmark-music-fill text-white'></i>
              <span>Content</span>
            </span>
          </li>
        </Link>

        <Link to='/admin/createInterest'>
          <li className='nav-item'>
            <span className='nav-link '>
              <i class='bi bi-collection-play-fill text-white'></i>
              <span>Interest</span>
            </span>
          </li>
        </Link>

        <Link to='/admin/users'>
          <li className='nav-item'>
            <span className='nav-link '>
              <i class='bi bi-people-fill text-white'></i>
              <span>Users</span>
            </span>
          </li>
        </Link>

        <Link to='/admin/hostrequest'>
          <li className='nav-item'>
            <span className='nav-link '>
              <i class='bi bi-person-video3 text-white'></i>
              <span>Host Request</span>
            </span>
          </li>
        </Link>

        <li className='nav-item pointer'>
          <span className='nav-link d-flex' href='#'>
            <i class='bi bi-person-raised-hand text-white'></i>
            <span>Feed backs</span>
          </span>
        </li>

        <Link to='/admin/app-management'>
          <li className='nav-item pointer'>
            <span className='nav-link d-flex'>
              <i class='bi bi-window-split text-white'></i>
              <span>App Management</span>
            </span>
          </li>
        </Link>
        <br />
        <br />
        <br />
        <li className='nav-item pointer' onClick={()=>logout()}>
          <span className='nav-link d-flex'>
            <i class='bi bi-box-arrow-right text-danger'></i>
            <span className='text-danger'>Logout</span>
          </span>
        </li>
      </ul>
    </>
  )
}

export default Sidebar
