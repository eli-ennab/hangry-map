import React, {ReactEventHandler} from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
	ComboboxButton
} from "@reach/combobox"
import "@reach/combobox/styles.css"
import Button from 'react-bootstrap/Button'

interface Props {
	setMapCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
	setZoom: React.Dispatch<React.SetStateAction<number>>
	onCitySelect: (selectedPlace: string) => void
}

const AutoComplete: React.FC<Props> = ({
	setMapCenter, 
	setZoom, 
	onCitySelect, }) => {

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
		setZoom(15)
		setMapCenter({ lat, lng })
		setValue('')
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSelect(value);
	}

	return (
		<form onSubmit={handleSubmit}>
		<Combobox onSelect={handleSelect}>
			<ComboboxInput
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="search-input p-2 my-1"
				disabled={!ready}
				placeholder="Hangry Search 😠"
			/>
			<Button className={'m-1'} type={'submit'}>Search</Button>

			<ComboboxPopover>
				<ComboboxList>
					{status == "OK" &&
						data.map(({ place_id, description }) => (
							<ComboboxOption key={place_id} value={description} />
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
		</form>
	)
}

export default AutoComplete