import React from "react";

export const JobList: React.FC<any> = ({ items }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="job-index"></th>
          <th className="job-title">Job's name</th>
          <th className="job-contact">Contact</th>
          <th className="job-timeline">Timeline</th>
        </tr>
      </thead>
      <tbody>
        {items.map((job: any, index: number) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{job.name}</td>
            <td>{job.contact.name}</td>
            <td>
              {new Date(job.start).toLocaleDateString("en-US")} -{" "}
              {new Date(job.end).toLocaleDateString("en-US")}
            </td>
          </tr>
        ))}
        {items.length === 0 && (
          <tr>
            <td colSpan={4}>No Results</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
