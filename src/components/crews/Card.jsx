import Modal from "../ui/Modal";
import { useState } from "react";
import Title from "../ui/Title";
import Image from "next/image";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Label from "../ui/Label";
import { useRouter } from "next/navigation";
import { MdGroups } from "react-icons/md";

export const Card = ({ ...props }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);

  const closeModal = () => {
    setPassword("");
    setIsOpen(false);
  };
  const closeErrorModal = () => {
    setPassword("");
    setIsIncorrectPassword(false);
  };

  const joinHandler = () => {
    if (password == props.crew.crew_token) {
      setPassword("");
      setIsOpen(false);
      setIsIncorrectPassword(false);
      router.push(`/crew/${props.crew._id}`);
    } else {
      setIsOpen(false);
      setIsIncorrectPassword(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      joinHandler(true);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer flex-col items-center justify-center gap-6 rounded-md bg-hover px-4 py-8 text-foreground"
        key={props.id}
      >
        <div>
          {props?.crew?.crew_banner?.base64 ? (
            <Image
              src={props.crew.crew_banner.base64}
              className="h-28 w-28 rounded-full object-cover"
              alt="crew_banner"
              width={100}
              height={100}
            />
          ) : (
            <MdGroups size={100} />
          )}
        </div>

        <div className="text-center">
          <Title>{props.crew.crew_name}</Title>
        </div>
      </div>

      <Modal isOpen={isOpen}>
        <div className="flex flex-col justify-center gap-4 text-center">
          <Title>Crew Password</Title>
          <div className="mb-2 flex flex-col gap-2">
            <Label>
              Enter <b>{props.crew.crew_name}</b> password to join:
            </Label>
            <Input
              value={password}
              placeholder="Enter crew password"
              onKeyDown={handleKeyDown}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={closeModal}>Close</Button>
            <Button onClick={joinHandler}>Join</Button>
          </div>
        </div>
      </Modal>

      {isIncorrectPassword && (
        <Modal isOpen={isIncorrectPassword}>
          <div className="flex flex-col justify-center gap-4 text-center">
            <Title>Incorrect Password</Title>
            <div className="mb-2 text-center">
              <Label>
                The password you entered does not match. Please double-check and
                try again.
              </Label>
            </div>
            <Button onClick={closeErrorModal}>Close</Button>
          </div>
        </Modal>
      )}
    </>
  );
};
