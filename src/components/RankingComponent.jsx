import { RankingItem } from "./RankingItem";

export const RankingComponent = ({ ranking }) => {
  return (
    <div className="bg-gray-ligth p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-center">Ranking - max points obtained</h2>
      <ul className="space-y-1">
        {ranking.map((user, index) => (
        <RankingItem key={user.name} user={user} index={index}/>
        ))}
      </ul>
    </div>
  );
};