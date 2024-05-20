import React, { useEffect, useState } from 'react'
import { SideBarLayout } from '../DashboardComponents/Sidebar'
import { pilot_skills } from 'global-constants';
import { ScrollArea } from '../../ui/scroll-area'
import Button from '../DuberButton'
import { FolderDown } from 'lucide-react';

interface Props {
  activeApplication: string | number | null
}

export default function ApplicationsSidebar({ activeApplication }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  return (
    <SideBarLayout className='flex flex-col p-5'>
      {/* <ScrollArea className='p-5 flex-1'> */}
      <div className="w-full flex justify-end">
        <p className="text-duber-pink text-lg font-semibold">{activeApplication}</p>
      </div>

      <div className="w-full mt-3">
        <p className="text-xs text-white font-light">Drone Pilots Name</p>
        <p className="text-lg text-white font-semibold">Jaime Harris</p>
      </div>

      <div className="flex-1 w-full mt-3">
        <div className="flex flex-col gap-y-2">
          <p className="text-duber-teal text-sm">Email: <span className='font-semibold'>jaimecharris@gmail.com</span></p>
          <p className="text-duber-teal text-sm">Phone: <span className='font-semibold'>jaimecharris@gmail.com</span></p>
          <p className="text-duber-teal text-sm">Company Name: <span className='font-semibold'></span></p>
          <p className="text-duber-teal text-sm">Flyer ID: <span className='font-semibold'>23432-2342-23</span></p>
          <p className="text-duber-teal text-sm">Operator ID: <span className='font-semibold'>23432-2342-23</span></p>
        </div>

        <div className="mt-4">
          <p className="font-semibold text-white">Skills / Experience</p>

          <div className="mt-2 flex items-center flex-wrap gap-3">
            {pilot_skills.map(skill =>
              <div key={skill.slug} className='px-2 py-2 bg-duber-skyBlue rounded-md text-xs text-white'>{skill.title}</div>
            )}
          </div>

          <p className="font-semibold text-white mt-4">Drones</p>

          <div className="mt-2 flex items-center flex-wrap gap-3">
            {['DJI, Mini Series', 'Parrot, ANAFI Work', 'Parrot, ANAFI Extended'].map((drone, index) =>
              <div key={index} className='px-2 py-2 bg-duber-skyBlue rounded-md text-xs text-white'>{drone}</div>
            )}
          </div>

          <p className="font-semibold text-white mt-4">Documents</p>

          <div className="flex items-center gap-x-2 mt-2">
            <Button variant={'pink'} size={"sm"} className='flex-1 flex items-center justify-center gap-x-2'>
              <FolderDown className='w-5 h-5 text-white' />
              <p className="text-[10px] font-semibold text-white">Training Proof</p>
            </Button>
            <Button variant={'pink'} size={"sm"} className='flex-1 flex items-center justify-center gap-x-2'>
              <FolderDown className='w-5 h-5 text-white' />
              <p className="text-[10px] font-semibold text-white">Insurance Proof</p>
            </Button>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <div className="w-full flex flex-row">
          <Button variant={"skyBlue"} size={"lg"} className='flex-1 h-12 text-base'>Accept</Button>
        </div>

        <div className="w-full flex flex-row mt-2">
          <Button variant={"destructive"} size={"lg"} className='flex-1 h-12 text-base'>Decline</Button>
        </div>
      </div>
      {/* </ScrollArea> */}
    </SideBarLayout>
  )
}