import { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
}
export default function CardBG(props: CardProps) {
  return (
    <div className="bg-#121E2A min-h-140px rounded-8px w-100% p-16px">
      {props.children}
    </div>
  );
}
