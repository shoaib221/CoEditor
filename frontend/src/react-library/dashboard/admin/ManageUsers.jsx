import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "@/react-library/auth/context";
import { useQuery } from "@tanstack/react-query";
import { AdminRoute } from "@/react-library/auth/RestrictedRoutes";
import { toast } from "react-toastify";
import axios from "axios";
import { Loading } from "@/react-library/miscel/Loading";



export const RoleChange = ({ user, refetch }) => {
    const [role, setRole] = useState(null)
    const { axiosInstance } = useAuthContext()

    useEffect(() => {
        if (user) {
            setRole(user.role)
        }
    }, [user])

    async function Update() {
        try {
            let res = await axiosInstance.post("/auth/change-role", { ...user, role })
            await refetch();
            toast.success("Role changed")
        } catch (err) {
            console.error(err.response)
        }

    }

    async function DeleteUser() {
        try {
            let res = await axiosInstance.delete(`/auth/user/${user._id}`)
            await refetch();
            toast.info("Deleted Successfully")
        } catch (err) {
            console.error(err.response)
        }
    }

    return (
        <div className="box-1212 gap-4 grid grid-cols-[1fr] md:grid-cols-[1fr_1fr_1fr] mb-2" >
            <div className="cen-ver gap-1" >
                <div className="font-bold text-(--color4)" >{user.name}</div>
                <div className="text-(--color2)" > {user.username} </div>
            </div>

            <div className="gap-1 font-bold cen-ver">
                <select value={role} onChange={(e) => setRole(e.target.value)} className="text-(--color4)"  >
                    <option className="bg-(--color4) text-(--color1a)" value="admin" >Admin</option>
                    <option className="bg-(--color4) text-(--color1a)" value="moderator" >Moderator</option>
                    <option className="bg-(--color4) text-(--color1a)" value="student" >Student</option>
                </select>
            </div>

            <div className="cen-hor gap-1" >
                <button className="button-1234" onClick={Update} >Update</button>
                <button className="button-1234"  onClick={DeleteUser} >Delete</button>
            </div>
        </div>
    )
}



export const ManageUsers = () => {
    const { axiosInstance, user } = useAuthContext();
    const [filter, setFilter] = useState("")
    const [users, setUsers] = useState(null)



    // const { data: users = [], isLoading, isError, error, refetch } = useQuery({
    //     queryKey: ["users"],
    //     queryFn: async () => {
    //         const res = await axiosInstance.get(`/auth/users?filter=${role}`);
    //         console.log("refetched");
    //         return res.data.users;
    //     },
    //     enabled: !!user,
    //     staleTime: 1000 * 60, // 1 minute
    // });

    async function fetchUsers() {
        try {
            const res = await axiosInstance.get(`/auth/users?filter=${filter}`);
            console.log("refetched");
            setUsers(res.data.users)

        } catch (err) {
            console.error(err);
        }

    }



    useEffect(() => {
        fetchUsers();
    }, [filter])




    return (
        <AdminRoute>



            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="text-(--color4) font-bold" >
                <option className="bg-(--color4) text-(--color1a)" value="" >Filter Users</option>
                <option className="bg-(--color4) text-(--color1a)" value="admin" >Admin</option>
                <option className="bg-(--color4) text-(--color1a)" value="student" >Student</option>
                <option className="bg-(--color4) text-(--color1a)" value="moderator" >Moderator</option>
            </select>

            <br/>

            <br />
            <div className="w-full block" >
                <div className="box-1212 gap-2 grid grid-cols-[1fr] md:grid-cols-[1fr_1fr_1fr] mb-2" >
                    <div className="font-bold pl-6 text-center" >Users</div>

                    <div className="font-bold pl-6 hidden md:block text-center" >Role</div>

                    <div className="font-bold pl-6 hidden md:block text-center" >Actions</div>
                </div>



                { users ? users.map((elem) => <RoleChange refetch={fetchUsers} user={elem} />)
                :
                <Loading />
                }

            </div>
        </AdminRoute>
    )
}


