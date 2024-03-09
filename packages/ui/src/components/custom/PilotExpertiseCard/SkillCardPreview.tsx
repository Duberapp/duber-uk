import { useState } from 'react'
import SkillCard from '../PilotExpertiseCard/SkillCard'
import { PilotSkill, pilot_skills } from 'global-constants'

interface SkillCardPreviewProps { }

export default function SkillCardPreview({ }: SkillCardPreviewProps) {
  const [selectedSkills, setSelectedSkills] = useState<PilotSkill[]>([]);

  return (
    <div className="w-full flex gap-x-3 ">
      {pilot_skills.map((skill) => (
        <SkillCard
          key={skill.slug}
          skill={skill.slug}
          selectedSkillList={selectedSkills}
          setSelectedSkillList={setSelectedSkills}
        />
      ))}
    </div>
  )
}