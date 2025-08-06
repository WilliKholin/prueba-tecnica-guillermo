export const PointsComponent = ({ points, onGainPoint }) => {
  return (
    <div className="text-center space-y-2">
      <p className="text-lg font-medium">Points: {points}</p>
      <button
        onClick={onGainPoint}
        className="bg-green-base text-white py-2 px-4 rounded hover:bg-green-hover transition"
      >
        Gain Points
      </button>
    </div>
  );
};
