import { Link } from "react-router-dom";
import React, {Component} from "react"



export class Nav extends Component {

    render() {

        return (
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/add">
                            New Question
                        </Link>
                    </li>
                    <li>
                        <Link to="/leaderboard">
                            Leaderboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout">
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}


export default (Nav)


