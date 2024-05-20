import React, { useState } from 'react'
import DashboardCard from '../../DashboardCard'
import { Card, CardContent } from '../../../../ui/card'
import { type PilotRateIssueType, type PilotSkill, pilotRateIssuesList } from 'global-constants';
import { ScrollArea } from '../../../../ui/scroll-area'
import { Star } from "lucide-react";

interface CustomerReview {
  jobID: string | number,
  ratingScore: number,
  ratingReason: PilotRateIssueType,
}

interface Props {
  flyerID?: number | string,
  operatorID?: number | string,
  trainingProof?: string,
  insuranceProof?: string,
  pilotSkillList?: PilotSkill[] | [],
  dronesList?: string[] | [],
  reviews: CustomerReview[] | [],
}

export default function Overview(
  { flyerID, insuranceProof, operatorID, trainingProof, dronesList, pilotSkillList, reviews }: Props
) {
  const [filterStatus, setFilterStatus] = useState("")
  const [filterExpertise, setFilterExpertise] = useState("")

  return (
    <div className="py-3 grid grid-cols-4 gap-3">
      <DashboardCard
        noIcon title='Flyer ID' mainText={`${flyerID}`}
      />
      <DashboardCard
        noIcon title='Operator ID' mainText={`${operatorID}`}
      />
      <DashboardCard
        noIcon title='Download' mainText={`Training Proof`} clickable variant='pink'
        onClick={() => console.log(trainingProof)}
      />
      <DashboardCard
        noIcon title='Download' mainText={`Insurance Proof`} clickable variant='skyBlue'
        onClick={() => console.log(insuranceProof)}
      />

      <Card className='col-span-2 row-span-2'>
        <CardContent className='py-4'>
          <p className="font-semibold">Skills / Experience</p>

          <div className="flex items-center gap-2 flex-wrap mt-2">
            {pilotSkillList && pilotSkillList.length > 0 && pilotSkillList?.map(item => (
              <div key={item.slug} className='px-3 py-2 bg-duber-skyBlue rounded-md cursor-pointer'>
                <p className="text-sm text-white">{item.title}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 font-semibold">Drone Equipment</p>

          <div className="flex items-center gap-2 flex-wrap mt-2 mb-6">
            {dronesList && dronesList.length > 0 && dronesList?.map((item, index) => (
              <div key={index} className='px-3 py-2 bg-duber-skyBlue rounded-md cursor-pointer'>
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className='col-span-2 row-span-2'>
        <CardContent className='py-4'>
          <p className="font-semibold">Customer Reviews</p>

          <ScrollArea className="mt-3 flex flex-col max-h-72">
            {reviews && reviews.length > 0 && reviews.map(review => (
              <div className='bg-slate-50 border border-slate-100 mb-3 py-2 px-3 rounded-lg'>
                <div className="">
                  <div className="w-full flex items-center justify-between mb-3 mt-2">
                    <p className="font-semibold text-duber-navyBlue w-full text-[13px]">Job ID: <span>{review.jobID}</span></p>

                    <p className="w-full text-end text-duber-navyBlue font-semibold text-sm">
                      {review.ratingScore === 1
                        ? "Terrible"
                        : review.ratingScore === 2
                          ? "Poor"
                          : review.ratingScore === 3
                            ? "Okay"
                            : review.ratingScore === 4
                              ? "Good"
                              : review.ratingScore === 5
                                ? "Excellent"
                                : ""}
                    </p>
                  </div>

                  <div className="flex items-center w-full justify-between gap-x-3">
                    {new Array(5).fill(undefined).map((_, index) => {
                      index += 1;
                      let isFilled = index <= review.ratingScore;

                      return (
                        <Star
                          fill={`${isFilled ? "#2f51b6" : "#b3d1ff"}`}
                          strokeWidth={0}
                          className="w-8 h-8"
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-duber-navyBlue">
                    What was the issue ?
                  </p>
                  <div className="mt-1 flex items-center flex-wrap gap-2">
                    {pilotRateIssuesList.map((issue) => (
                      <div
                        key={issue.id}
                        className={`px-3 py-1 rounded-md ${review.ratingReason === issue.issue
                          ? "bg-gray-500 text-white"
                          : "text-gray-500 border border-gray-500"
                          } text-xs`}
                      >
                        {issue.issue}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>


    </div>
  )
}