import React, { useEffect, useState } from "react";
import { Allocation, IAppTabContainer, Resource } from "../common/types";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";
import { getAllocationsByResource } from "./QuestionTwo.service";

interface ResourceSchedule {
  resourceName: string;
  resourceId: number;
  allocations: Allocation[];
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
      resources.forEach((i: { id: number; name: string }) => {
        let resourceActivity = getAllocationsByResource(
          activityAllocations,
          i.id,
          activities
        );
        let resourceJob = getAllocationsByResource(jobAllocations, i.id, jobs);

        data.push({
          resourceName: i.name,
          resourceId: i.id,
          allocations: [...resourceActivity, ...resourceJob],
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
