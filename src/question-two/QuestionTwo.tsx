import React, { useEffect, useState } from "react";
import { IAppTabContainer, Resource } from "../common/types";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

interface ResourceSchedule {
  resourceName: string;
  resourceId: number;
  allocations: Allocation[];
}
interface Allocation {
  allocType: "job" | "activity";
  name: string;
  start: string;
  end: string;
}

function handle<T>(promise: Promise<T>) {
  return promise
    .then((data: T) => [data, undefined])
    .catch((error: any) => Promise.resolve([undefined, error]));
}

export const QuestionTwo: React.FC<IAppTabContainer> = ({ service }) => {
  const [activities, setActivities] = useState<ResourceSchedule[]>([]);

  useEffect(() => {
    const getData = async () => {
      const [resources, resourcesErr] = await handle<Resource[]>(
        service.getResources()
      );
      if (resourcesErr || (!!resources && resources.length === 0)) {
        setActivities([]);
        return;
      }
      let data: ResourceSchedule[] = [];
      const [
        activityAllocationsRes,
        activitiesRes,
        jobAllocationsRes,
        jobsRes,
      ] = await Promise.all([
        handle(service.getActivityAllocations()),
        handle(service.getActivities()),
        handle(service.getJobAllocations()),
        handle(service.getJobs()),
      ]);
      const [activityAllocations, activityAllocationsErr] =
        activityAllocationsRes;
      const [activities, activitiesErr] = activitiesRes;
      const [jobAllocations, jobAllocationsErr] = jobAllocationsRes;
      const [jobs, jobsErr] = jobsRes;
      if (!!activityAllocationsErr) {
        //handle error
      }
      if (!!activitiesErr) {
        //handle error
      }
      if (!!jobAllocationsErr) {
        //handle error
      }
      if (!!jobsErr) {
        //handle error
      }
      resources.forEach((i: { id: number; name: any }) => {
        let allocations: Allocation[] = [];

        if (!!activityAllocations && activityAllocations.length > 0) {
          let filterActivities = activityAllocations.filter(
            (x: { resourceId: number }) => x.resourceId === i.id
          );
          if (
            !!filterActivities &&
            filterActivities.length > 0 &&
            !!activities &&
            activities.length > 0
          ) {
            filterActivities.forEach((r: { activityId: any }) => {
              let activity = activities.find(
                (a: { id: any }) => a.id === r.activityId
              );
              if (!!activity) {
                allocations.push({
                  allocType: "activity",
                  name: activity.name,
                  start: activity.start,
                  end: activity.end,
                });
              }
            });
          }
        }
        if (jobAllocations && jobAllocations.length > 0) {
          let filterJobs = jobAllocations.filter(
            (x: { resourceId: number }) => x.resourceId === i.id
          );
          if (!!filterJobs && filterJobs.length > 0) {
            filterJobs.forEach((r: { jobId: any }) => {
              let job = jobs.find((a: { id: any }) => a.id === r.jobId);
              if (!!job) {
                allocations.push({
                  allocType: "job",
                  name: job.name,
                  start: job.start,
                  end: job.end,
                });
              }
            });
          }
        }

        data.push({
          resourceName: i.name,
          resourceId: i.id,
          allocations: allocations,
        });
      });
      setActivities(data);
    };
    getData();
  }, [service]);
  return (
    <SectionGroup>
      <SectionPanel>
        <pre>{JSON.stringify(activities, null, 0)}</pre>
      </SectionPanel>
    </SectionGroup>
  );
};
