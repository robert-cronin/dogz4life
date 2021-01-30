import moment from "moment";
import { ApointmentOption } from "./BookingCalendar";

function createAvailabilityRequestBody(
  locationId: string,
  serviceVariationIdList: string[]
) {
  // create the request body
  const now = moment();
  const req = {
    startAt: now.toISOString(),
    endAt: now.add(4, "months").toISOString(),
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
  morningOptions: ApointmentOption[];
  afternoonOptions: ApointmentOption[];
  eveningOptions: ApointmentOption[];
} {
  const filteredOptions = options
    .filter((i) => i.type == "ITEM")
    .map((a) => {
      const option: ApointmentOption = {
        startAt: a.startAt,
        locationId: a.locationId,
        apointmentSegments: a.appointmentSegments.map((as) => {
          return {
            durationMinutes: as.durationMinutes,
            serviceVariationId: as.serviceVariationId,
            teamMemberId: as.teamMemberId,
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
      o.startAt.isBefore(resetMoment(o.startAt).set("hour", 5))
    );
  });
  const eveningOptions = filteredOptions.filter((o) => {
    return o.startAt.isSameOrAfter(resetMoment(o.startAt).set("hour", 5));
  });
  return {
    morningOptions,
    afternoonOptions,
    eveningOptions,
  };
}

export { createAvailabilityRequestBody, createApointmentOptions };
