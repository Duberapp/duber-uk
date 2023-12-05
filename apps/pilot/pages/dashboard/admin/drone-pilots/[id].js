import React, { useEffect, useState } from "react";
import {
  AdminProvider,
  DashboardLayout,
  LoadingSpinner,
  Input,
  JobCard,
} from "../../../../components";
import ColumnOneForm from "../../../../components/Admin_Components/SinglePage/ColumnOne_Form";
import ColumnTwoForm from "../../../../components/Admin_Components/SinglePage/ColumnTwo_Form";
import { useRouter } from "next/router";
import {
  singlePilotData_admin,
  getJobListingByPilotId,
} from "../../../../config/supabaseFunctions";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Toaster } from "react-hot-toast";
import { errorToast } from "../../../../components/UI/Toast";

const SinglePilot = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  // Initialize Data
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);

        const { data, error } = await singlePilotData_admin(router.query?.id);
        const { data: JobData, error: JobErr } = await getJobListingByPilotId(
          router.query?.id
        );

        if (error) throw error;

        if (JobErr) errorToast("Couldnt fetch pilot's job data");

        setJobs(JobData);

        setData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  return (
    <AdminProvider>
      <Toaster />
      <DashboardLayout>
        {loading && (
          <div className="w-full h-full flex items-center justify-center">
            <LoadingSpinner width={9} height={9} color="teal-500" />
          </div>
        )}

        {!loading && Object.keys(data).length !== 0 && (
          <div className="w-full px-3 py-6">
            {/* Top bar */}
            <div className="w-full flex items-center justify-between">
              <p className="text-2xl font-semibold">
                {data.pilotData.firstName} {data.pilotData.lastName}&nbsp;
                <span className="font-normal">#{data.pilotData.id}</span>
              </p>

              <div className="flex items-center gap-2">
                <Link href="/dashboard/admin/drone-pilots" legacyBehavior>
                  <a className="font-medium text-xs text-gray-400">
                    Back to Drone Pilots
                  </a>
                </Link>
                <ArrowRightIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="mt-4 w-full min-h-screen rounded-3xl bg-white p-4">
              <div className="w-full grid grid-cols-2 gap-x-6">
                {/* Cols 1 */}
                <ColumnOneForm data={data} />

                {/* Cols 2 */}
                <ColumnTwoForm data={data} />
              </div>

              <p className="mt-6 mb-2">{`Home/Office Address`}</p>
              <div className="flex items-center gap-x-3">
                <Input>
                  <p>{data.billingData && data.billingData.home_street}</p>
                </Input>
                <Input>
                  <p>{data.billingData && data.billingData.home_city}</p>
                </Input>
                <Input>
                  <p>{data.billingData && data.billingData.home_postCode}</p>
                </Input>
                <Input>
                  <p>{data.billingData && data.billingData.home_country}</p>
                </Input>
              </div>

              <p className="mt-6 mb-2">{`Billing Address (If different than Home/Office Address)`}</p>
              <div className="flex items-center gap-x-3">
                <Input>
                  <p>{data.billingData && data.billingData.billing_street}</p>
                </Input>
                <Input>
                  <p>{data.billingData && data.billingData.billing_city}</p>
                </Input>
                <Input>
                  <p>{data.billingData && data.billingData.billing_postCode}</p>
                </Input>
                <Input>
                  <p>{data.billingData && data.billingData.billing_country}</p>
                </Input>
              </div>

              <p className="mt-6 mb-2">{`Bank Details`}</p>
              <div className="flex items-center gap-x-3">
                <Input>
                  <p>{data.billingData && data.billingData.bankSortCode}</p>
                </Input>
                <Input>
                  <p>
                    {data.billingData && data.billingData.bankAccountNumber}
                  </p>
                </Input>
                <Input>
                  <p>{data.billingData && data.billingData.bankName}</p>
                </Input>
                <Input>
                  <p>{data.billingData && data.billingData.bankBranch}</p>
                </Input>
              </div>

              <p className="mt-6 mb-2">{`Trade Type`}</p>
              <div className="flex items-center gap-x-5">
                <div className="flex items-center gap-x-1">
                  <div
                    className={`w-12 h-12 rounded-md ${
                      data.billingData
                        ? data.billingData.tradeType === "sole"
                          ? "bg-primaryTealLight"
                          : "bg-primaryBlueLight"
                        : "bg-primaryBlueLight"
                    } flex items-center justify-center`}
                  >
                    {data.billingData
                      ? data.billingData.tradeType === "sole" && (
                          <CheckIcon
                            className="w-7 h-7 text-teal-500"
                            strokeWidth={2}
                          />
                        )
                      : ""}
                  </div>
                  <p className="">Sole Trader</p>
                </div>

                <div className="flex items-center gap-x-1">
                  <div
                    className={`w-12 h-12 rounded-md ${
                      data.billingData
                        ? data.billingData.tradeType === "limited"
                          ? "bg-primaryTealLight"
                          : "bg-primaryBlueLight"
                        : "bg-primaryBlueLight"
                    } flex items-center justify-center`}
                  >
                    {data.billingData
                      ? data.billingData.tradeType === "limited" && (
                          <CheckIcon
                            className="w-7 h-7 text-teal-500"
                            strokeWidth={2}
                          />
                        )
                      : ""}
                  </div>
                  <p className="">Limited</p>
                </div>

                <Input className={"w-64"}>
                  <p className="text-primaryBlue">
                    {data.billingData &&
                      (data.billingData.NIC ? data.billingData.NIC : "NIC")}
                  </p>
                </Input>
              </div>

              {/* Jobs List */}
              <div className="mt-12">
                <p className="font-semibold text-base">Pilot Jobs</p>

                {/* .Job Cards List */}
                {jobs.length !== 0 ? (
                  <div className="mt-7 flex flex-col gap-y-5">
                    {jobs.map((job) => (
                      <JobCard key={job.JobID} data={job} preventRoute />
                    ))}
                  </div>
                ) : (
                  <p className="mt-7">No Jobs to Show</p>
                )}
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </AdminProvider>
  );
};

export default SinglePilot;
