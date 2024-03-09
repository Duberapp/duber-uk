/**
 * Component Name : SkillCard.tsx
 * Purpose        : Allow pilots to select their skill in registration
 * Used in        : workspace-pilot
 */
import { Dispatch, SetStateAction, useState, useRef } from 'react'
import { pilot_skills, type PilotSkill, type PilotSkill_Slug } from 'global-constants'
import { Card } from '../../../components/ui/card'
import CheckCircleIcon from '../../../icons/CheckCircleIcon';

interface SkillCardProps {
  selectedSkillList: PilotSkill[],
  setSelectedSkillList: Dispatch<SetStateAction<PilotSkill[]>>
  skill: PilotSkill_Slug,
  previewOnly?: boolean
}

export default function PilotSkillCard({ selectedSkillList, skill, setSelectedSkillList, previewOnly = false }: SkillCardProps) {
  let isFoundInList = selectedSkillList.find(skillObj => skillObj.slug === skill);

  const [isSelected, setIsSelected] = useState<boolean>(isFoundInList ? true : false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cardSkill = pilot_skills.filter(skillObj => skillObj.slug === skill)[0];
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleClick = () => {
    if (!isSelected) {
      selectedSkillList.push(cardSkill)
      setIsSelected(true);
    } else {
      const newSkillList: PilotSkill[] = selectedSkillList.filter(skillObj => skillObj.slug !== skill)
      setSelectedSkillList(newSkillList)
      setIsSelected(false)
    }
  }

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

  return (
    <Card
      className={`
        ${isSelected ? "bg-duber-teal-light" : "bg-duber-skyBlue-light"}
        p-3 flex flex-col cursor-pointer
      `}
      onClick={!previewOnly ? handleClick : () => console.log('Select Card')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video className='w-full min-h-32 rounded-xl' ref={videoRef} autoPlay={isHovered} loop muted >
        <source src={`/assets/${cardSkill.mov_name}`} type='video/mp4' />
      </video>

      <div className="flex-1">
        <h2 className="text-base font-semibold text-duber-skyBlue mt-2">{cardSkill.title}</h2>

        <p className="text-sm text-duber-skyBlue mt-2 whitespace-pre-line">{cardSkill.description}</p>
      </div>

      <div className="w-full flex items-center justify-end bottom-0">
        {isSelected ?
          <CheckCircleIcon className={`w-6 h-6 text-duber-teal-dark`} />
          :
          <CheckCircleIcon className={`w-6 h-6 text-gray-400 opacity-60`} />
        }
      </div>
    </Card>
  )
}