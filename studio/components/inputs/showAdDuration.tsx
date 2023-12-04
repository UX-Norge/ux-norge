import React, { useEffect, useState } from "react";
import { useClient, useFormValue } from "sanity";

const printDate = (startDate: string, duration = 0) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + duration);
  return date.toLocaleDateString("no-NO", { dateStyle: "long" });
};

const ShowAdDuration = React.forwardRef(() => {
  const packageTypeRef = useFormValue(["packageType", "_ref"]) as number;
  const createdAt = useFormValue(["_createdAt"]) as string;
  const client = useClient({ apiVersion: "2021-03-25" });

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    packageTypeRef &&
      client
        .fetch(`*[_type == 'adPackageType' && _id == $ref][0]`, {
          ref: packageTypeRef,
        })
        .then((result: { duration: number }) => setDuration(result.duration));
  }, [client]);

  if (!packageTypeRef) return null;

  return <div>Varer til: {printDate(createdAt, duration)}</div>;
});

export default ShowAdDuration;
