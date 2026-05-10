import { useState } from "react"
import './home.css'
import { Friends } from "./friends"
import { Users } from "./users"
import { SentRequests } from "./sentRequests"
import { FriendRequests } from "./friendrequests"
import { PrivateRoute } from "@/react-library/auth/RestrictedRoutes"
import { Groups } from "../group/groups"

export function Home() {
    const [board, setBoard] = useState("friends")
    

    return (
        <PrivateRoute>
            <div>

                <div className="flex mx-auto my-4 overflow-auto w-48 lg:w-full max-w-252 no-scrollbar lg:gap-2 lg:p-2 border lg:border-0 rounded-lg" >
                    <div className={`min-w-48 text-center option ${board === 'friends' && 'selected'}`} onClick={() => setBoard('friends')} > Friends </div>
                    <div className={`min-w-48 text-center option ${board === 'frequests' && 'selected'}`} onClick={() => setBoard('frequests')} > Friend Requests </div>
                    <div className={`min-w-48 text-center option ${board === 'srequests' && 'selected'}`} onClick={() => setBoard('srequests')} > Sent Requests </div>
                    <div className={`min-w-48 text-center option ${board === 'users' && 'selected'}`} onClick={() => setBoard('users')} > Find Users </div>
                    <div className={`min-w-48 text-center option ${board === 'groups' && 'selected'}`} onClick={() => setBoard('groups')} > Groups </div>
                </div>

                {board === 'friends' && <Friends />}
                {board === 'users' && <Users />}
                {board === 'srequests' && <SentRequests />}
                {board === 'frequests' && <FriendRequests />}
                {board === 'groups' && <Groups />}

            </div>
        </PrivateRoute>
    )
}