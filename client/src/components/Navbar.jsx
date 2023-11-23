import { Link } from "react-router-dom";

function Navbar(){
    return (
        <div className="bg-zinc-700 flex justify-between px-10 py-2">
            
            <Link to='/' className="text-white font-bold">
                <h1>React MySQL</h1>
            </Link>

            <ul className="flex gap-x-1">
                <li>
                    <Link className="bg-slate-200 px-2 py-1" to="/">Home</Link>
                </li>
                <li>
                    <Link className="bg-teal-200 px-2 py-1" to="/new">Create Task</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;