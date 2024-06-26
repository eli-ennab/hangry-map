import { Timestamp } from "firebase/firestore"

export type Place = {
	_id: string 
	isApproved: boolean
	name: string
	address: string
	city: string
	description: string
	category: PlaceCategory
	offerings: PlaceOfferings
	created_at?: Date 
	email?: string
	phone?: string
	website?: string
	facebook?: string
	instagram?: string
	lat?: number 
	lng?: number 
	images: photoObj[]
	updated_at?: Timestamp
	gMapsLink: string
	distance?: number
  }
  
export enum PlaceCategory {
	Cafe = "Café",
	Restaurant = "Restaurant",
	FastFood = "Fastfood",
	KioskGrill = "Kiosk/Grill",
	FoodTruck = "Foodtruck"
}
  
export enum PlaceOfferings {
	Lunch = "Lunch",
	AfterWork = "After Work",
	Dinner = "Dinner/Á la carte"
}

type photoObj = {
	photoUrl: string
}

export type LatLngLiteral = {
	lat: number
	lng: number
}