import React, { useCallback, useRef, useState } from "react";
import { IAppTabContainer } from "../common/types";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";
import { JobList } from "./JobList";

import "./QuestionOne.css";

function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export const QuestionOne: React.FC<IAppTabContainer> = ({ service }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);

  const handleInpuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    debounceDropDown(e.target.value);
  };

  const fetchApi = (e: string) => {
    if (e.length >= 3) {
      setLoading(true);
      service
        .getJobsWithSearchTerm(e)
        .then((rs) => {
          setLoading(false);
          setJobs(rs);
        })
        .catch((err) => {
          setLoading(false);
          setJobs([]);
        });
    } else {
      setJobs([]);
    }
  };
  const debounceDropDown = useCallback(
    debounce((nextValue) => fetchApi(nextValue), 1000),
    []
  );

  return (
    <SectionGroup>
      <SectionPanel>
        <div className="question-one">
          <label htmlFor="search">Search Input</label>
          <input
            id="search"
            data-testid="search"
            type="text"
            ref={inputRef}
            onChange={handleInpuChange}
            placeholder="Search Job's name"
          />
          {loading && (
            <div className="loader" data-testid="loading" role="alert"></div>
          )}
          <JobList items={jobs} />
        </div>
      </SectionPanel>
    </SectionGroup>
  );
};
