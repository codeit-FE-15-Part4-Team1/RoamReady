import ActivitySectionClient from './ActivitySection.client';

interface ActivitySectionProps {
  searchParamsPromise: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function ActivitySection({
  searchParamsPromise,
}: ActivitySectionProps) {
  const searchParams = await searchParamsPromise;
  return <ActivitySectionClient searchParams={searchParams} />;
}
