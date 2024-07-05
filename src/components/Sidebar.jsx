import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <ul className="navbar-nav bg-secondarys sidebar sidebar-dark accordion" id="accordionSidebar">

                <Link to="/">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" x>
                        <div className="sidebar-brand-text mx-3 text-white">MINDCAST</div>
                    </a>
                </Link>
                <hr className=" my-0" />
                <li className="nav-item active">
                    <Link className="nav-link" to="/admin">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span className="">Dashboard</span></Link>
                </li>


                <Link to="/admin/contentPage">
                    <li className="nav-item">
                        <span className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <span>Content</span>
                        </span>
                    </li>
                </Link>

                <Link to="/admin/createInterest">
                    <li className="nav-item">
                        <span className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i class="fas fa-fw fa-cog"></i>
                            <span>Interest</span>
                        </span>
                    </li>
                </Link>

                <Link to="/admin/users">
                <li className="nav-item">
                    <span className="nav-link collapsed"data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fas fa-fw fa-wrench"></i>
                        <span>Users</span>
                    </span>

                </li>
                </Link>

                <Link to="/admin/hostrequest">
                    <li className="nav-item">
                        <span className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i class="fas fa-fw fa-cog"></i>
                            <span>Host Request</span>
                        </span>
                    </li>
                </Link>

                <li className="nav-item pointer">
                    <span className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Feed backs</span>
                    </span>
                </li>

            </ul>
        </>
    )
}

export default Sidebar;
