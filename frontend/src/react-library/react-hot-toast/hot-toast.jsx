import { Toaster, toast } from 'react-hot-toast';

export const HotToast = () => {

    function handleToast() {
        // toast.success('Data saved!');
        // toast.error('Something went wrong!');
        // toast.loading('Uploading...');
        // toast('Custom message!');

        toast.promise(
            fetch('/api/upload'),
            {
                loading: 'Uploading...',
                success: 'Upload successful 🎉',
                error: 'Upload failed 😢',
            }
        );


    }

    return (
        <div className="p-6">
            <button
                onClick={handleToast}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Show Toast
            </button>

            {/* Mount the Toaster once, usually at the root */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />

        </div>
    );
}

