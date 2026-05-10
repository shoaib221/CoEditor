import React, { useEffect, useState } from "react";

const DataSelect = () => {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        // Example API — replace this with your own
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                // Assuming each item has 'id' and 'name'
                setOptions(data);
            })
            .catch((err) => {
                //console.error("Error fetching data:", err)
            });
    }, []);

    const handleChange = (e) => {
        setSelected(e.target.value);
    };

    return (
        <div className="p-4">
            <label htmlFor="user-select" className="block mb-2 text-lg font-semibold">
                Select a user:
            </label>

            <select
                id="user-select"
                value={selected}
                onChange={handleChange}
                className="border rounded p-2 w-full"
            >
                <option value="">-- Choose one --</option>
                {options.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {selected && (
                <p className="mt-4 text-gray-700">
                    You selected: <strong>{options.find(u => u.id === parseInt(selected))?.name}</strong>
                </p>
            )}
        </div>
    );
};

export default DataSelect;