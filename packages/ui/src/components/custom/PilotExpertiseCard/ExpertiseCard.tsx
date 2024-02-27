/**
 * Component Name : ExpertiseCard.tsx
 * Purpose        : Allow clients to select pilot expertises
 * Used in        : workspace-customer
 */
import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react'
import {
  type PilotExpertise,
  type PilotSubExpertise,
  PilotExpertises,
  type PilotExpertiseSlug,
  type TimeSlot,
  type TimeOptionSlug,
  type DurationOption,
  getDurationList
} from "global-constants";
import { Card } from "../../ui/card";
import CheckCircleIcon from '../../../icons/CheckCircleIcon';
import Button from "../DuberButton";
import OrderDurationSelector from './OrderDurationSelector';

interface ExpertiseCardProps {
  selectedExpertise: PilotExpertiseSlug | null,
  setSelectedExpertise: (expertise: PilotExpertise) => void,
  expertise: PilotExpertiseSlug,
  previewOnly?: boolean,
  className?: string,
  timeSlot?: TimeSlot,
  timeOption?: TimeOptionSlug,
  onChangeDuration: (duration: DurationOption) => void;
  extendedDurationHours: number;
  isMobile?: boolean
}

type SelectionPanel = 'sub-expertises' | 'duration';

export default function PilotExpertiseCard(
  {
    expertise,
    selectedExpertise,
    setSelectedExpertise,
    className,
    timeOption,
    timeSlot,
    onChangeDuration,
    extendedDurationHours,
    isMobile
  }: ExpertiseCardProps
) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [selectionPanel, setSelectionPanel] = useState<SelectionPanel>('sub-expertises')
  const [availableDurations, setAvailableDurations] = useState<DurationOption[]>([])

  const cardExpertise = PilotExpertises.filter(exp => exp.slug === expertise)[0];

  // Selected Expertise State effect listner
  useEffect(() => {
    if (selectedExpertise) {
      // Change selection panel view
      selectedExpertise === cardExpertise.slug && setSelectionPanel('duration')
      selectedExpertise !== cardExpertise.slug && setSelectionPanel('sub-expertises')

      // Listen to is active effect
      const isActiveExpertise = selectedExpertise === cardExpertise.slug ? true : false;
      setIsSelected(isActiveExpertise)
    }
  }, [selectedExpertise])

  // Intitialize available duration list for card
  useEffect(() => {
    const generatedDurationList = getDurationList({ arrivalOption: timeOption!, arrivalTimeSlot: timeSlot })
    setAvailableDurations(generatedDurationList);
  }, [timeOption, timeSlot])


  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setSelectedExpertise(cardExpertise)
  }

  return (
    <Card
      className={`
        ${isSelected ? "bg-duber-teal-light" : "bg-duber-skyBlue-light"}
        p-2 flex flex-col cursor-pointer ${className}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onLoad={() => console.log("Loaded")}
      onClick={handleClick}
    >
      <video className='w-full min-h-32 rounded-xl' ref={videoRef} autoPlay={isHovered} loop muted >
        <source src={`/assets/${cardExpertise.mov_name}`} type='video/mp4' />
      </video>

      <div className="flex-1">
        <h2 className="text-base font-semibold text-duber-skyBlue mt-2">{cardExpertise.title}</h2>

        <p className="text-xs text-duber-skyBlue mt-1 whitespace-pre-line">{cardExpertise.description}</p>
      </div>

      <div className="mt-2 flex items-end">
        {/* Selected Panel */}
        {selectionPanel === 'sub-expertises' && <div className="flex flex-1 w-full flex-wrap gap-1">
          {cardExpertise.sub_expertises.map(subExp => (
            <Button
              key={subExp.id}
              size={'sm'}
              onClick={() => null}
              variant={"skyBlue"}
              className='text-[10px] h-6 px-1 py-1 cursor-default'
            >{subExp.title}</Button>
          ))}
        </div>}

        {selectionPanel === 'duration' && <div className="flex flex-1 w-full mr-1">
          <OrderDurationSelector
            availableDurations={availableDurations}
            extendedDurationHours={extendedDurationHours}
            onSelectDuration={onChangeDuration}
          />
        </div>}

        <div>
          {isSelected ?
            <CheckCircleIcon className={`w-6 h-6 text-duber-teal-dark`} />
            :
            <CheckCircleIcon className={`w-6 h-6 text-gray-400 opacity-60`} />
          }
        </div>
      </div>

    </Card>
  )
}