 import DashContent from "../components/DashContent";
import Sidebar from "../components/Sidebar";

export default function Index() {
    return (<div className="d-flex">
        <Sidebar />
        <DashContent/>
    </div>)
}