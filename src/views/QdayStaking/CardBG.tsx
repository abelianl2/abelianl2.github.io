import { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
}
export default function CardBG(props: CardProps) {
  return (
    <div className="bg-#121E2A h-224px rounded-8px w-49% p-16px">
      {props.children}
    </div>
  );
}
