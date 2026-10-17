"use client";

import { fiveCitySmallGroupDepartures, smallGroupDepartureLabel, smallGroupInquiryCopy, type SmallGroupInquiryDetails, type SmallGroupInquiryLanguage, type SmallGroupRoomPreference } from "../lib/smallGroupInquiry";
import styles from "./TourContactPanel.module.css";

export function SmallGroupInquiryFields({ id, language, details, onChange, travelers, onTravelersChange, disabled }: {
  id: string;
  language: SmallGroupInquiryLanguage;
  details: SmallGroupInquiryDetails;
  onChange: (value: SmallGroupInquiryDetails) => void;
  travelers: string;
  onTravelersChange: (value: string) => void;
  disabled: boolean;
}) {
  const copy = smallGroupInquiryCopy[language];
  return <fieldset className={styles.departureFields} disabled={disabled} aria-describedby={`${id}-departure-hint`}>
    <label htmlFor={`${id}-departure`}>{copy.departure}
      <select id={`${id}-departure`} name="smallGroupDeparture" value={details.departureDate ?? ""} onChange={event => onChange({ ...details, departureDate: event.target.value || null })}>
        <option value="">{copy.undecided}</option>
        {fiveCitySmallGroupDepartures.map(departure => <option key={departure.start} value={departure.start}>{smallGroupDepartureLabel(language, departure.start)}</option>)}
      </select>
    </label>
    <label htmlFor={`${id}-party`}>{copy.group}
      <select id={`${id}-party`} name="smallGroupTravelers" value={travelers} onChange={event => onTravelersChange(event.target.value)}>
        <option value="">{copy.undecided}</option>
        {Array.from({ length: 12 }, (_, index) => index + 1).map(count => <option key={count} value={count}>{count}</option>)}
      </select>
    </label>
    <label htmlFor={`${id}-room`}>{copy.room}
      <select id={`${id}-room`} name="smallGroupRoom" value={details.roomPreference ?? ""} onChange={event => onChange({ ...details, roomPreference: (event.target.value || null) as SmallGroupRoomPreference })}>
        <option value="">{copy.undecided}</option>
        <option value="twin-share">{copy.twin}</option>
        <option value="single-room">{copy.single}</option>
      </select>
    </label>
    <p id={`${id}-departure-hint`}>{copy.hint}</p>
  </fieldset>;
}
