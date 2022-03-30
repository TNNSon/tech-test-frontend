import React, { useEffect, useState } from "react";
import {
  IAppTabContainer,
  Job,
  JobAllocations,
  Resource,
} from "../common/types";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";
import { JobDetails } from "../components/JobDetails/JobDetails";

import "./QuestionThree.css";

export const QuestionThree: React.FC<IAppTabContainer> = ({ service }) => {
  const [jobList, setJobList] = useState<
    (Job & { allocations: JobAllocations[] })[]
  >([]);
  const [resourceList, setResourceList] = useState<Resource[]>([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const [jobs, jobAllocations] = await Promise.all([
        service.getJobs(),
        service.getJobAllocations(),
      ]);

      const results = jobs.map((x) => {
        return {
          ...x,
          allocations: jobAllocations.filter((i) => i.jobId === x.id),
        };
      });
      let filledArray = new Array<Job & { allocations: JobAllocations[] }>(10);
      setJobList([
        ...results,
        ...filledArray.fill({
          contactId: "0",
          allocations: [],
          id: 1,
          location: "Brisbane",
          name: "Pick up a trailer",
          start: "2018-09-01T13:00:00Z",
          end: "2018-09-01T13:15:00Z",
        }),
      ]);
    };
    setResourceList(new Array(10).fill(null));
    fetchJobs();
  }, [service]);

  return (
    <SectionGroup>
      <SectionPanel>
        <div className="question-three">
          <nav className="navigation">
            <ul className="menu">
              <li className="menu-item round "></li>
              <li className="menu-item round"></li>
              <li className="menu-item round"></li>
              <li className="menu-item round"></li>
              <li className="menu-item round"></li>
              <li className="menu-item round"></li>
            </ul>
            <div>
              <div className="setting round"></div>
            </div>
          </nav>
          <main>
            <header className="header container">
              <h2>Header</h2>
            </header>
            <div className="main">
              <section className="job-list container overflow-y">
                {jobList.map((x, i) => (
                  <JobDetails data={x} index={i} key={i} />
                ))}
              </section>
              <section className="contact-list container overflow-y">
                {resourceList.map((x, i) => (
                  <div key={i} className="contact-item"></div>
                ))}
              </section>
            </div>
          </main>
        </div>
      </SectionPanel>
    </SectionGroup>
  );
};
