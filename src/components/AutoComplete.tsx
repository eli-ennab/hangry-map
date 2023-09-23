import React from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"

interface Props {
	setMarker: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
	setUserPos: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
	setZoom: React.Dispatch<React.SetStateAction<number>>
}

const AutoComplete: React.FC<Props> = ({ setMarker, setUserPos, setZoom }) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete()

	const handleSelect = async (address: any) => {
		console.log(address)

		// send input value to usePlacesAutocomplete hook
		setValue(address, false)

		// clear suggestions list
		clearSuggestions()

		// get address_components
		const res = await getGeocode({ address })

		// get lat, lng 
		const { lat, lng } = getLatLng(res[0])
		console.log({ lat, lng })

		// update states with new values
		setUserPos({ lat, lng })
		setZoom(14)
		setMarker({ lat, lng })
	}

	return (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				placeholder="Enter your search query"
			/>

			<ComboboxPopover>
				<ComboboxList>
					{status == "OK" &&
						data.map(({ place_id, description }) => (
							<ComboboxOption key={place_id} value={description} />
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	)
}

export default AutoComplete