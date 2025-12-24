export default function OrderTimeline({ status }) {

  const steps = [
    "Pending",
    "Processing",
    "Shipped",
    "Completed",
  ];

  const currentStep = steps.indexOf(status);

  return (
    <div className="w-full mt-6">

      <h3 className="text-secondary font-semibold mb-4">
        Order Progress
      </h3>

      <div className="flex items-center justify-between relative">

        {/* Progress line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full -translate-y-1/2" />

        <div
          className="absolute top-1/2 left-0 h-1 bg-accent rounded-full -translate-y-1/2 transition-all duration-500"
          style={{
            width:
              currentStep >= 0
                ? `${(currentStep / (steps.length - 1)) * 100}%`
                : "0%",
          }}
        />

        {steps.map((step, index) => (
          <div
            key={step}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Circle */}
            <div
              className={`w-5 h-5 rounded-full border-2
                ${
                  index <= currentStep
                    ? "bg-accent border-accent"
                    : "bg-white border-gray-400"
                }`}
            />

            {/* Label */}
            <span
              className={`mt-2 text-xs font-medium
                ${
                  index <= currentStep
                    ? "text-accent"
                    : "text-gray-400"
                }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
