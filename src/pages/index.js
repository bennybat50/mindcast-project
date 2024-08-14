 import CheckAdmin from "../components/CheckAdmin";
import DashContent from "../components/DashContent";
import Sidebar from "../components/Sidebar";

export default function Index() {
    return (<div className="d-flex">
       <CheckAdmin/>   {/*Helps to check if token is save */}
        <Sidebar />
        <DashContent/>
    </div>)
}