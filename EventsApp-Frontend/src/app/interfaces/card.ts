export interface Card {
  id: number;
  title: string;
  location: string;
  author: string;
  imageURL: string;
  startDateTime: Date;
  endDateTime: Date;
  duration: Date;
  address: string;
  eventLink: string;
  ticketLink: string;
  createdBy: string;
  isPetFriendly: boolean;
  isKidFriendly: boolean;
  isFree: boolean;
  isDraft: boolean;
  isFavorite: boolean;
}
