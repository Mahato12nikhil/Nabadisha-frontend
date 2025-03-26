export const ToggleSwitch = ({
    options,
    selectedOption,
    setSelectedOption,
  }: {
    options: string[];
    selectedOption: string | boolean;
    setSelectedOption: (value: any) => void;
  }) => {
    return (
      <div className="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
        {options.map((option, index) => {
          const valueToSet = typeof selectedOption === "boolean" ? index === 0 : option;
          return (
            <button
              key={option}
              onClick={() => setSelectedOption(valueToSet)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedOption === valueToSet
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-600 dark:text-gray-300"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  };
  