import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../auth/context";

export const usePosts = () => {
    const { axiosInstance } = useContext(AuthContext);

    return useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosInstance.get("/posts");
            return res.data;
        },
        staleTime: 1000 * 60, // 1 minute
    });
};



export const App = () => {
    const { data, isLoading, isError, error, refetch } = usePosts();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div style={{ padding: 20 }}>
            <h1>Posts</h1>
            {data && data.map(post => (
                <div
                    key={post.id}
                    style={{
                        background: "#f7f7f7",
                        marginBottom: 10,
                        padding: 10,
                        borderRadius: 6,
                    }}
                >
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};

