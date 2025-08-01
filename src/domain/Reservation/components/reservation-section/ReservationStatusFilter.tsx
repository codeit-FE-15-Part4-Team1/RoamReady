'use client';

import { RESERVATION_STATUS_OPTIONS } from '@/domain/Reservation/constants';
import { ReservationStatus } from '@/domain/Reservation/schemas/reservation';
import { cn } from '@/shared/libs/cn';

interface ReservationStatusFilterProps {
  selectedStatus?: ReservationStatus | undefined;
  onStatusChange: (status: ReservationStatus | undefined) => void;
}

interface StatusButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function StatusButton({ label, isSelected, onClick }: StatusButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'font-size-15 shrink-0 cursor-pointer rounded-full border border-gray-100 bg-white px-12 py-6 whitespace-nowrap text-gray-800 transition duration-100 hover:border-gray-800 active:scale-90',
        isSelected ? 'ring-2 ring-gray-800' : 'ring-0',
      )}
    >
      {label}
    </button>
  );
}

export default function ReservationStatusFilter({
  selectedStatus,
  onStatusChange,
}: ReservationStatusFilterProps) {
  return (
    <div className='desktop:px-0 flex min-w-fit gap-8 px-4 py-12'>
      {RESERVATION_STATUS_OPTIONS.map((option) => (
        <StatusButton
          key={option.value}
          label={option.label}
          isSelected={selectedStatus === option.value}
          onClick={() => {
            if (selectedStatus === option.value) {
              onStatusChange(undefined);
            } else {
              onStatusChange(option.value);
            }
          }}
        />
      ))}
    </div>
  );
}
