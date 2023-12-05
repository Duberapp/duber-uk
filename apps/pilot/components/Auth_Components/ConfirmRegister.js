import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Checkbox, ErrorMessage } from "../index";
import Link from "next/link";
import { insertToUsers, uploadProofFile } from "../../config/supabaseFunctions";
import { setActiveForm, setUpdateMode } from "../../redux/registerSlice";
import axios from "axios";
import { ContractModal, LoadingSpinner } from "../../components";

const Confirm = ({ proofDoc, insuranceDoc }) => {
  const state = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // ###################################################
      // ------------- IMPLEMENT FILE UPLOAD ---------------
      let baseURL = process.env.NEXT_SUPABASE_STORAGE_BASEURL;

      let proofFileDoc = null;
      if (!state.confirmNoProof && proofDoc !== null) {
        const { data, error: proofFileErr } = await uploadProofFile(
          proofDoc,
          state.email
        );

        if (proofFileErr) throw new Error("Proof file upload failed.!");
        proofFileDoc = `${baseURL}/proof-files/${data.path}`;
      }

      let insuranceFileLink = null;
      const { data: insuranceDocRes, error: insuranceErr } =
        await uploadProofFile(insuranceDoc, state.email);
      if (insuranceErr) throw new Error("Drone Insurance upload failed.!");
      insuranceFileLink = `${baseURL}/proof-files/${insuranceDocRes.path}`;
      // --------------------------------
      // ###################################################

      // Insert user
      const { data, error } = await insertToUsers([
        {
          title: state.title,
          firstName: state.firstName,
          lastName: state.lastName,
          telNumber: state.telNumber,
          company: state.company,
          flyerID: state.flyerID,
          operatorID: state.operatorID,
          confirmNoProof: state.confirmNoProof,
          proofDoc: proofFileDoc,
          droneInsurance: insuranceFileLink,
          userSkills: state.skills,
          userDrones: state.equipments,
          email: state.email,
        },
      ]);
      if (error) throw new Error(error.message);

      // ========== SEND EMAIL TO PILOT =============
      const emailRes = await axios({
        method: "POST",
        baseURL: process.env.NEXT_PUBLIC_BACKEND_BASEURL,
        url: "/pilots/email/application-submit",
        headers: {},
        data: {
          pilotEmail: state.email,
        },
      });

      // Push to register complete page
      router.push(
        {
          pathname: "/auth/register/complete-register",
          query: { firstName: state.firstName },
        },
        "/auth/register/complete-register"
      );

      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-5">
        <p className="text-3xl text-navyBlue font-semibold">Confirm</p>
      </div>

      {error && <ErrorMessage error={error} setError={setError} />}
      {/* Contact form Confirmation */}
      <div className="cofirm-card ">
        <div className="flex flex-1 flex-row">
          <div>
            <p className="text-primaryBlue sm:text-base text-sm font-medium">
              Name
            </p>
            <p className="text-primaryBlue text-xs mt-1">
              {state.firstName} {state.lastName}
            </p>

            <p className="text-primaryBlue sm:text-base text-sm font-medium mt-3">
              Email Address
            </p>
            <p className="text-primaryBlue text-xs mt-1">{state.email}</p>
          </div>
          <div className="ml-6">
            <p className="text-primaryBlue sm:text-base text-sm font-medium">
              Telephone Number
            </p>
            <p className="text-primaryBlue text-xs mt-1">{state.telNumber}</p>

            <p className="text-primaryBlue sm:text-base text-sm font-medium mt-3">
              Company
            </p>
            <p className="text-primaryBlue text-xs mt-1">{state.company}</p>
          </div>
        </div>

        <PencilSquareIcon
          className="w-7 text-primaryBlue cursor-pointer"
          onClick={() => {
            dispatch(setUpdateMode(true));
            dispatch(setActiveForm(1));
          }}
        />
      </div>

      {/* Certificate form Confirmation */}
      <div className="cofirm-card mt-5">
        <div className="flex flex-1 flex-row gap-16">
          <div>
            <p className="text-primaryBlue sm:text-base text-sm font-medium">
              CAA Information
            </p>
            <p className="text-primaryBlue text-xs mt-1">
              Flyer ID: {state.flyerID} &nbsp; Operator ID: {state.operatorID}
            </p>

            <p className="text-primaryBlue sm:text-base text-sm font-medium mt-4">
              Qualifications &amp; Insurances
            </p>
            <p className="text-primaryBlue text-xs mt-1">
              {proofDoc !== null ? "A2CofC Uploaded" : "A2CofC not Uploaded"}{" "}
              &nbsp; &nbsp;{" "}
              {insuranceDoc !== null
                ? "Insurance Uploaded"
                : "Insurance not Uploaded"}
            </p>
          </div>
        </div>

        <PencilSquareIcon
          className="w-7 text-primaryBlue cursor-pointer"
          onClick={() => {
            dispatch(setUpdateMode(true));
            dispatch(setActiveForm(2));
          }}
        />
      </div>

      {/* Equipment form Confirmation */}
      <div className="cofirm-card mt-5">
        <div className=" flex-1 flex-nowrap">
          <p className="text-primaryBlue sm:text-base text-sm font-medium">
            Skills / Experiences
          </p>
          <div className="flex flex-row gap-2 mt-2 flex-wrap">
            {state.skills.map((skill) => (
              <p className="text-primaryBlue text-xs w-fit" key={skill.id}>
                {skill.text},{" "}
              </p>
            ))}
          </div>

          <p className="text-primaryBlue sm:text-base text-sm font-medium mt-4">
            Equipment
          </p>
          <div className="flex flex-row gap-2  mt-2 flex-wrap">
            {state.equipments.map((equip) => (
              <p className="text-primaryBlue text-xs w-fit" key={equip.id}>
                {equip.brand.name}, {equip.model} /
              </p>
            ))}
          </div>
        </div>

        <PencilSquareIcon
          className="w-7 text-primaryBlue cursor-pointer"
          onClick={() => {
            dispatch(setUpdateMode(true));
            dispatch(setActiveForm(3));
          }}
        />
      </div>

      <div className="my-5 flex flex-row gap-3 items-center">
        <Checkbox
          checked={checked}
          setChecked={() => {
            setChecked(!checked);
            setShowModal(!showModal);
          }}
        />
        <p className="sm:text-base text-sm">
          I accept the{" "}
          <span className="font-semibold">Supplier Agreement.</span>
        </p>
      </div>

      <button
        disabled={!checked}
        onClick={handleSubmit}
        className={`w-full flex items-center justify-center ${
          !checked ? "bg-gray-400 cursor-not-allowed" : "bg-primaryTeal"
        } h-12 rounded-md text-white font-semibold text-lg`}
      >
        {loading ? (
          <LoadingSpinner width={5} height={5} color="white" />
        ) : (
          <span>Submit</span>
        )}
      </button>
      {showModal && <ContractModal />}
    </div>
  );
};

export default Confirm;
