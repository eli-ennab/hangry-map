<<<<<<< HEAD
export type Place = {
	_id: string 
	isApproved: boolean
	name: string
	address: string
	city: string
	description: string
	category: PlaceCategory
	offerings: PlaceOfferings[]
	timestamp?: Date 
	email?: string
	phone?: string
	website?: string
	facebook?: string
	instagram?: string
	lat?: number 
	lng?: number 
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
=======
import { Timestamp } from "firebase/firestore"

export type Place = {
	_id: string 
	isApproved: boolean
	name: string
	address: string
	city: string
	description: string
	category: PlaceCategory
	offerings: PlaceOfferings[]
	timestamp?: Date 
	email?: string
	phone?: string
	website?: string
	facebook?: string
	instagram?: string
	latitude?: number 
	longitude?: number 
	photoUrl: string
	updated_at?: Timestamp
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
>>>>>>> dev
  