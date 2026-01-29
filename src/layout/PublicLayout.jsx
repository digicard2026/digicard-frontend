
const PublicLayout = ({ children }) => {
  return (
    <div className="max-h-screen overflow-x-hidden overflow-y-visible">
      <main className="flex-grow">{children}</main>
    </div>
  );
};
export default PublicLayout;
