import { Activity, Job } from "../common/types";

// map allocations by resource
export const getAllocationsByResource = (
  resourceAllocations: any[],
  resourceId: number,
  allocations: Activity[] | Job[]
): any[] => {
  return resourceAllocations
    .filter((x: { resourceId: number }) => x.resourceId === resourceId)
    .map((x) => {
      const isActivity = "activityId" in x;
      const key = isActivity ? "activityId" : "jobId";
      let item = allocations.find((a) => a.id === x[key]);
      if (!!item) {
        return {
          allocType: isActivity ? "activity" : "job",
          name: item.name,
          start: item.start,
          end: item.end,
        };
      }
      return null;
    })
    .filter((x) => x);
};
