import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { DeliverableType, type BookingControlPanelDataTypes, type PilotDataType } from './types'
import Button from "../DuberButton";
import { Phone, FileDown, FolderDown, Star, Loader2 } from "lucide-react";
import { type PilotRateIssueType, pilotRateIssuesList, type RatingStatusType, pilot_skills, getPilotProfilePictureLink } from 'global-constants';
import MobileBookingDetails from './MobileBookingDetails';
import { OrderData } from './BookingDetails';
import Loading from '../Loading';
import { customerClient } from "../../../supabase/client";

type handleCancelBooking = () => void;

interface BookingControlPanelProps extends BookingControlPanelDataTypes {
  className: string,
  showCancelBookingPanel?: boolean,
  setShowCancelBookingPanel?: Dispatch<SetStateAction<boolean>>,
  handleCancelBooking?: handleCancelBooking,
  deliverablesView?: boolean,
  showSubscriptionView?: boolean,
  setShowSubscriptionView?: Dispatch<SetStateAction<boolean>>,
  SubscriptionComponent?: React.ReactNode[],
  orderData?: OrderData,
  showMobileBookingDetails?: boolean
  setShowMobileBookingDetails?: Dispatch<SetStateAction<boolean>>
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
  pilotData,
  deliverablesList,
  isDeliverablesExpired,
  showSubscriptionView,
  setShowSubscriptionView,
  SubscriptionComponent,
  orderData,
  showMobileBookingDetails,
  setShowMobileBookingDetails
}: BookingControlPanelProps) {

  if (isPilotAssigned) {
    console.log(pilotData)
  }

  return (
    <div className={`relative w-full h-full  overflow-hidden flex flex-col rounded-lg ${className}`}>
      <div className={`w-full flex-1 z-20 flex flex-col items-center sm:justify-end justify-between ${deliverablesView ? "p-0" : 'p-2 h-full'}`}>
        {
          !showCancelBookingPanel &&
          !(isBookingCancelled && cancellationReason) &&
          !deliverablesView &&
          !showSubscriptionView &&
          !showMobileBookingDetails &&
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

        {(deliverablesView && !showSubscriptionView) && (
          <DeliverablesView
            pilotData={pilotData!}
            orderData={orderData!}
            deliverablesList={deliverablesList}
            isDeliverablesExpired={isDeliverablesExpired!}
            setShowSubscriptionView={setShowSubscriptionView!}
          />
        )}

        {showSubscriptionView && (
          <SubscriptionPanel className='w-full h-full p-2'>
            {SubscriptionComponent}
          </SubscriptionPanel>
        )}

        <MobileBookingDetails
          className='sm:hidden flex flex-col'
          orderData={orderData}
          showMobileBookingDetails={showMobileBookingDetails!}
          setShowMobileBookingDetails={setShowMobileBookingDetails!}
        />
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
    let url = type === 'insurance' ? pilotData.droneInsurance : type === 'training' ? pilotData.proofDoc : "";

    if (typeof window !== "undefined") {
      window.open(url!, '_blank');
    }
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-lg flex flex-col p-3">
      {isPilotAssigned && <p
        className="text-right text-xs text-duber-skyBlue mb-2 cursor-pointer hover:underline"
        onClick={() => setShowMore(!showMore)}
      >See more details</p>}

      <div className={`w-full flex justify-between items-center`}>
        <div className={`flex flex-1 gap-x-3 ${showMore ? "flex-row-reverse items-start justify-between" : "items-center"}`}>
          <img src={pilotData?.profilePic ? getPilotProfilePictureLink(pilotData.profilePic) : "/assets/avatar.jpg"} alt="" className='h-16 rounded-lg' />

          <div className="">
            <h2 className='font-semibold text-base text-duber-navyBlue'>Pilot {showMore ? "Name" : "Assigned"}</h2>
            <h2 className='text-sm text-duber-navyBlue'>{isPilotAssigned ? `${pilotData.firstName} ${pilotData.lastName}` : 'To be confirmed'}</h2>
          </div>
        </div>

        {pilotData?.telNumber && !showMore && <a href={`tel:${pilotData.telNumber}`} className='p-3 rounded-lg bg-duber-skyBlue'>
          <Phone className='w-5 h-5 text-white' />
        </a>}
      </div>

      {showMore && <div className=''>
        <h2 className='text-sm font-semibold text-duber-navyBlue'>Expertise</h2>
        <p className='mt-1 text-xs text-duber-navyBlue'>
          {pilotData.pilot_skill?.map((skill, index) => (
            <span key={index}>{pilot_skills.filter(skillData => skillData.slug === skill)[0].title}, </span>
          ))}
        </p>

        <h2 className='mt-3 text-sm font-semibold text-duber-navyBlue'>Drone Equipment</h2>
        <p className='mt-1 text-xs text-duber-navyBlue'>
          {pilotData.userDrones?.map(drone => (
            <span key={drone.id}>{drone.brand.name} {drone.model}, </span>
          ))}
        </p>

        <h2 className='mt-3 text-sm font-semibold text-duber-navyBlue'>CAA Information</h2>
        <p className='mt-1 text-xs text-duber-navyBlue'>Operator ID : {pilotData.operatorID}</p>
        <p className='mt-1 text-xs text-duber-navyBlue'>Flyer ID : {pilotData.flyerID}</p>



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

interface DeliverableItemProps extends DeliverableType {
  isDeliverablesExpired: boolean
}

function DeliverableItem({ id, link, name, thumbnail, isDeliverablesExpired }: DeliverableItemProps) {
  link = isDeliverablesExpired ? '#' : link;

  return (
    <div key={id} className="w-full flex flex-col items-center">
      <div className="w-full h-10 object-cover overflow-hidden rounded-md">
        <img src={thumbnail} alt="" className='' />
      </div>

      <a href={link} className="mt-1 text-[10px] text-duber-navyBlue">{name}</a>
    </div>
  )
}

function DeliverablesView({ pilotData, deliverablesList, orderData, isDeliverablesExpired, setShowSubscriptionView }: {
  pilotData: PilotDataType,
  orderData: OrderData,
  deliverablesList: DeliverableType[] | [] | undefined,
  isDeliverablesExpired: boolean,
  setShowSubscriptionView: Dispatch<SetStateAction<boolean>>
}) {
  const [isIssuesShowing, setIsIssuesShowing] = useState<boolean>(false);

  // TEMP
  console.log(deliverablesList)

  return (
    <div className="w-full h-full flex flex-col gap-y-3 bg-gray-200 p-2.5">
      <div className='relative w-full h-full flex flex-col gap-y-3'>
        {isDeliverablesExpired && (
          <div className="absolute top-0 left-0 w-full h-full bg-[#ffffffab] flex items-center justify-center">
            <Button variant={'skyBlue'} onClick={() => setShowSubscriptionView(true)}>
              Recover Deliverables For £95
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h2 className='text-duber-navyBlue font-semibold text-lg'>Deliverables</h2>

          <Button variant={'pink'} className='rounded-lg' disabled={isDeliverablesExpired}>
            <div className="flex items-center w-full gap-x-2">
              <FolderDown className='w-5 h-5 text-white' strokeWidth={2} />
              <p className='text-sm font-semibold text-white'>Download All</p>
            </div>
          </Button>
        </div>

        {/* Deliverable List */}
        <div className={`flex-1 w-full grid grid-cols-3 gap-2 ${isIssuesShowing ? "max-h-[10rem]" : "max-h-[16rem]"} overflow-y-scroll`}>
          {/* {deliverablesList && deliverablesList.map((item) =>
            <DeliverableItem
              key={item.id} id={item.id} link={item.link} name={item.name} thumbnail={item.thumbnail}
              isDeliverablesExpired={isDeliverablesExpired}
            />
          )} */}
        </div>
      </div>

      {/* Rate Pilot */}
      <PilotRatingCard pilotData={pilotData} orderData={orderData} setIsIssuesShowing={setIsIssuesShowing} />
    </div>
  )
}

function PilotRatingCard({ pilotData, setIsIssuesShowing, orderData }: {
  pilotData: PilotDataType,
  orderData: OrderData,
  setIsIssuesShowing: Dispatch<SetStateAction<boolean>>,
}) {
  type StarIndexParam = { starIndex: number };
  const [filledStars, setFilledStars] = useState<number[]>([])
  const [pilotRate, setPilotRate] = useState<number>(0);
  const [showIssuePanel, setShowIssuePanel] = useState<boolean>(false);
  const [pilotIssue, setPilotIssue] = useState<PilotRateIssueType | null>(null);
  const [ratingStatus, setRatingStatus] = useState<RatingStatusType | null>(null);
  const [submittingRate, setSubmittingRate] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean | 'initialized'>(false)

  async function initializeFeedback() {
    try {
      setInitializing(true)

      const { data, error } = await customerClient.from('Feedback')
        .select()
        .eq('orderID', orderData.id!)

      if (!error) {
        if (data.length < 1) return;
        const initializedScore = parseInt(data[0].ratingScore!);

        setPilotRate(initializedScore);
        setPilotIssue(data[0].ratingReason as PilotRateIssueType);

        // Fill Stars
        let forFilled: number[] = [];

        for (let i = 1; i <= initializedScore; i++) {
          forFilled.push(i);
        }

        setFilledStars(forFilled)
      } else throw error

      setInitializing('initialized')
    } catch (err) {
      setInitializing('initialized')
    }
  }

  useEffect(() => {
    initializeFeedback()
  }, [])


  useEffect(() => {
    if (pilotRate === 1) {
      setShowIssuePanel(true);
      setIsIssuesShowing(true);
      setRatingStatus('Terrible')
    } else {
      setShowIssuePanel(false);
      setIsIssuesShowing(false);
      setRatingStatus(null)

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

  async function triggerFeedbackRequest() {
    try {
      setSubmittingRate(true)

      // get exsisting record
      const { data: exsistingData, error: exsistingError } = await customerClient
        .from('Feedback').select().eq('orderID', orderData.id!)

      if (!exsistingError) {
        if (exsistingData.length > 0) {
          const { data, error } = await customerClient
            .from('Feedback')
            .update({ ratingScore: `${pilotRate}`, ratingReason: pilotRate > 1 ? null : pilotIssue })
            .eq('orderID', orderData.id!)
            .select()

          if (!error) {
            setPilotRate(parseInt(data[0].ratingScore!))
            setPilotIssue(data[0].ratingReason as PilotRateIssueType)
          }
        } else {
          const { data, error } = await customerClient
            .from('Feedback')
            .insert({
              orderID: orderData.id,
              customerID: orderData.customerID,
              pilotID: pilotData.id,
              ratingScore: `${pilotRate}`,
              ratingReason: pilotRate > 1 ? null : pilotIssue
            })
            .select()

          if (!error) {
            setPilotRate(parseInt(data[0].ratingScore!))
            setPilotIssue(data[0].ratingReason as PilotRateIssueType)
          }
        }
      }

      setSubmittingRate(false)
    } catch (err) {
      setSubmittingRate(false)
    }
  }

  // Handle trigger feedback request in effect
  useEffect(() => {
    initializing === 'initialized' && triggerFeedbackRequest()
  }, [initializing, pilotRate, pilotIssue])


  return (
    <div className="w-full p-2.5 bg-white rounded-lg">
      <h2 className="text-duber-navyBlue font-semibold text-lg mb-3">Rate Pilot</h2>

      <div className={`relative flex gap-x-3 ${showIssuePanel ? "items-start" : "items-center"}`}>
        {initializing !== 'initialized' && <div className="absolute top-0 left-0 w-full h-full bg-white/70 flex items-center justify-center">
          <Loading className={'w-4 h-4 text-duber-navyBlue'} />
        </div>}

        <img src={pilotData.profilePic ? getPilotProfilePictureLink(pilotData.profilePic) : "assets/avatar.jpg"} alt="" className='h-16 rounded-lg' />

        <div className="">
          <div className="flex items-center justify-between">
            <p className="text-duber-navyBlue text-[13px]">{pilotData.firstName} {pilotData.lastName}</p>
            {ratingStatus && <p className="text-duber-navyBlue text-base font-semibold flex items-center gap-x-1">{submittingRate && <Loading className={'w-4 h-4 text-duber-navyBlue'} />} {ratingStatus}</p>}
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

function SubscriptionPanel({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <div className={`w-full h-full ${className}`}>
      {children}
    </div>
  )
}