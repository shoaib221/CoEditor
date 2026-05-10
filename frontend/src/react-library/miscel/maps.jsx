import { APIProvider, Map } from '@vis.gl/react-google-maps';

export const GoogleMap = () => {
    return (
        <APIProvider apiKey={import.meta.env.VITE_Google_API}>
            <Map
                style={{ width: '100vw', height: '100vh' }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling='greedy'
                disableDefaultUI
            />
        </APIProvider>
    )
};



