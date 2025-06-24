import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";


interface ButtonProps {
  className?: string;
  translate?: string;
  sizeClass?: string;
  fontSize?: string;
  //
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  href?: string;
  targetBlank?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  download?: boolean;
  children?: ReactNode;
}

export const Button = ({
  className = '',
  translate = '',
  sizeClass = 'px-4 py-3 sm:px-6',
  fontSize = 'text-sm sm:text-base font-medium',
  disabled = false,
  href,
  children,
  targetBlank,
  type,
  loading,
  download,
  onClick = () => {},
}: ButtonProps) => {
  const CLASSES = `relative h-auto inline-flex items-center justify-center rounded-2xl transition-colors ${fontSize} ${sizeClass} ${translate} ${className} `;

  if (!!href) {
    return (
      <Link
        to={href}
        target={targetBlank ? '_blank' : undefined}
        download={download}
        className={`${CLASSES} `}
        onClick={onClick}
        rel={targetBlank ? 'noopener noreferrer' : undefined}
      >
        {children || `This is Link`}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${CLASSES}`}
      onClick={onClick}
      type={type}
    >
      {loading && <div>loading...</div>}
      {children || `This is Button`}
    </button>
  );
};

export const ButtonPrimary = ({ className = '', ...args }: ButtonProps) => {
  return (
    <Button
      className={`disabled:bg-opacity-70 border border-gray-400 hover:bg-gray-400 text-black hover:text-white ${className}`}
      {...args}
    />
  );
};
