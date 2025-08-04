export const AppLayout = ({ children }) => {
  return (
    <div className="w-full max-w-screen-sm mx-auto px-4">
      <div className="w-full max-w-screen-sm mx-auto p-4">
        {children}
      </div>
    </div>
  );
};