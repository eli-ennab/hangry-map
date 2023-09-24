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
	setSearchMarker: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
	setZoom: React.Dispatch<React.SetStateAction<number>>
	onCitySelect: (selectedPlace: string) => void
}

const AutoComplete: React.FC<Props> = ({ setSearchMarker, setZoom, onCitySelect }) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete()

	const handleSelect = async (address: string) => {
		setValue(address, false)
		clearSuggestions()
		const res = await getGeocode({ address })

		const selectedCity = address.split(",")[0]
		onCitySelect(selectedCity)

		const { lat, lng } = getLatLng(res[0])
		setZoom(14)
		setSearchMarker({ lat, lng })

	}

	return (
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				placeholder="Hangry Search 😠"
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