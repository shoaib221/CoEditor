import { useEffect, useState, useCallback } from "react";
import { AdminRoute } from "./RestrictedRoutes";
import { useAuthContext } from "./context";
import { toast } from "react-toastify";
import { Key } from "lucide-react";
import { useQuery } from "@tanstack/react-query";


export const useRoleChange = ({ refetch }) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);
    const { axiosInstance } = useAuthContext()
    const [ role, setRole ] = useState('user')

    const ShowModal = useCallback((user) => {
        setShow(true);
        setSelected(user);
        setRole(user.role);
        
    }, []);

    const closeModal = () => {
        setShow(false);
        setSelected(null);
    };

    const ChangeRole = async () => {
        try {
            let res = await axiosInstance.post( "/auth/change-role", { user: selected, role  } )

            refetch()
            
        } catch(err) {
            console.error(err)
        } finally {
            closeModal()
        }
        

    }

    // Component, not JSX stored in a variable
    const RoleModal = () => (
        <div
            className={`${show ? "flex" : "hidden"
                } fixed inset-0 items-center justify-center bg-black/40 z-50`}
        >
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                    Change Role: {selected?.name}
                </h2>

                <select value={role} onChange={ (e) => setRole( e.target.value ) } >
                    <option value='admin' >Admin</option>
                    <option value='user' >User</option>
                </select>

                <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                >
                    Close
                </button>

                <button
                    onClick={ChangeRole}
                    className="mt-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                >
                    Save
                </button>
            </div>
        </div>
    );

    return { RoleModal, ShowModal, closeModal, selected, show };
};



export const ManageUsers = () => {
    const { axiosInstance, user } = useAuthContext();
    


    const { data: users =[], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosInstance.get("/auth/users");
            console.log("refetched")
            return res.data.users;
        },
        enabled: !!user, 
        staleTime: 1000 * 60, // 1 minute
    });

    const { RoleModal, ShowModal } = useRoleChange( { refetch } )


    

    return (
        <AdminRoute>
            <RoleModal  />
            <div className="flex-grow grid grid-cols-[1fr_1fr_1fr] gap-2" >
                <div>Name</div>
                <div>Username</div>
                <div>Role</div>
                {users && users.map(elem => (
                    < >
                        <div>{elem.name}</div>
                        <div>{elem.username}</div>
                        <div> {elem.role}

                            <button onClick={() => ShowModal(elem)} > Change </button>
                        </div>

                    </>
                ))}

            </div>
        </AdminRoute>
    )
}