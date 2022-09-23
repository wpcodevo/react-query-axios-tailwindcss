import { FC } from "react";
import { Link } from "react-router-dom";

interface IMessage {
  message: string;
  path: string;
  pathText: string;
}

const Message: FC<IMessage> = ({ message, path, pathText }) => {
  return (
    <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] w-[35rem] py-12 px-8 flex flex-col items-center text-center">
      <h3 className="text-4xl font-semibold mb-8">Almost there!</h3>
      <p className="text-xl">{message}</p>
      <p className="mt-8">
        Didn't forget password{" "}
        <Link to={path} className="text-blue-700 underline">
          {pathText}
        </Link>
      </p>
    </div>
  );
};

export default Message;
