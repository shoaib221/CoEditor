import { useCallback, useState } from "react";
import { useAuthContext } from "../auth/context";


export const useModal = ({ refetch }) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);
    const { axiosInstance } = useAuthContext()
    const [role, setRole] = useState('user')

    const ShowModal = useCallback((user) => {
        setShow(true);
        setSelected(user);
        setRole(user.role);

    }, []);

    const closeModal = () => {
        setShow(false);
        setSelected(null);
    };

    // Component, not JSX stored in a variable
    const ModalTag = () => (
        <div
            className={`${show ? "flex" : "hidden"
                } fixed inset-0 items-center justify-center bg-black/40 z-10`}
        >
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                    Change Role: {selected?.name}
                </h2>

                <select value={role} onChange={(e) => setRole(e.target.value)} >
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

                    className="mt-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                >
                    Save
                </button>
            </div>
        </div>
    );

    return { ModalTag, ShowModal, closeModal, selected, show };
};