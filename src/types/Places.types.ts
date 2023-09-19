export type Place = {
	_id: string 
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
  }
  
  export enum PlaceCategory {
	Cafe = "Café",
	Restaurant = "Restaurang",
	FastFood = "Snabbmat",
	KioskGrill = "Kiosk/grill",
	FoodTruck = "Foodtruck"
  }
  
  export enum PlaceOfferings {
	Lunch = "Lunch",
	AfterWork = "After Work",
	Dinner = "Middag/Á la carte"
  }
  