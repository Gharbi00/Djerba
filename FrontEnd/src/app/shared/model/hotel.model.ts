export interface HotelModel{
  id?: number;
  name: string;
  location: string;
  description: string;
  photos: PhotoModel[];
  phoneNumber: string;
  amenities: string;
  starsNumber: number;
  availablePlaces: number;
  offersPrices: number[];
  babiesDiscount: number;
  childrenDiscount: number;
  teenDiscount: number;
}

export interface PhotoModel {
  fileName: string;
  fileType: string;
  base64Data: string;
}