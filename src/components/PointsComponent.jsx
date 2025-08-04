export const PointsComponent = ({ points, onGainPoint }) => {
  return (
    <div className="text-center space-y-2">
      <p className="text-lg font-medium">Points: {points}</p>
      <button
        onClick={onGainPoint}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Gain Points
      </button>
    </div>
  );
};
