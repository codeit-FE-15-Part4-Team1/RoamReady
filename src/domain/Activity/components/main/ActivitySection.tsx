import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import { Activity } from '@/domain/Activity/schemas/main';

interface ActivitySectionProps {
  activities: Activity[];
}

export default function ActivitySection({ activities }: ActivitySectionProps) {
  return (
    <article>
      <section className='mb-5'>
        <h2 className='desktop:font-size-20 font-bold text-gray-900'>
          모든 체험
        </h2>
      </section>
      <section className='grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
        {activities.map((activity) => (
          <ActivityCard
            key={`${activity.title}-${String(activity.createdAt)}`}
            activity={activity}
          />
        ))}
      </section>
    </article>
  );
}
