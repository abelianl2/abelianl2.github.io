import { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  title: string;
}
export default function CardBG(props: CardProps) {
  return (
    <div>
      <div className="mb-6px font-bold">{props.title}</div>
      <div className="bg-#121E2A min-h-140px rounded-8px w-100% p-16px border-1px border-solid border-#555">
        {props.children}
      </div>
    </div>
  );
}
