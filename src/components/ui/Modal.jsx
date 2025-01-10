const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="m-5 w-full max-w-md rounded-lg bg-background px-5 py-6 shadow-lg">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
