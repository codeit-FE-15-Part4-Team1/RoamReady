import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import ReservationDetail from '@/domain/Reservation/components/reservation-calendar/ReservationDetail';
import type { ScheduleItem } from '@/domain/Reservation/services/reservation-calendar';
import { ReservationItem } from '@/domain/Reservation/types/reservation';
import Tabs from '@/shared/components/ui/tabs';

interface ReservationModalContentProps {
  day: dayjs.Dayjs;
  totalReservations: number;
  reservationCounts: {
    pending: number;
    confirmed: number;
    declined: number;
  };
  activeTab: 'pending' | 'confirmed' | 'declined';
  setActiveTab: (tab: 'pending' | 'confirmed' | 'declined') => void;
  schedules: ScheduleItem[] | null;
  reservationsByStatus: {
    pending: ReservationItem[];
    confirmed: ReservationItem[];
    declined: ReservationItem[];
  };
  handleApprove: (reservationId: number, scheduleId: number) => void;
  handleReject: (reservationId: number) => void;
  handleTimeSlotSelect: (scheduleId: number) => Promise<void>;
  isLoading: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

export default function ReservationModalContent({
  day,
  totalReservations,
  reservationCounts,
  schedules,
  reservationsByStatus,
  activeTab,
  setActiveTab,
  handleApprove,
  handleReject,
  handleTimeSlotSelect,
  isLoading,
  setIsOpen,
  onClose,
}: ReservationModalContentProps) {
  return (
    <div className='tablet:min-w-[32rem] h-full space-y-3 p-10'>
      <div className='flex items-center justify-between'>
        <div className='flex items-end gap-5'>
          <h3 className='font-size-20 font-bold text-gray-900'>
            {day.format('YY년 M월 D일')}
          </h3>
          <span className='font-size-12 text-gray-500'>
            {totalReservations}개의 예약
          </span>
        </div>
        <button type='button' onClick={onClose}>
          <X className='size-15 cursor-pointer font-bold' />
        </button>
      </div>

      <Tabs.Root
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as 'pending' | 'confirmed' | 'declined')
        }
      >
        <Tabs.List className='font-size-14 flex'>
          <Tabs.Trigger value='pending'>
            신청 {reservationCounts.pending}
          </Tabs.Trigger>
          <Tabs.Trigger value='confirmed'>
            승인 {reservationCounts.confirmed}
          </Tabs.Trigger>
          <Tabs.Trigger value='declined'>
            거절 {reservationCounts.declined}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value='pending'>
          <ReservationDetail
            schedules={schedules || []}
            reservations={reservationsByStatus.pending}
            emptyMessage='신청된 예약이 없습니다.'
            showApprovalButton={true}
            showRejectButton={true}
            onApprove={handleApprove}
            onReject={handleReject}
            onTimeSlotSelect={handleTimeSlotSelect}
            isLoading={isLoading}
            status='pending'
            setIsOpen={setIsOpen}
          />
        </Tabs.Content>

        <Tabs.Content value='confirmed'>
          <ReservationDetail
            schedules={schedules || []}
            reservations={reservationsByStatus.confirmed}
            emptyMessage='승인된 예약이 없습니다.'
            showApprovalButton={false}
            showRejectButton={false}
            onApprove={handleApprove}
            onReject={handleReject}
            onTimeSlotSelect={handleTimeSlotSelect}
            isLoading={isLoading}
            status='confirmed'
            setIsOpen={setIsOpen}
          />
        </Tabs.Content>

        <Tabs.Content value='declined'>
          <ReservationDetail
            schedules={schedules || []}
            reservations={reservationsByStatus.declined}
            emptyMessage='거절된 예약이 없습니다.'
            showApprovalButton={false}
            showRejectButton={false}
            onApprove={handleApprove}
            onReject={handleReject}
            onTimeSlotSelect={handleTimeSlotSelect}
            isLoading={isLoading}
            status='declined'
            setIsOpen={setIsOpen}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
