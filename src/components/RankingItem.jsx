export const RankingItem = ({ user, index }) => {
  return (
    <li key={user.name} className="flex justify-between">
      <span>
        #{index + 1} - {user.name}
      </span>
      <span>{user.maxPoints} pts</span>
    </li>
  );
};
