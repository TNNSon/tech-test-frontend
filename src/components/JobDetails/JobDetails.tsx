import React from "react";
import { Job, JobAllocations } from "../../common/types";
import "./JobDetails.css";

interface JobDetails {
  data: Job & { allocations: JobAllocations[] };
  index: Number;
}

function formatDay(time: string) {
  let date = new Date(time);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    weekday: "short",
    year: "numeric",
    month: "short",
  };
  return date.toLocaleString("en-US", options).replaceAll(",", "");
}

function formatTime(time: string) {
  let date = new Date(time);
  const mins = date.getMinutes();
  const minsShow = mins < 10 ? "0" + mins : mins;
  return `${date.getHours()}:${minsShow}`;
}

export const JobDetails: React.FC<JobDetails> = ({ data, index }) => {
  return (
    <div className="job-item">
      <div className="job-title">
        <b>{data.name}</b> (Job #{index})
      </div>
      <div className="job-location">{data.location}</div>
      <div className="job-date">{formatDay(data.start)}</div>
      <div className="job-time">
        {formatTime(data.start)} - {formatTime(data.end)}{" "}
      </div>
      <div className="job-resources">{data.allocations.length}</div>
    </div>
  );
};
