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
        'font-size-15 shrink-0 cursor-pointer rounded-full border border-gray-100 bg-white px-8 py-4 whitespace-nowrap text-gray-800 transition duration-100 hover:border-gray-800 active:scale-90 sm:px-12 sm:py-6',
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
    <div className='scrollbar-none tablet:top-100 sticky top-70 z-10 flex gap-8 overflow-x-auto bg-white/80 px-4 py-12 backdrop-blur-md'>
      {RESERVATION_STATUS_OPTIONS.map((option) => (
        <StatusButton
          key={option.value || 'all'}
          label={option.label}
          isSelected={selectedStatus === option.value}
          onClick={() => onStatusChange(option.value)}
        />
      ))}
    </div>
  );
}
