import { WorkingLate } from "../../../public/svgs/WorkingLate";

export const NoFiles = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-5 sm:px-6 sm:py-4">
      <div className="mt-12 w-full max-w-[350] sm:max-w-[350] md:mt-6 lg:max-w-[400px]">
        <WorkingLate />
      </div>
    </div>
  );
};
