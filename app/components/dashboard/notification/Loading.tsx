import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className='space-y-3'>
      <Skeleton className="w-full h-[60px] md:min-h-[90px] bg-[#303030]" />
      <Skeleton className="w-full h-[60px] md:min-h-[90px] bg-[#303030]" />
      <Skeleton className="w-full h-[60px] md:min-h-[90px] bg-[#303030]" />
      <Skeleton className="w-full h-[60px] md:min-h-[90px] bg-[#303030]" />
      <Skeleton className="w-full h-[60px] md:min-h-[90px] bg-[#303030]" />
    </div>
  );
}

export default Loading
