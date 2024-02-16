import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { type BookingControlPanelDataTypes, type PilotDataType } from './types'
import Button from "../DuberButton";
import { Phone, FileDown, FolderDown, Star } from "lucide-react";
import { type PilotRateIssueType, pilotRateIssuesList, type RatingStatusType } from 'global-constants';

type handleCancelBooking = () => void;

interface BookingControlPanelProps extends BookingControlPanelDataTypes {
  className: string,
  showCancelBookingPanel?: boolean,
  setShowCancelBookingPanel?: Dispatch<SetStateAction<boolean>>,
  handleCancelBooking?: handleCancelBooking,
  deliverablesView?: boolean
}

export default function BookingControlPanel({
  className,
  MapComponent,
  showCancelBookingPanel,
  setShowCancelBookingPanel,
  handleCancelBooking,
  deliverablesView,
  cancellationReason,
  isBookingCancelled,
  isPilotAssigned,
  pilotData
}: BookingControlPanelProps) {

  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col rounded-lg ${className}`}>
      <div className={`w-full flex-1 z-20 flex flex-col items-center justify-end ${deliverablesView ? "p-0" : 'p-2 h-full'}`}>
        {
          !showCancelBookingPanel &&
          !(isBookingCancelled && cancellationReason) &&
          !deliverablesView &&
          <PilotDetaisPanel isPilotAssigned={isPilotAssigned!} pilotData={pilotData!} />
        }

        {showCancelBookingPanel &&
          <CancelBookingPanel
            handleSetClose={() => setShowCancelBookingPanel && setShowCancelBookingPanel(false)}
            handleCancelBooking={handleCancelBooking!}
          />
        }

        {isBookingCancelled && cancellationReason && (
          <ReasonForCancellationPanel reason={cancellationReason} />
        )}

        {deliverablesView && (
          <DeliverablesView pilotData={pilotData!} />
        )}
      </div>

      <div className="absolute top-0 left-0 z-0 w-full h-full">
        {MapComponent}
      </div>
    </div>
  )
}

// Child Components
function CancelBookingPanel({ handleCancelBooking, handleSetClose }: {
  handleCancelBooking: handleCancelBooking,
  handleSetClose: () => void,
}) {
  const [isCancelling, setIsCancelling] = useState<boolean>(false);

  return (
    <div className="w-full h-full bg-white rounded-lg flex flex-col p-3">
      <div className="flex-1">
        <p className="text-right text-xs text-duber-skyBlue mb-2 cursor-pointer hover:underline" onClick={handleSetClose}>Close</p>
        <div className="w-full p-3 rounded-lg bg-red-200 text-red-600 text-[14px]">
          Are you sure you want to cancel this booking?
          <br />
          <br />
          Canceling this booking means you understand that the booking will be terminated and the <span className='font-semibold'>deposit</span> already paid is <span className='font-semibold'>non-refundable</span>
        </div>
      </div>

      <Button
        isLoading={isCancelling}
        onClick={handleCancelBooking}
        className='h-14 bg-red-200 text-red-600 hover:underline font-semibold hover:bg-red-300 text-[14px]'
      >Cancel Booking</Button>
    </div>
  )
}

function ReasonForCancellationPanel({ reason }: { reason: string }) {
  return (
    <div className="w-full h-full bg-white rounded-lg flex flex-col p-3">
      <div className="flex-1 w-full p-3 rounded-lg bg-red-200 text-red-600 text-[12px]">
        <span className='text-[14px] font-semibold mb-2'>Cancellation Reason</span>
        <br /><br />

        The pilot assigned to this booking has cancelled this booking due to “<span className="font-semibold">{reason}</span>”
        <br /><br />
        Cancellations via pilots are rare, however they do happen and in most cases its due to them determining its not safe and will not be able to provide you with the best possible service.
        <br /><br />
        The deposit paid, will be fully refunded and the scheduled payment will be revoked.
        <br /><br />
        If you would like to book again click here
        <br /><br />
        If you feel like this cancellation was unjust, please contact support on 02392 1797 93
      </div>
    </div>
  )
}

function PilotDetaisPanel({ isPilotAssigned, pilotData }: { isPilotAssigned: boolean, pilotData: PilotDataType }) {
  const [showMore, setShowMore] = useState<boolean>(false)

  function handleDownloadProof({ type }: { type: "training" | "insurance" }) {
    let url = type === 'insurance' ? pilotData.insuranceProof : type === 'training' ? pilotData.trainingProof : "";

    if (typeof window !== "undefined") {
      window.open(url, '_blank');
    }
  }

  return (
    <div className="w-full bg-white rounded-lg flex flex-col p-3">
      {isPilotAssigned && <p
        className="text-right text-xs text-duber-skyBlue mb-2 cursor-pointer hover:underline"
        onClick={() => setShowMore(!showMore)}
      >See more details</p>}

      <div className={`w-full flex justify-between items-center`}>
        <div className={`flex flex-1 gap-x-3 ${showMore ? "flex-row-reverse items-start justify-between" : "items-center"}`}>
          <img src="assets/avatar.jpg" alt="" className='h-16 rounded-lg' />

          <div className="">
            <h2 className='font-semibold text-base text-duber-navyBlue'>Pilot {showMore ? "Name" : "Assigned"}</h2>
            <h2 className='text-sm text-duber-navyBlue'>{isPilotAssigned ? pilotData.name : 'To be confirmed'}</h2>
          </div>
        </div>

        {pilotData?.contactNumber && !showMore && <div className='p-3 rounded-lg bg-duber-skyBlue'>
          <Phone className='w-5 h-5 text-white' />
        </div>}
      </div>

      {showMore && <div className=''>
        <h2 className='text-sm font-semibold text-duber-navyBlue'>Expertise</h2>
        <p className='mt-1 text-xs text-duber-navyBlue'>{pilotData.pilotExpertise}</p>

        <h2 className='mt-3 text-sm font-semibold text-duber-navyBlue'>Drone Equipment</h2>
        <p className='mt-1 text-xs text-duber-navyBlue'>
          {pilotData.droneEquipments?.map((item, index) => <span key={index}>{item}, </span>)}
        </p>

        <h2 className='mt-3 text-sm font-semibold text-duber-navyBlue'>CAA Information</h2>
        <p className='mt-1 text-xs text-duber-navyBlue'>Operator ID : {pilotData.CAA_Info?.operator_id}</p>
        <p className='mt-1 text-xs text-duber-navyBlue'>Flyer ID : {pilotData.CAA_Info?.flyer_id}</p>



        <div className="flex items-center gap-x-2 mt-4">
          <Button onClick={() => handleDownloadProof({ type: "training" })} variant={"pink-outline"} className='flex-1 px-2 h-12 rounded-lg'>
            <div className="flex w-full items-center">
              <FileDown className='w-6 h-6 text-duber-pink' strokeWidth={2} />
              <p className="whitespace-nowrap flex-1 text-center text-xs font-semibold text-duber-pink">Training Proof</p>
            </div>
          </Button>

          <Button onClick={() => handleDownloadProof({ type: "insurance" })} variant={"pink-outline"} className='flex-1 px-2 h-12 rounded-lg'>
            <div className="flex w-full items-center">
              <FileDown className='w-6 h-6 text-duber-pink' strokeWidth={2} />
              <p className="whitespace-nowrap flex-1 text-center text-xs font-semibold text-duber-pink">Insurance Proof</p>
            </div>
          </Button>
        </div>
      </div>}
    </div>
  )
}

function DeliverablesView({ pilotData }: { pilotData: PilotDataType }) {
  const [isIssuesShowing, setIsIssuesShowing] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col gap-y-3 bg-gray-200 p-2.5">
      <div className="flex items-center justify-between">
        <h2 className='text-duber-navyBlue font-semibold text-lg'>Deliverables</h2>

        <Button variant={'pink'} className='rounded-lg'>
          <div className="flex items-center w-full gap-x-2">
            <FolderDown className='w-5 h-5 text-white' strokeWidth={2} />
            <p className='text-sm font-semibold text-white'>Download All</p>
          </div>
        </Button>
      </div>

      {/* Deliverable List */}
      <div className={`flex-1 bg-gray-400 w-full grid grid-cols-3 gap-2 ${isIssuesShowing ? "max-h-[10rem]" : "max-h-[16rem]"} overflow-y-scroll`}>
        {new Array(50).fill(undefined).map((_, index) =>
          <div className="w-full h-10 bg-white rounded-lg">
            deliverable Item
          </div>
        )}
      </div>

      {/* Rate Pilot */}
      <PilotRatingCard pilotData={pilotData} setIsIssuesShowing={setIsIssuesShowing} />
    </div>
  )
}

function PilotRatingCard({ pilotData, setIsIssuesShowing }: {
  pilotData: PilotDataType,
  setIsIssuesShowing: Dispatch<SetStateAction<boolean>>,
}) {
  type StarIndexParam = { starIndex: number };
  const [filledStars, setFilledStars] = useState<number[]>([])
  const [pilotRate, setPilotRate] = useState<number>(0);
  const [showIssuePanel, setShowIssuePanel] = useState<boolean>(false);
  const [pilotIssue, setPilotIssue] = useState<PilotRateIssueType | null>(null);
  const [ratingStatus, setRatingStatus] = useState<RatingStatusType | null>(null)

  useEffect(() => {
    if (pilotRate === 1) {
      setShowIssuePanel(true);
      setIsIssuesShowing(true);
      setRatingStatus('Terrible')
    } else {
      setShowIssuePanel(false);
      setIsIssuesShowing(false);

      pilotRate === 2 ? setRatingStatus('Poor') :
        pilotRate === 3 ? setRatingStatus('Okay') :
          pilotRate === 4 ? setRatingStatus('Good') :
            pilotRate === 5 ? setRatingStatus('Excellent') :
              setRatingStatus(null);
    }
  }, [pilotRate])


  function onMouseEnterStar({ starIndex }: StarIndexParam) {
    if (pilotRate) return;

    let forFilled: number[] = [];

    for (let i = 1; i <= starIndex; i++) {
      forFilled.push(i);
    }

    setFilledStars(forFilled)
  }

  function isFilledStar({ starIndex }: StarIndexParam): boolean {
    let isExists: boolean = false;

    let filteredList = filledStars.filter(star => star === starIndex);
    filteredList.length > 0 ? isExists = true : isExists = false;

    return isExists;
  }

  function handleRatePilot({ starIndex }: StarIndexParam) {
    let forFilled: number[] = [];

    for (let i = 1; i <= starIndex; i++) {
      forFilled.push(i);
    }

    setFilledStars(forFilled)
    setPilotRate(starIndex)
  }

  return (
    <div className="w-full p-2.5 bg-white rounded-lg">
      <h2 className="text-duber-navyBlue font-semibold text-lg mb-3">Rate Pilot</h2>

      <div className={`flex gap-x-3 ${showIssuePanel ? "items-start" : "items-center"}`}>
        <img src="assets/avatar.jpg" alt="" className='h-16 rounded-lg' />

        <div className="">
          <div className="flex items-center justify-between">
            <p className="text-duber-navyBlue text-[13px]">{pilotData.name}</p>
            {ratingStatus && <p className="text-duber-navyBlue text-base font-semibold">{ratingStatus}</p>}
          </div>
          <div className="mt-1 flex items-center gap-x-2">
            {new Array(5).fill(undefined).map((_, index) => {
              index += 1;
              let isFilled = isFilledStar({ starIndex: index })

              return (
                <Star
                  key={index}
                  fill={`${isFilled ? '#2f51b6' : '#b3d1ff'}`}
                  strokeWidth={0}
                  className='w-8 h-8 cursor-pointer transition-all ease-in-out'
                  onMouseEnter={() => onMouseEnterStar({ starIndex: index })}
                  onMouseLeave={() => !pilotRate && setFilledStars([])}
                  onClick={() => handleRatePilot({ starIndex: index })}
                />
              )
            })}
          </div>

          {showIssuePanel && <div className="mt-3">
            <p className="text-sm text-duber-navyBlue">{`what was the issue?`}</p>
            <div className="mt-1 flex items-center flex-wrap gap-1">
              {pilotRateIssuesList.map(issue => (
                <div
                  key={issue.id}
                  className={`cursor-pointer px-2.5 py-1.5 border-2 border-gray-400 rounded-lg text-[10px] ${pilotIssue === issue.issue && 'bg-gray-400 text-white'}`}
                  onClick={() => setPilotIssue(issue.issue)}
                >
                  {issue.issue}
                </div>
              ))}
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}