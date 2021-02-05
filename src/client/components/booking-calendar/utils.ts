import moment from "moment";
import { AppointmentOption } from "./BookingCalendar";

function createAvailabilityRequestBody(
  locationId: string,
  serviceVariationIdList: string[],
  startAt: moment.Moment
) {
  // create the request body
  const dayStart = startAt
    .clone()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const req = {
    startAt: dayStart.toISOString(),
    endAt: dayStart.clone().set("hour", 24).toISOString(),
    locationId: locationId,
    segmentFilters: serviceVariationIdList.map((s) => {
      return {
        serviceVariationId: s,
      };
    }),
  };
  return JSON.stringify(req);
}

function createApointmentOptions(
  options: any[]
): {
  morningOptions: AppointmentOption[];
  afternoonOptions: AppointmentOption[];
  eveningOptions: AppointmentOption[];
} {
  const filteredOptions = options.map((a) => {
    const option: AppointmentOption = {
      startAt: moment(a.startAt),
      locationId: a.locationId,
      apointmentSegments: a.appointmentSegments.map((as) => {
        return {
          durationMinutes: as.durationMinutes,
          serviceVariationId: as.serviceVariationId,
          teamMemberId: as.teamMemberId,
          serviceVariationVersion: as.serviceVariationVersion,
        };
      }),
    };
    return option;
  });
  const resetMoment = (m: moment.Moment) =>
    m
      .clone()
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0);
  const morningOptions = filteredOptions.filter((o) => {
    return o.startAt.isBefore(resetMoment(o.startAt).set("hour", 12));
  });
  const afternoonOptions = filteredOptions.filter((o) => {
    return (
      o.startAt.isSameOrAfter(resetMoment(o.startAt).set("hour", 12)) &&
      o.startAt.isBefore(resetMoment(o.startAt).set("hour", 17))
    );
  });
  const eveningOptions = filteredOptions.filter((o) => {
    return o.startAt.isSameOrAfter(resetMoment(o.startAt).set("hour", 17));
  });
  return {
    morningOptions,
    afternoonOptions,
    eveningOptions,
  };
}

export { createAvailabilityRequestBody, createApointmentOptions };
