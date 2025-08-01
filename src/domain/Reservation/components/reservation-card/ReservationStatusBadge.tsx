import { RESERVATION_STATUS_OPTIONS } from '@/domain/Reservation/constants';
import { ReservationStatus } from '@/domain/Reservation/schemas/reservation';

interface ReservationStatusBadgeProps {
  status: ReservationStatus;
}

export default function ReservationStatusBadge({
  status,
}: ReservationStatusBadgeProps) {
  const statusOption = RESERVATION_STATUS_OPTIONS.find(
    (option) => option.value === status,
  );

  if (!statusOption) return null;

  return (
    <p
      className={`font-size-13 desktop:font-size-16 mb-10 w-fit rounded-full px-10 py-2 font-bold ${statusOption.backgroundColor} ${statusOption.textColor}`}
    >
      {statusOption.label}
    </p>
  );
}
