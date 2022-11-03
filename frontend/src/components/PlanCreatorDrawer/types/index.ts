export interface PlanFormType {
  title: string;
  duration: number;
  startTime: Date;
  isPrivate: boolean;
  locationName: string;
  locationCoords: { lat: number; lng: number };
  charges: number;
  otherDetails?: string;
  attendees?: string[];
  maxAttendees: number;
}
