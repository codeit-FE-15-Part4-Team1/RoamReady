'use client';

import Button from '@/shared/components/Button';

export default function Reservation() {
  return (
    <aside aria-label='예약 정보'>
      <form>
        <section aria-labelledby='pricing'>
          <h2 id='pricing'>
            price <span>/ 인</span>
          </h2>
        </section>

        <section aria-labelledby='date-select'>
          <h3 id='date-select'>날짜 선택</h3>
          {/* DatePicker 컴포넌트 */}
          <div />
        </section>

        <section aria-labelledby='participation'>
          <h3 id='participation'>참여 인원 수</h3>
        </section>

        <section aria-labelledby='total-price'>
          <h3 id='total-price'>
            총 합계 <span>₩ 1,000</span>
          </h3>
        </section>

        <Button variant='primary' type='submit'>
          예약하기
        </Button>
      </form>
    </aside>
  );
}
