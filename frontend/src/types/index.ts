export interface PlanType {
  planId: string;
  creator: string;
  title: string;
  duration: number;
  startTime: Date;
  isPrivate: boolean;
  location: {
    name: string;
    coordinates: { lat: number; lng: number };
  };
  charges: number;
  otherDetails?: string;
  attendees: string[];
  maxAttendees: number;
}

export interface UserType {
  userId: string;
  name: string;
  email: string;
  photoURL: string;
  deviceId?: string;
}
