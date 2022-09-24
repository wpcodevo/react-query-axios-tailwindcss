import { FC } from "react";
import { Link } from "react-router-dom";

interface IMessage {
  children: React.ReactNode;
}

const Message: FC<IMessage> = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] w-[35rem] py-12 px-8 flex flex-col items-center text-center">
      <h3 className="text-4xl font-semibold mb-8">Almost there!</h3>
      {children}
    </div>
  );
};

export default Message;
