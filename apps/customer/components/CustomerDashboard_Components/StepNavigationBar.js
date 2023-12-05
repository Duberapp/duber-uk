import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setActiveStep, completeStep } from "../../redux/createOrderSlice";
import { CheckIcon, MapPinIcon, PhotoIcon, UserIcon } from '@heroicons/react/24/outline'

const StepNavigationBar = () => {
    const dispatch = useDispatch()
    const orderState = useSelector(state => state.createOrder)

    const handleClick = (activeTo) => {
        // if (orderState.updateMode) dispatch(setActiveStep(activeTo))
        if (orderState[`step${activeTo}_UpdateMode`]) {
            dispatch(setActiveStep(activeTo))
        }
    }


    return (
        <div className="">
            <div className="sm:flex hidden w-full items-center justify-center gap-3">
                {/* Form Nav => Item */}
                <StepNavItem text={'Location & Date'} stepRefId={1} onClick={() => handleClick(1)} />
                <StepNavItem text={'Options'} stepRefId={2} onClick={() => handleClick(2)} />
                <StepNavItem text={'Contact Details'} stepRefId={3} onClick={() => handleClick(3)} />
            </div>

            {/* Mobile */}
            <div className="sm:hidden  grid grid-cols-3 gap-x-3 items-end">
                <StepNavItem text={<MapPinIcon />} stepRefId={1} onClick={() => handleClick(1)} />
                <StepNavItem text={<PhotoIcon />} stepRefId={2} onClick={() => handleClick(2)} />
                <StepNavItem text={<UserIcon />} stepRefId={3} onClick={() => handleClick(3)} />
            </div>
        </div>
    )
}


const StepNavItem = ({ text, stepRefId, onClick }) => {
    const orderState = useSelector(state => state.createOrder)
    let barColor;
    const state = useSelector(state => state.createOrder[`step${stepRefId}_state`])
    if (state == 'active' && orderState.active_step === stepRefId) {
        barColor = 'sm:bg-primaryBlue bg-primaryTeal'
    } else if (state == 'completed' || orderState[`step${stepRefId}_UpdateMode`]) {
        barColor = 'bg-primaryTeal'
    } else {
        barColor = 'bg-primaryBlueLight'
    }

    return (
        <div className={`md:flex-1 flex-1 ${(orderState[`step${stepRefId}_UpdateMode`] === true) ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={onClick}>
            <p className={`sm:flex hidden sm:text-base text-xs whitespace-pre-wrap mb-2 ${state !== 'active' ? 'text-gray-300' : 'text-black'}`}>{text}</p>
            <div className={`sm:hidden mx-auto mb-2 text-primaryTeal w-7 h-7 `}>
                {state === 'completed' ? <CheckIcon /> : state === 'active' ? text : ''}
            </div>
            <div className={`w-full h-[5px] rounded-full ${barColor}`}></div>
        </div>
    )
}

export default StepNavigationBar