import { getGeocode, getLatLng } from "use-places-autocomplete"

let mapsApiLoaded = false

export const loadGoogleMapsApi = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (mapsApiLoaded) {
            resolve()
            return
        }

        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GMAP_API_KEY}&libraries=places`
        script.async = true
        script.defer = true
        script.onload = () => {
            mapsApiLoaded = true
            resolve()
        }
        script.onerror = (error) => {
            reject(error)
        }
        document.body.appendChild(script);
    })
}
export const fetchLatLng = async (address: string): Promise<{ lat: number, lng: number }> => {
    const results = await getGeocode({ address })
    return getLatLng(results[0])
}
