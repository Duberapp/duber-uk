import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const ContractModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  const [value, setValue] = useState("");

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-full max-w-[750px] m-6 p-5 bg-white rounded-lg shadow-xl space-y-5">
            <div className="flex">
              <div>
                <p className="text-lg font-semibold text-navyBlue">
                  Supplier Agreement{" "}
                  <span className="text-sm font-normal">
                    (Scroll and read to sign)
                  </span>
                </p>
              </div>
            </div>
            <div className="overflow-auto h-[500px] p-4 bg-slate-50 rounded-md font-semibold space-y-5">
              {/* Text content goes here */}
              <p>Drone Pilot Agreement</p>
              <div className="space-y-2">
                <p>
                  THIS SUPPLIER AGREEMENT{" "}
                  <span className="font-normal">is entered into on</span>
                </p>
                <p>Between</p>
                <p className="font-normal">
                  1.&nbsp;&nbsp;&nbsp; of (“You”, the “Supplier”);
                </p>
                <p className="font-normal">
                  2.&nbsp;&nbsp;&nbsp; DUBER of Portsmouth, PO6 3SA (“Duber”)
                </p>
              </div>
              <div className="space-y-2">
                <p>BACKGROUND</p>
                <p className="font-normal">
                  A.&nbsp;&nbsp;&nbsp; Duber is a business built on connecting
                  customers to drone pilots and providing aerial images & videos
                  produced by local drone pilots and other outlets and then
                  providing the deliverables to the customers. It requires a
                  large pool of suppliers to perform the data collection
                  services for it by use of a drone;
                </p>
                <p className="font-normal">
                  B.&nbsp;&nbsp;&nbsp; You are a supplier in business on your
                  own account who wishes to join Duber’s supplier pool, on and
                  subject to the below terms and conditions, and are able to
                  meet the service standards Duber expects as more fully set out
                  in the Schedule to this Agreement.
                </p>
              </div>
              <div className="space-y-2">
                <p>IT IS AGREED AS FOLLOWS:</p>
                <p>1.&nbsp;&nbsp;&nbsp; COMMENCEMENT AND DURATION</p>
                <p className="font-normal">
                  1.1&nbsp;&nbsp;&nbsp; This Agreement commences on the date set
                  out above and will continue until it is terminated by either
                  party in accordance with clause 11 below.
                </p>
                <p className="font-normal">
                  1.2&nbsp;&nbsp;&nbsp; Duber appoints you to perform Services
                  for it from time to time on the terms set out in this
                  Agreement.
                </p>
                <p className="font-normal">
                  1.3&nbsp;&nbsp;&nbsp; Throughout this Agreement, “Services”
                  means the collection by you of data (photos & videos) via a
                  drone from the job location, area and job requirements as are
                  notified to you through the Duber Pilots app, and the
                  deliverables of such data must be uploaded to the Duber Pilots
                  app in accordance with the Service Delivery Standards
                  contained in the Schedule.
                </p>
              </div>
              <div className="space-y-2">
                <p>2.&nbsp;&nbsp;&nbsp; STATUS</p>
                <p className="font-normal">
                  2.1&nbsp;&nbsp;&nbsp; You are a self-employed supplier and
                  therefore acknowledge that you are neither an employee of
                  Duber, nor a worker within the meaning of any employment
                  rights legislation. For the avoidance of doubt, throughout the
                  term of this Agreement you are free to work for such third
                  parties as you choose provided always this does not prevent
                  you from performing the Services in accordance with the
                  Service Delivery Standards.
                </p>
                <p className="font-normal">
                  2.2&nbsp;&nbsp;&nbsp; You further warrant that neither you nor
                  anyone acting on your behalf will present any claim in the
                  Employment Tribunal or any civil court in which it is
                  contended that you are either an employee or a worker.
                </p>
                <p className="font-normal">
                  2.3&nbsp;&nbsp;&nbsp; If, despite clause 2.2 above, either you
                  or anyone acting on your behalf (or your substitute or anyone
                  acting on your substitute’s behalf) presents any claim in the
                  Employment Tribunal or any civil court which would not be able
                  to proceed unless it was successfully contended that you (or
                  your substitute) are an employee or a worker within the
                  meaning of any employment rights legislation, you undertake to
                  indemnify and keep indemnified Duber against costs (including
                  legal costs) and expenses that it incurs in connection with
                  those proceedings, and you agree that Duber may set off any
                  sum owed to you against any damages, compensation, costs or
                  other sum that may be awarded to you in those proceedings.
                </p>
                <p className="font-normal">
                  2.4&nbsp;&nbsp;&nbsp; Nothing in this Agreement shall make you
                  an agent of Duber and you shall not have any right or power to
                  enter into contracts on behalf of Duber with third parties.
                  Unless specifically authorised to do so by Duber, you shall
                  not have any authority to incur any expenditure in the name of
                  Duber.
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  3.&nbsp;&nbsp;&nbsp; PERFORMING THE SERVICES - PRACTICALITIES
                </p>
                <p className="font-normal">
                  3.1&nbsp;&nbsp;&nbsp; Duber is simply providing the drone
                  pilot with leads and is not obliged to make available any
                  minimum level or amount of work to you, nor are you obliged to
                  perform any minimum level or amount of work.
                </p>
                <p className="font-normal">
                  3.2&nbsp;&nbsp;&nbsp; Without prejudice to clause 3.1, when
                  applying to join Duber’s supplier pool and at regular
                  intervals thereafter you will provide an indication of the
                  time periods during the week in which you typically expect to
                  be available to work. Duber places reliance on such
                  indications provided by suppliers in planning to meet customer
                  demand. We accordingly expect you to inform a member of the
                  Operations Team if this changes materially, and reserve the
                  right to terminate this Agreement if you are no longer able to
                  work at time periods which meet Duber’s needs.
                </p>
                <p className="font-normal">
                  3.3&nbsp;&nbsp;&nbsp; During your onboarding process, you will
                  have discussed with a member of the Operations Team the level
                  of demand for suppliers within your zone and consequently the
                  level of availability to perform Services which Duber expects
                  you to provide. You are expected to be as flexible as you can
                  to meet Duber’s needs.
                </p>
                <p className="font-normal">
                  3.4&nbsp;&nbsp;&nbsp; It is your responsibility to engage with
                  the Staffomatic system at regular intervals. This is the means
                  by which you will confirm your availability and willingness to
                  perform Services in a particular zone during a particular time
                  period.
                </p>
                <p className="font-normal">
                  3.5&nbsp;&nbsp;&nbsp; When you have confirmed your
                  availability to perform Services during a particular time
                  period, it is your responsibility to log on to the app during
                  this period and to accept actively any orders in your zone
                  which you are able to accept.
                </p>
                <p className="font-normal">
                  3.6&nbsp;&nbsp;&nbsp; You will ensure that you perform the
                  Services in accordance with the Service Delivery Standards set
                  out in the Schedule, including the standards of dress
                  contained there. However, and for the avoidance of doubt, you
                  will not be subject to the supervision, direction or control
                  of Duber in performing the Services.
                </p>
                <p className="font-normal">
                  3.7&nbsp;&nbsp;&nbsp; You must immediately notify a member of
                  the Operations Team if you become unable to work during a time
                  period that you have previously agreed to work in accordance
                  with clause 3.4, and explain the reasons for this. For the
                  avoidance of doubt, no fee shall be payable in respect of such
                  period.
                </p>
              </div>
              <div className="space-y-2">
                <p>4.&nbsp;&nbsp;&nbsp; EQUIPMENT</p>
                <p className="font-normal">
                  4.1&nbsp;&nbsp;&nbsp; You will supply either an iPhone or
                  Android smartphone (or such other make of phone as may
                  subsequently be notified to you by Duber) and ensure that it
                  is sufficiently charged and subject to a current mobile phone
                  subscription which enables you to access voice and data
                  services at all times while this Agreement is in force.
                </p>
                <p className="font-normal">
                  4.2&nbsp;&nbsp;&nbsp; You will download and install, or permit
                  Duber to download and install, such applications as are
                  required for you to be able to perform the Services and will
                  also apply any and all new versions, revisions and fixes to
                  such software as may be required by Duber from time to time.
                </p>
                <p className="font-normal">
                  4.3&nbsp;&nbsp;&nbsp; You will supply your own drone equipment
                  for the purposes of providing the Services. You will ensure
                  that at all times your drone is clean, in a good state of
                  repair, and airworthy, covered by a current Operator ID and
                  clearly labeled on the drone equipment as per CAA regulations:
                  <a href="https://register-drones.caa.co.uk/drone-code">
                    https://register-drones.caa.co.uk/drone-code.
                  </a>
                </p>
                <p className="font-normal">
                  4.4&nbsp;&nbsp;&nbsp; You will not, at any time, operate the
                  drone while under the influence of drugs or alcohol. You
                  acknowledge that you are responsible for all and any charges,
                  penalties and fines relating to your usage of the drone,
                  including but not limited to parking charges, congestion
                  charges and traffic offences.
                </p>
                <p className="font-normal">
                  4.5&nbsp;&nbsp;&nbsp; You will immediately inform a member of
                  the Operations Team if you are involved in any accident when
                  using your drone while performing the Services or are arrested
                  in respect of a UAVa flying offense (including but not limited
                  to dangerous operations, careless or inconsiderate operation,
                  or flying while under the influence of drink or drugs).
                </p>
                <p className="font-normal">
                  4.6&nbsp;&nbsp;&nbsp; Upon entering into this Agreement, you
                  have an option to pay [£150] and receive an equipment pack
                  containing a waterproof jacket, hat, hi-vis and branded
                  stickers. On termination of the Agreement, provided the
                  equipment is in a good state of repair (to be determined by
                  Duber in its sole discretion), your deposit will be returned.
                  You will be required to supply a box for the transportation of
                  orders.
                </p>
                <p className="font-normal">
                  4.7&nbsp;&nbsp;&nbsp; You agree that Duber equipment, and in
                  particular the hi-vis, must never be used for any purpose
                  other than performing the Services.
                </p>
              </div>
              <div className="space-y-2">
                <p>5.&nbsp;&nbsp;&nbsp; DATA CAPTURE AND DELIVERABLE FORMATS</p>
                <p className="font-normal">
                  5.1&nbsp;&nbsp;&nbsp; You agree that to capture the data
                  (phots & videos) in the below format when collecting data on
                  Duber jobs;
                </p>
                <p className="font-normal">
                  5.2&nbsp;&nbsp;&nbsp; Photo Format; File type (JPEG+ RAW),
                  Image Size (4:3), White Balance (Auto).
                </p>
                <p className="font-normal">
                  5.3&nbsp;&nbsp;&nbsp; Video Format; Video Size (Minimum 4k
                  30fps), Video Format (.MP4), NTSC/PAL (NTSC), White Balance
                  (Weather Dependent)
                </p>
              </div>
              <div className="space-y-2">
                <p>6.&nbsp;&nbsp;&nbsp; FEES AND INVOICING</p>
                <p className="font-normal">
                  6.1&nbsp;&nbsp;&nbsp; Duber will charge a 40% fee of the job
                  value and will ensure the drone pilot receives a minimum
                  payment of £150.00 for each completed job. This fee may be
                  varied depending on the day, time and location. A job, for
                  these purposes, being the collection of data from the job
                  location and upload captured data to the Duber Pilots app.
                </p>
                <p className="font-normal">
                  6.2&nbsp;&nbsp;&nbsp; Duber will make available to you an
                  electronic facility to enable you to cash out your account
                  balance at anytime. Subject to satisfactory and timely
                  requests, Duber will pay your fees by electronic transfer to
                  your nominated bank account.
                </p>
                <p className="font-normal">
                  6.3&nbsp;&nbsp;&nbsp; You may keep any tips or gratuities paid
                  to you directly by any of Duber’s customers in respect of
                  Services provided by you under this Agreement.
                </p>
                <p className="font-normal">
                  6.4&nbsp;&nbsp;&nbsp; You will indemnify Duber and keep Duber
                  indemnified against any claim or demand made against Duber in
                  respect of any income tax, value added tax, any other tax or
                  national insurance or social security contributions due on
                  fees payable under this Agreement and against any interest or
                  penalties imposed in connection with any such tax or
                  contributions. You will inform Duber of your tax reference
                  number on request. Duber may at its option satisfy such
                  indemnity in whole or in part by way of deductions from any
                  payments owed to you.
                </p>
              </div>
              <div className="space-y-2">
                <p>7.&nbsp;&nbsp;&nbsp; WARRANTIES</p>
                <p className="font-normal">
                  7.1&nbsp;&nbsp;&nbsp; As strict conditions of this Agreement
                  you warrant that:
                </p>
                <p className="pl-5 font-normal">
                  (a) You are a self-employed independent contractor in business
                  on your own account;
                </p>
                <p className="pl-5 font-normal">
                  (b) You have the right to reside and work in the United
                  Kingdom and have all necessary visas, licenses and permits
                  allowing you to do so;
                </p>
                <p className="pl-5 font-normal">
                  (c) You hold, and will continue to hold, training or a license
                  which permits you to operate drones in the UK, and will notify
                  Duber immediately should this cease to be the case;
                </p>
                <p className="pl-5 font-normal">
                  (d) You hold, and will continue to hold, valid drone insurance
                  in respect of the drone and will notify Duber immediately
                  should this cease to be the case;
                </p>
                <p className="pl-5 font-normal">
                  (e) You will account to HMRC and any other appropriate
                  authorities for any income tax or national insurance
                  contributions due in respect of sums payable in connection
                  with this Agreement;
                </p>
                <p className="pl-5 font-normal">
                  (f) You are not registered for VAT and at no time during the
                  life of this Agreement shall your UK turnover of taxable goods
                  and services in any tax year exceed (or be likely to exceed)
                  the applicable VAT threshold and will notify Duber immediately
                  should this warranty cease to be true or be at material risk
                  of becoming untrue;
                </p>
                <p className="pl-5 font-normal">
                  (g) You have never been convicted of any criminal offence; and
                </p>
                <p className="pl-5 font-normal">
                  (h) You will comply with the Service Delivery Standards.
                </p>
              </div>
              <div className="space-y-2">
                <p>8.&nbsp;&nbsp;&nbsp; INSURANCE</p>
                <p className="font-normal">
                  8.1&nbsp;&nbsp;&nbsp; You will obtain at your own cost
                  appropriate drone insurance which shall remain in force in
                  respect of the provision of the Services by you throughout the
                  life of this Agreement, either by obtaining cover on your own
                  account. You shall, on request, supply copies of such policies
                  together with evidence that the relevant premiums.
                </p>
              </div>
              <div className="space-y-2">
                <p>9.&nbsp;&nbsp;&nbsp; LIABILITY AND INDEMNITY</p>
                <p className="font-normal">
                  9.1&nbsp;&nbsp;&nbsp; You acknowledge and agree that you are
                  personally responsible for the performance of the Services,
                  regardless of whether actually performed by you, and
                  accordingly accept liability for any costs, claims,
                  proceedings, damages, losses, expenses or other liabilities
                  (including legal costs) (together, “Losses”) threatened,
                  suffered or incurred by Duber as a result of your negligent
                  provision of the Services or failure to ensure that the
                  Services are provided with a sufficient standard of care. You
                  agree to indemnify and keep indemnified Duber against all such
                  Losses.
                </p>
              </div>
              <div className="space-y-2">
                <p>10.&nbsp;&nbsp;&nbsp; RIGHT TO APPOINT SUBSTITUTE</p>
                <p className="font-normal">
                  10.1&nbsp;&nbsp;&nbsp; While as a general rule you are
                  expected to perform the Services personally you do have the
                  right, without the need to obtain Duber’s prior approval, to
                  arrange with another registered Duber pilot for them to
                  perform a particular service on your behalf. In such event you
                  acknowledge that this will be a private arrangement between
                  you and that individual and you will continue to bear full
                  responsibility for meeting the Service Delivery Standards in
                  relation to such delivery and all other obligations under this
                  Agreement. You will continue to invoice Duber in accordance
                  with this Agreement, and shall be wholly responsible for the
                  remuneration of your substitute.
                </p>
              </div>
              <div className="space-y-2">
                <p>11.&nbsp;&nbsp;&nbsp; INSURANCE</p>
                <p className="font-normal">
                  11.1&nbsp;&nbsp;&nbsp; Both during the term of this Agreement
                  and following its termination you must not (unless required to
                  do so by law, protected in doing so by a legal right of
                  protected disclosure or doing so in properly providing the
                  Services):
                </p>
                <p className="pl-5 font-normal">
                  (a) disclose any of Duber’s trade secrets or confidential
                  information to any person; or
                </p>
                <p className="pl-5 font-normal">
                  (b) use any of Duber’s trade secrets or confidential
                  information for any purposes other than Duber’s.
                </p>
                <p className="font-normal">
                  11.2&nbsp;&nbsp;&nbsp; The words “confidential information”
                  include but are not limited to:
                </p>
                <p className="pl-5 font-normal">
                  (a) personal data identifying or relating to any of Duber’s
                  customers (including but not limited to names, addresses and
                  other personal information requirements and details of other
                  household members), suppliers or employees;
                </p>
                <p className="pl-5 font-normal">
                  (b) training materials, and other confidential material
                  provided to you during the course of duber’s onboarding
                  process;
                </p>
                <p className="pl-5 font-normal">
                  (c) details of relationships or arrangements with Duber’s
                  other suppliers and business partners;
                </p>
                <p className="pl-5 font-normal">
                  (d) details of Duber’s business methods, finances, pricing
                  strategy, marketing or development plans or strategies; and
                </p>
                <p className="pl-5 font-normal">
                  (e) any other information you know to have been divulged to
                  you by Duber, or by a third party in the course of performing
                  the Services, in confidence.
                </p>
                <p className="font-normal">
                  11.3&nbsp;&nbsp;&nbsp; You will not make, directly or
                  indirectly, any detrimental or derogatory comments about
                  Duber, its officers, employees, business partners or
                  suppliers, either verbally or in writing, including in
                  particular but not limited to on any social media platform or
                  forum. A failure to comply with these obligations shall be
                  considered a serious breach of this agreement.
                </p>
              </div>
              <div className="space-y-2">
                <p>12.&nbsp;&nbsp;&nbsp; TERMINATION</p>
                <p className="font-normal">
                  12.1&nbsp;&nbsp;&nbsp; Duber may terminate this Agreement at
                  any time and for any reason on giving you not less than one
                  week’s notice in writing, and you may terminate this agreement
                  at any time and for any reason on giving Duber not less than
                  two weeks’ notice in writing.
                </p>
                <p className="font-normal">
                  12.2&nbsp;&nbsp;&nbsp; Without prejudice to 11.1 above, Duber
                  also reserves the right to terminate this agreement with
                  immediate effect in the event of any serious or material
                  breach by you of any obligation owed to Duber.
                </p>
                <p className="font-normal">
                  12.3&nbsp;&nbsp;&nbsp; Upon termination of this Agreement, you
                  shall be entitled to invoice Duber in respect of Services
                  performed by you up to the date termination takes effect but
                  you acknowledge you have no other right to any further or
                  final payments in respect of termination or severance or
                  otherwise from us.
                </p>
                <p className="font-normal">
                  12.4&nbsp;&nbsp;&nbsp; Upon termination of this Agreement for
                  whatever reason, you shall deliver to duber all property
                  belonging to duber which is in your possession or control, and
                  permit duber to disable and / or remove from your smartphone
                  any duber application. You shall also permit duber to
                  re-purchase from you any equipment you purchased from duber on
                  commencement in accordance with clause 4.
                </p>
                <p className="font-normal">
                  12.5&nbsp;&nbsp;&nbsp; Following the termination of this
                  Agreement you will no longer represent yourself as being
                  connected in any way with the business of duber, and in
                  particular shall no longer wear any duber branded apparel.
                </p>
              </div>
              <div className="space-y-2">
                <p>13.&nbsp;&nbsp;&nbsp; DATA PROTECTION AND MONITORING</p>
                <p className="font-normal">
                  13.1&nbsp;&nbsp;&nbsp; You acknowledge that Duber may need to
                  process personal data about you for a variety of legal and
                  administrative purposes. This data may include information
                  relating to arrangements with you and your performance of the
                  Services and for the purposes of record keeping and invoicing.
                </p>
                <p className="font-normal">
                  13.2&nbsp;&nbsp;&nbsp; You may have access to personal data
                  about the employees, customers and suppliers of Duber. If the
                  performance of the Services involves you processing personal
                  data (whether as data controller or data processor), you must:
                </p>
                <p className="pl-5 font-normal">
                  (a) act only on instructions from Duber or as set out in this
                  Agreement; and
                </p>
                <p className="pl-5 font-normal">
                  (b) take appropriate technical and organisational measures to
                  keep the data secure and protect against unauthorised or
                  unlawful processing of such data and against accidental loss
                  or destruction of, or damage to, such data.
                </p>
              </div>
              <div className="space-y-2">
                <p>14.&nbsp;&nbsp;&nbsp; MISCELLANEOUS</p>
                <p className="font-normal">
                  14.1&nbsp;&nbsp;&nbsp; duber reserves the right in its sole
                  discretion to make changes to the terms of this Agreement at
                  any time upon written notice to you.
                </p>
                <p className="font-normal">
                  14.2&nbsp;&nbsp;&nbsp; No person other than you and duber may
                  enforce any term of this Agreement.
                </p>
                <p className="font-normal">
                  14.3&nbsp;&nbsp;&nbsp; This Agreement contains the whole
                  agreement between you and Duber in connection with your
                  engagement by Duber and you confirm that you are not entering
                  into the Agreement in reliance upon any oral or written
                  representations made to you by or on behalf of Duber.
                </p>
                <p className="font-normal">
                  14.4&nbsp;&nbsp;&nbsp; This Agreement is personal to you and
                  may not be assigned to a third party without Duber’s express
                  written agreement.
                </p>
                <p className="font-normal">
                  14.5&nbsp;&nbsp;&nbsp; This Agreement will be governed by the
                  laws of England and Wales and the Courts of England and Wales
                  will have non-exclusive jurisdiction to adjudicate any
                  disputes arising under it.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-center">SERVICE DELIVERY STANDARDS</p>
                <p className="font-normal">
                  You will be expected to meet the following minimum Service
                  Delivery Standards.
                </p>
                <p className="font-normal">
                  During a time period in which you have registered to perform
                  Services, you will log into the Duber Pilots app and will
                  promptly accept any orders in your zone which you are
                  available to perform.
                </p>
                <p className="font-normal">
                  You will promptly answer calls from members of the Operations
                  team or, if you are unable to answer them for any reason (for
                  example, because it would not be safe to do so), you will
                  return them as soon as reasonably practicable.
                </p>
                <p className="font-normal">
                  Upon accepting a job from Duber Pilots app, you will make
                  contact with the customer to confirm their requirements and
                  ensure you have the permission to operate the drone in the
                  location they have specified and carry out procedures to
                  comply to CAA UAV regulations such as but limited to;
                  informing local authorities of the operation, approvals from
                  neighboring properties and notifying nearby airports.
                </p>
                <p className="font-normal">
                  You will be expected to meet certain minimum delivery times to
                  the customer. These shall be as notified to you by a member of
                  the Operations team. Persistent failure to meet these
                  requirements shall be considered a serious breach of the
                  Agreement.
                </p>
                <p className="font-normal">
                  You will be courteous in all of your dealings with Duber
                  staff, fellow pilots, customers and any other third parties
                  with whom you interact while performing Services for Duber.
                </p>
                <p className="font-normal">
                  You will perform the Services with all due care, skill and
                  ability and, in particular, will comply with all applicable
                  laws regarding drone safety and usage. You will drive and park
                  your vehicle safely and considerately and in compliance in all
                  respects with the law, the Highway Code, any applicable
                  parking restrictions and with all health and safety policies
                  and procedures imposed by Duber or by any customer with which
                  you may have dealings.
                </p>
                <p className="font-normal">
                  You will comply with the requirements of Duber’s Health and
                  Safety manual for pilots as provided and explained to you
                  during onboarding.
                </p>
                <p className="font-normal">
                  <strong>Dress code:</strong> When performing the Services you
                  must dress presentably in a clean collared shirt, blouse or
                  Company branded T-shirt, and full length trousers, or in
                  accordance with such other Duber dress code as may be notified
                  to you from time to time. If you do not choose to wear a Duber
                  branded T-shirt, you must instead wear a Duber branded jacket.
                  You must keep your clothing clean and in a good state of
                  repair, and for the avoidance of doubt at all times when
                  performing the Services you must wear at least one piece of
                  Company branded clothing. You must never wear clothing bearing
                  any logo or mark of, or otherwise representative of, any
                  competitor organisation while performing the Services. Based
                  on the introduction call to the customer, you must provide and
                  wear appropriate clothing to suite the locations needs, such
                  as a construction site require a minimum five point PPE (Steel
                  capped toe boots, gloves, hi-vis, safety glasses and ear
                  protection)
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className=" border-black border-b-2 space-y-5">
                <p className=" text-sm">Sign here:</p>
                <input
                  className="outline-none font-['Homemade_Apple']"
                  type="text"
                  placeholder="Enter text here"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-end">
                <div className="flex flex-col justify-end">
                  <button
                    onClick={closeModal}
                    disabled={value === ""}
                    className={`h-min px-4 py-2 text-white rounded-lg ${
                      value === ""
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 cursor-pointer"
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContractModal;
